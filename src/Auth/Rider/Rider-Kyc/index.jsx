import React, { useState } from "react";
import {
  FaUser,
  FaMotorcycle,
  FaFileAlt,
  FaCreditCard,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import "./RiderApplicationForm.css";
import Header from "../../../assets/Header.png";
import { useNavigate } from "react-router-dom"; // Ensure this is 'react-router-dom' if you are using v6+

const logo = "path/to/your/Header.png";

const validateRequiredFields = (data, requiredFields) => {
  return requiredFields.some(
    (field) => !data[field] || String(data[field]).trim() === ""
  );
};

/* ---------- PERSONAL INFO FORM ---------- */
const PersonalInfoForm = ({ initialData, onNext }) => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    emergencyContact: "",
    contactPhone: "",
    ...(initialData.personalData || {}),
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    const requiredFields = [
      "fullName",
      "email",
      "phoneNumber",
      "streetAddress",
      "city",
      "state",
      "emergencyContact",
      "contactPhone",
    ];

    if (validateRequiredFields(entries, requiredFields)) {
      alert(
        "Please fill in all required personal and emergency contact fields."
      );
      return;
    }

    onNext({ personalData: entries });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Personal Information</h3>
      <p className="subtitle-form">
        Tell us about yourself and provide emergency contact details
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="First Name Last Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="rider@example.com"
            required
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="streetAddress">Street Address *</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={data.streetAddress}
            onChange={handleChange}
            placeholder="123 Main St."
            required
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="Lagos"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={data.state}
            onChange={handleChange}
            placeholder="Lagos State"
            required
          />
        </div>
      </div>

      <h4 className="emergency-header">Emergency Contact Information</h4>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="emergencyContact">Emergency Contact *</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={data.emergencyContact}
            onChange={handleChange}
            placeholder="Name of Emergency Contact"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone *</label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={data.contactPhone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            required
          />
        </div>
      </div>

      <div className="form-actions right-align">
        <button type="submit" className="next-button save-continue-btn">
          Save & Continue
        </button>
      </div>
    </form>
  );
};

/* ---------- VEHICLE DETAILS FORM ---------- */
const VehicleDetailsForm = ({ initialData, onNext, onBack }) => {
  const [data, setData] = useState({
    type: "",
    make: "",
    model: "",
    year: "",
    regNumber: "",
    licensePlate: "",
    ...(initialData.vehicleData || {}),
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    const requiredFields = [
      "type",
      "make",
      "model",
      "year",
      "regNumber",
      "licensePlate",
    ];

    if (validateRequiredFields(entries, requiredFields)) {
      alert("Please fill in all required vehicle details before proceeding.");
      return;
    }

    onNext({ vehicleData: entries });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Vehicle Details</h3>
      <p className="subtitle-form">
        Provide information about your delivery vehicle
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="type">Vehicle Type *</label>
          <select
            id="type"
            name="type"
            value={data.type}
            onChange={handleChange}
            required
          >
            <option value="">Select your vehicle type</option>
            <option value="Motorbike">Motorbike</option>
            <option value="Bicycle">Bicycle</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="make">Vehicle Make *</label>
          <input
            type="text"
            id="make"
            name="make"
            value={data.make}
            onChange={handleChange}
            placeholder="Honda, Yamaha, etc."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Vehicle Model *</label>
          <input
            type="text"
            id="model"
            name="model"
            value={data.model}
            onChange={handleChange}
            placeholder="Model name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year *</label>
          <input
            type="text"
            id="year"
            name="year"
            value={data.year}
            onChange={handleChange}
            placeholder="2024"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="regNumber">Registration Number *</label>
          <input
            type="text"
            id="regNumber"
            name="regNumber"
            value={data.regNumber}
            onChange={handleChange}
            placeholder="ABC123456"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="licensePlate">License Plate *</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={data.licensePlate}
            onChange={handleChange}
            placeholder="XYZ-1234"
            required
          />
        </div>
      </div>

      <div className="vehicle-requirements-box">
        <h4>Vehicle Requirements:</h4>
        <ul>
          <li>Vehicle must be registered</li>
          <li>Must be able to safely transport gas cylinders</li>
          <li>Regular maintenance records preferred</li>
        </ul>
      </div>

      <div className="form-actions">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="next-button save-continue-btn">
          Save & Continue
        </button>
      </div>
    </form>
  );
};

/* ---------- DOCUMENTS FORM ---------- */
const DocumentsForm = ({ initialData, onNext, onBack }) => {
  const [documents, setDocuments] = useState([
    {
      name: "Driver's License",
      status: "Uploaded",
      date: "2025-01-15",
      iconClass: "icon-green",
      file: "mock.pdf",
    },
    {
      name: "Vehicle Registration",
      status: "Uploaded",
      date: "2025-01-15",
      iconClass: "icon-green",
      file: "mock.pdf",
    },
    {
      name: "Owner ID Card",
      status: "Pending",
      date: "2025-10-24",
      iconClass: "icon-yellow",
      file: null,
    },
    {
      name: "Utility Bill",
      status: "Re-Upload",
      date: "2025-10-20",
      iconClass: "icon-red",
      file: null,
    },
  ]);

  const handleFileUpload = (docIndex, file) => {
    const newDocs = [...documents];
    newDocs[docIndex].file = file;
    newDocs[docIndex].status = "Pending";
    newDocs[docIndex].date = new Date().toISOString().slice(0, 10);
    newDocs[docIndex].iconClass = "icon-yellow";
    setDocuments(newDocs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing = documents.filter((doc) => !doc.file);
    if (missing.length > 0) {
      alert("Please upload all required documents before proceeding.");
      return;
    }

    onNext({ documentsData: documents });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload Documents</h3>

      <div className="info-box top-alert">
        <FaInfoCircle className="info-icon" />
        <span>
          Upload <strong>clear, legible copies</strong> of all required
          documents. Documents are typically vetted within 24–48 hours.
        </span>
      </div>

      <div className="document-list-container">
        {documents.map((doc, i) => (
          <div className="document-item" key={i}>
            <div className={`doc-icon ${doc.iconClass}`}>
              <FaFileAlt />
            </div>

            <div className="doc-details">
              <label>{doc.name}</label>
              <span className="doc-uploaded-date">
                {doc.status === "Required"
                  ? "Required"
                  : `Uploaded: ${doc.date}`}
              </span>
            </div>

            <label className="upload-btn-label">
              <span
                className={`upload-btn ${
                  doc.status === "Re-Upload" ? "btn-red" : "btn-green"
                }`}
              >
                {doc.status === "Re-Upload" ? "Re-Upload" : "Upload"}
              </span>
              <span className="click-text">click to upload</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(i, e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="document-verification-box">
        <div className="verification-header">
          <FaInfoCircle className="verification-icon" />
          <h4>Document Verification Process</h4>
        </div>
        <ul>
          <li>Documents are typically verified within 24–48 hours</li>
          <li>Ensure all documents are clear and legible</li>
          <li>Documents must be valid and not expired</li>
          <li>You'll receive an email notification once verified</li>
        </ul>
      </div>

      <div className="form-actions">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="next-button save-continue-btn">
          Save & Continue
        </button>
      </div>
    </form>
  );
};

/* ---------- BANKING INFO FORM ---------- */
const BankingInfoForm = ({ initialData, onNext, onBack }) => {
  const [data, setData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    termsChecked: false,
    ...(initialData.bankingData || {}),
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());
    const requiredFields = ["accountHolderName", "bankName", "accountNumber"];

    if (validateRequiredFields(entries, requiredFields)) {
      alert("Please fill in all banking details.");
      return;
    }

    if (!data.termsChecked) {
      alert("You must agree to the Terms and Conditions to submit.");
      return;
    }

    onNext({ bankingData: { ...entries, termsChecked: data.termsChecked } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Banking Information</h3>
      <p className="subtitle-form">
        Enter your banking details for payment processing
      </p>

      <div className="info-box security-alert">
        Your banking information is securely encrypted and used only for
        payments.
      </div>

      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="accountHolderName">Account Holder Name *</label>
          <input
            type="text"
            id="accountHolderName"
            name="accountHolderName"
            value={data.accountHolderName}
            onChange={handleChange}
            placeholder="Benjamin Uzor"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bankName">Bank Name *</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={data.bankName}
            onChange={handleChange}
            placeholder="First Bank"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number *</label>
          <input
            type="password"
            id="accountNumber"
            name="accountNumber"
            value={data.accountNumber}
            onChange={handleChange}
            placeholder="**********"
            required
          />
        </div>
      </div>

      <div className="terms-checkbox-group">
        <input
          type="checkbox"
          id="termsChecked"
          name="termsChecked"
          checked={data.termsChecked}
          onChange={handleChange}
          required
        />
        <label htmlFor="termsChecked" className="terms-label">
          I agree to Refillxpress{" "}
          <a href="/terms" target="_blank" rel="noreferrer">
            terms and conditions
          </a>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="next-button submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

/* ---------- MAIN KYC FORM WRAPPER ---------- */
const RiderKycForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "Personal Info", icon: <FaUser /> },
    { id: 2, label: "Vehicle Details", icon: <FaMotorcycle /> },
    { id: 3, label: "Documents", icon: <FaFileAlt /> },
    { id: 4, label: "Banking Info", icon: <FaCreditCard /> },
  ];

  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));

    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      console.log("Final Form Data:", { ...formData, ...stepData });
      alert("Application Submitted Successfully!");
      navigate("/rider-dashboard");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <PersonalInfoForm initialData={formData} onNext={handleNext} />;
      case 2:
        return (
          <VehicleDetailsForm
            initialData={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <DocumentsForm
            initialData={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <BankingInfoForm
            initialData={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="kyc_body">
      <div className="main_header">
        <img src={Header} alt="RefillXpress Logo" />
      </div>

      <div className="kyc-container">
        <header className="kyc-header">
          <h5>Become a Rider</h5>
          <p className="subtitle">
            Please provide all necessary information to complete your
            registration.
          </p>
        </header>

        <div className="progress-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          <div className="steps-row">
            {steps.map((step) => {
              const isCompleted = step.id < activeStep;
              const isActive = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`step-item ${isActive ? "active" : ""} ${
                    isCompleted ? "completed" : ""
                  }`}
                >
                  <div className="step-icon">
                    {isCompleted ? <FaCheckCircle /> : step.icon}
                  </div>
                  <p>{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="step-content">{renderStepContent()}</div>
      </div>
    </div>
  );
};

export default RiderKycForm;
