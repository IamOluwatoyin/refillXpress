import React, { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SpinnerModal from "../spinner-modal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { vendorResetPassword } from "../../../api/mutation";
import "./vendor-reset-password.css";

const VendorResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const submit = async (data) => {
    try {
      setButtonDisabled(true);
      const businessEmail = localStorage.getItem("vendorEmail");
      console.log("vendorEmail");
      const apiData = {
        businessEmail,
        newPassword: data.password,
      };
      setShowModal(true);

      const res = await vendorResetPassword(apiData);

      console.log("verify", res.data.message);

      toast.success("Reset password successfully");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/vendor-login");
      }, 2000);
    } catch (error) {
      console.log("not working", error);

      toast.error(error.response?.data?.message || "Something went wrong!");
      setShowModal(false);
      setButtonDisabled(false);
    }
  };
  return (
    <>
      <div className="form-wrapperReset">
        <div className="form-containerReset">
          <header>
            <img src="/src/assets/logo.svg" alt="logo" className="image" onClick={()=>navigate("/")} />

            <h1>
              Refill<span>Xpress</span>
            </h1>
          </header>
          <section className="cardBodyWrapperReset">
            <main className="cardBodyReset">
              <article>
                <h3> Reset Password</h3>
                <p>
                  Enter a new password for your account. Make <br /> sure it’s
                  strong and easy for you
                  <br /> to remember.
                </p>
              </article>
              <section className="formWrapperReset">
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
                      gap: "5px",
                    }}
                  >
                    <label> Input Your Password</label>
                    <div
                      style={{
                        padding: "12px 6px",
                        borderRadius: "4px",
                        border: "1px solid #9b9191cc",
                        width: "39.3125rem",

                        background: "#F2F6F5",
                      }}
                    >
                      <input
                        placeholder=" Password ( 8 or more characters)"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                            message:
                              "Password must be at least 8 characters and include letters, numbers, and special characters.",
                          },
                        })}
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
                    <p style={{ color: "red" }}>{errors.password.message}</p>
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
                        padding: "12px 6px",
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
                        {...register("confirmPassword", {
                          required: "Password confirmation is required",
                          validate: (value) =>
                            value === password || "Passwords do not match.",
                        })}
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
                    <p style={{ color: "red" }}>
                      {errors.confirmPassword.message}
                    </p>
                  )}

                  <button
                    className="btnReset"
                    type="submit"
                    disabled={showModal || buttonDisabled}
                  >
                    Reset Password
                  </button>
                  {showModal && <SpinnerModal />}
                  <div
                    style={{
                      display: "flex",
                      gap: "3px",
                      justifyContent: "center",
                    }}
                  >
                    <span>Remember password?</span>
                    <NavLink
                      to={"/vendor-login"}
                      style={{ textDecoration: "none", color: "#1BB970" }}
                    >
                      Signin
                    </NavLink>
                  </div>
                </form>
              </section>
            </main>
          </section>
        </div>
      </div>
    </>
  );
};

export default VendorResetPassword;
