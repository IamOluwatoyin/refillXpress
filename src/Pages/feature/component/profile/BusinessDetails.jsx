import React from 'react'
import { useForm } from 'react-hook-form'
import "./BusinessDetails.css"

const BusinessDetails = () => {
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
                      placeholder="Max gas"
                      {...register("bankAccountName", { required: true })}
                    />
                    {errors.bankAccountName && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        Account name is required
                      </span>
                    )}
                  </div>
                  <div className="businessGroup">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter bank name"
                      {...register("bankName", { required: true })}
                    />
                    {errors.bankName && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        Bank name is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="businessGroup">
                  <label>Email Address</label>
                  <input
                    type="text"
                    placeholder="Maxgas@gmail.com"
                    {...register("accountNumber", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                  />
                  {errors.accountNumber && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      Enter a valid 10-digit account number
                    </span>
                  )}
                </div>

                
                <div className="businessGroup">
                  <label>Business Address</label>
                  <input
                    type="text"
                    placeholder="No 1 salau street Magodo"
                    {...register("accountNumber", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                  />
                  {errors.accountNumber && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      No 1 salau street Magodo
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
