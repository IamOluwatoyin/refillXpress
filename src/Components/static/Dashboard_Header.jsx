import React from "react";
import "../../styles/dashboardHeader.css";
import dashboardLogo from "../../assets/dashboard_logo.png";

const DashboardHeader = () => {
  return (
    <header className="dashboard_header">
      <div className="dashboard_headerWrapper">
        <div className="header_left">
          <img src={dashboardLogo} alt="" />
        </div>

        <div className="header_right">
          <div className="user_image_placeholder"></div>
          <div className="user_info">
            <span className="user_name">Glory Drews</span>
            <span className="user_role">Customer</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
