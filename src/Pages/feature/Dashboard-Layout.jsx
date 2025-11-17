import React, { useState, useEffect } from "react";
import DashboardHeader from "./Dashboard-Header";
import "./DashboardLayout.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-open');
      // Handle escape key to close sidebar
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeSidebar();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isSidebarOpen]);

  return (
    <div className="DashboardlayoutWrapper">
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="Content-wrapper">
        <div className={`sidebar-wrapper ${isSidebarOpen ? 'active' : ''}`}>
          <Sidebar onClose={closeSidebar} />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;