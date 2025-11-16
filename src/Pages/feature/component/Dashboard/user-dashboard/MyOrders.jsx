import React, { useEffect, useState } from "react";
import "./myorders.css";
import "./homecontent.css";
import { FiPackage } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { TbCurrencyNaira } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import CompletionModal from "./modals/CompletionModal";
import PaymentModal from "./modals/PaymentModal";
import { toast } from "react-toastify";
import { getAllOrders } from "../../../../../api/query";
import { handlePayment, userCanceledOrder } from "../../../../../api/mutation";
import { useLoading } from "../../../../../context/LoadingContext";
import SpinnerModal from "../../../../../Auth/vendor-auth/spinner-modal";
import DeliveryVerification from "./modals/DeliveryVerification";
import { useRefetch } from "../../../../../api/refetch";

const MyOrders = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  const { refetch } = useRefetch(getAllOrders);
  const nav = useNavigate();
  const { loading, setLoading } = useLoading();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "Pending");
  const [orders, setOrders] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const [processingOrderId, setProcessingOrderId] = useState(null);
  const [showDelivery, setShowDelivery] = useState(false);
  const [deliveryCode, setDeliveryCode] = useState("");
  const [trackLoading, setTrackLoading] = useState(null);

  const tabs = [
    { label: "Pending", key: "Pending" },
    { label: "Accepted", key: "Accepted" },
    { label: "Active", key: "Active" },
    { label: "Completed", key: "Completed" },
    { label: "Cancelled", key: "Cancelled" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        const data = res?.data?.data || {};

        setOrders([
            ...(data.pending || []),
            ...(data.accepted || []),
            ...(data.active || []),
            ...(data.completed || []),
            ...(data.cancelled || []),
          ]);

      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error(err?.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    window.history.replaceState({}, document.title);
  }, [location.state, setLoading]);

  const [processingOrders, setProcessingOrders] = useState([]);

  const handleCancelOrder = async (order) => {
    const token = localStorage.getItem("token");
    console.log("Token before cancel request:", token);

    if (processingOrders.includes(order.id)) return;
    setProcessingOrderId(order.id);
    setProcessingOrders((prev) => [...prev, order.id]);
    try {
      console.log(token, order.id);
      await userCanceledOrder(order.id);
      toast.success(`Order ${order.orderNumber} cancelled successfully`);
      refetch();
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "cancelled" } : o))
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to cancel order");
    } finally {
      setProcessingOrders((prev) => prev.filter((id) => id !== order.id));
      setProcessingOrderId(null);
    }
  };

  const handlePayNow = async (order) => {
    setProcessingOrderId(order.id);
    setPayLoading(true);
    try {
      const res = await handlePayment(order.id);
      const link = res?.data?.data?.checkoutUrl;

      if (!link) throw new Error("Payment link missing");

      setSelectedOrder(order);
      setPaymentLink(link);
      setShowPaymentModal(true);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "payment initialization failed"
      );
      console.log("pay", err);
    } finally {
      setPayLoading(false);
      setProcessingOrderId(null);
    }
  };

  const getOrdersForTab = () => {
    if (!orders || orders.length === 0) return [];

    switch (activeTab) {
      case "Pending":
        // Orders that are not yet accepted or paid
        return orders.filter(
          (o) => o.status === "pending" || o.status === "created"
        );

      case "Accepted":
        // Orders accepted but not yet paid
        return orders.filter(
          (o) =>
            o.status === "accepted" ||
            (o.status === "active" && o.paymentStatus === "unpaid")
        );

      case "Active":
        // Orders that are paid and in-progress
         return orders.filter((o) => o.paymentStatus === "paid");

      case "Completed":
        // Fully delivered/completed orders
        return orders.filter((o) => o.status === "completed");

      case "Cancelled":
        // Cancelled orders
        return orders.filter((o) => o.status === "cancelled");

      default:
        return [];
    }
  };

  const orderCounts = {
    Pending: orders.filter(
      (o) => o.status === "pending" || o.status === "created"
    ).length,
    Accepted: orders.filter(
      (o) =>
        o.status === "accepted" ||
        (o.status === "active" && o.paymentStatus !== "paid")
    ).length,
    Active: orders.filter(
      (o) =>
        o.status === "active" ||
        o.status === "confirmed" ||
        o.paymentStatus === "paid"
    ).length,
    Completed: orders.filter((o) => o.status === "completed").length,
    Cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <main className="myorders" style={{ position: "relative" }}>
      {loading && <div className="global-loading">Loading...</div>}

      {payLoading && <SpinnerModal message="Initializing payment..." />}

      {/* Payment modal */}
      {showPaymentModal && selectedOrder && (
        <PaymentModal
          paymentLink={paymentLink}
          order={selectedOrder}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {/* Completion modal */}
      {/* {showCompletion && (
  <CompletionModal
    order={orderDetails}
    onClose={() => setShowCompletion(false)}
    onGenerateCode={handleGenerateCode} 
  />
)} */}

      {showDelivery && (
        <DeliveryVerification
          order={orderDetails}
          code={deliveryCode}
          onClose={() => setShowDelivery(false)}
        />
      )}

      <header className="heading">
        <div className="texts">
          <h3>My Orders</h3>
          <span>View your Orders</span>
        </div>
      </header>

      {/* Tabs */}
      <div className="orderGasTabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "activity" : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className="orderCountBadge">{orderCounts[tab.key] || 0}</span>
          </button>
        ))}
      </div>

      {/* Orders */}
      {getOrdersForTab().length === 0 ? (
        <div className="no-orders">
          <img src="/Images/empty-orders.svg" alt="No orders" />
          <h4>No {activeTab.toLowerCase()} orders yet</h4>
        </div>
      ) : (
        getOrdersForTab().map((order) => (
          <section key={order.id} className="views extreme shrink">
            <div className="order-title">
              <p className="preview-title">{order.orderNumber}</p>
              <div className={`available deliver ${order.status}`}>
                {order.status}
              </div>
            </div>

            <div className="for-time">
              <small>{new Date(order.createdAt).toLocaleString()}</small>
            </div>

            <div className="order-type">
              <div className="icon-details">
                <em className="desc-icon">
                  <FiPackage />
                </em>
                <div className="desc">
                  <span>Gas Type</span>
                  <p>{order.gasType || `${order.cylinderSize}kg`}</p>
                </div>
              </div>

              <div className="icon-details">
                <em className="desc-icon">
                  <GrLocation />
                </em>
                <div className="desc">
                  <span>Delivery Address</span>
                  <p>{order.deliveryAddress}</p>
                </div>
              </div>

              <div className="icon-details">
                <em className="desc-icon">
                  <FiPackage />
                </em>
                <div className="desc">
                  <span>Vendor</span>
                  <p>{order.vendor?.businessName}</p>
                </div>
              </div>
            </div>

            <div className="hr">
              <hr />
            </div>

            {/* Buttons based on tab */}
            <div className="complete-track">
              {activeTab === "Pending" && (
                <>
                  <button
                    className="order-btn awaiting-btn"
                    disabled={processingOrderId === order.id}
                  >
                    Awaiting Confirmation
                  </button>

                  <button
                    className="order-btn cancel-btn"
                    onClick={() => handleCancelOrder(order)}
                    disabled={processingOrderId === order.id}
                  >
                    Cancel
                  </button>
                </>
              )}

              {activeTab === "Accepted" && (
                <>
                  <button
                    className="order-btn pay-btn"
                    onClick={() => handlePayNow(order)}
                    disabled={processingOrderId === order.id}
                  >
                    Pay Now
                  </button>
                  <button
                    className="order-btn cancel-btn"
                    onClick={() => handleCancelOrder(order)}
                    disabled={processingOrderId === order.id}
                  >
                    Cancel
                  </button>
                </>
              )}

             {activeTab === "Active" && (
  <>
    <button
      className="order-btn completed-btn"
      onClick={() => {
        setOrderDetails(order);
        setDeliveryCode(order?.otp);
        setShowDelivery(true);
      }}
      disabled={trackLoading === order.id}
    >
      Complete
    </button>

    <button
      className="order-btn track-btn"
      onClick={async () => {
        setTrackLoading(order.id);
        await new Promise((res) => setTimeout(res, 500)); // simulate loading
        nav("/userdashboard/track-order", { state: { orderId: order.id, tab: activeTab } });
        setTrackLoading(null);
      }}
      disabled={trackLoading === order.id}
    >
      {trackLoading === order.id ? "Loading..." : "Track Delivery"}
    </button>
  </>
)}


              {activeTab === "Completed" && (
                <>
                  <button
                    className="order-btn completed-btn"
                    style={{ background: "#80a171ff", color: "#236b09ff" }}
                    disabled
                  >
                    Completed
                  </button>
                  {/* <button className="order-btn track-btn">Delivered</button> */}
                </>
              )}

              {activeTab === "Cancelled" && (
                <button className="order-btn cancel-btn" disabled>
                  Cancelled
                </button>
              )}
            </div>

            <div className="hr">
              <hr />
            </div>

            <div className="total">
              <p>Total Amount</p>
              <p>
                <TbCurrencyNaira size={20} />
                {order.totalPrice}
              </p>
            </div>
          </section>
        ))
      )}
    </main>
  );
};

export default MyOrders;
