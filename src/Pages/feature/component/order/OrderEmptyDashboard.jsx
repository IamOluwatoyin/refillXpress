import React from "react";
import "./VendorDashboardEmpty.css";
import { FaThLarge } from "react-icons/fa"; 

const OrderEmptyDashboard = () => {
  return (
    <div className="dashboard-empty-container">
      <p className="dashboard-title">Orders</p>
       <div className="dashboardEmpty-holder">
          <div className="dashboard-card">
        <div className="dashboard-icon">
          <FaThLarge size={40} />
        </div>

        <p className="dashboard-text">
         No orders yet. Once customers place orders, they’ll appear here
        </p>

      </div>
       </div>
      
    </div>
  );
};

export default OrderEmptyDashboard;
