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
import {
  getAllReviews,
  getVendorId,
  getVendorKyc,
  getVendorPendingOrders,
} from "../../api/query";
import { toast } from "react-toastify";
import { useOrders } from "../../context/PendingOrderContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [verifyBadge, setVerifyBadge] = useState();
  const id = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);

  const {orders} = useOrders()
 
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await getVendorId(id);
        setVendor(response.data);
        
        const isVerifyRes = await getVendorKyc(id);
        setVerifyBadge(isVerifyRes?.data?.data);

        const reviewsRes = await getAllReviews();
        const reviews = reviewsRes?.data?.data || [];
        const vendorReviews = reviews.filter(
          (review) => review.vendorId === id
        );

        if (vendorReviews.length > 0) {
          const avg =
            vendorReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            vendorReviews.length;
          setAverageRating(avg.toFixed(1));
        }
      } catch (error) {
        console.error("Failed to fetch vendor:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
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
            <aside>
              {vendor?.data?.businessName}
              <div className="spaceicon">
                {averageRating > 0 && (
                  <span className="vendor-rating">
                    <FaStar style={{ color: "gold", fontSize: "16px" }} />
                    <span style={{ marginLeft: "4px", fontWeight: "500" }}>
                      {averageRating}
                    </span>
                  </span>
                )}

                {verifyBadge?.verificationStatus === "verified" && (
                  <button className="verified-btn">Verified</button>
                )}
              </div>
            </aside>
          </div>
        </section>

        <span
          onClick={() => navigate("/vendor-dashboard")}
          className={`dashboards ${isDashboardActive ? "active" : ""}`}
        >
          <MdDashboard style={{ fontSize: "25px" }} />
          <p>Dashboard</p>
        </span>

        <span
          onClick={() => navigate("/vendor-dashboard/vendor-order")}
          className={`dashboard-order ${isOrderActive ? "active" : ""}`}
        >
          <GoPackage style={{ fontSize: "25px" }} />
          <sub>
            Orders
            <span className="profileNotification">{orders?.length}</span>
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

        <span className="Dashboard-logout">
          <IoIosLogOut
            style={{ fontSize: "28px" }}
            onClick={() => {
              localStorage.removeItem(import.meta.env.VITE_VENDOR_TOKEN);
              localStorage.removeItem(import.meta.env.VITE_VENDOR_ID);
              navigate("/");
            }}
          />
          <p>Logout</p>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
