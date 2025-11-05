import React, { useEffect, useState } from 'react'
import "./BusinessDocuments.css"
import { FaInfoCircle, FaUpload, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const BusinessDocuments = ({ vendor }) => {
  const [fileData, setFileData] = useState({});
  const [documents, setDocuments] = useState([
    { name: "Business License", key: "businessLicense", status: "Upload" },
    { name: "Tax Registration Certificate", key: "taxRegistrationCertificate", status: "Upload" },
    { name: "National ID / Passport", key: "nationalId", status: "Upload" },
    { name: "Business Insurance", key: "businessInsurance", status: "Upload" },
  ]);

  useEffect(() => {
    if (vendor?.kyc) {
      const updatedDocs = documents.map((doc) => {
        if (vendor.kyc[doc.key]) {
          
          return {
            ...doc,
            status: vendor.kyc.verificationStatus === "verified" ? "Verified" : "Pending",
          };
        }
        return doc;
      });
      setDocuments(updatedDocs);
    }
  }, [vendor]);

  const handleFilesChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileData((prev) => ({
      ...prev,
      [documents[index].key]: file,
    }));

    const updatedDocs = [...documents];
    updatedDocs[index].status = "Pending";
    setDocuments(updatedDocs);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      updatedDocs[index].status = isSuccess ? "Verified" : "Rejected";
      setDocuments([...updatedDocs]);
    }, 1500);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Verified":
        return (
          <span className="statusBadge verified">
            <FaCheckCircle /> Verified
          </span>
        );
      case "Pending":
        return (
          <span className="statusBadge pending">
            <FaClock /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="statusBadge rejected">
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="infoBar">
        <FaInfoCircle />
        <span>
          Upload clear, legible copies of all required documents. Documents are typically verified within 24-48 hours.
        </span>
      </div>

      <div className="uploadSection">
        <h3>Upload Documents</h3>
        <div className="uploadContainer">
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`uploadRow ${doc.status === "Rejected" ? "rejectedRow" : ""}`}
            >
              <div className="uploadLeft">
                <div
                  className={`docBadge ${
                    doc.status === "Verified"
                      ? "uploaded"
                      : doc.status === "Rejected"
                      ? "rejected"
                      : ""
                  }`}
                >
                  <IoDocumentTextOutline style={{ fontSize: "24px" }} />
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
                {renderStatusBadge(doc.status)}

                {doc.status === "Rejected" && (
                  <>
                    <input
                      type="file"
                      id={`file-${index}`}
                      onChange={(e) => handleFilesChange(index, e)}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="uploadSmallBtn reuploadBtn"
                      onClick={() => document.getElementById(`file-${index}`).click()}
                    >
                      <FaUpload /> Reupload
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="verifyBox">
        <FaInfoCircle className="infoIcon" />
        <div>
          <h4>Document Verification Process</h4>
          <ul>
            <li>Documents are typically verified within 24-48 hours</li>
            <li>Ensure all documents are clear and legible</li>
            <li>Documents must be valid and not expired</li>
            <li>You'll receive an email notification once verified</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessDocuments;
