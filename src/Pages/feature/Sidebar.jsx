import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaStar, FaRegUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { GoPackage } from "react-icons/go";
import { VscGraph } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut, IoIosClose } from "react-icons/io";
import {
  getAllReviews,
  getVendorId,
  getVendorKyc,
} from "../../api/query";
import { toast } from "react-toastify";
import { useOrders } from "../../context/PendingOrderContext";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [verifyBadge, setVerifyBadge] = useState();
  const id = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);

  const { orders } = useOrders();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await getVendorId(id);
        setVendor(response.data);
        
        const isVerifyRes = await getVendorKyc(id);
        setVerifyBadge(isVerifyRes?.data?.data);

        const reviewsRes = await getAllReviews();
        const reviews = reviewsRes?.data?.data || [];
        const vendorReviews = reviews.filter(
          (review) => review.vendorId === id
        );

        if (vendorReviews.length > 0) {
          const avg =
            vendorReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            vendorReviews.length;
          setAverageRating(avg.toFixed(1));
        }
      } catch (error) {
        console.error("Failed to fetch vendor:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    };

    fetchVendor();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 1024 && onClose) {
      onClose();
    }
  };

  const currentPath = location.pathname;
  const isDashboardActive = currentPath === "/vendor-dashboard";
  const isOrderActive = currentPath.startsWith("/vendor-dashboard/vendor-order");

  return (
    <div className="sidebarWrapper">
      <div className="sidebarContainer">
        {/* Logo and Close Button in same line */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/Images/logo.svg" alt="RefillXpress Logo" className="sidebar-logo-img" />
            <h2 className="sidebar-logo-text">
              Refill<span>Xpress</span>
            </h2>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <IoIosClose />
          </button>
        </div>

        <section className="vendor-icon-holder">
          <div className="vendor-icon-wrapper">
            <img src="/Images/Container.svg" alt="Vendor" />
            <aside>
              {vendor?.data?.businessName}
              <div className="spaceicon">
                {averageRating > 0 && (
                  <span className="vendor-rating">
                    <FaStar style={{ color: "gold", fontSize: "16px" }} />
                    <span style={{ marginLeft: "4px", fontWeight: "500" }}>
                      {averageRating}
                    </span>
                  </span>
                )}

                {verifyBadge?.verificationStatus === "approved" && (
                  <button className="verified-btn">Verified</button>
                )}
              </div>
            </aside>
          </div>
        </section>

        <div className="sidebar-nav-items">
          <span
            onClick={() => handleNavigation("/vendor-dashboard")}
            className={`sidebar-item dashboards ${isDashboardActive ? "activated" : ""}`}
          >
            <MdDashboard className="sidebar-icon" />
            <p>Dashboard</p>
          </span>

          <span
            onClick={() => handleNavigation("/vendor-dashboard/vendor-order")}
            className={`sidebar-item dashboard-order ${isOrderActive ? "activated" : ""}`}
          >
            <GoPackage className="sidebar-icon" />
            <sub>
              Orders
             {/* <span className="profileNotification">
                {Array.isArray(orders) && orders.length > 0 ? orders.length : 0}
              </span> */}

            </sub>
          </span>

          <span
            onClick={() => handleNavigation("/vendor-dashboard/vendor-analytics")}
            className={`sidebar-item analytics ${
              currentPath === "/vendor-dashboard/vendor-analytics" ? "activated" : ""
            }`}
          >
            <VscGraph className="sidebar-icon" />
            <p>Analytics</p>
          </span>

          <span
            onClick={() => handleNavigation("/vendor-dashboard/vendor-profile")}
            className={`sidebar-item profiles ${
              currentPath === "/vendor-dashboard/vendor-profile" ? "activated" : ""
            }`}
          >
            <FaRegUser className="sidebar-icon" />
            <p>Account</p>
          </span>

          <span
            onClick={() => handleNavigation("/vendor-dashboard/vendor-settings")}
            className={`sidebar-item settings ${
              currentPath === "/vendor-dashboard/vendor-settings" ? "activated" : ""
            }`}
          >
            <CiSettings className="sidebar-icon" />
            <p>Settings</p>
          </span>
        </div>

        {/* Logout at the bottom */}
        <div className="sidebar-footer">
          <span 
            className="sidebar-item Dashboard-logout"
            onClick={() => {
              localStorage.removeItem(import.meta.env.VITE_VENDOR_TOKEN);
              localStorage.removeItem(import.meta.env.VITE_VENDOR_ID);
              navigate("/");
              if (onClose) onClose();
            }}
          >
            <IoIosLogOut className="sidebar-icon logout-icon" />
            <p>Logout</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;