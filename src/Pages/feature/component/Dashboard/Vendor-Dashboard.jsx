import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import "./VendorDashboard.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router";
import { getSummary } from "../../../../api/query";
import { getVendorPendingOrders } from "../../../../api/query";
import ViewOrderModal from "../vendor-order-modals/view-order-modal";
import { vendorAcceptRejectOrder } from "../../../../api/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const VendorDashboard = () => {
  const nav =useNavigate()
  const [vendorSummary, setVendorSummary]=useState(null)
  const [vendorPendingOrders, setVendorPendingOrders] = useState([]);
  const [showRejectCard, setShowRejectCard] = useState(false);
  const[showModal,setShowModal] = useState(false)
const [rejectReason, setRejectReason] = useState("");

  useEffect(()=>{
   const fetchVendorSummary = async()=>{
    try {
      const response = await getSummary()
      setVendorSummary(response.data.data)

       const pendingRes = await getVendorPendingOrders();
      setVendorPendingOrders(pendingRes.data?.data || []);
    
    } catch (error) {
      console.error("failed to fetch summary")
      console.error("failed to fetch summary or pending orders");
    }
   }
   fetchVendorSummary()
  },[])
  if (!vendorSummary) {
    return <p>Loading summary...</p>;
  }

  const handleOrderDecision = async (order, action, reason = "") => {
  try {
    await vendorAcceptRejectOrder({ orderId: order.id, action, reason });

    // Update local pending list
    setVendorPendingOrders(prev => prev.filter(o => o.id !== order.id));

    if (action === "accept") {
      toast.success(`Order ${order.orderNumber} accepted successfully`, {
        position: "top-right",
      });
    } else if (action === "reject") {
      toast.info(`Order ${order.orderNumber} rejected`, {
        position: "top-right",
      });
    }

    setShowModal(false);
    setShowRejectCard(false);
  } catch (error) {
    console.error(`Failed to ${action} order`, error);
    toast.error(`Failed to ${action} order`, { position: "top-right" });
  }
};

const handleRejectClick = (order) => {
  setSelectedOrder(order);
  setRejectReason("");
  setShowRejectCard(true);
};


  
  return (

    <div className="vendorDashboard-wrapper">
      <h2>Dashboard</h2>
      <span>Welcome back, Max gas supply! Here’s what’s happening today</span>

      {/* ===== Summary Cards ===== */}
      <div className="summary-section">
        <div className="summary-card">
          <div className="icon blue">
            <GoPackage />
          </div>
        <h3 className="summary-value">{vendorSummary?.todayOrders || 0}</h3>
      <p className="summary-label">Today's Orders</p>
        </div>

        <div className="summary-card">
          <div className="icon yellow">
            <FaClock />
          </div>
         <h3 className="summary-value">{vendorSummary?.pendingOrders || 0}</h3>
<p className="summary-label">Pending Orders</p>
        </div>

        <div className="summary-card">
          <div className="icon green">
            <FaCheckCircle />
          </div>
         <h3 className="summary-value">{vendorSummary?.completedToday || 0}</h3>
<p className="summary-label">Completed Today</p>

        </div>

        <div className="summary-card">
          <div className="icon purple">
            <FaNairaSign />
          </div>
         <h3 className="summary-value">
  ₦{vendorSummary?.todayRevenue?.toLocaleString() || 0}
</h3>
<p className="summary-label">Today's Revenue</p>

        </div>
      </div>
      {/* ===== Pending Orders ===== */}
      <div className="pending-orders">
        <div className="pending-header">
          <h3>Pending Orders</h3>
          {vendorSummary?.pendingOrders > 0 && (
  <button
    className="view-all"
    onClick={() => nav("/vendor-dashboard/vendor-order")}
  >
    View All <IoIosArrowForward />
  </button>
)}
        </div>
        <p className="subtext">Requires immediate attention</p>

       {vendorPendingOrders.length > 0 ? (
  vendorPendingOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 1).map((order, index) => (
    <div className="order-card" key={index}>
      <div className="order-header">
        <div>
          <span className="order-id">{order.orderNumber}</span>
          <span className="order-status">{order.status}</span>
        </div>
        <span className="price">₦{order.price}</span>
      </div>

      <p className="customer-name">
        {order.user?.firstName} {order.user?.lastName}
      </p>

      <div className="order-details">
        <div className="details-row">
          <div className="left-info">
            <p>
              <GoPackage /> {order.quantity}
            </p>
          </div>
          <div className="center-info">
            <p>
              <FaCalendarAlt />{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <FaClock /> {new Date(order.createdAt).toLocaleTimeString()}
            </p>
            <p>
              <FaPhoneAlt /> {order.user?.phoneNumber}
            </p>
          </div>
        </div>

        <p className="address">
          <FaMapMarkerAlt /> {order.deliveryAddress}
        </p>
      </div>

     <div className="order-actions">
  <button
    className="view-btn"
    onClick={() => { setSelectedOrder(order); setShowModal(true); }}
  >
    View
  </button>
  <button
    className="accept-btn"
    onClick={() => handleOrderDecision(order, "accept")}
  >
    Accept
  </button>
  <button
    className="reject-btn"
    onClick={() => handleRejectClick(order)}
  >
    Reject
  </button>
</div>

    </div>
  ))
) : (
  <div className="order-placeholder">
    <p>No pending orders yet</p>
  </div>
)}

      {/* ===== Recent Reviews ===== */}
      <div className="reviews-section">
        <h3>Recent Reviews</h3>
        <p className="subtext">Customer feedback</p>

        <div className="review-card">
          <div className="review-header">
            <strong>John D.</strong>
            <span>Oct 20, 2025</span>
          </div>
          <div className="stars">
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
          </div>
          <p>Excellent service! Very professional and punctual.</p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <strong>Sarah M.</strong>
            <span>Oct 19, 2025</span>
          </div>
          <div className="stars">
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
          </div>
          <p>Great experience! Highly recommend.</p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <strong>Mike R.</strong>
            <span>Oct 18, 2025</span>
          </div>
          <div className="stars">
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaRegStar className="unfilled" />
          </div>
          <p>Good service overall. Delivery was a bit delayed.</p>
        </div>
      </div>
    </div>
    {/* ===== View Order Modal ===== */}
{showModal && (
  <ViewOrderModal
    order={selectedOrder}
    onClose={() => setShowModal(false)}
    onAccept={(order) => handleOrderDecision(order, "accept")}
    onReject={handleRejectClick}
  />
)}

{/* ===== Reject Overlay ===== */}
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
        <button className="closeBtn" onClick={() => setShowRejectCard(false)}>
          Close
        </button>
        <button
          className="rejectBtn"
          style={{ backgroundColor: "red", color: "#fff" }}
          onClick={() => handleOrderDecision(selectedOrder, "reject", rejectReason)}
        >
          Reject
        </button>
      </div>
    </div>
  </div>
)}

<ToastContainer />

    </div>
  );
};

export default VendorDashboard;
