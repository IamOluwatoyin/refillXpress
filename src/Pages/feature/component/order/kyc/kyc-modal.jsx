import React from "react";
import { IoClose } from "react-icons/io5";
import "./ModalKyc.css";

const ModalKyc = ({ onClose }) => {
  return (
    <div className="kycOverlay" onClick={onClose}>
      <div
        className="kycModal"
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="closeIcon" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <section className="kycModalContent">
          <img src="/Images/Icon.svg" alt="KYC Success Icon" />
          <p className="modalTitle">KYC Update Submitted!</p>
          <span className="modalText">
            Thank you for completing your KYC. We will review your documents and
            confirm your status within 72 hours. You can view your document
            verification status on your profile.
          </span>
        </section>
      </div>
    </div>
  );
};

export default ModalKyc;
