import React from "react";
import { IoClose } from "react-icons/io5";
import "./RejectedOrder.css";

const RejectedOrder = ({ onClose }) => {
  return (
    <div>
      {showRejectCard && (
  <div className="rejectOverlay" onClick={() => setShowRejectCard(false)}>
    <div className="rejectCard" onClick={(e) => e.stopPropagation()}>
      <h3>Reject Order</h3>
      <p>Please provide a reason</p>
      <input
        type="text"
        placeholder="Enter reason for rejection"
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
      />
      <div className="cardBtns">
        <button
          className="closeBtn"
          onClick={() => setShowRejectCard(false)}
        >
          Close
        </button>
        <button
          className="rejectBtn"
          style={{ backgroundColor: "red", color: "#fff" }}
          onClick={() => {
            // Send reject reason to API
            handleOrderDecision({ ...selectedOrder, reason: rejectReason }, "reject");
            setShowRejectCard(false);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  </div>
)}
{showModal && (
  <ViewOrderModal
    order={selectedOrder}
    onClose={() => setShowModal(false)}
    onReject={handleRejectClick}  // <-- pass it down
  />
)}

    </div>
  );
};

export default RejectedOrder;
