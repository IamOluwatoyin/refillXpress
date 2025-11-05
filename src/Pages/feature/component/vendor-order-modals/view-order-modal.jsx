import React from "react";
import { IoClose } from "react-icons/io5";
import "./ViewOrderModal.css";

const ViewOrderModal = ({ order, onClose, onAccept, onReject }) => {
const handleRejectClick = (order) => {
  setSelectedOrder(order);    
  setRejectReason("");        
  setShowRejectCard(true);    
};

  return (
    <div className="orderOverlay" onClick={onClose}>
      <div className="orderModal" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <div className="orderHeader">
          <div className="orderCode">
            <h4>Order Details</h4>
            <p>#{order?.orderNumber}</p>
          </div>
        </div>

       
        <div className="section">
          <button className="pendingBtns">{order?.status}</button>
        </div>

     
        <div className="section">
          <h5>Customer Information</h5>
          <div className="customerDetails">
            <p>{order?.user?.firstName} {order?.user?.lastName}</p>
            <p>{order?.user?.phoneNumber}</p>
            <p>{order?.deliveryAddress}</p>
          </div>
        </div>

       
        <div className="section">
          <h5>Order Details</h5>
          <div className="detailRow">
            <span>Quantity</span>
            <span>{order?.quantity} kg</span>
          </div>
          <div className="detailRow">
            <span>Date</span>
            <span>{new Date(order?.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="detailRow">
            <span>Time Slot</span>
            <span>{order?.deliveryTime || "N/A"}</span>
          </div>
        </div>

        <div className="section">
          <h5>Price Breakdown</h5>
          <div className="detailRow">
            <span>Gas ({order?.quantity}kg x {order?.unitPrice})</span>
            <span>₦{order?.price?.toLocaleString()}</span>
          </div>
          <div className="detailRow">
            <span>Delivery Fee</span>
            <span>₦{order?.deliveryFee?.toLocaleString()}</span>
          </div>
          <div className="detailRow totalRow">
            <span>Total Amount</span>
            <span>₦{order?.totalPrice?.toLocaleString()}</span>
          </div>
        </div>

        <div className="actionBtns">
          <button className="acceptBtn" onClick={() => onAccept(order)}>Accept Order</button>
          <button className="rejectBtn" onClick={() => onReject(order)}>Reject Order</button>
        </div>
        </div>
      </div>
    
  );
};

export default ViewOrderModal;
