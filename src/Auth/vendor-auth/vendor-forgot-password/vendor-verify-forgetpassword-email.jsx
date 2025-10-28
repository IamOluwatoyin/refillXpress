import React, { useEffect, useState } from "react";
import { Flex, Input, Typography } from "antd";
const { Title } = Typography;
import "./vendor-verify-forgot-password-email.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "../spinner-modal/spinner-modal-auth";
import { useForm, Controller } from "react-hook-form";
import {
  vendorForgotPasswordOtpResend,
  vendorForgotPasswordVerify,
} from "../../../api/mutation";

const VerifyForgetPasswordEmail = () => {
  const [showModal, setShowModal] = useState(false);

  const [timeLeft, setTimeLeft] = useState(60);

  const onChange = (value) => setOtp(value);
  const navigate = useNavigate();
  // const onInput = value => {
  //   console.log('onInput:', value);
  // };
  const sharedProps = {
    onChange,
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { otp: "" } });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const submit = async (data) => {
    setButtonDisabled(true);
    const { otp } = data;
    try {
      const businessEmail = localStorage.getItem("vendorEmail");
      console.log(businessEmail);

      setShowModal(true);

      const res = await vendorForgotPasswordVerify({ businessEmail, otp });

      console.log("verify", res.data.message);

      toast.success("Verified Successfully");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/vendor-reset-password");
      }, 2000);
    } catch (error) {
      console.log("not working", error);

      toast.error(error.response?.data?.message || "Something went wrong!");
      setShowModal(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const resendForgotPasswordOTP = async (e) => {
    e.preventDefault();
    setResendDisabled(true);
    setButtonDisabled(true);
    try {
      const businessEmail = localStorage.getItem("vendorEmail");
      console.log(businessEmail);
      setShowModal(true);
      const res = await vendorForgotPasswordOtpResend({ businessEmail });

      console.log("verify", res.data.message);

      toast.success("OTP resent Successfully");
      setShowModal(true);
      reset({ otp: "" });
      setTimeLeft(60);
      setTimeout(() => {
        setShowModal(false);
        setResendDisabled(false);
        setButtonDisabled(false);
      }, 2000);
    } catch (error) {
      console.log("not working", error);

      toast.error(error.response?.data?.message || "Something went wrong!");
      setShowModal(false);
      setResendDisabled(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div>
      <div className="form-wrapper-verify-forgetpassword">
        <div className="form-container-verify-forgetpassword">
          <header>
            <img src="/src/assets/logo.svg" alt="logo" className="image" />
            <h1>
              Refill<span>Xpress</span>
            </h1>
          </header>
          <section className="cardBodyWrapper-verify-forgetpassword">
            <main className="cardBody-verify-forgetpassword">
              <article>
                <h3> Verify Email</h3>
                <p>
                  A verification code has been sent to your email <br />
                  address.Please enter it to continue
                </p>
              </article>
              <section className="formWrapper-verify-forgetpassword">
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                  onSubmit={handleSubmit(submit)}
                >
                  <Controller
                    name="otp"
                    control={control}
                    rules={{ required: "OTP is required" }}
                    render={({ field }) => (
                      <Input.OTP
                        length={6}
                        value={field.value || ""}
                        onChange={(value) => {
                          field.onChange(value);
                          setButtonDisabled(false);
                        }}
                        style={{
                          display: "flex",
                          gap: "35px",
                          justifyContent: "center",
                        }}
                      />
                    )}
                  />
                  {errors.otp && (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {errors.otp.message}
                    </p>
                  )}

                  <div className="btnHolder">
                    <button
                      className="btn-verify-forgetpassword"
                      type="submit"
                      disabled={buttonDisabled || showModal}
                    >
                      Verify
                    </button>
                  </div>
                  {showModal && <SpinnerModal />}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <span>Didn’t receive code?</span>
                    {timeLeft > 0 ? (
                      <p style={{ cursor: "pointer" }}>
                        Resend code in {timeLeft}
                      </p>
                    ) : (
                      <p
                        onClick={resendForgotPasswordOTP}
                        style={{ color: "#1BB970", cursor: "pointer" }}
                      >
                        Resend Verification
                      </p>
                    )}
                  </div>
                </form>
              </section>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VerifyForgetPasswordEmail;
