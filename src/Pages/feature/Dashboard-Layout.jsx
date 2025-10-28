import React from "react";
import DashboardHeader from "./Dashboard-Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div style={{ width:'100%', height:"100vh"}}>
      <div>
        <DashboardHeader />
      </div>
      <div style={{ width:'100%', background:"yellow", display:"flex"}}>
        <div style={{ width:'20%', background:"blue"}}>
          <Sidebar/>
        </div>
        <div style={{ width:'80%', background:"red"}}>
           <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
