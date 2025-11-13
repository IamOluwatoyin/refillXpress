import React, { useEffect, useState } from "react";
import "./trackorder.css";
import { orderTrack } from "../../../../../api/query";

const MyOrders = ({ orderId }) => {
  const [orderData, setOrderData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const progressSteps = [
    "Navigating to Customer",
    "Picked Up Cylinder",
    "Navigating to Vendor",
    "Refilling Cylinder",
    "Returning to Customer",
    "Completed",
  ];

  
  const userOrderTrack = async () => {
    try {
      const res = await orderTrack(orderId);
      const data = res?.data?.data;
      console.log("nav", data )
      if (data) {
        setOrderData(data);

        // match API stage to our local progress index
        const currentIndex = data.trackingStages.findIndex(
          (s) => s === data.currentStage
        );
        setCurrentStep(currentIndex + 1);
      }
    } catch (err) {
      console.error("Error fetching order tracking:", err);
    }
  };

  
  useEffect(() => {
    if (orderId) {
      userOrderTrack();
      const interval = setInterval(userOrderTrack, 10000); 
      return () => clearInterval(interval);
    }
  }, [orderId]);

  return (
    <div className="orders-container">
      <h2 className="page-title">My Orders</h2>

      <div className="orders-grid">
        {/* LEFT SIDE – DELIVERY PROGRESS */}
        <div className="progress-card">
          <h3 className="section-title">Delivery Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(currentStep / progressSteps.length) * 100}%`,
              }}
            ></div>
          </div>

          <ul className="progress-list">
            {progressSteps.map((step, index) => (
              <li
                key={index}
                className={`progress-item ${
                  index + 1 === currentStep ? "active" : ""
                }`}
              >
                <span className="circle"></span>
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE – ORDER DETAILS */}
        <div className="details-column">
          <div className="details-card">
            <h4>Order Details</h4>
            <p>
              <strong>Order Number:</strong> {orderData?.orderNumber || "--"}
            </p>
            <p>
              <strong>Quantity:</strong> {orderData?.quantity} x{" "}
              {orderData?.cylinderSize}
            </p>
            <p>
              <strong>Total:</strong> ₦{orderData?.totalPrice?.toLocaleString()}
            </p>
            <p>
              <strong>Delivery Fee:</strong> ₦
              {orderData?.deliveryFee?.toLocaleString()}
            </p>
            <p>
              <strong>Delivery Address:</strong> {orderData?.user?.address}
            </p>
          </div>

          <div className="details-card">
            <h4>Rider Information</h4>
            <div className="driver-info">
              <div className="avatar">
                {orderData?.user?.name
                  ? orderData.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "RD"}
              </div>
              <div>
                <p className="driver-name">{orderData?.user?.name || "—"}</p>
                <span className="driver-status">
                  {orderData?.currentStatus || "—"}
                </span>
              </div>
            </div>

            <p className="contact-title">Contact Rider</p>
            <div className="contact-box">
              <span className="phone-icon">📞</span>
              <span>{orderData?.user?.phone || "--"}</span>
            </div>

            <p className="arrival-title">Estimated Arrival</p>
            <h3 className="arrival-time">—</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
