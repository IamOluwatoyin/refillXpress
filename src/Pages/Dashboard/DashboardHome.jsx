import React, { useState } from "react";
import {
  MdOutlineAttachMoney,
  MdOutlineTimer,
  MdOutlineStar,
  MdOutlineCheckCircle,
  MdOutlineRemoveCircle,
  MdAutorenew,
} from "react-icons/md";
import { FaTruckLoading, FaCheckCircle } from "react-icons/fa";
import "../../styles/dashboardHome.css";

const CompletedRefillItem = ({ name, type, time, rating, earnings }) => {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

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
        <Icon size={24} /> {/* ✅ this now renders the icon you passed in */}
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

const RefillRequestItem = ({ orderId, time, deliveryFee, steps }) => (
  <div className="request_item">
    <div className="request_header">
      <span className="order_id">{orderId}</span>
      <span className="order_meta">
        {time} | <strong className="delivery_fee">₦{deliveryFee}</strong>{" "}
        delivery fee
      </span>
    </div>

    <div className="request_steps">
      {steps.map((step, index) => (
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
            <span className="step_location">
              {step.icon && <step.icon size={12} />} {step.location}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="request_actions">
      <button className="btn_details">
        <MdOutlineRemoveCircle size={18} /> Details
      </button>
      <button className="btn_accept">
        <MdOutlineCheckCircle size={18} /> Accept
      </button>
    </div>
  </div>
);

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("available");

  const order1 = {
    orderId: "ORD-7542",
    time: "31kg LPG Refill • 35 min",
    deliveryFee: "1,500",
    steps: [
      {
        title: "Pickup Empty",
        location: "Linda Anuogo • 1.2 km",
        icon: FaTruckLoading,
        completed: true,
      },
      {
        title: "Refill at Vendor",
        location: "MaroGlas Supply • 0.6 km",
        icon: null,
        completed: false,
      },
      {
        title: "Return Filled",
        location: "Linda Anuogo • 1.2 km",
        icon: FaTruckLoading,
        completed: false,
      },
    ],
  };

  const order2 = { ...order1, orderId: "ORD-7543" };

  const recentRefills = [
    {
      name: "Linda anuogo",
      type: "LPG 6kg",
      time: "28 mins",
      rating: 4,
      earnings: "7.50",
    },
    {
      name: "Benjamin uzor",
      type: "LPG 3kg",
      time: "25 mins",
      rating: 5,
      earnings: "6.00",
    },
    {
      name: "Martins Deke",
      type: "LPG 5kg",
      time: "22 mins",
      rating: 4,
      earnings: "5.50",
    },
  ];

  return (
    <div className="dashboard_home">
      <div className="welcome_section">
        <h1 className="welcome_title">Welcome **Benjamin!**</h1>
        <p className="welcome_subtitle">Ready to accept refill orders</p>
        <h2 className="section_title">Today's Performance</h2>
        <div className="performance_grid">
          <PerformanceCard
            icon={MdOutlineAttachMoney}
            title="Earnings"
            value="₦96.50"
            color="#4CAF50"
            bgColor="#e8f5e9"
            secondary="Today"
          />
          <PerformanceCard
            icon={MdAutorenew}
            title="Refills"
            value="1"
            color="#2196F3"
            bgColor="#e3f2fd"
            secondary="Today"
          />
          <PerformanceCard
            icon={MdOutlineTimer}
            title="Active Time"
            value="00:00"
            color="#9C27B0"
            bgColor="#f3e5f5"
            secondary=""
          />
          <PerformanceCard
            icon={MdOutlineStar}
            title="Rating"
            value="4.9"
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
            <span className="tab_badge">3</span>)
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

        {activeTab === "available" ? (
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
              <RefillRequestItem {...order1} />
              <RefillRequestItem {...order2} />
            </div>
          </>
        ) : (
          <div className="recent_refills_tab">
            <h3 className="tab_content_title">Recent Completed Refills</h3>
            <p className="tab_content_subtitle">
              Your last completed deliveries today
            </p>

            <div className="completed_refills_list">
              {recentRefills.map((item, index) => (
                <CompletedRefillItem key={index} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
