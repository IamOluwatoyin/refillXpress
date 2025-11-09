import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";
import { getAllOrders } from "../../../../api/query";
import SpinnerModal from "../../../../Auth/vendor-auth/spinner-modal";

const PaymentPage = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const paymentRef = queryParams.get("reference");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

       
        const res = await getAllOrders();
        const allOrders = [
          ...(res?.data?.data?.pending || []),
          ...(res?.data?.data?.active || []),
          ...(res?.data?.data?.completed || []),
          ...(res?.data?.data?.cancelled || []),
        ];

        // 2️⃣ Find the specific order using the orderId
        const matchedOrder = allOrders.find(o => o.id === orderId);
        setOrder(matchedOrder || null);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  // 3️⃣ Loading state
  if (loading) {
    return <SpinnerModal message="Loading your payment details..." />;
  }

  // Fallback if order not found
  if (!order) {
    return (
      <main className="payment-page">
        <div className="payment-card">
          <h2 style={{ color: "#005BAC" }}>Payment Info Not Found</h2>
          <p>Please make a payment from My Orders page.</p>
          <button
            className="back-btn"
            onClick={() => nav("/userdashboard/myorders")}
          >
            Back to My Orders
          </button>
        </div>
      </main>
    );
  }

  // Display receipt
  return (
    <main className="payment-page">
      <div className="payment-card">
        <h2 className="payment-title" style={{ color: "#005BAC" }}>
          Payment Successful 🎉
        </h2>
        <p className="receipt-line">
          Thank you! Your payment has been processed successfully.
        </p>

        <div className="receipt-details">
          <p><strong>Order Number:</strong> {order.orderNumber}</p>
          <p><strong>Amount Paid:</strong> ₦{order.totalPrice}</p>
          <p><strong>Payment Reference:</strong> {paymentRef}</p>
          <p><strong>Vendor:</strong> {order.vendor?.businessName}</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
        </div>

        <button
          className="back-btn"
          onClick={() =>
            nav("/userdashboard/myorders", { state: { tab: "Active" } })
          }
        >
          Go to My Orders
        </button>
      </div>
    </main>
  );
};

export default PaymentPage;
