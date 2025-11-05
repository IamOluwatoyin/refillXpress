import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SpinnerModal from "../../vendor-auth/spinner-modal";
import "./RiderLogin.css";

const RiderLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const API_BASE_URL = "https://refillexpress.onrender.com/api/v1";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors and try again.");
      return;
    }

    setShowModal(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/rider/login`,
        formData
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      toast.success("Login successful! Welcome back.");
      setTimeout(() => {
        navigate("/rider-kyc");
      }, 1000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Check your credentials.";

      toast.error(message);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="rider-login-page-layout">
      {/* Top-Left Logo Header */}
      <header className="fixed-header">
        <div className="logo-container">
          <img src="/src/assets/logo.svg" alt="logo" className="logo-image" />
          <h1>
            Refill<span className="logo-span">Xpress</span>
          </h1>
        </div>
      </header>

      {/* Centered Login Card */}
      <div className="login-page-center">
        <main className="login-card">
          <div className="login-title-section">
            <h3>Welcome Back</h3>
            <p>Let's sign in to your account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* 1. Email Field */}
            <div className="input-field-group full-width">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your email here..."
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* 2. Password Field */}
            <div className="input-field-group full-width password-group">
              <label>Input Your Password</label>
              <div
                className={`password-input-wrapper ${
                  errors.password ? "input-error" : ""
                }`}
              >
                <input
                  placeholder="Password (8 or more characters)"
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

            {/* 3. Forgot Password Link */}
            <div className="forgot-password-link-wrapper">
              <NavLink
                to={"/rider/forgotpassword"}
                className="forgot-password-link"
              >
                Forgot password?
              </NavLink>
            </div>

            {/* 4. Submit Button */}
            <button type="submit" className="signin-button">
              Sign in
            </button>

            {/* 5. Don't have an account? Link */}
            <div className="signup-link-wrapper">
              <span>Don't have an account?</span>
              <NavLink to={"/ridersignup"} className="signup-link-bottom">
                Signup
              </NavLink>
            </div>
          </form>
        </main>
      </div>

      {showModal && <SpinnerModal />}
    </div>
  );
};

export default RiderLogin;
