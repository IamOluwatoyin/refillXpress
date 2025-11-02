import React, { useState } from "react";
import { MdEdit, MdCloudUpload } from "react-icons/md";
import { FaLandmark } from "react-icons/fa";
import {
  BsFileEarmarkCheckFill,
  BsFileEarmarkTextFill,
  BsFileEarmarkExcelFill,
  BsFileEarmarkMinusFill,
} from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "../../styles/riderAccount.css";

const InputField = ({ label, value, readOnly = false, halfWidth = false }) => (
  <div className={`form_group ${halfWidth ? "half_width" : ""}`}>
    <label className="input_label">{label}</label>
    <input
      type="text"
      className="text_input"
      defaultValue={value}
      readOnly={readOnly}
    />
  </div>
);

const BankAccountDetails = () => (
  <div className="bank_details_card">
    <div className="card_header">
      <div className="header_icon_text">
        <FaLandmark size={18} color="#555" />
        <h3 className="section_title_card">Bank Account Details</h3>
      </div>
      <button className="btn_update_banking_info">Update Banking Info</button>
    </div>

    <div className="banking_info_grid">
      <InputField
        label="Account Name"
        value="MaxGas Supply"
        readOnly={true}
        halfWidth={true}
      />
      <InputField
        label="Bank Name"
        value="UBA"
        readOnly={true}
        halfWidth={true}
      />
    </div>

    <div className="account_number_field">
      <InputField label="Account Number" value="******8086" readOnly={true} />
    </div>

    <div className="automatic_payouts">
      <div className="payouts_text">
        <h4 className="payouts_title">Automatic Payouts</h4>
        <p className="payouts_subtitle">
          Receive automatic weekly payouts to your bank account
        </p>
      </div>
      <label className="switch">
        <input type="checkbox" defaultChecked />
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

const DocumentItem = ({ icon: title, date, status, showReupload }) => {
  let statusClass = "";
  let statusText = "";
  // let statusIcon = null;

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
        {showReupload && (
          <button className="btn_reupload">
            <MdCloudUpload size={18} /> Re-upload
          </button>
        )}
      </div>
    </div>
  );
};

const DocumentsSection = () => {
  const documents = [
    {
      icon: BsFileEarmarkCheckFill,
      title: "Driver's License",
      date: "2025-01-15",
      status: "Verified",
    },
    {
      icon: BsFileEarmarkCheckFill,
      title: "Vehicle Registration",
      date: "2025-01-15",
      status: "Verified",
    },
    {
      icon: BsFileEarmarkTextFill,
      title: "National ID / Passport",
      date: "2025-01-15",
      status: "Pending",
    },
    {
      icon: BsFileEarmarkMinusFill,
      title: "Utility Bill",
      date: "2025-10-20",
      status: "Rejected",
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

      <h3 className="section_title_documents">Uploaded Documents</h3>
      <div className="document_list">
        {documents.map((doc, index) => (
          <DocumentItem
            key={index}
            icon={doc.icon}
            title={doc.title}
            date={doc.date}
            status={doc.status}
            showReupload={doc.status === "Rejected"}
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
          <li>**Ensure all documents are clear and legible**</li>
          <li>Documents must be valid and not expired</li>
          <li>You'll receive an email notification once verified</li>
        </ul>
      </div>
    </div>
  );
};

const RiderAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
                <button className="btn_edit_avatar">
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
              <InputField label="Full Name" value="Glory Otene" />
              <InputField
                label="Email Address"
                value=""
                placeholder="e.g., gloryoteno@mail.com"
              />
              <InputField label="Phone Number" value="+234 706099440" />
              <InputField
                label="Residential Address"
                value=""
                placeholder="e.g., 24, Main Street, Lagos"
              />
            </div>

            <div className="save_changes_footer">
              <button className="btn_save_changes_orange">Save Changes</button>
            </div>
          </div>
        );
      case "documents":
        return <DocumentsSection />;
      case "banking":
        return (
          <div className="banking_section">
            <BankAccountDetails />
            <RecentPayouts />
          </div>
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
