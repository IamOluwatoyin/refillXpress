import React from "react";
import "./VendorDashboardEmpty.css";
import { FaThLarge } from "react-icons/fa";
import { useNavigate } from "react-router";

const VendorDashboardEmpty = () => {
  const navigate = useNavigate()
  return (
    <div className="dashboard-empty-container">
      <p className="dashboard-title">Welcome to your Vendor Dashboard!</p>
       <div className="dashboardEmpty-holder">
          <div className="dashboard-card">
        <div className="dashboard-icon">
          <FaThLarge size={40} />
        </div>

        <p className="dashboard-text">
        Welcome to RefillXpress! Your account has been successfully set up. We'll get you verified within 24-48 hours, and then you can dive into your dashboard. We're excited to have you on board!
        </p>

        <p className="dashboard-subtext">
          Click the Button below back to Home.
        </p>

        <button className="get-started-btn" onClick={()=>navigate("/")}>Back to Home</button>
      </div>
       </div>
      
    </div>
  );
};

export default VendorDashboardEmpty;
