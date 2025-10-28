import React, { useContext, useState } from 'react'
import "./reset.css"
import "./Signup.css"
import { HiFire } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { toast } from 'react-toastify';
import { BASEURL } from '../api/base';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
const ResetPassword = () => {
    const nav = useNavigate()
    // const {token} = useContext(UserContext)
const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
})

const handleRequest = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    try {
        const res = await axios.post(`${BASEURL}/user/reset/password`, form,
            {
                headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`
                    },
            }
        )
        toast.success(res.data.message)
        nav("/userlogin")
    } catch (err) {
        toast.error(err.data)
        console.error(err)
        // nav("/userlogin")
    }    
}


    return (
        <div className='reset'>
            <article className="article space">
                <header className="header">
                    <h4 className='logo-heading'>
                    <span className='fire'>
                        <HiFire /> 
                    </span>
                    Refill<span className='logo-style'>Xpress</span>
                    </h4>                
                </header>
                <form className="form">
                    <div className="form-heading wrap">
                        <h1>reset password</h1>
                        <p>
                            Enter a new password for your account. Make 
                            sure it’s strong and easy for you 
                            to remember.
                        </p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">password</label>
                        <div className="input-div">
                            <input type="text" placeholder='password (8 or more characters)'
                            value={form.newPassword}
                            onChange={(e)=> setForm((prev) => ({...prev, newPassword: e.target.value}))}
                            />
                            <span className='eye'><BsEyeSlash /></span>
                        </div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">confirm password</label>
                        <div className="input-div">
                            <input type="text" placeholder='password (8 or more characters)'
                            value={form.confirmPassword}
                            onChange={(e)=> setForm((prev) => ({...prev, confirmPassword: e.target.value}))}
                            />
                            <span className='eye'><BsEyeSlash /></span>
                        </div>
                    </div>
                    <div className='submit-section'>
                        <button onClick={handleRequest} className="submit">reset password</button>
                    </div>
                </form>
            </article>
        </div>
    )
}

export default ResetPassword
