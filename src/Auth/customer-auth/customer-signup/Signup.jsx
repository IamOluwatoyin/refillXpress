import React, { useContext, useState } from 'react'
import "./signup.css"
import { HiFire } from "react-icons/hi";
import  { BsEye, BsEyeSlash } from 'react-icons/bs';
import { UserContext } from '../../../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import SpinnerModal from '../../vendor-auth/spinner-modal';
import { useForm } from "react-hook-form"
const Signup = () => {
    const nav = useNavigate()
    const { user, signup, loading, setLoading } = useContext(UserContext);

    const [type, setType] = useState("password")
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState("")
   
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();   
      const password = watch("password", "");

      const onSubmit = async (data) => {
    const success = await signup(data);
    if (success) {
      nav("/userverify"); 
    }
  };
    
    return (
        <div className='signup'> 
             {loading && <SpinnerModal />} 
           <article className="article">
                <header className="form-header">
                     <div className='logo-heading'>
                        <img src="/Images/dashboard_logo.png" alt="" onClick={()=> nav("/")} className='logo-heading' />
                    </div>
                </header>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-heading">
                        <h1>Sign Up</h1>
                        <p>
                            Create your account and enjoy quick, safe gas delivery at your doorstep.
                        </p>
                    </div>
                    
                    <div className="row-input">
                        <div className="input-container small-input">
                        <label>First Name</label>
                        <div className="input-div">
                            <input type="text"  
                            name='firstName'
                             {...register("firstName", {
                      required: "Your First name is required",
                    })} />
                        </div>
                        {errors.firstName && (
                    <p style={{ color: "red" }}>
                      {errors.firstName.message}
                    </p>
                  )}
                    </div>
                    <div className="input-container small-input">
                        <label>Last Name</label>
                        <div className="input-div">
                            <input type="text" 
                             name='lastName'
                             {...register("lastName", {
                      required: "Your last name is required",
                    })}/>
                        </div>
                        {errors.lastName && (
                    <p style={{ color: "red" }}>
                      {errors.lastName.message}
                    </p>
                  )}
                    </div>
                    </div>

                    <div className="row-input">
                        <div className="input-container small-input">
                        <label>Email Address</label>
                        <div className="input-div">
                            <input type="text"
                             name='email'
                            {...register("email", {
                        required: "email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address",
                        },
                      })}/>
                        </div>
                         {errors.email && (
                      <p style={{ color: "red" }}>
                        {errors.email.message}
                      </p>
                    )}
                    </div>
                    <div className="input-container small-input">
                        <label>Phone Number</label>
                        <div className="input-div">
                            <input type="tel" 
                             name='phoneNumber'
                           {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\d+$/,
                            message: "Phone number must contain only digits",
                          },
                          validate: (value) =>
                            value.length === 10 ||
                            value.length === 11 ||
                            "Phone number must be 10 or 11 digits",
                        })}
                            />
                        </div>
                        {errors.phoneNumber && (
                      <p style={{ color: "red" }}>
                        {errors.phoneNumber.message}
                      </p>
                    )}
                    </div>
                    </div>

                    <div className="input-container">
                        <label>Password</label>
                        <div className="input-div">
                            <input type={type} placeholder='password (8 or more characters)'
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
                                type === "password" ? <BsEyeSlash onClick={()=> setType("text")} /> : <BsEye onClick={()=> setType("password")} />
                                }
                            </span>
                        </div>
                         {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
                    </div>
                    <div className="input-container">
                        <label>Comfirm Password</label>
                        <div className="input-div">
                            <input type={show? "text" : "password" } placeholder='password (8 or more characters)'
                            name='confirmPassword'
                            {...register("confirmPassword", {
                        required: "Password confirmation is required",
                        validate: (value) =>
                          value === password || "Passwords do not match.",
                      })}
                            />
                            <span className='eye'>
                                {
                                    show? <BsEye onClick={()=> setShow(false)} /> : <BsEyeSlash onClick={()=> setShow(true)} />
                                }
                            </span>
                        </div>
                         {errors.confirmPassword && (
                  <p style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </p>
                )}
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" name="check" id="box" 
                        {...register("check", {
                      required: "You must agree to the terms.",
                    })}
                        />
                        <p>I agree to Refillxpress <span>terms and conditions</span></p>
                    </div>
                    {errors.check && (
                  <p style={{ color: "red" }}>{errors.check.message}</p>
                )}
                    <div className='submit-section'>
                        <button  type="submit"
                         disabled={loading}
                        // onClick={(e)=> signup(e, formData, confirm, nav)} 
                        className="submit">create account</button>
                        <p>Already have an account? <Link className="link" to="/userlogin">Sign in</Link></p>  
                    </div>
                </form>
            </article> 
            {/* Toyin */}
        </div>
    )
    
}

export default Signup
