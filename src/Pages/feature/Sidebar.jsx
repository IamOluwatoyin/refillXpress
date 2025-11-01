import React, { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { MdDashboard, MdRateReview } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { GoPackage } from "react-icons/go";
import { VscGraph } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { FaUser } from "react-icons/fa"
import { LuImagePlus } from "react-icons/lu";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  console.log("PATH:", currentPath);
  const isDashboardActive = currentPath === "/vendor-dashboard";
  const isOrderActive = currentPath.startsWith(
    "/vendor-dashboard/vendor-order"
  );
  return (
    <div className="sidebarWrapper">
      <div className="sidebarContainer">
        <section className="vendor-icon-holder">
          <div className="vendor-icon-wrapper">
            <img src="/Images/Container.svg" />
            {/* <LuImagePlus/> */}
            <aside>
              Max Gas Supply
              <div className="spaceicon">
                <span>
                  <FaStar style={{ color: "gold", fontSize: "16px" }} />
                  {""}
                  {""}4.8
                </span>
                <button className="verified-btn">Verified</button>
              </div>
            </aside>
          </div>
        </section>

        <span
          onClick={() => navigate("/vendor-dashboard")}
          className={`dashboards ${isDashboardActive ? "active" : ""}`}
        >
          <MdDashboard style={{ color: "#FF7F11", fontSize: "25px" }} />
          <p>Dashboard</p>
        </span>

        <span
          onClick={() => navigate("/vendor-dashboard/vendor-order")}
          className={`orders ${isOrderActive ? "active" : ""}`}
        >
          <GoPackage style={{ fontSize: "25px" }} />
          <sub>
            Orders
            <span className="profileNotification">
              0
            </span>
          </sub>
        </span>
        <span
          onClick={() => navigate("/vendor-dashboard/vendor-analytics")}
          className={`analytics ${
            currentPath === "/vendor-dashboard/vendor-analytics" ? "active" : ""
          }`}
        >
          <VscGraph style={{ fontSize: "25px" }} />
          <p>Analytics</p>
        </span>

        <span
          onClick={() => navigate("/vendor-dashboard/vendor-profile")}
          className={`profiles ${
            currentPath === "/vendor-dashboard/vendor-profile" ? "active" : ""
          }`}
        >
          <FaUser style={{ fontSize: "25px" }} />
          <p>Account</p>
        </span>
        <span
          onClick={() => navigate("/vendor-dashboard/vendor-settings")}
          className={`settings ${
            currentPath === "/vendor-dashboard/vendor-settings" ? "active" : ""
          }`}
        >
          <CiSettings style={{ fontSize: "28px" }} />
          <p>Settings</p>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
