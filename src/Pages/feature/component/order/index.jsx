import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import "./OrderManagement.css";
import ViewOrderModal from "../vendor-order-modals/view-order-modal";
import { vendorAcceptRejectOrder } from "../../../../api/mutation";
import { getAllVendorsOrders } from "../../../../api/query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Orders state
  const [vendororderPending, setVendororderPending] = useState([]);
  const [vendororderActive, setVendororderActive] = useState([]);
  const [vendororderCancelled, setVendororderCancelled] = useState([]);
  const [vendororderCompleted, setVendororderCompleted] = useState([]);

  // Reject overlay state
  const [showRejectCard, setShowRejectCard] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch all orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllVendorsOrders();
        const ordersData = response.data.data || {};

        setVendororderPending(ordersData.pending || []);
        setVendororderActive(ordersData.active || []);
        setVendororderCancelled(ordersData.cancelled || []);
        setVendororderCompleted(ordersData.completed || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
  }, []);

  // Accept or Reject order
const handleOrderDecision = async (order, action, reason = "") => {
  try {
    await vendorAcceptRejectOrder({ orderId: order.id, action, reason });

    setVendororderPending(prev => prev.filter(o => o.id !== order.id));

    if (action === "accept") {
      setVendororderActive(prev => [...prev, { ...order, status: "Active" }]);
      toast.success(`Order ${order.orderNumber} accepted successfully`, { position: "top-right" });
    } else if (action === "reject") {
      setVendororderCancelled(prev => [...prev, { ...order, status: "Cancelled", reason }]);
    }

    setShowModal(false);
    setShowRejectCard(false);
  } catch (error) {
    console.error(`Failed to ${action} order`, error);
    toast.error(`Failed to ${action} order`, { position: "top-right" });
  }
};
;

  // Open reject overlay (from list or modal)
  const handleRejectClick = (order) => {
    setSelectedOrder(order);
    setRejectReason("");
    setShowRejectCard(true);
  };

  // Tabs
  const tabs = [
    { label: `Pending (${vendororderPending.length})`, key: "Pending" },
    { label: `Active (${vendororderActive.length})`, key: "Active" },
    { label: `Completed (${vendororderCompleted.length})`, key: "Completed" },
    { label: `Cancelled (${vendororderCancelled.length})`, key: "Cancelled" },
  ];

  const getOrdersForTab = () => {
    switch (activeTab) {
      case "Pending":
        return vendororderPending;
      case "Active":
        return vendororderActive;
      case "Cancelled":
        return vendororderCancelled;
      case "Completed":
        return vendororderCompleted;
      default:
        return [];
    }
  };

  return (
    <div className="pageContainer">
      <div className={`orderWrapper ${(showModal || showRejectCard) ? "blurred" : ""}`}>
        <h2>Orders</h2>

        <div className="orderTabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "active" : ""}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ordersList">
          {getOrdersForTab().length > 0 ? (
            getOrdersForTab().map((order, index) => (
              <div className="orderCard" key={index}>
                <div className="orderTop">
                  <div className="orderId">
                    <span>{order.orderNumber}</span>
                    <span className={`statusP ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                  <div className="priceSection">
                    <span className="price">₦{order.price}</span>
                  </div>
                </div>

                <div className="orderDetails">
                  <p className="name">{order.user.firstName} {order.user.lastName}</p>

                  <div className="infoRow">
                    <div className="leftInfo">
                      <div className="item"><GoPackage /> {order.quantity}</div>
                      <div className="item address"><FaMapMarkerAlt /> {order.deliveryAddress}</div>
                    </div>

                    <div className="centerInfo">
                      <div className="item"><FaCalendarAlt /> {new Date(order.createdAt).toLocaleDateString()}</div>
                      <div className="item"><FaClock /> {new Date(order.createdAt).toLocaleTimeString()}</div>
                      <div className="item"><FaPhoneAlt /> {order.user.phoneNumber}</div>
                    </div>

                    <div className="rightBtns">
                      <button
                        className="viewBtn"
                        onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                      >View</button>

                      {activeTab === "Pending" && (
                        <>
                          <button
                            className="acceptBtn"
                            onClick={() => handleOrderDecision(order, "accept")}
                          >Accept</button>
                          <button
                            className="rejectBtn"
                            onClick={() => handleRejectClick(order)}
                          >Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="orderPlaceholder">
              <p>No {activeTab.toLowerCase()} orders yet</p>
            </div>
          )}
        </div>
      </div>

      {/* View Order Modal */}
      {showModal && (
        <ViewOrderModal
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onAccept={(order) => handleOrderDecision(order, "accept")}
          onReject={handleRejectClick} // overlay triggered from modal
        />
      )}

      {/* Reject Overlay */}
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
              >Close</button>
              <button
                className="rejectBtn"
                style={{ backgroundColor: "red", color: "#fff" }}
                onClick={() => handleOrderDecision(selectedOrder, "reject", rejectReason)}
              >Reject</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
    

  );
};

export default OrderManagement;
