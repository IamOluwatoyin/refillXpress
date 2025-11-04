import React from 'react'
 import { MdOutlineFileUpload,MdModeEdit } from "react-icons/md";
const BusinessInformation = () => {
  return (
     <div className="profileCard">
          <div className="profileHeader">
            <h4>Personal Information</h4>
          </div>

          <div className="profilePicSection">
            <div className="profileImageWrapper">
              <div className="profileImagePlaceholder"></div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p>Profile Picture</p>
              <span>Upload a professional photo of yourself</span>
              <button className="uploadBtn">
                <MdOutlineFileUpload style={{ fontSize: "16px" }} />
                Upload Photo
              </button>
            </div>
          </div>

          <div className="formGrid">
            <div className="formRow">
              <div className="formGroup">
                <label>Full Name</label>
                <input type="text" value="Glory Otene" readOnly />
              </div>
              <div className="formGroup">
                <label>Email Address</label>
                <input type="email" placeholder="Enter email" />
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label>Phone Number</label>
                <input type="text" value="+234 706099440" readOnly />
              </div>
              <div className="formGroup">
                <label>Residential Address</label>
                <input type="text" placeholder="Enter address" />
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
