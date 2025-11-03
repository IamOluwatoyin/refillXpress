import React from "react";
import "./VendorDashboardEmpty.css";
import { FaThLarge } from "react-icons/fa"; // the 2x2 square grid icon

const VendorDashboardEmpty = () => {
  return (
    <div className="dashboard-empty-container">
      <p className="dashboard-title">Welcome to your Vendor Dashboard!</p>
       <div className="dashboardEmpty-holder">
          <div className="dashboard-card">
        <div className="dashboard-icon">
          <FaThLarge size={40} />
        </div>

        <p className="dashboard-text">
          You haven't received any activity yet. Once customers start placing gas
          refill orders, your stats and reports will appear here
        </p>

        <p className="dashboard-subtext">
          Click the Button below to learn how to get started
        </p>

        <button className="get-started-btn">Get Started</button>
      </div>
       </div>
      
    </div>
  );
};

export default VendorDashboardEmpty;
