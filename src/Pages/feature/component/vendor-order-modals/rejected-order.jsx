import React from "react";
import { IoClose } from "react-icons/io5";
import "./RejectedOrder.css";

const RejectedOrder = ({ onClose }) => {
  return (
    <div className="orderOverlay" onClick={onClose}>
      <div
        className="orderModal"
        onClick={(e) => e.stopPropagation()} 
      >
       
        <button className="closeBtn" onClick={onClose}>
          <IoClose size={22} />
        </button>

       
        <div className="orderHeader">
          <div className="orderCode">
            <h4>Order Details</h4>
            <p>#GR45821</p>
          </div>
          
        </div>

       
        <div className="section">
          <button className="rejectedBtn">Rejected</button>
          <h5>Customer Information</h5>
          <div className="customerDetails">
            <p>Glory Otene</p>
            <p>+2347060994040</p>
            <p>No 1 Salua Street, Magodo</p>
          </div>
        </div>

       
        <div className="section">
          <h5>Order Details</h5>
          <div className="detailRow">
            <span>Quantity</span>
            <span>15 kg</span>
          </div>
          <div className="detailRow">
            <span>Date</span>
            <span>Oct 20, 2025</span>
          </div>
          <div className="detailRow">
            <span>Time Slot</span>
            <span>10:00 AM - 11:00 AM</span>
          </div>
        </div>

        <div className="section">
          <h5>Price Breakdown</h5>
          <div className="detailRow">
            <span>Gas (11kg × 1000)</span>
            <span>₦11,000</span>
          </div>
          <div className="detailRow">
            <span>Delivery Fee</span>
            <span>₦1,500</span>
          </div>
          <div className="detailRow totalRow">
            <span>Total Amount</span>
            <span>₦12,500</span>
          </div>
        </div>

        <div className="singleBtnContainer">
          <button className="closeFullBtn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectedOrder;
