import React, { useState } from "react";
import "../../styles/dashboardHeader.css";
import { useNavigate } from "react-router";

const DashboardHeader = ({ rider }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleGoBack = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const riderName =
    rider?.firstName && rider?.lastName
      ? `${rider.firstName} ${rider.lastName}`
      : "Rider Name";
  const riderRole = rider?.role || rider?.email || "Rider";
  const initials =
    riderName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "GD";

  return (
    <>
      <header className="dashboard_header">
        <div className="dashboard_headerWrapper">
          <div className="header_left" onClick={handleGoBack}>
            <img
              src="/Images/dashboard_logo.png"
              alt="Brand Logo"
              className="logo-image"
            />
          </div>

          <div className="desktop_user_profile">
            <div className="user_image_placeholder">{initials}</div>
            <div className="user_info">
              <span className="user_name">{riderName}</span>
              <span className="user_role">{riderRole}</span>
            </div>
          </div>

          <div className="mobile_right_group">
            <button
              className="menu_button"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <span className="menu_icon">☰</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile_sidebar ${
          isSidebarOpen ? "mobile_sidebar--open" : ""
        }`}
      >
        <div className="mobile_sidebar_overlay" onClick={closeSidebar}></div>

        <div className="mobile_sidebar_content">
          <div className="mobile_sidebar_header">
            <button
              className="mobile_sidebar_close"
              onClick={closeSidebar}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="sidebar_user_profile">
            <div className="user_image_placeholder">{initials}</div>
            <div className="sidebar_user_info">
              <span className="sidebar_user_name">{riderName}</span>
              <span className="sidebar_user_role">{riderRole}</span>
            </div>
          </div>

          <nav className="sidebar_navigation">
            <a href="/dashboard" className="sidebar_nav_link">
              Dashboard
            </a>
            <a href="/rides" className="sidebar_nav_link">
              My Rides
            </a>
            <a href="/profile" className="sidebar_nav_link">
              Profile
            </a>
            <a href="/settings" className="sidebar_nav_link">
              Settings
            </a>
            <button className="sidebar_logout_btn">Logout</button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
