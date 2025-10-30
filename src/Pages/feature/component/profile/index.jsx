import React, { useState } from "react";
import "./ProfileManagement.css";
import { FaShieldAlt, FaCheck, FaCamera } from "react-icons/fa";

const ProfileManagement = () => {
const [activeTab, setActiveTab] = useState("Profile Info");

return (
  
  
  <div className="profileWrapper"> 
  <div className="header"> 
    <h2>Profile & Verification</h2> <p>Manage your business profile and verification documents</p> </div>
  {/* Verification Status */}
  <div className="verificationCard">
    <div className="verificationHeader">
      <h4>Verification Status</h4>
      <span className="verifiedText">
        <FaCheck /> 50% Verified
      </span>
    </div>
    <p>
      Complete your profile and upload required documents to get fully
      verified
    </p>

    {/* Badge + Progress */}
    <div className="progressSection">
      <div className="progressBadge">50%</div>
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
    <div className="profileCard">
      <div className="profileHeader">
        <h4>Personal Information</h4>
        <button className="saveTop">Save</button>
      </div>

      <div className="profilePicSection">
        <div className="profileImageWrapper">
          <div className="profileImagePlaceholder"></div>
          <div className="editIcon">
            <FaCamera />
          </div>
        </div>
        <div>
          <p>Profile Picture</p>
          <span>Upload a professional photo of yourself</span>
          <button className="uploadBtn">Upload Photo</button>
        </div>
      </div>

      <div className="formGrid">
        <div className="formGroup">
          <label>Full Name</label>
          <input type="text" value="Glory Otene" readOnly />
        </div>
        <div className="formGroup">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email" />
        </div>
        <div className="formGroup">
          <label>Phone Number</label>
          <input type="text" value="+234 706099440" readOnly />
        </div>
        <div className="formGroup">
          <label>Residential Address</label>
          <input type="text" placeholder="Enter address" />
        </div>
      </div>

      <div className="saveSection">
        <button className="saveBtn">Save Changes</button>
      </div>
    </div>
  )}
</div>

);
};

export default ProfileManagement;
