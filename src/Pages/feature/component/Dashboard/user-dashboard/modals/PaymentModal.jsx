import React from "react";
import { IoClose } from "react-icons/io5";
import "./PaymentModal.css";
import PaymentPage from "../../PaymentPage";

const PaymentModal = ({ paymentLink, onClose }) => {
  return (
    <div className="PaymentOverlay" onClick={onClose}>
      <div className="PaymentModal" onClick={(e) => e.stopPropagation()}>
        <button className="closeIcons" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <section className="PaymentModalContent">
          <img src="/Images/Icon.svg" alt="KYC Success Icon" />
          <p className="modalTitles">Order Complete!</p>
          <span className="modalTexts">
            We've notified your vendor. Order Code: #GF-2481RC
          </span>
          <a
            href={paymentLink}           
            target="_blank"             
            rel="noopener noreferrer"    
            className="proceedBtn"
          >
            Proceed to Pay
          </a>
        </section>
      </div>
    </div>
  );
};


export default PaymentModal;
