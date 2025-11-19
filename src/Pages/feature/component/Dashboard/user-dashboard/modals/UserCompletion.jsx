import React from 'react'
import { IoClose } from "react-icons/io5";

const UserCompletion = ({ onClose, order, navigate }) => {
  return (
    <div className="PaymentOverlay" onClick={onClose}>
      <div className="PaymentModal" onClick={(e) => e.stopPropagation()}>
        <button className="closeIcons" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <section className="PaymentModalContent">
          <img src="/Images/Icon.svg" alt="KYC Success Icon" />

          <p>Order successfully completed!</p>
          <p><strong>Order #{order?.orderNumber}</strong></p>
          <p>
            Total amount <strong>₦{order?.totalPrice}</strong>.
          </p>

          <button
            className="proceedBtn"
            onClick={() => navigate("/vendor-dashboard")}
          >
            Back to Dashboard
          </button>
        </section>
      </div>
    </div>
  );
};

export default UserCompletion;
