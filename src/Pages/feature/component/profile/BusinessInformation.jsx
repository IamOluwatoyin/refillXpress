import React, { useState } from 'react'
 import { MdOutlineFileUpload,MdModeEdit } from "react-icons/md";
import { vendorUploadPic } from '../../../../api/mutation';
const BusinessInformation = ({vendor}) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
  
    setProfileImage(preview);
    const handlePicture = async () => {
      try {
        const res = await vendorUploadPic()

      } catch (error) {
        console.log("not working", error)
      }
    }
    
  };

  
  return (
     <div className="profileCard">
          <div className="profileHeader">
            <h4>Personal Information</h4>
          </div>

         <div className="profilePicSection">
        <div className="profileImageWrapper">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="profileImagePlaceholder"
            />
          ) : (
            <div className="profileImagePlaceholder"></div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>Profile Picture</p>
          <span>Upload a professional photo of yourself</span>
          <label htmlFor="profileUpload" className="uploadBtn">
            <MdOutlineFileUpload style={{ fontSize: "16px" }} />
            Upload Photo
          </label>
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
      </div>

          <div className="formGrid">
            <div className="formRow">
              <div className="formGroup">
                <label>Full Name</label>
                <input
                    type="text"
                    value={`${vendor?.firstName || ""} ${vendor?.lastName || ""}`}
                    readOnly
                  />
              </div>
              <div className="formGroup">
                <label>Email Address</label>
                 <input
              type="email"
              value={vendor?.businessEmail || ""}
              readOnly
               className="faint-input"
              
            />
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label>Phone Number</label>
                <input type="text"value={vendor?.businessPhoneNumber || ""} readOnly />
              </div>
              <div className="formGroup">
                <label>Residential Address</label>
               <input
                    type="text"
                    value={vendor?.residentialAddress || ""}
                    readOnly
                  />
              </div>
            </div>
          </div>

          <div className="saveSection">
            <button className="saveBtn">Save Changes</button>
          </div>
        </div>
  )
}

export default BusinessInformation
