import React, { useState, } from 'react'
import "../customer-signup/signup.css"
import "./forgot.css"
import { HiFire } from "react-icons/hi";
import { BASEURL } from '../../../api/base';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router';
import SpinnerModal from '../../vendor-auth/spinner-modal';
import axios from 'axios';

const Forgot = () => {
    const nav = useNavigate()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
        const requestCode = async (e) => {
            e.preventDefault()  
           
            const savedUser = JSON.parse(localStorage.getItem("user"))
            if(!email) {
                toast.error("please input a valid email")
                return
            }
            try {
                setLoading(true)
                const res = await axios.post(`${BASEURL}/api/v1/user/forgot-password`, {
                    email: email
                }, {
                    headers: {"Content-Type": "application/json"}
                })
                JSON.stringify(localStorage.setItem("email", email))
                toast.success("successful")
                nav("/forgot-verify")
            } catch(err) {
                toast.error("failed, please try again" )
            }  finally {
                setLoading(false)
            }
        } 

  return (
    <div className='forgot'>
      {loading && <SpinnerModal />} 
           <article className="article">
                <header className="form-header">
                    <div className="inner-header">
                        <h4 className='logo-heading'>
                    <span className='fire'>
                        <HiFire /> 
                    </span>
                    Refill<span className='logo-style'>Xpress</span>
                    </h4>
                    </div>
                </header>
      <form className="form">
        <div className="form-heading wrap">
            <h1>forgot password</h1>
            <p>
                Don’t worry, it happens! Enter your email address, 
                and we’ll send you a code to reset your password.
            </p>
        </div>
        <div className="input-container">
                <label htmlFor="email">email address</label>
                <div className="input-div">
                    <input type="text" placeholder='your email here...' 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className='submit-section small'>
                <button onClick={requestCode} className="submit">send code</button>
                <p>Remember password? <Link className="link" to="/userlogin">sign in</Link></p>
            </div>
      </form>
      </article>
    </div>
  )
}

export default Forgot
