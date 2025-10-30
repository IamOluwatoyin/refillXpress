import React, { useRef, useEffect, useState } from 'react'
import "../customer-signup/signup.css"
import "./signupverify.css"
import { HiFire } from "react-icons/hi";
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASEURL } from '../../../api/base';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const OtpSignup = () => {
    const nav = useNavigate()
    const { user, setUser } = useContext(UserContext)
    
    const [code, setCode] = useState([])
    const [timer, setTimer] = useState(30); // 2 minutes = 120 seconds
    const [resendActive, setResendActive] = useState(false);

    useEffect(() => {
  let countdown;

  if (timer > 0) {
    countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
  } else {
    setResendActive(true); // enable resend when timer finishes
    clearInterval(countdown);
  }

  return () => clearInterval(countdown);
}, [timer]);

   const handleSend = async (e) => {
  e.preventDefault();

  const joined = inputRef.map(val => val.current.value).join("");

  if (joined.length < 6) {
    toast.error("Please enter all 6 digits.");
    return;
  }

const savedUser = JSON.parse(localStorage.getItem("user"));
console.log("User", savedUser)
  if (!savedUser || !savedUser.email) {
    toast.error("User not found. Please sign up again.");
    return;
  }

  try {
        const res = await axios.post(`${BASEURL}/api/v1/user/verify`, {
      email: savedUser.email,
      otp: joined,
    }, 
    {
      headers: { "Content-Type": "application/json" }
    });
    console.log(joined)
    toast.success(res.data.message || "Account verified successfully!");
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));  
    nav("/userlogin")

  } catch (err) {
    console.error(err);
    toast.error(err.response)
    
  }
};

    const handleResend = async (e) => {
        e.preventDefault()
  setTimer(30); 
  setResendActive(false);
  toast.info("Verification code resent!"); 

        const savedUser = JSON.parse(localStorage.getItem("user"))

        try {
            const res = await axios.post(`${BASEURL}/api/v1/user/resend-otp`, {
                email: savedUser.data.email,
            }, {
                headers: {"Content-Type": "application/json"}
            })
        } catch (err) {
            console.error(err)
        }
  
};      

    const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};



    const inputRef = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    const handleChange = (e, index) => {
            const value = e.target.value
        if (value && index < inputRef.length - 1)  {
            inputRef[index + 1].current.focus()
        } 
        if (!/^[0-9]?$/.test(value)) {
            toast.error("only allow digits")
            // return  
        }
    }

    const backspace = (e, index) => {
        if (e.key === "Backspace" && !e.target.value  && index > 0) {
            inputRef[index - 1].current.focus()
    }
    }


    useEffect(()=> {    
        inputRef[0].current.focus()
    }, [])
  return (
    <div className='verify'>
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
                <h1>verify account</h1>
                <p>A verification code has been sent to your email
                address.Please enter it to continue</p>
            </div>
            <div className="code">
                {inputRef.map((ref, index) => (
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
                    onKeyDown={(e)=> backspace(e, index)}
                    maxLength="1"
                    placeholder={index + 1}
                    className='code-box'
                    />
                ))}
            </div>
            <div className='submit-section'>
            
      <button onClick={handleSend} disabled={!resendActive} className="submit">Verify</button>
        { 
            timer > 0 ? (
            <>
            <p>didn’t receive code? resend in  {formatTime(timer)}</p>
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

export default OtpSignup
