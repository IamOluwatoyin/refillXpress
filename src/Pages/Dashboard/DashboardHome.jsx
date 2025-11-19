/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import {
  MdOutlineAttachMoney,
  MdOutlineTimer,
  MdOutlineStar,
  MdOutlineCheckCircle,
  MdOutlineRemoveCircle,
  MdAutorenew,
  MdClose,
  MdPending,
} from "react-icons/md";
import { FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/dashboardHome.css";
import { TbCurrencyNaira } from "react-icons/tb";

const API_BASE_URL = "https://refillexpress.onrender.com/api/v1";

const DashboardSkeleton = () => (
  <div className="dashboard_home skeleton_container">
    <div className="welcome_section">
      <div className="skeleton_line skeleton_title_large"></div>
      <div className="skeleton_line skeleton_title_small"></div>
      <h2 className="section_title skeleton_fade">Today's Performance</h2>

      <div className="performance_grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="performance_card skeleton_card">
            <div className="card_header">
              <div className="skeleton_circle"></div>
              <div className="skeleton_line skeleton_secondary"></div>
            </div>
            <div className="skeleton_line skeleton_title"></div>
            <div className="skeleton_line skeleton_value"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="tabs_section">
      <div className="segmented_tabs_wrapper">
        <div className="skeleton_tab"></div>
        <div className="skeleton_tab"></div>
      </div>

      <div className="tab_content_header">
        <div className="skeleton_line skeleton_content_title"></div>
        <div className="skeleton_line skeleton_content_subtitle"></div>
      </div>

      <div className="skeleton_line skeleton_info_box"></div>

      <div className="requests_list">
        {[1, 2].map((i) => (
          <div key={i} className="request_item skeleton_request">
            <div className="request_header">
              <div className="skeleton_line skeleton_id"></div>
              <div className="skeleton_line skeleton_meta"></div>
            </div>
            <div className="skeleton_line skeleton_step"></div>
            <div className="skeleton_line skeleton_step"></div>

            <div className="request_actions">
              <div className="skeleton_button_small"></div>
              <div className="skeleton_button_large"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const KycStatusNotice = ({ kycStatus, navigate }) => {
  let message = "";
  let actionText = "";
  const actionLink = "/rider-kyc";
  let icon = MdPending;
  let color = "#FF9800";

  switch (kycStatus) {
    case "pending":
      message =
        "Your KYC application is under review. You will receive an update within 24-48 hours. Orders will appear once approved.";
      icon = MdPending;
      break;
    case "rejected":
      message =
        "Your KYC application was rejected. Please review the requirements and re-submit your form to start accepting orders.";
      actionText = "Re-submit KYC";
      color = "#F44336";
      icon = MdOutlineRemoveCircle;
      break;
    case "not completed":
      message =
        "Your KYC application is incomplete. Please submit all required details to start riding.";
      actionText = "Complete KYC Form";
      icon = MdOutlineRemoveCircle;
      break;
    // default:
    // message =
    //   "Your account is currently inactive. Please complete the full registration process or wait for KYC approval.";
    // actionText = "Start Registration";
    // icon = MdOutlineRemoveCircle;
    // break;
  }

  const IconComponent = icon;

  return (
    <div className="kyc_notice_container">
      <div className="kyc_card_header" style={{ color: color }}>
        <IconComponent size={30} />
        <h3 className="kyc_status_title">
          KYC Status: <strong>{kycStatus.toUpperCase()}</strong>
        </h3>
      </div>
      <p className="kyc_message">{message}</p>
      <button className="btn_kyc_action" onClick={() => navigate(actionLink)}>
        {actionText}
      </button>
    </div>
  );
};

const RefillOrderDetailsModal = ({
  order,
  isOpen,
  onClose,
  onAccept,
  riderId,
}) => {
  if (!isOpen || !order || !order.steps) return null;

  const steps = order.steps;
  const totalDistance = steps
    .reduce(
      (sum, step) => sum + Number.parseFloat(step.distance.split(" ")[0] || 0),
      0
    )
    .toFixed(1);

  const vendorStep =
    steps.find((step) => step.title.includes("Vendor")) || steps[1];
  const pickupStep =
    steps.find((step) => step.title.includes("Pickup")) || steps[0];
  const returnStep =
    steps.find((step) => step.title.includes("Return")) || steps[2];

  const RefillStep = ({ icon: Icon, title, location, distance, type }) => (
    <div className="modal_refill_step">
      <div className="step_icon_wrapper">
        <Icon size={20} color={type === "Refill" ? "#9C27B0" : "#4CAF50"} />
        {type !== "Final Stop" && <div className="step_arrow">→</div>}
      </div>
      <div className="step_info_modal">
        <span className="step_title_modal">{title}</span>
        {type && (
          <span
            className={`step_type_tag ${type.toLowerCase().replace(" ", "_")}`}
          >
            {type}
          </span>
        )}
        <span className="step_location_modal">{location}</span>
        <span className="step_distance_phone">{distance} • 081XXXXXXX40</span>
      </div>
    </div>
  );

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <div className="modal_header">
          <h2 className="modal_title">Refill Order Details</h2>
          <p className="modal_subtitle">Complete refill journey information</p>
          <button className="modal_close_btn" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="modal_summary_box">
          <span className="you_ll_earn">You'll Earn</span>
          <span className="modal_earnings">₦{order.deliveryFee || "0,00"}</span>
          <span className="total_distance_label">Total Distance</span>
          <span className="modal_total_distance">{totalDistance} km</span>
        </div>

        <h3 className="modal_section_title">Refill Journey</h3>

        <div className="modal_refill_journey">
          <RefillStep
            icon={MdOutlineCheckCircle}
            title="1. Pickup Empty Cylinder"
            location={pickupStep.location || "Location N/A"}
            distance={pickupStep.distance}
            type="First Stop"
          />
          <div className="step_separator">→</div>

          <RefillStep
            icon={FaExchangeAlt}
            title="2. Refill at Vendor"
            location={vendorStep.location || "Vendor N/A"}
            distance={vendorStep.distance}
            type="Refill"
          />
          <div className="step_separator">→</div>

          <RefillStep
            icon={MdOutlineCheckCircle}
            title="3. Return Refilled Cylinder"
            location={returnStep.location || "Location N/A"}
            distance={returnStep.distance}
            type="Final Stop"
          />
        </div>

        <div className="modal_actions">
          <button className="btn_close_modal" onClick={onClose}>
            Close
          </button>
          <button
            className="btn_accept_modal"
            onClick={() => onAccept(order.id, riderId)}
          >
            <MdOutlineCheckCircle size={18} /> Accept This Order
          </button>
        </div>
      </div>
    </div>
  );
};

const CompletedRefillItem = ({ name, type, time, rating, earnings }) => {
  const safeRating = Math.min(5, Math.max(0, Math.round(rating || 0)));
  const stars = "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
  return (
    <div className="completed_refill_item">
      <div className="refill_icon_name">
        <FaCheckCircle size={20} color="#4CAF50" />
        <div className="name_type">
          <span className="customer_name">{name}</span>
          <span className="refill_type">{type}</span>
        </div>
      </div>
      <div className="refill_details">
        <span className="refill_earnings">+₦{earnings}</span>
        <div className="time_rating">
          <span className="refill_time">
            <MdOutlineTimer size={14} /> {time}
          </span>
          <span className="refill_rating">{stars}</span>
        </div>
      </div>
    </div>
  );
};

const PerformanceCard = ({
  icon: Icon,
  title,
  value,
  color,
  bgColor,
  secondary,
}) => (
  <div className="performance_card" style={{ backgroundColor: bgColor }}>
    <div className="card_header">
      <div className="card_icon" style={{ color: color }}>
        <Icon size={24} />
      </div>
      {secondary && (
        <span className="card_secondary" style={{ color: color }}>
          {secondary}
        </span>
      )}
    </div>
    <span className="card_title">{title}</span>
    <span className="card_value" style={{ color: color }}>
      {value}
    </span>
  </div>
);

const RefillRequestItem = ({
  orderId,
  time,
  deliveryFee,
  steps,
  onDetailsClick,
  orderData,
  onAccept,
}) => (
  <div className="request_item">
    <div className="request_header">
      <span className="order_id">{orderId}</span>
      <span className="order_meta">
        {time} | <strong className="delivery_fee">₦{deliveryFee}</strong>{" "}
        delivery fee
      </span>
    </div>

    {orderData && (
      <div className="refill_details_grid">
        <div className="detail_item">
          <span className="detail_label">Quantity</span>
          <span className="detail_value">{orderData.quantity} units</span>
        </div>
        <div className="detail_item">
          <span className="detail_label">Unit Price</span>
          <span className="detail_value">
            ₦{orderData.price?.toLocaleString() || "0"}
          </span>
        </div>
        <div className="detail_item">
          <span className="detail_label">Total Price</span>
          <span className="detail_value highlight">
            ₦{orderData.totalPrice?.toLocaleString() || "0"}
          </span>
        </div>
        <div className="detail_item">
          <span className="detail_label">Status</span>
          <span
            className={`detail_badge status_${orderData.status?.toLowerCase()}`}
          >
            {orderData.status}
          </span>
        </div>
        <div className="detail_item">
          <span className="detail_label">Payment</span>
          <span
            className={`detail_badge payment_${orderData.paymentStatus?.toLowerCase()}`}
          >
            {orderData.paymentStatus}
          </span>
        </div>
      </div>
    )}

    <div className="request_steps">
      {steps &&
        steps.map((step, index) => (
          <div key={index} className="step_item">
            <div className="step_dot_line">
              <span
                className={`step_number ${step.completed ? "completed" : ""}`}
              >
                {index + 1}
              </span>
              {index < steps.length - 1 && <span className="step_line"></span>}
            </div>
            <div className="step_info">
              <span className="step_title">{step.title}</span>
              <span className="step_location">{step.location}</span>
            </div>
          </div>
        ))}
    </div>

    <div className="request_actions">
      <button className="btn_details" onClick={() => onDetailsClick(orderData)}>
        <MdOutlineRemoveCircle size={18} /> Details
      </button>
      <button className="btn_accept" onClick={() => onAccept(orderData)}>
        <MdOutlineCheckCircle size={18} /> Accept
      </button>
    </div>
  </div>
);

const DashboardHome = () => {
  const navigate = useNavigate();
  const authToken = useMemo(() => localStorage.getItem("authToken"), []);
  const riderId = useMemo(() => localStorage.getItem("riderId"), []);

  const [riderData, setRiderData] = useState({
    firstName: "Rider",
    kycStatus: "pending",
    earnings: 0,
    refills: 0,
    rating: 0,
  });
  const [overviewData, setOverviewData] = useState({
    totalEarnings: 0,
    totalRefills: 0,
    activeTime: "00:00",
    averageRating: 0,
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  const [availableOrders, setAvailableOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [activeTab, setActiveTab] = useState("available");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const transformRefillData = (refill) => ({
    ...refill,
    riderId: refill?.riderId || refill?.RiderId || null,
    id: refill.id,
    orderId: refill.orderNumber,
    orderNumber: refill.orderNumber,
    customerName:
      `${refill.user?.firstName || ""} ${refill.user?.lastName || ""}`.trim() ||
      "Customer",
    cylinderSize: refill.cylinderSize,
    quantity: refill.quantity,
    deliveryFee: refill.deliveryFee,
    totalPrice: refill.totalPrice,
    pickupAddress: refill.pickupAddress,
    deliveryAddress: refill.deliveryAddress,
    userId: refill.userId,
    vendorLocation: `${refill.vendor?.businessName || "Vendor"} (${
      refill.vendor?.businessAddress || "N/A"
    })`,
    vendorPhone: refill.vendor?.phoneNumber || "N/A",
    time: `${refill.cylinderSize}kg LPG Refill x${refill.quantity} • 35 min`,
    steps: [
      {
        title: "1. Pickup Empty Cylinder",
        location: refill.pickupAddress,
        distance: "1.2 km",
      },
      {
        title: "2. Refill at Vendor",
        location: `${refill.vendor?.businessName || "Vendor"} (${
          refill.vendor?.businessAddress || "N/A"
        })`,
        distance: "0.8 km",
      },
      {
        title: "3. Return Filled Cylinder",
        location: refill.deliveryAddress,
        distance: "1.2 km",
      },
    ],
  });

  const fetchAllOrders = async () => {
    if (!riderId || !authToken) {
      console.error(
        "Critical: riderId or authToken is missing. Cannot fetch orders."
      );
      return;
    }

    setLoadingOrders(true);

    try {
      const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const res = await axiosInstance.get(
        "/rider/get/getActiveAndCompletedOrders"
      );
      const data = res.data.data || {};

      const availableData = (data.available || []).map((refill) => {
        const transformed = transformRefillData(refill);
        return {
          orderId: transformed.orderId,
          id: transformed.id,
          time: transformed.time,
          deliveryFee: transformed.deliveryFee
            ? transformed.deliveryFee.toLocaleString()
            : "0",
          steps: transformed.steps,
          orderData: transformed,
        };
      });

      setAvailableOrders(availableData);
      console.log("✅ Available Orders:", availableData);

      const recentRes = await axios.get(`${API_BASE_URL}/recent-refills`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const rawRecentOrders = Array.isArray(recentRes.data.data)
        ? recentRes.data.data
        : [];

      const mappedRecentOrders = rawRecentOrders.map((order) => ({
        name: order.customerName || "Customer",
        type: order.cylinderSize || "LPG",
        time: "25 mins",
        rating: order.rating || 5,
        earnings: order.deliveryFee
          ? (order.deliveryFee / 100).toFixed(2)
          : "0.00",
      }));

      setRecentOrders(mappedRecentOrders);
    } catch (err) {
      console.error(
        "Error fetching orders:",
        err.response?.data?.message || err.message
      );
      toast.error(err.response?.data?.message || "Could not fetch orders.");
      setAvailableOrders([]);
      setRecentOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchDashboardOverview = async () => {
    if (!riderId || !authToken) {
      console.error("Cannot fetch overview: Missing riderId or authToken");
      return;
    }

    try {
      const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const res = await axiosInstance.get("/rider/dashboard/overview");
      const data = res.data.data || {};

      // Fix: Properly parse the formatted earnings string
      let earningsValue = 0;
      if (data.earnings) {
        if (typeof data.earnings === "string") {
          // Remove currency symbol and commas, then parse
          earningsValue =
            Number.parseFloat(data.earnings.replace(/[₦,]/g, "")) || 0;
        } else if (typeof data.earnings === "number") {
          earningsValue = data.earnings;
        }
      }

      setOverviewData({
        totalEarnings: earningsValue,
        totalRefills: Number.parseInt(data.refills) || 0,
        activeTime: data.activeTime || "00:00",
        averageRating: Number.parseFloat(data.rating) || 0,
      });

      console.log("[v0] Dashboard overview fetched:", data);
    } catch (err) {
      console.error(
        "Error fetching dashboard overview:",
        err.response?.data?.message || err.message
      );
    }
  };

  useEffect(() => {
    const fetchRiderProfile = async () => {
      if (!riderId || !authToken) {
        toast.error("Session expired. Please log in.");
        setLoadingProfile(false);
        navigate("/riderlogin");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/rider/${riderId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const data = response.data.data;

        setRiderData({
          firstName: data.firstName || "Rider",
          kycStatus: data.kycStatus || "incomplete",
          earnings: Number.parseFloat(data.earnings) || 0,
          refills: Number.parseInt(data.refills) || 0,
          rating: Number.parseFloat(data.rating) || 0,
        });

        await fetchDashboardOverview();
      } catch (err) {
        console.error("Error fetching rider data:", err);
        setErrorProfile("Failed to load dashboard data.");
        if (err.response && err.response.status === 401) {
          navigate("/riderlogin");
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchRiderProfile();
  }, [navigate, riderId, authToken]);

  useEffect(() => {
    if (loadingProfile || riderData.kycStatus !== "approved") {
      setAvailableOrders([]);
      setRecentOrders([]);
      return;
    }

    fetchAllOrders();
  }, [loadingProfile, riderData.kycStatus, authToken, riderId]);

  const handleDetailsClick = (orderData) => {
    setSelectedOrder(orderData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleAcceptOrder = async (orderToAccept) => {
    const orderIdToAccept = orderToAccept.id;

    if (!orderIdToAccept || !authToken) {
      console.error("Cannot accept order: Missing required data.");
      return;
    }

    handleCloseModal();

    try {
      const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      await axiosInstance.post(`/orders/confirmOrder/${orderIdToAccept}`);

      toast.success("Order accepted successfully!");

      await fetchAllOrders();

      navigate(`order-tracker/${orderIdToAccept}`);
    } catch (error) {
      console.error("Failed to accept order:", error);
      toast.error("Failed to accept order. Please try again.");
    }
  };

  const handleAcceptModal = (orderId, userId) => {
    if (selectedOrder) {
      handleAcceptOrder(selectedOrder);
    }
  };

  if (loadingProfile) {
    return <DashboardSkeleton />;
  }

  if (errorProfile) {
    return <div className="dashboard_error">{errorProfile}</div>;
  }

  const { firstName, kycStatus } = riderData;

  console.log("Rider Profile Loaded. KYC Status:", overviewData);

  return (
    <div className="dashboard_home">
      <div className="welcome_section">
        <h1 className="welcome_title">Welcome {firstName}!</h1>
        <p className="welcome_subtitle">Ready to accept refill orders</p>
        <h2 className="section_title">Today's Performance</h2>
        <div className="performance_grid">
          <PerformanceCard
            icon={TbCurrencyNaira}
            title="Earnings"
            value={`₦${(overviewData.totalEarnings ?? 0).toLocaleString(
              undefined,
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}`}
            color="#4CAF50"
            bgColor="#e8f5e9"
            secondary="Total"
          />
          <PerformanceCard
            icon={MdAutorenew}
            title="Refills"
            value={(overviewData.totalRefills ?? 0).toLocaleString()}
            color="#2196F3"
            bgColor="#e3f2fd"
            secondary="Total"
          />
          <PerformanceCard
            icon={MdOutlineTimer}
            title="Active Time"
            value={overviewData.activeTime}
            color="#9C27B0"
            bgColor="#f3e5f5"
            secondary=""
          />
          <PerformanceCard
            icon={MdOutlineStar}
            title="Rating"
            value={(overviewData.averageRating ?? 0).toFixed(1)}
            color="#FF9800"
            bgColor="#fff3e0"
            secondary=""
          />
        </div>
      </div>

      <div className="tabs_section">
        <div className="segmented_tabs_wrapper">
          <div
            className={`tab segmented_tab ${
              activeTab === "available" ? "active_segment" : ""
            }`}
            onClick={() => setActiveTab("available")}
          >
            <MdOutlineCheckCircle size={18} /> Available (
            <span className="tab_badge">
              {kycStatus === "approved" ? availableOrders.length : 0}
            </span>
            )
          </div>
          <div
            className={`tab segmented_tab ${
              activeTab === "recent" ? "active_segment" : ""
            }`}
            onClick={() => setActiveTab("recent")}
          >
            <MdOutlineTimer size={18} /> Recent
          </div>
        </div>

        {kycStatus !== "approved" ? (
          <KycStatusNotice kycStatus={kycStatus} navigate={navigate} />
        ) : activeTab === "available" ? (
          loadingOrders ? (
            <div className="orders_loading_state">
              <MdAutorenew className="spin" size={30} color="#FF9800" />
              <p>Fetching available orders...</p>
            </div>
          ) : availableOrders.length > 0 ? (
            <>
              <div className="tab_content_header">
                <h3 className="tab_content_title">Available Refill Requests</h3>
                <p className="tab_content_subtitle">
                  Pick a refill order to start earning
                </p>
              </div>
              <div className="gas_cylinder_service_info">
                Gas Cylinder Refill service:{" "}
                <span className="service_details">
                  Collect empty cylinders &rarr; Take to vendors for refilling
                  &rarr; Return filled cylinders to customers
                </span>
              </div>
              <div className="requests_list">
                {availableOrders.map((order) => (
                  <RefillRequestItem
                    key={order.id}
                    {...order}
                    onDetailsClick={handleDetailsClick}
                    orderData={order.orderData}
                    onAccept={handleAcceptOrder}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="empty_orders_state">
              <FaCheckCircle size={30} color="#4caf4fa9" />
              <p>
                No new refill requests available right now. Check back soon!
              </p>
            </div>
          )
        ) : loadingOrders ? (
          <div className="orders_loading_state">
            <MdAutorenew className="spin" size={30} color="#ff990058" />
            <p>Fetching recent orders...</p>
          </div>
        ) : (
          <div className="recent_refills_tab">
            <h3 className="tab_content_title">Recent Completed Refills</h3>
            <p className="tab_content_subtitle">
              Your last completed deliveries today
            </p>

            <div className="completed_refills_list">
              {recentOrders.length > 0 ? (
                recentOrders.map((item, index) => (
                  <CompletedRefillItem key={index} {...item} />
                ))
              ) : (
                <p className="empty_orders_state_text">
                  No completed deliveries found yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <RefillOrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAcceptModal}
        riderId={riderId}
      />
    </div>
  );
};

export default DashboardHome;
