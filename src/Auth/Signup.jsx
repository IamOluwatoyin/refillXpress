import React, { useContext, useState } from 'react'
import "./signup.css"
import { HiFire } from "react-icons/hi";
import  { BsEye, BsEyeSlash } from 'react-icons/bs';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const nav = useNavigate()
    const {user, signup } = useContext(UserContext)
    const [type, setType] = useState("password")
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

        const handleChange = (e) => {
        setFormData((prev)=> ({...prev, [e.target.name]: e.target.value}))
    }     
    
// console.log(user)
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
                            <input type="text"  
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="input-container small-input">
                        <label>last name</label>
                        <div className="input-div">
                            <input type="text" 
                             name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}/>
                        </div>
                    </div>
                    </div>

                    <div className="row-input">
                        <div className="input-container small-input">
                        <label>email addres</label>
                        <div className="input-div">
                            <input type="text"
                             name='email'
                            value={formData.email}
                            onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="input-container small-input">
                        <label>phone number</label>
                        <div className="input-div">
                            <input type="tel" 
                             name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            />
                        </div>
                    </div>
                    </div>

                    <div className="input-container">
                        <label>password</label>
                        <div className="input-div">
                            <input type={type} placeholder='password (8 or more characters)'
                            name='password'
                            value={formData.password}
                            onChange={handleChange} 
                            />
                            <span className='eye'>
                                {
                                type === "password" ? <BsEyeSlash onClick={()=> setType("text")} /> : <BsEye onClick={()=> setType("password")} />
                                }
                            </span>
                        </div>
                    </div>
                    <div className="input-container">
                        <label>confirm password</label>
                        <div className="input-div">
                            <input type={show? "text" : "password" } placeholder='password (8 or more characters)'
                            onChange={(e)=> setConfirm(e.target.value)}
                            />
                            <span className='eye'>
                                {
                                    show? <BsEye onClick={()=> setShow(false)} /> : <BsEyeSlash onClick={()=> setShow(true)} />
                                }
                            </span>
                        </div>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" name="check" id="box" />
                        <p>I agree to Refillxpress <span>terms and conditions</span></p>
                    </div>
                    <div className='submit-section'>
                        <button type='button' onClick={(e)=> signup(e, formData, confirm, nav)} className="submit">create account</button>
                        <p>Already have an account? <Link className="link" to="/userlogin">sign in</Link></p>  
                    </div>

                </form>
            </article> 
        </div>
    )
    
}

export default Signup
