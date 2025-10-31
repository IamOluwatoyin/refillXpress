import { Outlet } from "react-router";
import Dashboard_Header from "../static/Dashboard_Header";
import Dashboard_Sidebar from "../static/Dashboard_Sidebar";

const Dashboard_layout = () => {
  return (
    <div>
      <Dashboard_Header />
      <div style={{ display: "flex" }}>
        <Dashboard_Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard_layout;
