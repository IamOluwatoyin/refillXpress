import React, { useState } from "react";
import "./RiderSignup.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import SpinnerModal from "../../vendor-auth/spinner-modal";

const RiderSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    vendorFirstName: "",
    vendorLastName: "",
    // email: "",
    confirmPassword: "",
    password: "",
    agree: false,
  });
  const navigate = useNavigate();

  const validate = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.vendorFirstName.trim()) {
      newErrors.vendorFirstName = "Enter your first name";
    }

    if (!formData.vendorLastName.trim()) {
      newErrors.vendorLastName = "Enter your last name";
    }

    /*
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    */

    if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include letters, numbers, and special characters.";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly.");
      setShowModal(false);
      return;
    }

    toast.success("Account successfully created");
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigate("/riderlogin");
    }, 2000);

    setFormData({
      vendorFirstName: "",
      vendorLastName: "",
      confirmPassword: "",
      password: "",
      agree: false,
    });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <header>
          <img src="/src/assets/logo.svg" alt="logo" className="image" />

          <h1>
            Refill<span>Xpress</span>
          </h1>
        </header>
        <section className="cardBodyWrapper">
          <main className="cardBody">
            <article>
              <h3>Sign Up as Rider</h3>
              <p>Sign Up to start dilivering with us</p>
            </article>

            <section className="formWrapper">
              <form
                className="formStyle"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
                onSubmit={validate}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label>First Name</label>
                    <input
                      id="vendorFirstName"
                      type="text"
                      name="vendorFirstName"
                      value={formData.vendorFirstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vendorFirstName: e.target.value,
                        })
                      }
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: " 18.875rem",
                        background: "#F2F6F5",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    />
                    {errors.vendorFirstName && (
                      <p style={{ color: "red" }}>{errors.vendorFirstName}</p>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label> Last Name</label>
                    <input
                      id="vendorLastName"
                      type="text"
                      name="vendorLastName"
                      value={formData.vendorLastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vendorLastName: e.target.value,
                        })
                      }
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: " 18.875rem",
                        background: "#F2F6F5",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    />
                    {errors.vendorLastName && (
                      <p style={{ color: "red" }}>{errors.vendorLastName}</p>
                    )}
                  </div>
                </div>

                {/* 
                <div 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="e.g., yourname@mail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "39.3125rem",
                      background: "#F2F6F5",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>
                        {errors.email}
                    </p>
                  )}
                </div>
                */}

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
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "39.3125rem",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      background: "#F2F6F5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      placeholder=" Password ( 8 or more characters)"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      style={{
                        border: "none",
                        outline: "none",
                        background: "#F2F6F5",
                        width: "37rem",
                        padding: "0 4px",
                      }}
                    />
                    {showPassword ? (
                      <FaRegEye
                        onClick={() => setShowPassword(false)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setShowPassword(true)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label> Comfirm Password</label>
                  <div
                    style={{
                      padding: "8px 4px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      background: "#F2F6F5",
                      width: "39.3125rem",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      placeholder=" Enter your same password here"
                      type={cshowPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      style={{
                        outline: "none",
                        border: "none",
                        width: "37rem",
                        background: "#F2F6F5",
                        padding: "0 4px",
                      }}
                    />
                    {cshowPassword ? (
                      <FaRegEye
                        onClick={() => csetShowPassword(false)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => csetShowPassword(true)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                )}

                <div style={{ display: "flex", gap: "3px" }}>
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={(e) =>
                      setFormData({ ...formData, agree: e.target.checked })
                    }
                  />
                  <span>
                    {" "}
                    I agree to Refillxpress{" "}
                    <a
                      href="#"
                      style={{ textDecoration: "none", color: "#FF7F11" }}
                    >
                      terms and conditions
                    </a>
                  </span>
                </div>
                {errors.agree && <p style={{ color: "red" }}>{errors.agree}</p>}

                <button
                  type="submit"
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#FF7F11",
                    color: "white",
                    border: "none",
                    width: "39.3125rem",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    fontWeight: "bold",
                  }}
                >
                  Create Account
                </button>
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
                    to={"/riderlogin"}
                    style={{ textDecoration: "none", color: "#FF7F11" }}
                  >
                    Sign in
                  </NavLink>
                </div>
              </form>
            </section>
          </main>
        </section>
      </div>
    </div>
  );
};

export default RiderSignup;
