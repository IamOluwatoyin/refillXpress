import React from "react";
import "./trackorder.css";

const MyOrders = () => {
  const progressSteps = [
    "Navigate to Customer",
    "Pick Up Empty Cylinder",
    "Navigate to Vendor",
    "Cylinder Refill at Vendor",
    "Return to Customer",
    "Deliver Filled Cylinder",
  ];

  const currentStep = 6; // active step (1–6)

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
              style={{ width: `${(currentStep / progressSteps.length) * 100}%` }}
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
            <p><strong>Order ID:</strong> #GR45821</p>
            <p><strong>Quantity:</strong> 11kg</p>
            <p><strong>Amount:</strong> ₦12,500</p>
            <p><strong>Delivery Address:</strong> No 1 SINZU STREET OJODU</p>
          </div>

          <div className="details-card">
            <h4>Driver Information</h4>
            <div className="driver-info">
              <div className="avatar">JD</div>
              <div>
                <p className="driver-name">John Driver</p>
                <span className="driver-status">En Route</span>
              </div>
            </div>

            <p className="contact-title">Contact Driver</p>
            <div className="contact-box">
              <span className="phone-icon">📞</span>
              <span>+2347089765543</span>
            </div>

            <p className="arrival-title">Estimated Arrival</p>
            <h3 className="arrival-time">15 mins</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
