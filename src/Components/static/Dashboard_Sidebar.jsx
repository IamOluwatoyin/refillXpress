import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/dashboardSidebar.css";

import {
  MdDashboard,
  MdShoppingCart,
  MdAttachMoney,
  MdLeaderboard,
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
    badge: 1,
  },
  {
    name: "Earnings",
    icon: MdAttachMoney,
    path: "/rider-dashboard/earnings",
  },
  {
    name: "Leaderboard",
    icon: MdLeaderboard,
    path: "/rider-dashboard/leaderboard",
  },
  {
    name: "Account",
    icon: MdAccountCircle,
    path: "/rider-dashboard/account",
  },
];

const Dashboard_Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
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
                {item.badge && <span className="nav_badge">{item.badge}</span>}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Dashboard_Sidebar;
