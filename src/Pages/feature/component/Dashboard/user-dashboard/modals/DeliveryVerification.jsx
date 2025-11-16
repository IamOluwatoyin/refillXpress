import React from "react";
import "./deliveryverification.css";
import { GoPackage, GoStar } from "react-icons/go";
import { FaShieldAlt } from "react-icons/fa";

import { MdOutlineShield } from "react-icons/md";

const DeliveryVerification = ({ order, code, onClose }) => {
  return (
    <div className="modal-bg">
      <div className="modal-itself delivery-width">
        <div className="modal-heading">
          <div className="left-part">
            <MdOutlineShield className="verificationIcon" />
            <h4>delivery verification</h4>
          </div>
          <p className="x-btn" onClick={onClose}>
            x
          </p>
        </div>

        {/* Order Info */}
        <div className="order-id">
          <div className="order-details">
            <div className="order-top">
              <p className="order-number">
                <GoPackage />
                Order #{order?.orderNumber}
              </p>
              <button className="out-for-delivery">Out for Delivery</button>
            </div>
            <p className="order-type">LPG {order?.cylinderSize || "12"}kg</p>
            <p className="order-vendor">
              Vendor: {order?.vendor?.businessName || "N/A"}
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <div className="icon">
            <MdOutlineShield />
          </div>
          <div className="security">
            <span className="title">security notice</span>
            <p>
              Only share your 6-digit verification code with the delivery person
              upon receiving your order. This confirms successful delivery.
            </p>
          </div>
        </div>

        {/* Delivery Code */}
        <div className="the-code-box">
          <MdOutlineShield className="shield" />
          <p>your delivery code</p>
          <h3>{code}</h3>
          <small>Share this code with the delivery person.</small>
        </div>
      </div>
    </div>
  );
};

export default DeliveryVerification;
