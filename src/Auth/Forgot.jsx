import React, { useState } from 'react'
import "./Signup.css"
import "./forgot.css"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { HiFire } from "react-icons/hi";
import { BASEURL } from '../api/base';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';

const Forgot = () => {
const nav = useNavigate()
        const requestCode = async (e) => {
            e.preventDefault()
            const savedUser = JSON.parse(localStorage.getItem("user"))
            try {
                const res = await axios.post(`${BASEURL}/user/forgot-password`, {
                    email: savedUser.email
                }, {
                    headers: {"Content-Type": "application/json"}
                })
                toast(res.data.response.message || "successful")
                nav("/forgot-verify")
            } catch(err) {
                console.error(err)
                toast.error("failed, please try again" )
            }
        } 

    const [email, setEmail] = useState("")
  return (
    <div className='forgot'>
      <article className="article space">
        <header className="header">
        <h6 className="logo-heading">
            <span className="fire">
                <HiFire />
            </span>
            Refill<span className="logo-style">Xpress</span>
        </h6>
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
                <button onClick={requestCode} className="submit">send verification code</button>
                <p>Remember password? <Link className="link" to="userlogin">sign in</Link></p>
            </div>
      </form>
      </article>
    </div>
  )
}

export default Forgot
