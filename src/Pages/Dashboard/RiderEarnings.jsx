import React from "react";
import {
  MdOutlineAttachMoney,
  MdOutlineCalendarToday,
  MdOutlineTimeline,
  MdOutlineTimer,
  MdOutlineCheckCircle,
} from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../../styles/riderEarnings.css";

const WeeklyPerformanceBar = ({ day, deliveries, earnings, maxEarnings }) => {
  const widthPercent =
    (parseInt(earnings.replace(/[^0-9]/g, "")) / maxEarnings) * 100;

  return (
    <div className="weekly_bar_item">
      <div className="day_info">
        <span className="day_label">{day}</span>
        <span className="delivery_count">{deliveries} deliveries</span>
      </div>
      <div className="bar_container">
        <div
          className="delivery_bar"
          style={{ width: `${widthPercent}%` }}
        ></div>
      </div>
      <span className="daily_earning">₦{earnings}</span>
    </div>
  );
};

const EarningsCard = ({ icon: title, value, color, bgColor, secondary }) => (
  <div className="earnings_card" style={{ backgroundColor: bgColor }}>
    <div className="card_header">
      <div className="card_icon" style={{ color: color }}>
        <Icon size={24} />
      </div>
      {secondary && (
        <span className="card_secondary" style={{ color: color }}></span>
      )}
    </div>
    <span className="card_title">{title}</span>
    <span className="card_value" style={{ color: color }}>
      {value}
    </span>
  </div>
);

const RecentDeliveryItem = ({
  orderId,
  status,
  customer,
  time,
  distance,
  total,
  base,
}) => (
  <div className="delivery_item">
    <div className="delivery_header">
      <span className="delivery_id">{orderId}</span>
      <span className={`status_badge ${status.toLowerCase()}`}>{status}</span>
    </div>

    <div className="delivery_details">
      <div className="delivery_meta">
        <p className="customer_info">{customer}</p>
        <p className="time_info">{time}</p>
        <p className="distance_info">
          <FaMapMarkerAlt size={10} /> {distance}
        </p>
      </div>

      <div className="delivery_financials">
        <p className="total_earning">₦{total}</p>
        <p className="base_fare">Base: ₦{base}</p>
      </div>
    </div>
  </div>
);

function RiderEarnings() {
  const [activeTab, setActiveTab] = React.useState("recent");

  const earningsData = [
    {
      icon: MdOutlineAttachMoney,
      title: "Earnings",
      value: "₦96.50",
      color: "#4CAF50",
      bgColor: "#e8f5e9",
      secondary: "Up",
    },
    {
      icon: MdOutlineCalendarToday,
      title: "This Week",
      value: "₦600.50",
      color: "#2196F3",
      bgColor: "#e3f2fd",
      secondary: "",
    },
    {
      icon: MdOutlineTimeline,
      title: "This Month",
      value: "₦6000.50",
      color: "#9C27B0",
      bgColor: "#f3e5f5",
      secondary: "",
    },
    {
      icon: MdOutlineTimer,
      title: "Pending",
      value: "₦2600.50",
      color: "#FF9800",
      bgColor: "#fff3e0",
      secondary: "",
    },
  ];

  const recentDeliveries = [
    {
      orderId: "#DEL-5024",
      status: "Paid",
      customer: "Sarah Johnson",
      time: "Today, 2:49 PM",
      distance: "3.2 km",
      total: "5,000",
      base: "1,800",
    },
    {
      orderId: "#DEL-5021",
      status: "Pending",
      customer: "Robert Wilson",
      time: "Today, 10:15 AM",
      distance: "1.8 km",
      total: "5,000",
      base: "1,000",
    },
  ];

  const weeklyData = [
    { day: "Mon", deliveries: 8, earnings: "2,500" },
    { day: "Tue", deliveries: 10, earnings: "3,500" },
    { day: "Wed", deliveries: 12, earnings: "3,900" },
    { day: "Thu", deliveries: 14, earnings: "5,000" },
    { day: "Fri", deliveries: 9, earnings: "4,000" },
    { day: "Sat", deliveries: 3, earnings: "1,500" },
    { day: "Sun", deliveries: 2, earnings: "1,000" },
  ];

  const maxEarnings = Math.max(
    ...weeklyData.map((d) => parseInt(d.earnings.replace(/[^0-9]/g, "")))
  );

  return (
    <div className="rider_earnings_page">
      <h1 className="page_title">Earnings Overview</h1>
      <p className="page_subtitle">Track your delivery earnings and payouts</p>

      <div className="earnings_grid">
        {earningsData.map((data, index) => (
          <EarningsCard key={index} {...data} />
        ))}
      </div>

      <div className="segmented_tabs_wrapper small_tabs_wrapper">
        <div
          className={`segmented_tab ${
            activeTab === "recent" ? "active_segment" : ""
          }`}
          onClick={() => {
            setActiveTab("recent");
            document.querySelector(".section_header").textContent =
              "Recent Deliveries";
          }}
        >
          Recent Earnings
        </div>
        <div
          className={`segmented_tab ${
            activeTab === "weekly" ? "active_segment" : ""
          }`}
          onClick={() => {
            setActiveTab("weekly");
            document.querySelector(".section_header").textContent =
              "Weekly Performance";
          }}
        >
          Weekly Breakdown
        </div>
      </div>

      <h2 className="section_header">
        {activeTab === "recent" ? "Recent Deliveries" : "Weekly Performance"}
      </h2>

      {activeTab === "recent" && (
        <div className="recent_deliveries_list">
          {recentDeliveries.map((delivery, index) => (
            <RecentDeliveryItem key={index} {...delivery} />
          ))}
        </div>
      )}

      {activeTab === "weekly" && (
        <div className="weekly_breakdown_list">
          {weeklyData.map((data, index) => (
            <WeeklyPerformanceBar
              key={index}
              {...data}
              maxEarnings={maxEarnings}
            />
          ))}
        </div>
      )}

      <h2 className="section_header">Payout Schedule</h2>
      <div className="payout_schedule_card">
        <div className="payout_header">
          <MdOutlineCheckCircle size={20} className="check_icon" />
          <span>Next Payout: **Friday, Oct 25**</span>
        </div>
        <p className="payout_details">
          Your earnings are paid out every Friday. Completed deliveries are
          processed within 24 hours.
        </p>
        <p className="expected_amount">Expected Amount: ₦487.20</p>
      </div>
    </div>
  );
}

export default RiderEarnings;
