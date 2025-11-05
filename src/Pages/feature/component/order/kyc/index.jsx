import React, { useState } from "react";
import { FaInfoCircle, FaUpload } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./KYC.css";
import ModalKyc from "./kyc-modal";
import { useForm } from "react-hook-form";
import { vendorKycPost } from "../../../../../api/mutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const KYC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [fileData, setFileData] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [documents, setDocuments] = useState([
    { name: "Business License", key: "businessLicense", status: "Upload" },
    {
      name: "Tax Registration Certificate",
      key: "taxRegistrationCertificate",
      status: "Upload",
    },
    { name: "National ID / Passport", key: "nationalId", status: "Upload" },
    { name: "Business Insurance", key: "businessInsurance", status: "Upload" },
  ]);

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
      updatedDocs[index].status = isSuccess ? "Uploaded" : "Rejected";
      setDocuments([...updatedDocs]);
    }, 1500);
  };

  const submit = async (data) => {
    const vendorId = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);
    if (!vendorId) {
      toast.error("Vendor ID not found. Please log in again.");
      return;
    }

    const formData = new FormData();

    Object.entries(fileData).forEach(([key, file]) => {
      formData.append(key, file);
    });

    formData.append("bankAccountName", data.bankAccountName);
    formData.append("bankName", data.bankName);
    formData.append("accountNumber", data.accountNumber);
    setButtonDisabled(true);
    try {
      const response = await vendorKycPost(formData, vendorId);
      console.log("upload response:", response.data);

      toast.success("KYC uploaded successfully!");
      setOpenModal(true);

      switch (response?.data?.data?.verificationStatus) {
        case "pending":
          navigate("/vendor-dashboardEmpty");
          break;
      }
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className={`kycWrapper ${openModal ? "blurred" : ""}`}>
          <div className="kycHeader">
            <h2>Know Your Customer</h2>
            <p>Complete the steps of KYC process to start using our platform</p>
          </div>

          <div className="infoBar">
            <FaInfoCircle />
            <span>
              Upload clear, legible copies of all required documents. Documents
              are typically verified within 24–48 hours.
            </span>
          </div>

          {/* Upload Section */}
          <div className="uploadSection">
            <h3>Upload Documents</h3>
            <div className="uploadContainer">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className={`uploadRow ${
                    doc.status === "Rejected" ? "rejectedRow" : ""
                  }`}
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
                    <input
                      type="file"
                      id={`file-${index}`}
                      onChange={(e) => handleFilesChange(index, e)}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className={`uploadSmallBtn ${
                        doc.status === "Uploaded"
                          ? "uploadedBtn"
                          : doc.status === "Rejected"
                          ? "rejectedBtn"
                          : doc.status === "Pending"
                          ? "pendingBtn"
                          : ""
                      }`}
                      disabled={
                        doc.status === "Pending" || doc.status === "Uploaded"
                      }
                      onClick={() =>
                        doc.status !== "Pending" &&
                        doc.status !== "Uploaded" &&
                        document.getElementById(`file-${index}`).click()
                      }
                    >
                      <FaUpload />{" "}
                      {doc.status === "Uploaded"
                        ? "Uploaded"
                        : doc.status === "Rejected"
                        ? "Reupload"
                        : doc.status === "Pending"
                        ? "Uploading..."
                        : "Upload"}
                    </button>
                    <span>
                      {doc.status === "Rejected"
                        ? "Click to reupload"
                        : "Click to upload"}
                    </span>
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

          {/* Bank Info */}
          <div className="bankSection">
            <p>Provide your account information for payment</p>
            <div className="bankCard">
              <h4>Bank Account Details</h4>
              <div className="formRow">
                <div className="formGroup">
                  <label>Account Name</label>
                  <input
                    type="text"
                    placeholder="Enter account name"
                    {...register("bankAccountName", { required: true })}
                  />
                  {errors.bankAccountName && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      Account name is required
                    </span>
                  )}
                </div>
                <div className="formGroup">
                  <label>Bank Name</label>
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

              <div className="formGroup">
                <label>Account Number</label>
                <input
                  type="text"
                  placeholder="Enter account number"
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

              <div className="toggleRow">
                <span>Automatic Payouts</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    {...register("autoPayouts")}
                    defaultChecked
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="submitContainer">
            <button
              className="submitBtn"
              type="submit"
              disabled={openModal || buttonDisabled}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {openModal && <ModalKyc onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default KYC;
