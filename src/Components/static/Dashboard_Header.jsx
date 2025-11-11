import React from "react";
import "../../styles/dashboardHeader.css";
import { useNavigate } from "react-router";

const DashboardHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <header className="dashboard_header">
      <div className="dashboard_headerWrapper">
        <div className="header_left" onClick={handleGoBack}>
          <img src="/Images/dashboard_logo.png" alt="Brand Logo" />
        </div>

        <div className="mobile_right_group">
          <div className="menu_button" onClick={toggleSidebar}>
            ☰
          </div>

          <div className="header_right">
            <div className="user_image_placeholder">GD</div>
            <div className="user_info">
              <span className="user_name">Glory Drews</span>
              <span className="user_role">Customer</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
