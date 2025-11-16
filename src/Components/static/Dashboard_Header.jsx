/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import "../../styles/dashboardHeader.css";
import { useNavigate } from "react-router";
import axios from "axios";
import logo from "../../assets/Header.png";

const DashboardHeader = ({ rider: propRider }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rider, setRider] = useState(propRider || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiderData = async () => {
      try {
        const riderId = localStorage.getItem("riderId");
        const token = localStorage.getItem("authToken");

        if (!riderId || !token) {
          console.error("[v0] Rider ID or token not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://refillexpress.onrender.com/api/v1/rider/${riderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          setRider(response.data.data);
        }
      } catch (err) {
        console.error(
          "[v0] Error fetching rider data:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRiderData();
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
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
            <img src={logo} alt="logo" />
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
            <h4
              onClick={() => handleNavigation("/rider-dashboard")}
              className="sidebar_nav_link"
            >
              Dashboard
            </h4>
            <h4
              onClick={() => handleNavigation("/rider-dashboard/order")}
              className="sidebar_nav_link"
            >
              Order
            </h4>
            <h4
              onClick={() => handleNavigation("/rider-dashboard/earnings")}
              className="sidebar_nav_link"
            >
              Earnings
            </h4>
            <h4
              onClick={() => handleNavigation("/rider-dashboard/account")}
              className="sidebar_nav_link"
            >
              Account
            </h4>
            <button className="sidebar_logout_btn">Logout</button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
