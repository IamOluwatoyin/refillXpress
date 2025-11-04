import React, { useState, useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { MdDashboard, MdRateReview } from "react-icons/md";
import { FaStar, FaRegUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { GoPackage } from "react-icons/go";
import { VscGraph } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { getVendorId } from "../../api/query";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState(null);
  const id = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await getVendorId(id);
        setVendor(response.data);
      } catch (error) {
        console.error("Failed to fetch vendor:", error);
      }
    };

    fetchVendor();
  }, []);
  console.log(vendor);
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
              {vendor?.data?.businessName}
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
          <MdDashboard style={{fontSize: "25px" }} />
          <p>Dashboard</p>
        </span>

        <span
          onClick={() => navigate("/vendor-dashboard/vendor-order")}
          className={`dashboard-order ${isOrderActive ? "active" : ""}`}
        >
          <GoPackage style={{ fontSize: "25px" }} />
          <sub>
            Orders
            <span className="profileNotification">0</span>
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
          <FaRegUser style={{ fontSize: "25px" }} />
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

        <span
          onClick={() => navigate("/vendor-dashboard/vendor-logout")}
          className={`Dashboard-logout ${
            currentPath === "/vendor-dashboard/vendor-logout" ? "active" : ""
          }`}
        >
          <IoIosLogOut style={{ fontSize: "28px" }} />
          <p>Logout </p>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
