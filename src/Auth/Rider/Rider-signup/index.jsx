import React, { useState } from "react";
import "./RiderSignup.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import SpinnerModal from "../../vendor-auth/spinner-modal";

const RiderSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    confirmPassword: "",
    password: "",
    agree: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Enter your first name";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Enter your last name";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
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
      toast.error("Please fill all required fields correctly.");
      return;
    }

    const { confirmPassword, agree, ...payload } = formData;

    const API_BASE_URL = "https://refillexpress.onrender.com/api/v1";

    setShowModal(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/rider`, payload);

      console.log("Signup successful:", response.data);
      localStorage.setItem("userEmail", formData.email);
      toast.success("Account successfully created!");

      setTimeout(() => {
        navigate("/verify-email");
      }, 1000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Could not connect to the server.";

      console.error("Signup failed:", error.response || error);
      toast.error(message);
    } finally {
      setShowModal(false);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      confirmPassword: "",
      password: "",
      agree: false,
    });
  };

  return (
    <div className="rider-signup-page">
      <div className="form-wrapper">
        <header className="form-header">
          <img src="/src/assets/logo.svg" alt="logo" className="logo-image" />
          <h1>
            Refill<span className="logo-span">Xpress</span>
          </h1>
        </header>

        <section className="card-body-wrapper">
          <main className="signup-card">
            <article className="signup-title-section">
              <h3>Become a Rider</h3>
              <p>Sign Up to start delivering with us</p>
            </article>

            <section className="form-section">
              <form className="signup-form" onSubmit={validate}>
                <div className="input-row-group">
                  <div className="input-field-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.firstName ? "input-error" : ""
                      }`}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="error-text">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="input-field-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.lastName ? "input-error" : ""
                      }`}
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <p className="error-text">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="input-row-group">
                  <div className="input-field-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your email here..."
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.email ? "input-error" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="error-text">{errors.email}</p>
                    )}
                  </div>

                  <div className="input-field-group phone-field">
                    <label htmlFor="phoneNumber">Phone number</label>
                    <div
                      className={`form-input phone-input-wrapper ${
                        errors.phoneNumber ? "input-error" : ""
                      }`}
                    >
                      <span className="country-code">+234</span>
                      <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="7080998844"
                        className="phone-input"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="error-text">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="input-field-group full-width">
                  <label>Input Your Password</label>
                  <div
                    className={`password-input-wrapper ${
                      errors.password ? "input-error" : ""
                    }`}
                  >
                    <input
                      placeholder="Password ( 8 or more characters)"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="password-input"
                    />
                    {showPassword ? (
                      <FaRegEye
                        onClick={() => setShowPassword(false)}
                        className="password-toggle-icon"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setShowPassword(true)}
                        className="password-toggle-icon"
                      />
                    )}
                  </div>
                  {errors.password && (
                    <p className="error-text">{errors.password}</p>
                  )}
                </div>

                <div className="input-field-group full-width">
                  <label>Confirm Password</label>
                  <div
                    className={`password-input-wrapper ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                  >
                    <input
                      placeholder="Enter your same password here"
                      type={cshowPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="password-input"
                    />
                    {cshowPassword ? (
                      <FaRegEye
                        onClick={() => csetShowPassword(false)}
                        className="password-toggle-icon"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => csetShowPassword(true)}
                        className="password-toggle-icon"
                      />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="terms-checkbox-group">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="terms-text">
                    I agree to Refillxpress{" "}
                    <a href="#" className="terms-link">
                      terms and conditions
                    </a>
                  </span>
                </div>
                {errors.agree && (
                  <p className="error-text checkbox-error-text">
                    {errors.agree}
                  </p>
                )}

                <button type="submit" className="submit-button">
                  Create Account
                </button>
                {showModal && <SpinnerModal />}

                <div className="signin-link-wrapper">
                  <span>Already have an account?</span>
                  <NavLink to={"/riderlogin"} className="signin-link-bottom">
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
