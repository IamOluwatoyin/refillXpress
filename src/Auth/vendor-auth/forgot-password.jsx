import React, { useState } from "react";
import { NavLink } from "react-router";
import "./forgot-password.css";
import { toast } from "react-toastify";
import SpinnerModal from "./spinner-modal-auth";
const ForgotPassword = () => {
  const [forgotPassword, setForgotPassword] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validate = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!/\S+@\S+\.\S+/.test(forgotPassword.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Enter a valid email");
      setShowModal(false)
      return;
    }
    toast.success("Verification code has been sent to your email");
    setShowModal(true)
    setForgotPassword({ email: "" });
  };
  return (
    <div className="form-wrapperpassword">
      <div className="form-containerpassword">
        <header>
          <img src="/src/assets/logo.svg" alt="logo" className="image" />

          <h1>
            Refill<span>Xpress</span>
          </h1>
        </header>
        <section className="cardBodyWrapperpassword">
          <main className="cardBodypassword">
            <article>
              <h3> Forgot Password</h3>
              <p>
                Don’t worry, it happens! Enter your email address,
                <br />
                and we’ll send you a code to reset your password.
              </p>
            </article>

            <section className="formWrapperpassword">
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
                    gap: "15px",
                  }}
                >
                  <label>Email Address</label>
                  <input
                    id="vendorEmail"
                    placeholder="Your email here..."
                    type="email"
                    name="email"
                    value={forgotPassword.email}
                    onChange={(e) =>
                      setForgotPassword({
                        ...forgotPassword,
                        email: e.target.value,
                      })
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
                <div className="btnHolder">
                  <button
                    className="btnpassword"
                    type="submit"
                    onClick={() => setShowModal(true)}
                  >
                    Send Verification code
                  </button>
                </div>
                {showModal && <SpinnerModal />}

                <div
                  style={{
                    display: "flex",
                    gap: "3px",
                    justifyContent: "center",
                  }}
                >
                  <span>Remeber Password?</span>
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

export default ForgotPassword;
