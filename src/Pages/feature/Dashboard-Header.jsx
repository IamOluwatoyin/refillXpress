import React from "react";
import "./Dashboard-Header.css";
import { useNavigate } from "react-router";

const DashboardHeader = () => {
  const nav = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="header-wrapper">
        <header className="header-container">
          <div className="header-left" onClick={() => nav("/")}>
            <img src="/Images/logo.svg" className="imgLogo" alt="logo" />
            <h2 className="brandTitle">
              Refill<span>Xpress</span>
            </h2>
          </div>
        </header>
      </div>
    </div>
  );
};

export default DashboardHeader;
