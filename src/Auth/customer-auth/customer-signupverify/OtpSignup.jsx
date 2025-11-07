import React, { useRef, useState, useEffect } from "react";
import { HiFire } from "react-icons/hi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "../../vendor-auth/spinner-modal";import { resendOtp, verifyUser } from "../../../api/mutation";
;

const UserVerify = () => {
  const nav = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [disableResend, setDisableResend] = useState(false);
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otp = inputRefs.map((ref) => ref.current.value).join("");
    if (otp.length < 6) return toast.error("Please enter all 6 digits");

    const email = localStorage.getItem("email");
    if (!email) return toast.error("Email not found. Please sign up again.");

    try {
      setIsLoading(true);
      const res = await verifyUser({ email, otp });
      toast.success(res.data.message || "Verification successful!");
      localStorage.removeItem("email");
      setTimeout(() => nav("/userlogin"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setDisableResend(true);
    const email = localStorage.getItem("email");

    try {
      await resendOtp({ email });
      toast.success("OTP resent successfully!");
      setTimeLeft(30);
      setTimeout(() => setDisableResend(false), 3000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend OTP");
      setDisableResend(false);
    }
  };

  return (
    <div className="verify">
      <article className="article">
        <header className="form-header" onClick={() => nav("/")}>
          <h6 className="logo-heading">
            <span className="fire"><HiFire /></span>
            Refill<span className="logo-style">Xpress</span>
          </h6>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h1>Verify Account</h1>
            <p>A 6-digit code has been sent to your email. Please enter it below.</p>
          </div>

          <div className="code">
            {inputRefs.map((ref, i) => (
              <input
                key={i}
                ref={ref}
                type="text"
                maxLength="1"
                className="code-box"
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleBackspace(e, i)}
              />
            ))}
          </div>

          <div className="submit-section">
            <button type="submit" className="submit" disabled={isLoading}>
              {isLoading ? <SpinnerModal /> : "Verify"}
            </button>

            {timeLeft > 0 ? (
              <p>Resend code in {timeLeft}s</p>
            ) : (
              <p>
                Didn't get the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={disableResend}
                  className="resend-btn"
                >
                  Resend
                </button>
              </p>
            )}
          </div>
        </form>
      </article>
    </div>
  );
};

export default UserVerify;
