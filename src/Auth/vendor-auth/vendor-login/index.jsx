import React, { useState } from "react";
import "./vendor-login.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import Password from "antd/es/input/Password";
import SpinnerModal from "../spinner-modal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { loginVendor } from "../../../api/mutation";
import VendorDashboardEmpty from "../../../Pages/feature/component/Dashboard/VendorDashboardEmpty";
import KYC from "../../../Pages/feature/component/order/kyc";
import VendorDashboard from "../../../Pages/feature/component/Dashboard/Vendor-Dashboard";

const VendorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      setButtonDisabled(true);
      const response = await loginVendor(data);

      console.log("formData", response);
      localStorage.setItem(
        import.meta.env.VITE_VENDOR_TOKEN,
        response.data.token
      );
      localStorage.setItem(
        import.meta.env.VITE_VENDOR_ID,
        response.data.data.id
      );
      toast.success("Login successfully created");
      setShowModal(true);

      switch (response?.data?.data?.kycStatus) {
        case "pending":
          navigate("/vendor-dashboardEmpty");
          break;
        case "Not submiited":
          navigate("/vendor-kyc");
          break;
        case "rejected":
          navigate("/vendor-kyc");
          break;
        case "verified":
          navigate("/vendor-dashboard");
          break;
        default:
          navigate("/vendor-login");
      }

      setTimeout(() => {
        setShowModal(false);
       
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
      <div className="form-wrapperlogin">
        <div className="form-containerlogin">
          <header onClick={() => navigate("/")}>
            <img src="/Images/logo.svg" alt="logo" className="image" />

            <h1>
              Refill<span>Xpress</span>
            </h1>
          </header>
          <section className="cardBodyWrapperlogin">
            <main className="cardBodylogin">
              <article>
                <h3> Welcome Back</h3>
                <p>let's sign in to your account</p>
              </article>
              <section className="formWrapperlogin">
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
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        width: "100%",
                        background: "#F2F6F5",
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
                    <label> Input Your Password</label>
                    <div
                      style={{
                        padding: "12px 6px",
                        borderRadius: "4px",
                        border: "1px solid #9b9191cc",
                        width: "100%",

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
                  <span style={{ textAlign: "right" }}>
                    <NavLink
                      to={"/vendor-forget-password"}
                      style={{ textDecoration: "none", color: "#1BB970" }}
                    >
                      Forgot password?
                    </NavLink>
                  </span>
                  <button
                    className="btnlogin"
                    type="submit"
                    disabled={showModal || buttonDisabled}
                  >
                    Sign in
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
                      to={"/vendor-signup"}
                      style={{ textDecoration: "none", color: "#1BB970" }}
                    >
                      Signup
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

export default VendorLogin;
