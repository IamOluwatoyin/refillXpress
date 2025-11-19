import React, { useState } from "react";
import "./vendor-login.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import SpinnerModal from "../spinner-modal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { loginVendor } from "../../../api/mutation";

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

      // localStorage.setItem("role", "vendor");

      toast.success("Login successfully created");
      const user = response?.data?.data;

    //   if (
    //   error?.response?.data?.message ===
    //   "Vendor not verified, please verify your account"
    // ) {
    //   navigate("/vendor-verify-email");
    //   return; 
    // }

      if (user.showKycPage === true || user.showKycPage ==="not submitted") {
        // KYC not submitted or pending
        navigate("/vendor-kyc");
      } else if (user.showKycPage === false && user.kycStatus === "verified") {
       
        if (user.isNewUser === true) {
          navigate("/vendor-dashboard/vendor-settings"); // Setup page for new users
        } else {
          navigate("/vendor-dashboard");
        }
      } else {
        navigate("/vendor-dashboard");
      }
      setShowModal(true);

    
        setShowModal(false);
    
    } catch (error) {
      console.log("not working", error);
if (
      error.response?.data?.message ===
      "Vendor not verified, please verify your account"
    ) {
      navigate("/vendor-verify-email");
    } else {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    }
  };
  return (
    <>
      <div className="form-wrapperlogin">
        <header onClick={() => navigate("/")}>
          <img src="/Images/dashboard_logo.jpg" alt="logo" />
        </header>
        <div className="form-containerlogin">
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
