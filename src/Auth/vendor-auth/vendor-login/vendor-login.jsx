import React, { useState } from "react";
import "./vendor-login.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import Password from "antd/es/input/Password";
import SpinnerModal from "../spinner-modal-auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { message } from "antd";

const Vendorlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
   const[showModal, setShowModal] = useState(false)
   const navigate = useNavigate()
 

  
    const  [loginData, setLoginData] = useState({
      email:"",
      password:""
    })
    const {register, handleSubmit, formState:{errors}}=useForm()
    const submit = (data)=>{
     console.log("formData",data)

      toast.success("Account successfully created");
         setShowModal(true);
     
         setTimeout(() => {
           setShowModal(false);
           navigate("/vendor-dashboard");
         }, 2000);
    }
  return (
    <>
     
    <div className="form-wrapperlogin">
      <div className="form-containerlogin">
        <header>
          <img src="/src/assets/logo.svg" alt="logo" className="image" />

          <h1>
            Refill<span>Xpress</span>
          </h1>
        </header>
        <section className="cardBodyWrapperlogin">
          <main className="cardBodylogin" >
            <article>
              <h3> Welcome Back</h3>
              <p>let’s sign in to your account</p>
            </article>
            <section className="formWrapperlogin">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
                onSubmit={handleSubmit(submit)}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label>Email Address</label>
                  <input
                    id="vendorEmail"
                    placeholder="Your email here..."
                    type="email"
                    name="email"
                    {...register("email",{required:"email is required",
                        pattern:{
                          value: /\S+@\S+\.\S+/,
                          message:"Enter a valid email address"
                        }
                      })
                      }
                    style={{
                      padding: "12px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                       width: "39.3125rem",
                      background: "#F2F6F5",
                    }}
                  />
                   {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label> Input Your Password</label>
                  <div
                    style={{
                      padding: "12px 6px",
                      borderRadius: "4px",
                      border: "1px solid #9b9191cc",
                      width: "39.3125rem",

                      background: "#F2F6F5",
                    }}
                  >
                    <input
                      placeholder=" Password ( 8 or more characters)"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      {...register("password",{required:"Password is required",
                        pattern:{
                         value:  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                        message: "Password must be at least 8 characters and include letters, numbers, and special characters."
                        }
                      })}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "#F2F6F5",
                        width: "37rem",
                      }}
                    />
                    {showPassword ? (
                      <FaRegEye onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaRegEyeSlash onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                </div>
                 {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
                <span style={{textAlign:"right", }}>
                  <NavLink to={"/forgetpassword"} style={{textDecoration:"none", color:"#1BB970"}}>
                  Forgot password?
                  </NavLink>
                 </span>
                 <button
                  className="btnlogin"
                  type="submit"
                >
                 Sign in
                </button>
                {showModal && <SpinnerModal/>}
                 <div
                  style={{
                    display: "flex",
                    gap: "3px",
                    justifyContent: "center",
                  }}
                >
                  <span>Already have an account?</span>
                  <NavLink to={"/"} style={{textDecoration: "none",color: "#1BB970"}}>
                  
                     Signup
                  
                  </NavLink>
                  
                </div>
              </form>
            </section>
          </main>
        </section>
      </div>
    </div>
{/* )} */}
    </>
  );
};

export default Vendorlogin;


