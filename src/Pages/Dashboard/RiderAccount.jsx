/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdCloudUpload, MdClose } from "react-icons/md";
import { FaLandmark } from "react-icons/fa";
import {
  BsFileEarmarkCheckFill,
  BsFileEarmarkTextFill,
  BsFileEarmarkExcelFill,
  BsFileEarmarkMinusFill,
} from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "../../styles/riderAccount.css";

const InputField = ({
  label,
  value,
  onChange,
  readOnly = false,
  halfWidth = false,
  placeholder = "",
}) => (
  <div className={`form_group ${halfWidth ? "half_width" : ""}`}>
    <label className="input_label">{label}</label>
    <input
      type="text"
      className="text_input"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  </div>
);

const UploadModal = ({ isOpen, documentType, onClose, onUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h2 className="modal_title">Upload {documentType}</h2>
          <button
            className="modal_close_btn"
            onClick={onClose}
            disabled={loading}
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="modal_body">
          <div
            className={`upload_drop_zone ${dragActive ? "active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="file_input_hidden"
              onChange={handleFileSelect}
              accept="image/*,.pdf"
              disabled={loading}
            />
            <MdCloudUpload size={48} className="upload_icon" />
            <p className="upload_main_text">Drag and drop your file here</p>
            <p className="upload_sub_text">or</p>
            <button
              className="btn_browse_files"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              Browse Files
            </button>
            <p className="upload_hint">
              Supported formats: PDF, JPG, PNG (Max 10MB)
            </p>
          </div>

          <div className="modal_requirements">
            <h4 className="requirements_title">Requirements:</h4>
            <ul className="requirements_list">
              <li>Document must be clear and legible</li>
              <li>All four corners must be visible</li>
              <li>File size should not exceed 10MB</li>
              <li>Document must not be expired</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const BankAccountDetails = ({ formData, onInputChange, loading }) => (
  <div className="bank_details_card">
    <div className="card_header">
      <div className="header_icon_text">
        <FaLandmark size={18} color="#555" />
        <h3 className="section_title_card">Bank Account Details</h3>
      </div>
    </div>

    <div className="banking_info_grid">
      <InputField
        label="Account Name"
        value={formData.accountName}
        onChange={(e) => onInputChange("accountName", e.target.value)}
        halfWidth={true}
      />
      <InputField
        label="Bank Name"
        value={formData.bankName}
        onChange={(e) => onInputChange("bankName", e.target.value)}
        halfWidth={true}
      />
    </div>

    <div className="account_number_field">
      <InputField
        label="Account Number"
        value={formData.accountNumber}
        onChange={(e) => onInputChange("accountNumber", e.target.value)}
      />
    </div>

    <div className="automatic_payouts">
      <div className="payouts_text">
        <h4 className="payouts_title">Automatic Payouts</h4>
        <p className="payouts_subtitle">
          Receive automatic weekly payouts to your bank account
        </p>
      </div>
      <label className="switch">
        <input type="checkbox" defaultChecked disabled={loading} />
        <span className="slider round"></span>
      </label>
    </div>
  </div>
);

const RecentPayouts = () => {
  const payouts = [
    { date: "Oct 20, 2024", amount: "₦1,250.00", status: "Completed" },
    { date: "Oct 13, 2024", amount: "₦980.50", status: "Completed" },
    { date: "Oct 6, 2024", amount: "₦1,100.25", status: "Completed" },
  ];

  return (
    <div className="recent_payouts_card">
      <h3 className="section_title_card recent_payouts_title">
        Recent Payouts
      </h3>
      <div className="payouts_list">
        {payouts.map((payout, index) => (
          <div key={index} className="payout_item">
            <div className="payout_icon_wrapper">
              <span role="img" aria-label="Nigerian Naira">
                ₦
              </span>
            </div>
            <div className="payout_details">
              <p className="payout_date">{payout.date}</p>
              <p className="payout_status completed">{payout.status}</p>
            </div>
            <p className="payout_amount">{payout.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DocumentItem = ({ icon: Icon, title, date, status, onUploadClick }) => {
  let statusClass = "";
  let statusText = "";

  if (status === "Verified") {
    statusClass = "status_verified";
    statusText = "Verified";
  } else if (status === "Pending") {
    statusClass = "status_pending";
    statusText = "Pending review";
  } else if (status === "Rejected") {
    statusClass = "status_rejected";
    statusText = "Rejected";
  }

  return (
    <div className="document_item">
      <div className="doc_info">
        <Icon size={24} className={`doc_icon ${statusClass}`} />
        <div className="doc_text">
          <p className="doc_title">{title}</p>
          <p className="doc_date">Uploaded: {date}</p>
        </div>
      </div>
      <div className="doc_actions">
        <div className={`doc_status ${statusClass}`}>{statusText}</div>
        <button className="btn_reupload" onClick={onUploadClick}>
          <MdCloudUpload size={18} />{" "}
          {status === "Rejected"
            ? "Re-upload"
            : status === "Verified"
            ? "Re-upload"
            : "Upload"}
        </button>
      </div>
    </div>
  );
};

const DocumentsSection = ({
  formData,
  onFileChange,
  loading,
  onUploadClick,
}) => {
  const documents = [
    {
      icon: BsFileEarmarkCheckFill,
      title: "Driver's License",
      date: "2025-01-15",
      status: "Verified",
      key: "driversLicense",
    },
    {
      icon: BsFileEarmarkCheckFill,
      title: "Vehicle Registration",
      date: "2025-01-15",
      status: "Verified",
      key: "vehicleRegistration",
    },
    {
      icon: BsFileEarmarkTextFill,
      title: "National ID / Passport",
      date: "2025-01-15",
      status: "Pending",
      key: "ownerIdCard",
    },
    {
      icon: BsFileEarmarkMinusFill,
      title: "Utility Bill",
      date: "2025-10-20",
      status: "Rejected",
      key: "utilityBill",
    },
  ];

  return (
    <div className="documents_section">
      <div className="doc_alert">
        <AiOutlineInfoCircle size={18} />
        <p>
          Upload clear, legible copies of all required documents. Documents are
          typically verified within 24-48 hours
        </p>
      </div>

      <h3 className="section_title_documents">Your Documents</h3>
      <div className="document_list">
        {documents.map((doc, index) => (
          <DocumentItem
            key={index}
            icon={doc.icon}
            title={doc.title}
            date={doc.date}
            status={doc.status}
            onUploadClick={() => onUploadClick(doc.title, doc.key)}
          />
        ))}
      </div>

      <div className="doc_verification_process">
        <div className="doc_verification_header">
          <AiOutlineInfoCircle size={20} color="#3498db" />
          <h4 className="doc_verification_title">
            Document Verification Process
          </h4>
        </div>
        <ul className="verification_list">
          <li>Documents are typically verified within 24-48 hours</li>
          <li>Ensure all documents are clear and legible</li>
          <li>Documents must be valid and not expired</li>
          <li>You'll receive an email notification once verified</li>
        </ul>
      </div>
    </div>
  );
};

const RiderAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [uploadModal, setUploadModal] = useState({
    isOpen: false,
    documentType: "",
    documentKey: "",
  });

  const [formData, setFormData] = useState({
    fullName: "Glory Otene",
    email: "",
    phoneNumber: "+234 706099440",
    residentialAddress: "",
    accountName: "MaxGas Supply",
    bankName: "UBA",
    accountNumber: "******8086",
    driversLicense: null,
    vehicleRegistration: null,
    ownerIdCard: null,
    utilityBill: null,
  });

  useEffect(() => {
    const fetchRiderData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const riderId = localStorage.getItem("riderId");

        if (!token || !riderId) {
          console.log("[v0] Missing token or riderId");
          setDataLoaded(true);
          setLoading(false);
          return;
        }

        console.log("[v0] Fetching rider data for ID:", riderId);
        const response = await axios.get(
          `https://refillexpress.onrender.com/api/v1/rider/${riderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("[v0] Rider data fetched:", response.data);
        const riderData = response.data.data || response.data;

        setFormData((prev) => ({
          ...prev,
          fullName: riderData.fullName || prev.fullName,
          email: riderData.email || prev.email,
          phoneNumber: riderData.phoneNumber || prev.phoneNumber,
          residentialAddress:
            riderData.residentialAddress || prev.residentialAddress,
          accountName: riderData.accountName || prev.accountName,
          bankName: riderData.bankName || prev.bankName,
          accountNumber: riderData.accountNumber || prev.accountNumber,
        }));

        setDataLoaded(true);
      } catch (err) {
        console.error("[v0] Error fetching rider data:", err);
        setError(err.response?.data?.message || "Failed to load rider data");
        setDataLoaded(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRiderData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setMessage("");
    setError("");
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
    setMessage("");
    setError("");
    setUploadModal({ isOpen: false, documentType: "", documentKey: "" });
  };

  const handleOpenUploadModal = (documentType, documentKey) => {
    setUploadModal({
      isOpen: true,
      documentType,
      documentKey,
    });
  };

  const handleCloseUploadModal = () => {
    setUploadModal({ isOpen: false, documentType: "", documentKey: "" });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const token = localStorage.getItem("authToken");
      const riderId = localStorage.getItem("riderId");

      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      if (!riderId) {
        setError("Rider ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("residentialAddress", formData.residentialAddress);
      form.append("accountName", formData.accountName);
      form.append("bankName", formData.bankName);
      form.append("accountNumber", formData.accountNumber);

      if (formData.driversLicense) {
        form.append("driversLicense", formData.driversLicense);
      }
      if (formData.vehicleRegistration) {
        form.append("vehicleRegistration", formData.vehicleRegistration);
      }
      if (formData.ownerIdCard) {
        form.append("ownerIdCard", formData.ownerIdCard);
      }
      if (formData.utilityBill) {
        form.append("utilityBill", formData.utilityBill);
      }

      console.log("[v0] Making API call with riderId:", riderId);
      const response = await axios.patch(
        `https://refillexpress.onrender.com/api/v1/rider/${riderId}/accountUpdate`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("[v0] API Response:", response.data);

      const updatedData = response.data.data || response.data;
      setFormData((prev) => ({
        ...prev,
        fullName: updatedData.fullName || prev.fullName,
        email: updatedData.email || prev.email,
        phoneNumber: updatedData.phoneNumber || prev.phoneNumber,
        residentialAddress:
          updatedData.residentialAddress || prev.residentialAddress,
        accountName: updatedData.accountName || prev.accountName,
        bankName: updatedData.bankName || prev.bankName,
        accountNumber: updatedData.accountNumber || prev.accountNumber,
        driversLicense: updatedData.kyc?.driversLicense || prev.driversLicense,
        vehicleRegistration:
          updatedData.kyc?.vehicleRegistration || prev.vehicleRegistration,
        ownerIdCard: updatedData.kyc?.ownerIdCard || prev.ownerIdCard,
        utilityBill: updatedData.kyc?.utilityBill || prev.utilityBill,
      }));

      // Persist the updated data to localStorage
      localStorage.setItem("riderData", JSON.stringify(updatedData));

      setMessage("✓ Account updated successfully!");
    } catch (err) {
      console.error("[v0] Error updating account:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while updating your account";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="personal_info_section">
            <div className="section_header">
              <h3 className="section_title">Personal Information</h3>
            </div>

            <div className="profile_picture_area">
              <div className="profile_avatar_wrapper">
                <div className="profile_avatar"></div>
                <button className="btn_edit_avatar" disabled={loading}>
                  <MdEdit size={16} />
                </button>
              </div>
              <div className="profile_upload_info">
                <p className="upload_text">Profile Picture</p>
                <p className="upload_subtitle">
                  Upload a professional photo of yourself
                </p>
              </div>
            </div>

            <div className="personal_info_grid">
              <InputField
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
              <InputField
                label="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="e.g., gloryoteno@mail.com"
              />
              <InputField
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
              <InputField
                label="Residential Address"
                value={formData.residentialAddress}
                onChange={(e) =>
                  handleInputChange("residentialAddress", e.target.value)
                }
                placeholder="e.g., 24, Main Street, Lagos"
              />
            </div>

            {message && <div className="success_message">{message}</div>}
            {error && <div className="error_message">{error}</div>}

            <div className="save_changes_footer">
              <button
                className="btn_save_changes_orange"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        );
      case "documents":
        return (
          <>
            <DocumentsSection
              formData={formData}
              onFileChange={handleFileChange}
              loading={loading}
              onUploadClick={handleOpenUploadModal}
            />
            {message && <div className="success_message">{message}</div>}
            {error && <div className="error_message">{error}</div>}

            <div className="save_changes_footer">
              <button
                className="btn_save_changes_orange"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <UploadModal
              isOpen={uploadModal.isOpen}
              documentType={uploadModal.documentType}
              onClose={handleCloseUploadModal}
              onUpload={(file) =>
                handleFileChange(uploadModal.documentKey, file)
              }
              loading={loading}
            />
          </>
        );
      case "banking":
        return (
          <>
            <BankAccountDetails
              formData={formData}
              onInputChange={handleInputChange}
              loading={loading}
            />
            <RecentPayouts />
            {message && <div className="success_message">{message}</div>}
            {error && <div className="error_message">{error}</div>}

            <div className="save_changes_footer">
              <button
                className="btn_save_changes_orange"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rider_account_page">
      <h1 className="page_title">Settings</h1>
      <p className="page_subtitle">Manage your account and preferences</p>

      <div className="account_tabs_wrapper">
        <div
          className={`account_tab ${
            activeTab === "profile" ? "active_account_tab" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </div>
        <div
          className={`account_tab ${
            activeTab === "documents" ? "active_account_tab" : ""
          }`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </div>
        <div
          className={`account_tab ${
            activeTab === "banking" ? "active_account_tab" : ""
          }`}
          onClick={() => setActiveTab("banking")}
        >
          Banking
        </div>
      </div>

      <div className="account_content">{renderContent()}</div>
    </div>
  );
};

export default RiderAccount;
