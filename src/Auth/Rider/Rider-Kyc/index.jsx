import React, { useState } from "react";
import {
  FaUser,
  FaMotorcycle,
  FaFileAlt,
  FaCreditCard,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import "./RiderApplicationForm.css";

const PersonalInfoForm = ({ initialData, onNext }) => {
  const [data, setData] = useState(initialData.personalData || {});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.firstName || !data.email || !data.address) {
      alert("Please fill in all required fields.");
      return;
    }
    onNext({ personalData: data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth *</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={data.dob || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={data.gender || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label htmlFor="address">Residential Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="next-button">
          Next Step
        </button>
      </div>
    </form>
  );
};

const VehicleDetailsForm = ({ initialData, onNext, onBack }) => {
  const [data, setData] = useState(initialData.vehicleData || {});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ vehicleData: data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Vehicle Details</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="type">Vehicle Type *</label>
          <select
            id="type"
            name="type"
            value={data.type || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Motorbike">Motorbike</option>
            <option value="Bicycle">Bicycle</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="regNumber">Registration Number *</label>
          <input
            type="text"
            id="regNumber"
            name="regNumber"
            value={data.regNumber || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="makeModel">Make and Model</label>
          <input
            type="text"
            id="makeModel"
            name="makeModel"
            value={data.makeModel || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="back-button" onClick={onBack}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back
        </button>
        <button type="submit" className="next-button">
          Next Step
        </button>
      </div>
    </form>
  );
};

const DocumentsForm = ({ initialData, onNext, onBack }) => {
  const [data, setData] = useState(initialData.documentsData || {});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ documentsData: data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Required Documents</h3>
      <p
        className="subtitle"
        style={{ marginBottom: "20px", textAlign: "left" }}
      >
        Please upload clear copies of the following documents.
      </p>
      <div className="upload-section">
        <div className="upload-group">
          <label>Driver's License *</label>
          <input
            type="file"
            name="license"
            accept="image/*,.pdf"
            onChange={handleChange}
            required
          />
        </div>
        <div className="upload-group">
          <label>Vehicle Insurance *</label>
          <input
            type="file"
            name="insurance"
            accept="image/*,.pdf"
            onChange={handleChange}
            required
          />
        </div>
        <div className="upload-group">
          <label>Proof of Address (Utility Bill) *</label>
          <input
            type="file"
            name="proofOfAddress"
            accept="image/*,.pdf"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="back-button" onClick={onBack}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back
        </button>
        <button type="submit" className="next-button">
          Next Step
        </button>
      </div>
    </form>
  );
};

const BankingInfoForm = ({ initialData, onNext, onBack }) => {
  const [data, setData] = useState(initialData.bankingData || {});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ bankingData: data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Banking Information</h3>
      <p
        className="subtitle"
        style={{ marginBottom: "20px", textAlign: "left" }}
      >
        This is where your weekly earnings will be paid.
      </p>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="bankName">Bank Name *</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={data.bankName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number *</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={data.accountNumber || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="accountName">Account Holder Name *</label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={data.accountName || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="back-button" onClick={onBack}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back
        </button>
        <button type="submit" className="next-button final-submit">
          Complete Application
        </button>
      </div>
    </form>
  );
};

const RiderKycForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({});

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
    <div className="kyc-container">
      <header className="kyc-header">
        <h2>Become a Rider</h2>
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
                onClick={() =>
                  (isCompleted || isActive) && setActiveStep(step.id)
                }
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
  );
};

export default RiderKycForm;
