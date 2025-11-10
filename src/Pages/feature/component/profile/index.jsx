import React, { useEffect, useState } from "react";
import "./ProfileManagement.css";
import { FaShieldAlt, FaCheck, FaCamera } from "react-icons/fa";

import BusinessInformation from "./BusinessInformation";
import BusinessDetails from "./BusinessDetails";
import BankDetails from "./BankDetails";
import BusinessDocuments from "./BusinessDocuments";
import { getVendorKyc } from "../../../../api/query";
import { toast } from "react-toastify";


const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("Profile Info");
 const [kycData, setKycData] = useState()

 const id = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);
  

 useEffect(() => { 
  const fetchVendorKycData = async() => {
    try {
      const response = await getVendorKyc(id);
      setKycData(response?.data);
      console.log("kycsingle", response.data);
    } catch (error) {
      console.log("no kyc", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  }; 
  fetchVendorKycData();
}, []);


  return (
    <div className="profileWrapper">
      <div className="profileheader">
        <div>
         <h2>Profile & Verification</h2>
          <span>Manage your business profile and verification documents</span>
        </div>
        

       <p className="verifiedText">
  <FaShieldAlt
    style={{
      color: kycData?.data?.kyc?.verificationStatus === "verified" ? "#16a34a" : "#facc15",
    }}
  />{" "}
  {kycData?.data?.kyc?.verificationStatus === "verified" ? "Verified" : "Pending Verification"}
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
    <div
      className="progressFill"
      style={{
        width: kycData?.data?.kyc?.verificationStatus === "verified" ? "100%" : "50%",
      }}
    ></div>
  </div>
</div>

<p className="verifiedCount">
  {kycData?.data?.kyc?.verificationStatus === "verified"
    ? "4 of 4 documents verified"
    : "2 of 4 documents verified"}
</p>

        <FaShieldAlt className="shieldIcon" />
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["Profile Info", "Business Details", "Documents", "Banking"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "actived" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

    {activeTab === "Profile Info" && (
  <BusinessInformation vendor={kycData?.data} />
)}
{activeTab === "Business Details" && (
  <BusinessDetails vendor={kycData?.data} />
)}
{activeTab === "Documents" && (
  <BusinessDocuments vendor={kycData?.data} />
)}
{activeTab === "Banking" && (
  <BankDetails vendor={kycData?.data?.kyc} />
)}

    </div>
  );
};

export default ProfileManagement;
