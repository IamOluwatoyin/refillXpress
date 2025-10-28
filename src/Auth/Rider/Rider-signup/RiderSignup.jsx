import React, { useState } from "react";
import "./RiderSignup.css";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Toastify } from "toastify";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router";
import SpinnerModal from "../../vendor-auth/spinner-modal/spinner-modal-auth";

const RiderSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    vendorFirstName: "",
    vendorLastName: "",
    confirmPassword: "",
    password: "",
    agree: false,
  });
  const navigate = useNavigate();

  const validate = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "10 digit phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Enter your business address";
    }

    if (!formData.vendorFirstName.trim()) {
      newErrors.vendorFirstName = "Enter your first name";
    }

    if (!formData.vendorLastName.trim()) {
      newErrors.vendorLastName = "Enter your last name";
    }

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
      toast.error("Please fill all required fields.");
      setShowModal(false);
      return;
    }

    toast.success("Account successfully created");
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigate("/vendorlogin");
    }, 2000);

    setFormData({
      businessName: "",
      email: "",
      phone: "",
      address: "",
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
                  height: "",
                }}
                onSubmit={validate}
              >
                {errors.address && (
                  <p style={{ color: "red" }}>{errors.address}</p>
                )}

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
                      }}
                    />
                    {showPassword ? (
                      <FaRegEye onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaRegEyeSlash onClick={() => setShowPassword(true)} />
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
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      background: "#F2F6F5",
                      width: "39.3125rem",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <input
                      placeholder="  Enter your same password here"
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
                      }}
                    />
                    {cshowPassword ? (
                      <FaRegEye onClick={() => csetShowPassword(false)} />
                    ) : (
                      <FaRegEyeSlash onClick={() => csetShowPassword(true)} />
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
                      style={{ textDecoration: "none", color: "#1BB970" }}
                    >
                      terms and conditions
                    </a>
                  </span>
                </div>
                {errors.agree && <p style={{ color: "red" }}>{errors.agree}</p>}
                <button
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#FF7F11",
                    border: "none",
                    width: "39.3125rem",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
                    to={"/vendorlogin"}
                    style={{ textDecoration: "none", color: "#1BB970" }}
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
