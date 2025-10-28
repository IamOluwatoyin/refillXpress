import React, { useContext, useState } from 'react'
import "./Signup.css"
import "./Login.css"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { HiFire } from "react-icons/hi";
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const {token} = useContext(UserContext)
    // const savedToken = token
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const { login } = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData((prev)=> ({...prev, [e.target.name]: e.target.value}))
    }
  return (
    <div className='login'>
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
            <h1>welcome back</h1>
            <p>
                Let's sign you in to your account.
            </p>
        </div>
        <div className="input-container">
                <label htmlFor="email">email address</label>
                <div className="input-div">
                    <input type="text" placeholder='your email here...' 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
        </div>
        <div className="input-container">
            <label htmlFor="email">password</label>
                <div className="input-div">
                    <input type={show? "text" : "password"} placeholder='password ( 8 or more characters)'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    />
                    <span className='eye'>
                        {
                            show? <BsEye onClick={()=> setShow(false)} /> : <BsEyeSlash onClick={()=> setShow(true)} />
                        }
                    </span>
                </div>
                <div className="Forgot">
                    <Link className='link' to="/forgot">forgot password?</Link>
                </div>
        </div>
            <div className='submit-section small'>
                <button onClick={(e)=> login(e, formData, navigate)} className="submit">sign in</button>
                <p>Don't have an account? <Link to="/" >sign up</Link></p>
            </div>
      </form>
      </article>
    </div>
  )
}

export default Login
