import React, { useState } from "react";
import "./RiderLogin.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import Password from "antd/es/input/Password";
import { toast } from "react-toastify";
import SpinnerModal from "../../vendor-auth/spinner-modal-auth";

const RiderLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const validate = (e) => {
    e.preventDefault();
    let newErr = {};
    if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErr.email = "Please enter a valid email address.";
    }
    if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(loginData.password)
    ) {
      newErr.password =
        "Password must be at least 8 characters and include letters, numbers, and special characters.";
    }
    setErrors(newErr);

    if (Object.keys(newErr).length > 0) {
      toast.error("Please fill all required fields.");
      setShowModal(false);
      return;
    }

    toast.success("User successfully Signin");
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigate("/vendorDashboard");
    }, 2000);
  };
  return (
    <>
      {showModal ? (
        <SpinnerModal />
      ) : (
        <div className="form-wrapperlogin">
          <div className="form-containerlogin">
            <header>
              <img src="/src/assets/logo.svg" alt="logo" className="image" />

              <h1>
                Refill<span>Xpress</span>
              </h1>
            </header>
            <section className="cardBodyWrapperlogin">
              <main className="cardBodylogin">
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
                    onSubmit={validate}
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
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "39.3125rem",
                          background: "#F2F6F5",
                        }}
                      />
                      {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                      )}
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
                          padding: "8px 4px",
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
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
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
                          <FaRegEyeSlash
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </div>
                    </div>
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                    <span style={{ textAlign: "right" }}>
                      <NavLink
                        to={"/forgetpassword"}
                        style={{ textDecoration: "none", color: "#1BB970" }}
                      >
                        Forgot password?
                      </NavLink>
                    </span>
                    <button className="btnlogin">Sign in</button>
                    {showModal && <SpinnerModal />}
                    <div
                      style={{
                        display: "flex",
                        gap: "3px",
                        justifyContent: "center",
                      }}
                    >
                      <span>Already have an account?</span>
                      <NavLink
                        to={"/"}
                        style={{ textDecoration: "none", color: "#1BB970" }}
                      >
                        Signup
                      </NavLink>
                    </div>
                  </form>
                </section>
              </main>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default RiderLogin;
