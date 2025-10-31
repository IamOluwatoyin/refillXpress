import React from "react";
import DashboardHeader from "./Dashboard-Header";
import "./DashboardLayout.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div classNames="DashboardlayoutWrapper">
      <DashboardHeader />
      <div className="Content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div
          style={{
            width: "80%",
            // background:"red"
            overflow: "auto",
          }}
        >
          <div>
            
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
