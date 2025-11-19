import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import "./OrderManagement.css";
import ViewOrderModal from "../vendor-order-modals/view-order-modal";
import { vendorAcceptRejectOrder } from "../../../../api/mutation";
import { getAllVendorsOrders } from "../../../../api/query";
import { toast } from "react-toastify";
import AcceptOrderModal from "../vendor-order-modals/accept-order-modal";
import RejectedOrder from "../vendor-order-modals/rejected-order";
import OrderDetails from "../vendor-order-modals/order-details";
import { useLoading} from "../../../../context/LoadingContext";
import GlobalLoading from "../../../../context/GlobalLoading";


const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [vendororderPending, setVendororderPending] = useState([]);
  const [vendororderActive, setVendororderActive] = useState([]);
  const [vendororderCancelled, setVendororderCancelled] = useState([]);
  const [vendororderCompleted, setVendororderCompleted] = useState([]);

  const [showRejectCard, setShowRejectCard] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
 const [activeProcessingOrder, setActiveProcessingOrder] = useState(null);
   const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllVendorsOrders();
        const ordersData = response.data.data || {};
            console.log("ordersData", ordersData);
        setVendororderPending(
          (ordersData.pending || []).map((o) => ({ ...o, status: "Pending" }))
        );
        setVendororderActive(
          (ordersData.active || []).map((o) => ({ ...o, status: "Accepted" }))
        );
        setVendororderCancelled(
          (ordersData.cancelled || []).map((o) => ({
            ...o,
            status: "Cancelled",
          }))
        );
        setVendororderCompleted(
          (ordersData.completed || []).map((o) => ({
            ...o,
            status: "Completed",
          }))
        );
      } catch (error) {
        console.error("Failed to fetch orders", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      } finally{
        setLoading(false);
      }
    };
    fetchOrders();

    // const interval = setInterval(fetchOrders, 30000);
    // return () => clearInterval(interval);
  }, []);

  const handleOrderDecision = async (order, action, reason = "") => {
    try {
       setActiveProcessingOrder(order.id); 
       refetchOrders();
      const res = await vendorAcceptRejectOrder({
    orderId: order.id,
    action,
    message: reason,
  });

  console.log("working", res.data.message);
      setVendororderPending((prev) => prev.filter((o) => o.id !== order.id));

      if (action === "accept") {
        setVendororderActive((prev) => [
          ...prev,
          { ...order, status: "Accepted" },
        ]);

       toast.success(`Order ${order.orderNumber} accepted successfully`);
      } else if (action === "complete") {
        setVendororderActive((prev) => prev.filter((o) => o.id !== order.id));
        setVendororderCompleted((prev) => [
          ...prev,
          { ...order, status: "Completed" },
        ]);

        toast.success(`Order ${order.orderNumber} marked as completed`, {
          position: "top-center",
        });
      } else if (action === "reject") {
        setVendororderCancelled((prev) => [
          ...prev,
          { ...order, status: "Cancelled", reason },
        ]);

        toast.success(`Order ${order.orderNumber} rejected`);
      }

      setShowModal(false);
      setShowRejectCard(false);
    } catch (error) {
      console.error(`Failed to ${action} order`, error);

      toast.error(`Failed to ${action} order`);
    } finally {
      setActiveProcessingOrder(null);
    }
  };
  const handleRejectClick = (order) => {
    setSelectedOrder(order);
    setRejectReason("");
    setShowRejectCard(true);
  };

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
       <GlobalLoading /> 
      <div
        className={`orderWrapper ${
          showModal || showRejectCard ? "blurred" : ""
        }`}
      >
        <h2>Orders</h2>

        <div className="orderGasTabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "activity" : ""}
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
                    <span className={`statusP ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="priceSection">
                    <span className="price">₦{order.price}</span>
                  </div>
                </div>

                <div className="orderDetails">
                  <p className="name">
                    {order.user.firstName} {order.user.lastName}
                  </p>

                  <div className="infoRow">
                    <div className="leftInfo">
                      <div className="item">
                        <GoPackage /> {order.quantity}kg
                      </div>
                      <div className="item address">
                        <FaMapMarkerAlt /> {order.deliveryAddress}
                      </div>
                    </div>

                    <div className="centerInfo">
                      <div className="item">
                        <FaCalendarAlt />{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="item">
                        <FaClock />{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                      <div className="item">
                        <FaPhoneAlt />  {order?.user?.phoneNumber}
                      </div>
                    </div>

                    <div className="rightBtns">
                      <button
                        className="viewBtn"
                        onClick={() => {
                          setSelectedOrder(order);
                          if (activeTab === "Active") {
                            setShowAcceptModal(true);
                          } else {
                            setShowModal(true);
                          }
                        }}
                      >
                        View
                      </button>

                      {activeTab === "Pending" && (
                        <>
                          <button
                            className="acceptBtn"
                            onClick={() => handleOrderDecision(order, "accept")}
                             disabled={activeProcessingOrder === order.id}
                          >
                            Accept
                          </button>
                          
                          <button
                            className="rejectBtn"
                            onClick={() => handleRejectClick(order)}
                            disabled={activeProcessingOrder === order.id}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {/* {activeTab === "Active" && (
                        <button
                          className="completeBtn"
                          style={{
                            backgroundColor: "green",
                            color: "white",
                          }}
                          onClick={() => handleOrderDecision(order, "complete")}
                           disabled={activeProcessingOrder === order.id}
                        >
                          Complete
                        </button>
                      )} */}
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

      {showModal && activeTab === "Pending" && (
        <ViewOrderModal
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onAccept={(order) => handleOrderDecision(order, "accept")}
          onReject={handleRejectClick}
        />
      )}

      {showAcceptModal && activeTab === "Active" && (
        <AcceptOrderModal
          order={selectedOrder}
          onClose={() => setShowAcceptModal(false)}
          onComplete={(order) => handleOrderDecision(order, "complete")}
        />
      )}

      {showModal && activeTab === "Completed" && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setShowModal(false)}
        />
      )}

      {showModal && activeTab === "Cancelled" && (
        <RejectedOrder
          order={selectedOrder}
          onClose={() => setShowModal(false)}
        />
      )}

      {showRejectCard && (
        <div className="rejectOverlay" onClick={() => setShowRejectCard(false)}>
          <div className="rejectCard" onClick={(e) => e.stopPropagation()}>
            <h3>Reject Order</h3>
            <p>
              Please provide a reason for rejection. This will be sent to the
              Customer.
            </p>
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
                style={{ backgroundColor: "red", color: "#fff" }}
                onClick={() =>
                  handleOrderDecision(selectedOrder, "reject", rejectReason)
                }
                disabled={activeProcessingOrder === selectedOrder?.id} 
              >
                Confirm Rejection
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
