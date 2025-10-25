import React from 'react'
import "./signup.css"
import { HiFire } from "react-icons/hi";
import  { BsEye, BsEyeSlash } from 'react-icons/bs';

const Signup = () => {
    return (
        <div className='signup'>
           <article className="article">
                <header className="header">
                    <h4 className='logo-heading'>
                    <span className='fire'>
                        <HiFire /> 
                    </span>
                    Refill<span className='logo-style'>Xpress</span>
                    </h4>
                </header>
                <form className="form">
                    <div className="form-heading">
                        <h1>sign up</h1>
                        <p>
                            Create your account and enjoy quick, safe gas delivery at your doorstep.
                        </p>
                    </div>
                    
                    <div className="row-input">
                        <div className="input-container small-input">
                        <label>first name</label>
                        <div className="input-div">
                            <input type="text"  />
                        </div>
                    </div>
                    <div className="input-container small-input">
                        <label>last name</label>
                        <div className="input-div">
                            <input type="text" />
                        </div>
                    </div>
                    </div>

                    <div className="row-input">
                        <div className="input-container small-input">
                        <label>email addres</label>
                        <div className="input-div">
                            <input type="text"  />
                        </div>
                    </div>
                    <div className="input-container small-input">
                        <label>phone number</label>
                        <div className="input-div">
                            <input type="tel" />
                        </div>
                    </div>
                    </div>

                    <div className="input-container">
                        <label>password</label>
                        <div className="input-div">
                            <input type="text" placeholder='password (8 or more characters)' />
                            <span className='eye'><BsEyeSlash /></span>
                        </div>
                    </div>
                    <div className="input-container">
                        <label>confirm password</label>
                        <div className="input-div">
                            <input type="text" placeholder='password (8 or more characters)' />
                            <span className='eye'><BsEyeSlash /></span>
                        </div>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" name="check" id="box" />
                        <p>I agree to Refillxpress <span>terms and conditions</span></p>
                    </div>
                    <div className='submit-section'>
                        <button className="submit">create account</button>
                        <p>Already have an account? <span>sign in</span></p>  
                    </div>

                </form>
            </article> 
        </div>
    )
}

export default Signup
