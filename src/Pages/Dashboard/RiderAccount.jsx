import React, { useState } from "react";
import { MdEdit, MdCloudUpload } from "react-icons/md";
import "../../styles/riderAccount.css";

const InputField = ({ label, placeholder, value, readOnly = false }) => (
  <div className="form_group">
    <label className="input_label">{label}</label>
    <input
      type="text"
      className="text_input"
      placeholder={placeholder}
      defaultValue={value}
      readOnly={readOnly}
    />
  </div>
);

const PhoneNumberField = ({ label, value }) => (
  <div className="form_group">
    <label className="input_label">{label}</label>
    <div className="phone_input_wrapper">
      <div className="phone_prefix">
        <span role="img" aria-label="Nigerian Flag">
          🇳🇬
        </span>{" "}
        +234
      </div>
      <input
        type="text"
        className="text_input phone_number_input"
        defaultValue={value}
      />
    </div>
  </div>
);

const RiderAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="personal_info_section">
            <div className="section_header">
              <h3 className="section_title">Personal Information</h3>
              <button className="btn_save_green">
                <MdCloudUpload size={18} /> Save
              </button>
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
                <button className="btn_upload_photo">
                  <MdCloudUpload size={18} /> Upload Photo
                </button>
              </div>
            </div>

            <div className="personal_info_grid">
              <InputField label="Full Name" value="Glory Otene" />
              <InputField
                label="Email Address"
                value=""
                placeholder="e.g., gloryoteno@mail.com"
              />
              <PhoneNumberField label="Phone Number" value="706099440" />
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
        return (
          <div className="tab_content_placeholder">
            Documents Management Form...
          </div>
        );
      case "banking":
        return (
          <div className="tab_content_placeholder">
            Banking Information Form...
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
