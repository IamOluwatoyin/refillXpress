import React, { useState } from "react";
import { FaInfoCircle, FaUpload } from "react-icons/fa";
import "./KYC.css";
import { IoDocumentTextOutline } from "react-icons/io5"
import ModalKyc from "./kyc-modal";

const KYC = () => {
  const [openModal, setOpenModal] = useState(false)
  const documents = [
    { name: "Business License", status: "Uploaded" },
    { name: "Tax Registration Certificat", status: "Uploaded" },
    { name: "National ID / Passport", status: "Pending" },
    { name: "Business Certificate", status: "Rejected" }, 
  ];

  return (
  <>
  {/* {openModal && <div className="overlay"></div>} */}
 <div className={`kycWrapper ${openModal ? "blurred" : ""}`}>
      <div className="kycWrapper">
      {/* Header */}
      <div className="kycHeader">
        <h2>Know Your Customer</h2>
        <p>Complete the steps of KYC process to start using our platform</p>
      </div>

      {/* Info Bar */}
      <div className="infoBar">
        <FaInfoCircle />
        <span>
          Upload clear, legible copies of all required documents. Documents are typically verified within 24–48 hours.
        </span>
      </div>

      {/* Upload Section */}
       <div className="uploadSection">
      <h3>Upload Documents</h3>
      <div className="uploadContainer">
        {documents.map((doc, index) => (
          <div
            className={`uploadRow ${
              doc.status === "Rejected" ? "rejectedRow" : ""
            }`}
            key={index}
          >
            <div className="uploadLeft">
              <div
                className={`docBadge ${
                  doc.status === "Uploaded"
                    ? "uploaded"
                    : doc.status === "Rejected"
                    ? "rejected"
                    : ""
                }`}
              >
                <IoDocumentTextOutline style={{fontSize:"24px"}} />
              </div>
              <div>
                <p className="docName">{doc.name}</p>
                <span>Required for account verification</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "flex-end",
              }}
            >
              <button
                className={`uploadSmallBtn ${
                  doc.status === "Uploaded"
                    ? "uploadedBtn"
                    : doc.status === "Rejected"
                    ? "rejectedBtn"
                    : ""
                }`}
              >
                <FaUpload />{" "}
                {doc.status === "Uploaded"
                  ? "Uploaded"
                  : doc.status === "Rejected"
                  ? "Reupload"
                  : "Upload"}
              </button>
              <span>click to upload</span>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Verification Info */}
      <div className="verifyBox">
        <FaInfoCircle className="infoIcon" />
        <div>
          <h4>Document Verification Process</h4>
          <ul>
            <li>Documents are typically verified within 24–48 hours</li>
            <li>Ensure all documents are clear and legible</li>
            <li>Documents must be valid and not expired</li>
            <li>You’ll receive an email notification once verified</li>
          </ul>
        </div>
      </div>

      {/* Bank Info */}
      <div className="bankSection">
        <p>Provide your account information for payment</p>
        <div className="bankCard">
          <h4>Bank Account Details</h4>
          <div className="formRow">
            <div className="formGroup">
              <label>Account Name</label>
              <input type="text" placeholder="Enter account name" />
            </div>
            <div className="formGroup">
              <label>Bank Name</label>
              <input type="text" placeholder="Enter bank name" />
            </div>
          </div>

          <div className="formGroup">
            <label>Account Number</label>
            <input type="text" placeholder="Enter account number" />
          </div>

          <div className="toggleRow">
            <span>Automatic Payouts</span>
            <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="submitContainer">
        <button className="submitBtn" onClick={() => setOpenModal(true)}>Submit</button>
      </div>
    </div>
  </div>
   

      {openModal && <ModalKyc onClose={() => setOpenModal(false)} />}
  </>
  );
};

export default KYC;

