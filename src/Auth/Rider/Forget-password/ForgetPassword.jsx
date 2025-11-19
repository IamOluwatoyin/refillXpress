import React, { useState } from "react";
import "./ForgetPassword.css";
import Header from "../../../assets/Header.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const Base_url = import.meta.env.VITE_BASEURL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${Base_url}/rider/forgotPassword`, {
        email: email,
      });
      console.log(res);
      toast.success(res?.data?.message);
      localStorage.setItem("userEmail", email);

      navigate("/verify-password");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <header className="auth-header">
        <div className="logo-placeholder">
          <img src={Header} alt="RefillXpress Logo" onClick={()=>navigate("/")} />
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <h2 className="card-title">Forgot Password</h2>
          <p className="card-subtitle">
            Don't worry, it happens! Enter your email address, and we'll send
            you a code to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="send-button">
              Send Verification code
            </button>
          </form>

          <p className="remember-link">
            Remember password? <a href="/riderlogin">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
