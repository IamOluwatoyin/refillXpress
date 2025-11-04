import React, { useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import "./BankDetails.css";
import { RiBankCardLine } from "react-icons/ri";

const BankDetails = () => {
  const [isAutoPayout, setIsAutoPayout] = useState(true);

  const handleToggle = () => {
    setIsAutoPayout(!isAutoPayout);
  };

  const payouts = [
    { date: "Oct 20, 2024", amount: "₦1250.00" },
    { date: "Oct 13, 2024", amount: "₦980.50" },
    { date: "Oct 6, 2024", amount: "₦1100.25" },
  ];

  return (
    <div className="bank-details-container">
     
      <div className="bank-section">
       
        <h2 className="section-title"> 
          <RiBankCardLine style={{fontSize:"25px"}}/>
          Bank Account Details</h2>

        <div className="input-row">
          <div className="input-group">
            <label>Account Name</label>
            <input value="MaxGas Supply" disabled />
          </div>
          <div className="input-group">
            <label>Bank Name</label>
            <input value="UBA" disabled />
          </div>
        </div>

        <div className="input-group">
          <label>Account Number</label>
          <input value="******8086" disabled />
        </div>

        <div className="payout-toggle">
          <div>
            <p className="toggle-title">Automatic Payouts</p>
            <p className="toggle-subtext">
              Receive automatic weekly payouts to your bank account
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={isAutoPayout}
              onChange={handleToggle}
            />
            <span
              className={`slider ${isAutoPayout ? "active" : ""}`}
            ></span>
          </label>
        </div>

        <div className="update-btn-container">
          <button className="update-btn">Update Banking Info</button>
        </div>
      </div>

    
      <div className="payout-section">
        <h2 className="section-title">
          <FaNairaSign className="icon" /> Recent Payouts
        </h2>

        <div className="payout-list">
          {payouts.map((p, index) => (
            <div key={index} className="payout-item">
              <div className="payout-info">
                <div className="icon-circle">
                  <FaNairaSign />
                </div>
                <div>
                  <p className="payout-date">{p.date}</p>
                  <span className="status">Completed</span>
                </div>
              </div>
              <p className="payout-amount">{p.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
