import React from 'react'
import { useForm } from 'react-hook-form'
import "./BusinessDetails.css"

const BusinessDetails = ({vendor}) => {
  const {register, handleSubmit, formState: {errors}} = useForm()
  return (
    <div>
      <div className="bankSection">
              <div className="businessCard">
                <h4>Business Information</h4>
                <div className="firstColumn">
                  <div className="businessGroup">
                    <label>Business Name</label>
                    <input
                      type="text"
                     value={vendor?.businessName}
                      {...register("bankAccountName", { required: true })}
                    />
                    {errors.businessName && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        Business name is required
                      </span>
                    )}
                  </div>
                  <div className="businessGroup">
                    <label>Phone Number</label>
                    <input
                      type="text"
                     value={vendor?.businessPhoneNumber || ""}
                      {...register("businessPhoneNumber", { required: true })}
                    />
                    {errors.bankName && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        Phone number is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="businessGroup">
                  <label>Email Address</label>
                  <input
                    type="text"
                    readOnly
                    className="faint-input"
                    value={vendor?.businessEmail || ""}
                    {...register("businessEmailr", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                  />
                  {errors.businessEmail && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      Enter a valid email address
                    </span>
                  )}
                </div>

                
                <div className="businessGroup">
                  <label>Business Address</label>
                  <input
                    type="text"
                     value={vendor?.businessAddress || ""}
                    {...register("businessAddres", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                  />
                  {errors.businessAddres && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                     Business Address is required
                    </span>
                  )}
                </div>


               
              </div>
            </div>

            <div className="business-submitContainer">
              <button className="business-submitBtn">
                Save Changes
              </button>
            </div>
    </div>
  )
}

export default BusinessDetails
