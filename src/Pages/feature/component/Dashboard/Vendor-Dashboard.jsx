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
import { getAllReviews, getSummary, getVendorId, getVendorPendingOrders } from "../../../../api/query";
import ViewOrderModal from "../vendor-order-modals/view-order-modal";
import { vendorAcceptRejectOrder } from "../../../../api/mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoading } from "../../../../context/LoadingContext"; 
import { useOrders } from "../../../../context/PendingOrderContext";
import { useRefetch } from "../../../../api/refetch";

const VendorDashboard = () => {
  const nav = useNavigate();
  const [vendorSummary, setVendorSummary] = useState(null);
  const [vendorPendingOrders, setVendorPendingOrders] = useState([]);
  const [showRejectCard, setShowRejectCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vendorInfo, setVendorInfo] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allReviews, setAllReviews] = useState(null);

  const { loading, setLoading } = useLoading() 
   const {orders, refetchOrders} = useOrders()
   const {refetch} = useRefetch(getSummary)
  useEffect(() => {
    const fetchVendorSummary = async () => {
      setLoading(true); 
      try {
        const id = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);
        const vendorResponse = await getVendorId(id);
        setVendorInfo(vendorResponse.data.data);

        const response = await getSummary();
        setVendorSummary(response.data.data)
      
        const reviewsRes = await getAllReviews();
        setAllReviews(reviewsRes?.data?.data);
      } catch (error) {
        console.error("failed to fetch summary or pending orders");
        const message = error.response?.data?.message || "Something went wrong!";
        toast.dismiss();
        toast.error(message);

        if (error?.response?.data?.message?.toLowerCase()?.includes("session timed out")) {
          nav("/vendor-login");
        }
      } finally {
        setLoading(false); 
      }
    };
    fetchVendorSummary();
  }, [nav, setLoading]);

  const handleOrderDecision = async (order, action, reason = "") => {
    try {
      setIsProcessing(true);
      await vendorAcceptRejectOrder({ orderId: order.id, action, message: reason });
      setVendorPendingOrders((prev) => prev.filter((o) => o.id !== order.id));
        refetchOrders()
        refetch()
      if (action === "accept") {
        toast.success(`Order ${order.orderNumber} accepted successfully!`);
      } else if (action === "reject") {
        toast.success(`Order ${order.orderNumber} rejected successfully!`);
      }

      setShowModal(false);
      setShowRejectCard(false);
    } catch (error) {
      console.error(`Failed to ${action} order`, error);
      toast.error(error.response?.data?.message || `Failed to ${action} order.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectClick = (order) => {
    setSelectedOrder(order);
    setRejectReason("");
    setShowRejectCard(true);
  };

  const vendor = JSON.parse(localStorage.getItem("vendor"));

  return (
    <div className="vendorDashboard-wrapper" style={{ position: "relative" }}>
       {loading && <div className="global-loading">Loading...</div>}
      <h2>Dashboard</h2>
      <span>
        Welcome back, {vendorInfo?.businessName || "Vendor"}! Here's what's happening today
      </span>

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

      {/* Pending Orders */}
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

        {orders.length > 0 ? (
          orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 1)
            .map((order, index) => (
              <div className="order-card" key={index}>
                <div className="order-header">
                  <div>
                    <span className="order-ids">{order.orderNumber}</span>
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
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="accept-btn"
                    onClick={() => handleOrderDecision(order, "accept")}
                    disabled={isProcessing}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleRejectClick(order)}
                    disabled={isProcessing}
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

        {/* Reviews */}
        <div className="reviews-section">
          <h3>Recent Reviews</h3>
          <p className="subtext">Customer feedback</p>

          {allReviews && allReviews.length > 0 ? (
            allReviews.slice(0, 3).map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <strong>{review.user?.firstName || "Anonymous"}</strong>
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="stars">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? (
                      <FaStar key={i} className="filled" />
                    ) : (
                      <FaRegStar key={i} className="unfilled" />
                    )
                  )}
                </div>

                <p>{review.comment || "No comment provided."}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>

      {/* View Order Modal */}
      {showModal && (
        <ViewOrderModal
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onAccept={(order) => handleOrderDecision(order, "accept")}
          onReject={handleRejectClick}
        />
      )}

      {/* Reject Card */}
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
                className="closeBtnReject"
                onClick={() => setShowRejectCard(false)}
              >
                Cancel
              </button>
              <button
                className="rejectBtnReject"
                onClick={() =>
                  handleOrderDecision(selectedOrder, "reject", rejectReason)
                }
                style={{ backgroundColor: "red", color: "#fff" }}
                disabled={isProcessing}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
