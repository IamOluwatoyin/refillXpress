import React, { useState } from 'react'
import { Flex, Input, Typography } from 'antd';
const { Title } = Typography;
import "./verify-email.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SpinnerModal from '../spinner-modal-auth';
import { vendorEmailVerify, vendorEmailVerifyResend, vendorForgotPasswordVerify } from '../../../api/mutation';


const Verify = () => {
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
 const onChange = (value) => setOtp(value);
 const navigate = useNavigate()
  // const onInput = value => {
  //   console.log('onInput:', value);
  // };
  const sharedProps = {
    onChange,
   
  };

  const submit = async (e) => {
    e.preventDefault()

    try {
      const businessEmail = localStorage.getItem("vendorEmail")
      console.log(businessEmail)
       const res = await vendorEmailVerify({businessEmail,otp})
    console.log("verify",res.data.message)

    toast.success("Verified Successfully");
        setShowModal(true);
    
        setTimeout(() => {
          setShowModal(false);
          navigate("/vendor-login");
        }, 2000);
    
      
    } catch (error) {
       
      console.log("not working",error)

       toast.error(error.response?.data?.message || "Something went wrong!");
       setShowModal(false)
    }
   
   
  }

  const resendEmailOTP = async(e) =>{
    e.preventDefault()
    try {
      const businessEmail = localStorage.getItem("vendorEmail")
       console.log(businessEmail)

        const res = await vendorEmailVerifyResend({businessEmail,otp})

    console.log("verify",res.data.message)

    toast.success("OTP resent Successfully");
        setShowModal(true);
    
        setTimeout(() => {
          setShowModal(false);
          // navigate("/vendor-login");
        }, 2000);
      
    } catch (error) {
      console.log("not working",error)

       toast.error(error.response?.data?.message || "Something went wrong!");
       setShowModal(false)
      
      
    }
  }

  const verifyForgotPasswordOTP = async(e) => {
    e.preventDefault()
   

   try {
     const businessEmail = localStorage.getItem("vendorEmail")
       console.log(businessEmail)

    const res = await vendorForgotPasswordVerify({businessEmail,otp})

      console.log("verify",res.data.message)

    toast.success("OTP resent Successfully");
        setShowModal(true);
    
        setTimeout(() => {
          setShowModal(false);
             }, 2000);

    
   } catch (error) {
    console.log("not working",error)

       toast.error(error.response?.data?.message || "Something went wrong!");
       setShowModal(false)
   }  

  }

  return (
    <div>
      <div className="form-wrapper-verify">
      <div className="form-container-verify">
        <header>
          <img src="/src/assets/logo.svg" alt="logo" className="image" />
          <h1>
            Refill<span>Xpress</span>
          </h1>
        </header>
        <section className="cardBodyWrapper-verify">
          <main className="cardBody-verify">
            <article>
              <h3> Verify Account</h3>
              <p>
                A verification code has been sent to your email <br/>address.Please enter it to continue
              </p>
            </article>
            <section className="formWrapper-verify">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
                onSubmit={submit}
              >
                
            <Input.OTP length={6} {...sharedProps} style={{
                    display: "flex",
                    gap: "35px",
                   justifyContent:"center"
                  }}  />
            
            <div className="btnHolder">
                  <button
                    className="btnpassword"
                    type="submit"
                    
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
                  <p onClick={resendEmailOTP} style={{cursor:"pointer"}}>
                   Resend code in 01:59
                  </p>
            
                </div>
                </form>
                </section>
            
            </main>
            </section>
            </div>
            </div>
    </div>
  )
}

export default Verify
