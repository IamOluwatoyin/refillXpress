import React from "react";
import { IoClose } from "react-icons/io5";
import "./PaymentModal.css";

const PaymentModal = ({ paymentLink, order, onClose }) => {
  return (
    <div className="PaymentOverlay" onClick={onClose}>
      <div className="PaymentModal" onClick={(e) => e.stopPropagation()}>
        <button className="closeIcons" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <section className="PaymentModalContent">
          <img src="/Images/Icon.svg" alt="KYC Success Icon" />

          <p>Please complete your payment for</p>
          <p>
            <strong>Order #{order?.orderNumber}</strong>{" "}
          </p>
          <p>
            Total amount <strong>₦{order?.totalPrice}</strong>.
          </p>
          <a
            href={paymentLink}
            // target="_blank"
            rel="noopener noreferrer"
            className="proceedBtn"
          >
            Proceed to Make Payment
          </a>
        </section>
      </div>
    </div>
  );
};

export default PaymentModal;
