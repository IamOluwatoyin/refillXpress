import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/dashboardSidebar.css";
import { AiOutlineLogout } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import {
  MdDashboard,
  MdShoppingCart,
  MdAttachMoney,
  MdAccountCircle,
} from "react-icons/md";

const navItems = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    path: "/rider-dashboard",
  },
  {
    name: "Orders",
    icon: MdShoppingCart,
    path: "/rider-dashboard/order",
  },
  {
    name: "Earnings",
    icon: TbCurrencyNaira,
    path: "/rider-dashboard/earnings",
  },
  {
    name: "Account",
    icon: MdAccountCircle,
    path: "/rider-dashboard/account",
  },
];

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "350px",
    width: "90%",
  };

  const buttonContainerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  };

  const buttonBaseStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
    minWidth: "100px",
  };

  const confirmButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#ff5722",
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#eee",
    color: "#333",
    border: "1px solid #ccc",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>Confirm Logout 👋</h3>
        <p>Are you sure you want to log out of your account?</p>
        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={onCancel}>
            Cancel
          </button>
          <button style={confirmButtonStyle} onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard_Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isItemActive = (path) => {
    if (location.pathname === path) {
      return true;
    }
    if (path === "/rider-dashboard") {
      return location.pathname === path || location.pathname === path + "/";
    }
    return location.pathname.startsWith(path + "/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="sidebar_container">
        <div className="sidebar_card">
          <nav className="sidebar_nav">
            {navItems.map((item) => {
              const itemClasses = `nav_item ${
                isItemActive(item.path) ? "active" : ""
              }`;

              return (
                <div
                  key={item.name}
                  className={itemClasses}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="nav_icon" size={22} />
                  <span className="nav_text">{item.name}</span>
                  {item.badge && (
                    <span className="nav_badge">{item.badge}</span>
                  )}
                </div>
              );
            })}

            <div key="Logout" className="nav_item" onClick={handleLogoutClick}>
              <AiOutlineLogout className="nav_icon" size={22} />
              <span className="nav_text">Logout</span>
            </div>
          </nav>
        </div>
      </div>

      <ConfirmModal
        show={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
};

export default Dashboard_Sidebar;
