
import React from "react";
import { IoClose } from "react-icons/io5";
import "./AcceptOrderModal.css";
import { vendorAcceptRejectOrder } from "../../../../api/mutation";

const AcceptOrderModal = ({ onClose }) => {

 
  // const handleAccept = async () => {
  //   try {
  //     const response = await vendorAcceptRejectOrder({
  //       orderId: order.id,
  //       action: "accept",
  //     });
  //     console.log(" Order accepted:", response);
  //     onClose();
  //   } catch (error) {
  //     console.error(" Failed to accept order", error);
  //   }
  // };

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
            <p>{order?.orderNumber || "N/A"}</p>
          </div>
         
        </div>

        
         <button className="acceptedBtn"onClick={handleAccept}>Accepted</button>
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
            <span>10:00 AM - 11:00 AM</span>
          </div>
        </div>

  
        <div className="section">
          <h5>Price Breakdown</h5>
          <div className="detailRow">
            <span>Gas (
      {order?.quantity ? `${order.quantity}kg` : "—"} × ₦
      {order?.unitPrice?.toLocaleString() || "—"})</span>

            <span>{order?.gasPrice
        ? order.gasPrice.toLocaleString()
        : order?.quantity && order?.unitPrice
        ? (order.quantity * order.unitPrice).toLocaleString()
        : "—"}</span>
          </div>

          <div className="detailRow">
            <span>Delivery Fee</span>
            <span>₦{order?.deliveryFee?.toLocaleString() || "—"}</span>
          </div>
          <div className="detailRow totalRow">
            <span>Total Amount</span>
            <span>₦{order?.price?.toLocaleString() || "—"}</span>
          </div>
        </div>

        <div className="actionBtns">
         
          <button className="closeModalBtn" onClick={onClose}>Close</button>
           <button className="completeBtn">Mark as Complete</button>
        </div>
      </div>
    </div>
  );
};

export default AcceptOrderModal;
