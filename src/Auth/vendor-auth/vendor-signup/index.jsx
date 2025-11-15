import React, { useState } from "react";
import "./vendor-signup.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import SpinnerModal from "../spinner-modal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupVendor } from "../../../api/mutation";

const VendorSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const submit = async (data) => {
    const { confirmPassword, agree, ...payload } = data;
    setButtonDisabled(true);
    try {
      const response = await signupVendor(payload);
      console.log("formData", response);
      localStorage.setItem("vendorEmail", data.businessEmail);

      toast.success("Account successfully created");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/vendor-verify-email");
      }, 2000);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
      setShowModal(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="form-wrapper">
      <header onClick={() => navigate("/")}>
        <img src="/Images/dashboard_logo.jpg" alt="logo" />
      </header>
      <div className="form-container">
        <section className="cardBodyWrapper">
          <main className="cardBody">
            <article>
              <h3>Sign Up as Vendor</h3>
              <p>
                Join our network of trusted gas refill vendors and connect with
                <br />
                thousands of customers in your area
              </p>
            </article>

            <h4>Business Information</h4>
            <section className="formWrapper">
              <form
                className="formStyle"
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
                  <label> Business Name</label>
                  <input
                    placeholder=" Max gas"
                    type="text"
                    name="businessName"
                    {...register("businessName", {
                      required: "Your business name is required",
                    })}
                    id="vendorName"
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "39.3125rem",
                      background: "#F2F6F5",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  />
                  {errors.businessName && (
                    <p style={{ color: "red" }}>
                      {errors.businessName.message}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label>Business Email</label>
                    <input
                      id="vendorEmail"
                      placeholder="Maxgas@gmail.com"
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
                        padding: "13px 6px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: " 18.875rem",
                        background: "#F2F6F5",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    />
                    {errors.businessEmail && (
                      <p style={{ color: "red" }}>
                        {errors.businessEmail.message}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label>Business Phone Number</label>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        width: "19rem",
                        overflow: "hidden",
                        paddingLeft: "8px",
                        background: "#F2F6F5",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1px",
                        }}
                      >
                        <img src="/Images/ngflag.jpg" />
                      </div>

                      <div
                        style={{
                          height: "40px",
                          width: "1px",
                          backgroundColor: "#000",
                          margin: " 0px 3px",
                        }}
                      ></div>

                      <span>+234</span>

                      <input
                        id="vendorPhoneno"
                        name="businessPhoneNumber"
                        type="text"
                        placeholder="8012345678"
                        {...register("businessPhoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\d+$/,
                            message: "Phone number must contain only digits",
                          },
                          validate: (value) =>
                            value.length === 10 ||
                            value.length === 11 ||
                            "Phone number must be 10 or 11 digits",
                        })}
                        style={{
                          border: "none",
                          outline: "none",
                          padding: "12px 6px",
                          fontSize: "1rem",
                          background: "#F2F6F5",
                        }}
                      />
                    </div>
                    {errors.businessPhoneNumber && (
                      <p style={{ color: "red" }}>
                        {errors.businessPhoneNumber.message}
                      </p>
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
                  <label> Business Address</label>
                  <input
                    type="text"
                    name="businessAddress"
                    {...register("businessAddress", {
                      required: "Business address is required",
                    })}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "39.3125rem",
                      background: "#F2F6F5",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  />
                </div>
                {errors.businessAddress && (
                  <p style={{ color: "red" }}>
                    {errors.businessAddress.message}
                  </p>
                )}

                <h4> Owner's/manager Information</h4>
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
                      name="firstName"
                      {...register("firstName", {
                        required: "Enter your first name",
                      })}
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: " 18.875rem",
                        background: "#F2F6F5",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    />
                    {errors.firstName && (
                      <p style={{ color: "red" }}>{errors.firstName.message}</p>
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
                      id="lastName"
                      type="text"
                      name="lastName"
                      {...register("lastName", {
                        required: "Enter your last name",
                      })}
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: " 18.875rem",
                        background: "#F2F6F5",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    />
                    {errors.lastName && (
                      <p style={{ color: "red" }}>{errors.lastName.message}</p>
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
                      padding: "12px 6px",
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

                <div style={{ display: "flex", gap: "3px" }}>
                  <input
                    type="checkbox"
                    {...register("agree", {
                      required: "You must agree to the terms.",
                    })}
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
                {errors.agree && (
                  <p style={{ color: "red" }}>{errors.agree.message}</p>
                )}
                <button
                  className="btnsignup"
                  type="submit"
                  disabled={showModal || buttonDisabled}
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

export default VendorSignup;
