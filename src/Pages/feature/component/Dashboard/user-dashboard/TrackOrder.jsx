import React, { useEffect, useState } from "react";
import "./trackorder.css";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderTrack } from "../../../../../api/query";
import { useLoading } from "../../../../../context/LoadingContext";
import { useRefetch } from "../../../../../api/refetch";

const TrackOrder = () => {
  const [orderData, setOrderData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const orderId = location.state?.orderId;

  const progressSteps = [
    "Navigating to Customer",
    "Picked Up Cylinder",
    "Navigating to Vendor",
    "Refilling Cylinder",
    "Returning to Customer",
    "Completed",
  ];
  

  const userOrderTrack = async () => {
    if (!orderId) return;
   
    try {
      const res = await orderTrack(orderId);

      const data = res?.data?.data;
      console.log("Tracking data:", data);

      if (data) {
        setOrderData(data);
        const currentIndex = data.trackingStages?.findIndex(
          (s) => s === data.currentStage
        );
        setCurrentStep(currentIndex >= 0 ? currentIndex + 1 : 0);
      }
    } catch (err) {
      console.error("Error fetching order tracking:", err);
      toast.error(
        err?.response?.data?.message || "Failed to fetch tracking data"
      );
    } finally {
      setHasFetchedOnce(true);
    }
  };

  useEffect(() => {
    if (!orderId) {
      toast.error("No order selected to track");
      navigate("/userdashboard/myorders");
      return;
    }

    userOrderTrack();
    const interval = setInterval(userOrderTrack, 10000); // refresh every 20s
    return () => clearInterval(interval);
  }, [orderId]);

  

  // If API finished and no rider assigned
  if (hasFetchedOnce && !orderData?.rider?.name) {
  return (
    <div style={{
      marginTop: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      width: "100%"
    }}>
      <p>Tracking info not available, No rider has accepted the order</p>
    </div>
  );
}

   

  // Render tracking info once rider is available
  return (
    <div className="orders-container">
      <i size={20} onClick={()=> navigate(-1)} style={{paddingRight: "2rem"}}><BsArrowLeft /></i><h2 className="page-title">Track Delivery</h2>

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
              <strong>Total:</strong> ₦
              {orderData?.totalPrice?.toLocaleString() || "--"}
            </p>
            <p>
              <strong>Delivery Fee:</strong> ₦
              {orderData?.deliveryFee?.toLocaleString() || "--"}
            </p>
            <p>
              <strong>Delivery Address:</strong>{" "}
              {orderData?.user?.address || "--"}
            </p>
          </div>

          <div className="details-card">
            <h4>Rider Information</h4>
            <div className="driver-info">
              <div className="avatar">
                {orderData?.driver?.name
                  ? orderData.driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "RD"}
              </div>
            ) : (
              <div className="driver-info">
                <div className="avatar">
                  {orderData?.rider?.name
                    ? orderData?.rider?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "RD"}
                </div>
                <div>
                  <p className="driver-name">{orderData?.rider?.name || "—"}</p>
                  <span className="driver-status">En Route</span>
                </div>

                <p className="contact-title">Contact Rider</p>
                <div className="contact-box">
                  <span className="phone-icon">📞</span>
                  <span>{orderData?.rider?.phoneNumber || "--"}</span>
                </div>

                <p className="arrival-title">Estimated Arrival</p>
                <h3 className="arrival-time">
                  {orderData?.estimatedArrival
                    ? new Date(orderData?.estimatedArrival).toLocaleTimeString()
                    : "30 mins - 45 mins"}
                </h3>
              </div>
            </div>

            <p className="contact-title">Contact Rider</p>
            <div className="contact-box">
              <span className="phone-icon">📞</span>
              <span>{orderData?.rider?.phoneNumber || "--"}</span>
            </div>

            <p className="arrival-title">Estimated Arrival</p>
            <h3 className="arrival-time">
              {orderData?.estimatedArrival
                ? new Date(orderData.estimatedArrival).toLocaleTimeString()
                : "—"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
