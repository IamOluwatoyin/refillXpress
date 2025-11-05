import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./forgotPasswordVerifyEmail.css";
import SpinnerModal from "../../vendor-auth/spinner-modal";
import Header from "../../../assets/Header.png";

const ForgotPasswordVerifyEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(120);
  const [isResending, setIsResending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef([]);

  const userEmail = localStorage.getItem("userEmail") || "";
  const API_BASE_URL = "https://refillexpress.onrender.com/api/v1";

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCodeChange = (e, index) => {
    const { value } = e.target;
    if (/[0-9]/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      return toast.error("Please enter the complete 6-digit code.");
    }
    if (!userEmail) {
      return toast.error(
        "Error: User email not found. Please restart the forgot password process."
      );
    }

    setShowModal(true);

    try {
      const payload = { email: userEmail, otp: verificationCode };

      await axios.post(
        `${API_BASE_URL}/rider/verifyForgotPasswordOtp`,
        payload
      );

      toast.success("Verification successful! Redirecting to password reset.");

      setTimeout(() => {
        navigate("/rider/resetpassword");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Verification failed. Please check the code or try resending.";
      toast.error(message);
    } finally {
      setShowModal(false);
    }
  };
  const handleResendCode = async () => {
    if (timer > 0 || isResending) return;
    setIsResending(true);

    try {
      const payload = { email: userEmail };
      await axios.post(
        `${API_BASE_URL}/rider/resendForgotPasswordOtp`,
        payload
      );

      toast.success("New code sent! Check your inbox.");
      setTimer(120);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to resend code.";
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="verify-email-layout">
      <header className="fixed-header">
        <div className="logo-container">
          <img src={Header} alt="RefillXpress Logo" className="logo-image" />
        </div>
      </header>

      <div className="verify-email-page-center">
        <main className="verify-card">
          <div className="verify-title-section">
            <h3 className="card-title">Verify Account</h3>
            <p className="card-subtitle">
              A verification code has been sent to your email address. Please
              enter it to continue
            </p>
          </div>

          <form className="verification-form" onSubmit={handleVerification}>
            <div className="code-input-group">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="code-input"
                  required
                />
              ))}
            </div>

            <button type="submit" className="verify-button">
              Verify
            </button>
          </form>

          <div className="resend-section-footer">
            <span className="resend-text">Didn't receive code? </span>

            {timer > 0 ? (
              <span className="timer-display">
                Resend code in
                <span className="timer-countdown">{formatTime(timer)}</span>
              </span>
            ) : (
              <span
                className="resend-link active-resend-link"
                onClick={handleResendCode}
              >
                Resend code
              </span>
            )}
          </div>
        </main>
      </div>

      {showModal && <SpinnerModal />}
    </div>
  );
};

export default ForgotPasswordVerifyEmail;
