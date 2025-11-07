import React, { useEffect, useState } from "react";
import "./myorders.css";
import "./homecontent.css";
import { FiPackage } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import CompletionModal from "./modals/CompletionModal";
import { toast } from "react-toastify";
import { getAllOrders } from "../../../../../api/query";
import { handlePayment } from "../../../../../api/mutation";
import PaymentModal from "./modals/PaymentModal";
import SpinnerModal from "../../../../../Auth/vendor-auth/spinner-modal";
import PaymentPage from "../PaymentPage";

const MyOrders = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        const data = res?.data?.data || {};

        const allOrders = [
          ...(data.pending || []),
          ...(data.active || []),
          ...(data.completed || []),
          ...(data.cancelled || []),
        ];

        setOrders(allOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          nav("/userlogin");
        } else {
          toast.error("Failed to fetch orders");
        }
      }
    };

    fetchOrders();
  }, [nav]);

  const handlePayNow = async (order) => {
    try {
      setLoading(true);

      
      const res = await handlePayment(order.id);
     const paymentLink = res?.data?.data?.checkoutUrl;
     console.log("Raw response from handlePayment:", res);

      if (!paymentLink ) {
        throw new Error("Payment link not received from server");
      }

      setPaymentLink(paymentLink);

;
      setShowPaymentModal(true); 
      setLoading(false);
    } 
    catch (err) {
      setLoading(false);
      toast.error(
        err.response?.data?.message || "Payment initialization failed"
      );
      console.error("Payment error:", err);
    }
  };

  return (
    <main className="myorders">
      {loading && <SpinnerModal message="Initializing payment..." />}

      {showPaymentModal && (
        <PaymentModal
          paymentLink={paymentLink}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
      {show && (
        <CompletionModal order={orderDetails} onClose={() => setShow(false)} />
      )}

      <header className="heading">
        <div className="texts">
          <h3>My Orders</h3>
          <span>View your Orders</span>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="no-orders">
          <img
            src="/Images/empty-orders.svg"
            alt="No orders illustration"
            className="no-orders-img"
          />
          <h4>No order history yet</h4>
          <p>When you place your first order, it’ll appear here.</p>
        </div>
      ) : (
        orders.map((order) => {
          const status = order.status?.toLowerCase();

          let completeText = "";
          let completeClass = "";
          let trackText = "";
          let trackClass = "";
          let completeAction = null;

          switch (status) {
            case "pending":
            case "created":
              completeText = "Awaiting Confirmation";
              completeClass = "awaiting yellow-bg";
              trackText = "Cancel";
              trackClass = "cancel-btn";
              break;

            case "accepted":
              completeText = "Pay Now";
              completeClass = "pay-now orange-bg";
              completeAction = () => handlePayNow(order.paymentLink);
              trackText = "Cancel";
              trackClass = "cancel-btn";
              break;

            case "paid":
            case "confirmed":
              completeText = "Completed";
              completeClass = "completed green-bg";
              trackText = "Track Delivery";
              trackClass = "order-now adjust";
              break;

            case "completed":
              completeText = "Completed";
              completeClass = "completed green-bg";
              trackText = "Track Delivery";
              trackClass = "order-now adjust";
              break;

            default:
              completeText = "Unknown";
              completeClass = "awaiting";
              trackText = "Track Delivery";
              trackClass = "order-now adjust";
              break;
          }

          return (
            <section key={order.id} className="views extreme shrink">
              <div className="order-title">
                <p className="preview-title">{order.orderNumber}</p>
                <div className="available deliver">{order.status}</div>
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

              <section className="delivery-info">
                <div className="drivers-info">
                  <span>Driver</span>
                  <p>John Driver</p>
                  <span>+2348237824681</span>
                </div>

                <div className="complete-track">
                  {/* Awaiting (Created / Pending) */}
                  {(order.status === "pending" ||
                    order.status === "created") && (
                    <>
                      <button className="order-btn awaiting-btn" disabled>
                        Awaiting Confirmation
                      </button>
                      <button
                        className="order-btn cancel-btn"
                        onClick={() =>
                          toast.info("Order cancelled successfully")
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* Accepted → Pay Now + Cancel */}
                  {order.status === "active" && (
                    <>
                      <button
                        className="order-btn pay-btn"
                        onClick={() => handlePayNow(order)}
                      >
                        Pay Now
                      </button>
                      <button
                        className="order-btn cancel-btn"
                        onClick={() =>
                          toast.info("Order cancelled successfully")
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {(order.status === "paid" ||
                    order.status === "confirmed") && (
                    <>
                      <button
                        className="order-btn completed-btn"
                        onClick={() => {
                          setOrderDetails(order);
                          setShow(true); // show order details modal
                        }}
                      >
                        Completed
                      </button>
                      <button
                        className="order-btn deliver"
                        onClick={() => nav("/userdashboard/track-order")}
                      >
                        Track Delivery
                      </button>
                    </>
                  )}

                  {/* Completed → Completed (disabled) + Track */}
                  {order.status === "completed" && (
                    <>
                      <button className="order-btn completed-btn" disabled>
                        Completed
                      </button>
                      <button
                        className="order-btn deliver"
                        onClick={() => nav("/userdashboard/track-order")}
                      >
                        Track Delivery
                      </button>
                    </>
                  )}
                </div>
              </section>

              <div className="hr">
                <hr />
              </div>

              <div className="total">
                <p>Total Amount</p>
                <p>
                  <TbCurrencyNaira size={24} />
                  {order.totalPrice}
                </p>
              </div>
            </section>
          );
        })
      )}
    </main>
  );
};

export default MyOrders;
