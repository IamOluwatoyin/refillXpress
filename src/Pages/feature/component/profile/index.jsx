import React, { useState } from "react";
import "./ProfileManagement.css";
import { FaShieldAlt, FaCheck, FaCamera } from "react-icons/fa";

import BusinessInformation from "./BusinessInformation";
import BusinessDetails from "./BusinessDetails";


const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("Profile Info");

  return (
    <div className="profileWrapper">
      <div className="profileheader">
        <div>
         <h2>Profile & Verification</h2>
          <span>Manage your business profile and verification documents</span>
        </div>
        

        <p className="verifiedText">
          <FaShieldAlt style={{color:"#16a34a"}} /> 50% Verified
        </p>
      </div>
      

      {/* Verification Status */}
      <div className="verificationCard">
        <div className="verificationHeader">
          <h4>Verification Status</h4>
        </div>
        <p>
          Complete your profile and upload required documents to get fully
          verified
        </p>

        {/* Badge and Progress */}
        <div className="progressSection">
          <div className="progressContainer">
            <div className="progressFill" style={{ width: "50%" }}></div>
          </div>
        </div>

        <p className="verifiedCount">1 of 4 documents verified</p>
        <FaShieldAlt className="shieldIcon" />
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["Profile Info", "Business Details", "Documents", "Banking"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Personal Information */}
      {activeTab === "Profile Info" && (
      <BusinessInformation/>
      )}
      {activeTab === "Business Details" && (
      <BusinessDetails/>
      )}
      
    </div>
  );
};

export default ProfileManagement;
