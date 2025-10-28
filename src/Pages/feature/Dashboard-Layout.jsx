import React from "react";
import DashboardHeader from "./Dashboard-Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      <div>
        <div>
          <Sidebar/>
        </div>
        <div>
           <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
