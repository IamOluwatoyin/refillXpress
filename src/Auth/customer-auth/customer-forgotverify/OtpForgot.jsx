import React, { useEffect, useRef, useState } from 'react'
import "../customer-signupverify/signupverify.css"
import { HiFire } from "react-icons/hi";
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASEURL } from '../../../api/base';
import { useNavigate } from 'react-router-dom';

const OtpForgot = () => {
    const nav = useNavigate()
const [resendActive, setResendActive] = useState(false)
const [timer, setTimer] = useState(60)
const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

const handleChange  = (e, index) => {
    if (e.target.value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus()
    }
}
const handleBackspace = (e, index) => {
    if (!e.target.value && e.key === "Backspace" && index > 0) {
        inputRefs[index - 1].current.focus()
    }
}



const handleSend = async (e) => {
    e.preventDefault()
    const joined = inputRefs.map((val)=> val.current.value).join("")
    
    if (joined.length !== inputRefs.length) {
        toast.error("incomplete digits") 
        return
    }
    const savedUser = localStorage.getItem("email")
    console.log(savedUser)
    try {
        const res = await axios.post(`${BASEURL}/api/v1/user/verify-forgot-password-otp`, 
            {
                email: savedUser,
                otp: joined
            }, 
            {
                headers: {"Content-Type": "application/json"}
            }
        )
        toast.success("successful")
        nav("/userreset")
        
    } catch (err) {
        toast.error("failed")
        console.error(err)
    }
}

const handleResend = async (e) => {
    e.preventDefault()
    setTimer(60)
    toast.info("Verification code resent!");
    const email = localStorage.getItem("email")

     try {
            const res = await axios.post(`${BASEURL}/api/v1/user/forgot-password/resend`, {
                email: email,
            }, {
                headers: {"Content-Type": "application/json"}
            }
        )
        toast.success(res.data.data.message)
        } catch (err) {
            console.error(err)
        }
}

useEffect(()=> {
    inputRefs[0].current.focus()
}, [])

useEffect(()=> {
    const countdown = setTimeout(()=> {
        if(timer > 0) {
        setTimer((prev)=> (prev - 1))
    }
    if(timer === 0) {
        setResendActive(true)
    }
    }, 1000)
return ()=> clearTimeout(countdown)
}, [timer])




const formatter = (time) => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`    
}

  return (
    <div className='otpforgot'>
        <article className="article">
                <header className="header">
                    <h6 className='logo-heading'>
                        <span className='fire'>
                            <HiFire /> 
                        </span>
                        Refill<span className='logo-style'>Xpress</span>
                    </h6>
                </header>
                <form className="form">
                    <div className="form-heading">
                        <p>{formatter(timer)}</p>
                        <h1>verify account</h1>
                        <p>A verification code has been sent to your email
                        address.Please enter it to continue</p>
                    </div>
                    <div className="code">
                        {inputRefs.map((ref, index) => (
                            <input 
                            ref={ref}
                            key={index}
                            type='text'
                                  onBeforeInput={(e) => {
                                      if (!/[0-9]/.test(e.data)) {
                                        e.preventDefault();
                                      toast.error("Only digits allowed")
                                      }
                                    }}
            
                            onChange={(e)=> handleChange(e, index)}
                            onKeyDown={(e)=> handleBackspace(e, index)}
                            maxLength="1"
                            placeholder={index + 1}
                            className='code-box'
                            />
                        ))}
                    </div>
                    <div className='submit-section'>
                    
              <button onClick={handleSend} className="submit">Verify</button>
                { 
                    timer > 0 ? (
                    <>
                    <p>didn’t receive code? resend in  {formatter(timer)}</p>
                    </>
                    ) : (
                        <>
                    <p>didn’t receive code? <button onClick={handleResend} className='resend-btn'>resend</button></p>
                        </>
                    )
                }
        </div>
        
                </form>
              </article>
    </div>
  )
}

export default OtpForgot
