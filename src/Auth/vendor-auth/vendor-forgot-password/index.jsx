import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./forgot-password.css";
import { toast } from "react-toastify";
import SpinnerModal from "../spinner-modal";
import { useForm } from "react-hook-form";
import { vendorForgotPassword } from "../../../api/mutation";
const VendorForgotPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submit = async (data) => {
    // e.preventDefault()
    setButtonDisabled(true);
    const businessEmail = localStorage.setItem(
      "vendorEmail",
      data.businessEmail
    );
    console.log(businessEmail);

    try {
      const res = await vendorForgotPassword(data);
      console.log("forgot", res.data.message);

      toast.success("Verification code has been sent to your email");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/vendor-forget-password-verify");
      }, 2000);
    } catch (error) {
      console.log("not working", error);

      toast.error(error.response?.data?.message || "Something went wrong!");
      setShowModal(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="form-wrapperpassword">
      <div className="form-containerpassword">
        <header onClick={()=>navigate("/")}>
          <img src="/Images/logo.svg" alt="logo" className="image"  />

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
                onSubmit={handleSubmit(submit)}
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
                    name="businessEmail"
                    {...register("businessEmail", {
                      required: "email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email address",
                      },
                    })}
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      width: "39.3125rem",
                      background: "#F2F6F5",
                    }}
                  />
                  {errors.businessEmail && (
                    <p style={{ color: "red" }}>
                      {errors.businessEmail.message}
                    </p>
                  )}
                </div>
                <div className="btnHolder">
                  <button
                    className="btnpassword"
                    type="submit"
                    disabled={showModal || buttonDisabled}
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
                    to={"/vendor-login"}
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

export default VendorForgotPassword;
