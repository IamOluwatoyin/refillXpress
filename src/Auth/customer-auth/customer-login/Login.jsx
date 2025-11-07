import React, { useContext, useState } from 'react'
import "../customer-signup/signup.css"
import "./login.css"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { HiFire } from "react-icons/hi";
import { UserContext } from '../../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import SpinnerModal from '../../vendor-auth/spinner-modal';
import { useForm } from 'react-hook-form';


const Login = () => {
    const { login, loading, setLoading } = useContext(UserContext)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
     const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

       const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate("/userdashboard"); 
    }
  };
    
  return (
    <div className='login'>
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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-heading wrap">
            <h1>welcome back</h1>
            <p>
                Let's sign you in to your account.
            </p>
        </div>
        <div className="input-container">
                <label htmlFor="email">Email Address</label>
                <div className="input-div">
                    <input type="text" placeholder='your email here...' 
                    name='email'
                     {...register("email", {
                        required: "email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                </div>
                 {errors.email && (
                      <p style={{ color: "red" }}>
                        {errors.email.message}
                      </p>
                    )}
        </div>
        <div className="input-container">
            <label htmlFor="email">Password</label>
                <div className="input-div">
                    <input type={show? "text" : "password"} placeholder='password ( 8 or more characters)'
                    name='password'
                    {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                            message:
                              "Password must be at least 8 characters and include letters, numbers, and special characters.",
                          },
                        })}
                    />
                    <span className='eye'>
                        {
                            show? <BsEye onClick={()=> setShow(false)} /> : <BsEyeSlash onClick={()=> setShow(true)} />
                        }
                    </span>
                </div>
                 {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}
                <div className="Forgot">
                    <Link className='link' to="/forgot">forgot password?</Link>
                </div>
        </div>
            <div className='submit-section small'>
                <button 
                 
                disabled={loading}
                className="submit">sign in</button>
                <p>Don't have an account? <Link to="/usersignup" className='link' >sign up</Link></p>
            </div>
      </form>
      </article>
    </div>
  )
}

export default Login
