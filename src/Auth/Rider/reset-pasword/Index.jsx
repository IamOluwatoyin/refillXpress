import React, { useState } from "react";
import "./resetPassword.css";
import Header from "../../../assets/Header.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const Base_url = import.meta.env.VITE_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }
    if (password !== confirmPassword) {
      return toast.error("New Password and Confirm Password must match.");
    }
    if (!userEmail) {
      return toast.error(
        "Session expired. Please restart the forgot password process."
      );
    }

    try {
      const payload = {
        email: userEmail,
        newPassword: password,
      };
      const res = await axios.post(`${Base_url}/rider/resetPassword`, payload);
      console.log(res);
      toast.success("Password successfully reset! You can now sign in.");
      localStorage.removeItem("userEmail");

      setTimeout(() => {
        navigate("/riderlogin");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="forgot-password-page">
      {" "}
      <header className="auth-header">
        <div className="logo-placeholder">
          <img src={Header} alt="RefillXpress Logo" onClick={()=>navigate("/")} />
        </div>
      </header>
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="card-title">Reset Password</h2>
          <p className="card-subtitle">
            Create a new secure password for your account.
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="send-button">
              Reset Password
            </button>
          </form>

          <p className="remember-link">
            Back to <a href="/riderlogin">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
