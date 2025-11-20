/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MdOutlineAttachMoney,
  MdOutlineCalendarToday,
  MdOutlineTimeline,
  MdOutlineTimer,
  MdOutlineCheckCircle,
  MdAutorenew,
} from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../../styles/riderEarnings.css";
import { TbCurrencyNaira } from "react-icons/tb";

const API_BASE_URL = "https://refillexpress.onrender.com/api/v1";

const WeeklyPerformanceBar = ({ day, deliveries, earnings, maxEarnings }) => {
  const safeEarnings = parseInt(earnings.replace(/[^0-9]/g, "")) || 0;
  const widthPercent = maxEarnings > 0 ? (safeEarnings / maxEarnings) * 100 : 0;

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

const EarningsCard = ({
  icon: Icon,
  title,
  value,
  color,
  bgColor,
  secondary,
}) => (
  <div className="earnings_card" style={{ backgroundColor: bgColor }}>
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

// Helper function to parse earnings values
const parseEarningsValue = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    // Remove currency symbols, commas, and any non-numeric characters except decimal point
    const cleaned = value.replace(/[₦$,]/g, "").trim();
    return Number.parseFloat(cleaned) || 0;
  }
  return 0;
};

function RiderEarnings() {
  const [activeTab, setActiveTab] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [earningsOverview, setEarningsOverview] = useState({
    today: "0.00",
    thisWeek: "0.00",
    thisMonth: "0.00",
    pending: "0.00",
    total: "0.00",
  });
  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const authToken = useMemo(() => localStorage.getItem("authToken"), []);
  const riderId = useMemo(() => localStorage.getItem("riderId"), []);

  useEffect(() => {
    if (!riderId || !authToken) {
      toast.error("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${authToken}` };

    const fetchEarnings = async () => {
      setLoading(true);
      try {
        // Fetch total earnings from the new API endpoint
        const totalRes = await axios.get(
          `${API_BASE_URL}/rider/total/earnings`,
          { headers }
        );

        console.log("Total earnings response:", totalRes.data);

        // Extract earnings data from the new response structure
        const earningsData = totalRes.data?.earnings || {};
        console.log("Earnings data:", earningsData);

        // Map the new API response to our state
        setEarningsOverview({
          today: (earningsData.today || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          thisWeek: (earningsData.week || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          thisMonth: (earningsData.month || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          pending: (earningsData.pending || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          total: (earningsData.total || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        });

        // For recent deliveries, you might need to call a different endpoint
        // Since the current endpoint doesn't provide delivery details
        try {
          const todayRes = await axios.get(`${API_BASE_URL}/todays-earnings`, {
            headers,
          });
          console.log("Today's earnings response:", todayRes.data);

          const todayData = todayRes.data?.data || todayRes.data;
          const mappedDeliveries = (
            todayData?.recentDeliveries ||
            todayData?.deliveries ||
            []
          ).map((delivery) => ({
            orderId:
              delivery.orderNumber || `#DEL-${delivery.id?.slice(-4) || "UNK"}`,
            status: delivery.status === "completed" ? "Paid" : "Pending",
            customer: delivery.customerName || "Customer",
            time: delivery.completedAt
              ? new Date(delivery.completedAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            distance: (delivery.distance || "0").toFixed(1) + " km",
            total: (delivery.deliveryFee || 0).toLocaleString(),
            base: (delivery.deliveryFee * 0.8 || 0).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }),
          }));
          setRecentDeliveries(mappedDeliveries);
        } catch (todayError) {
          console.warn("Could not fetch today's deliveries:", todayError);
          setRecentDeliveries([]);
        }

        // For weekly data, you might need a separate endpoint
        // Using placeholder data since the current endpoint doesn't provide daily breakdown
        setWeeklyData([
          {
            day: "Mon",
            deliveries: Math.floor(Math.random() * 5) + 1, // Placeholder
            earnings: Math.floor(
              (earningsData.week || 0) * 0.15
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }),
          },
          {
            day: "Tue",
            deliveries: Math.floor(Math.random() * 5) + 1, // Placeholder
            earnings: Math.floor((earningsData.week || 0) * 0.2).toLocaleString(
              undefined,
              {
                maximumFractionDigits: 0,
              }
            ),
          },
          {
            day: "Wed",
            deliveries: Math.floor(Math.random() * 5) + 1, // Placeholder
            earnings: Math.floor(
              (earningsData.week || 0) * 0.18
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }),
          },
          {
            day: "Thu",
            deliveries: Math.floor(Math.random() * 5) + 1, // Placeholder
            earnings: Math.floor(
              (earningsData.week || 0) * 0.22
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }),
          },
          {
            day: "Fri",
            deliveries: Math.floor(Math.random() * 5) + 1, // Placeholder
            earnings: Math.floor(
              (earningsData.week || 0) * 0.25
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }),
          },
          {
            day: "Sat",
            deliveries: 0, // Placeholder - assuming no deliveries on weekend
            earnings: "0",
          },
          {
            day: "Sun",
            deliveries: 0, // Placeholder - assuming no deliveries on weekend
            earnings: "0",
          },
        ]);
      } catch (error) {
        console.error("Error fetching earnings data:", error);
        toast.error("Failed to load earnings data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [riderId, authToken]);

  const earningsData = [
    {
      icon: TbCurrencyNaira,
      title: "Today's",
      value: `₦${earningsOverview.today}`,
      color: "#4CAF50",
      bgColor: "#e8f5e9",
      secondary: "",
    },
    {
      icon: MdOutlineCalendarToday,
      title: "This Week",
      value: `₦${earningsOverview.thisWeek}`,
      color: "#2196F3",
      bgColor: "#e3f2fd",
      secondary: "",
    },
    {
      icon: MdOutlineTimeline,
      title: "This Month",
      value: `₦${earningsOverview.thisMonth}`,
      color: "#9C27B0",
      bgColor: "#f3e5f5",
      secondary: "",
    },
    {
      icon: MdOutlineTimer,
      title: "Pending",
      value: `₦${earningsOverview.pending}`,
      color: "#FF9800",
      bgColor: "#fff3e0",
      secondary: "",
    },
    {
      icon: MdOutlineAttachMoney,
      title: "Total",
      value: `₦${earningsOverview.total}`,
      color: "#607D8B",
      bgColor: "#eceff1",
      secondary: "All Time",
    },
  ];

  const maxEarnings = Math.max(
    ...weeklyData.map((d) => parseEarningsValue(d.earnings))
  );

  if (loading) {
    return (
      <div className="rider_earnings_page loading_state">
        <MdAutorenew className="spin" size={40} color="#FF9800" />
        <p>Loading your earnings data...</p>
      </div>
    );
  }

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
          onClick={() => setActiveTab("recent")}
        >
          Recent Earnings
        </div>
        <div
          className={`segmented_tab ${
            activeTab === "weekly" ? "active_segment" : ""
          }`}
          onClick={() => setActiveTab("weekly")}
        >
          Weekly Breakdown
        </div>
      </div>

      <h2 className="section_header">
        {activeTab === "recent" ? "Recent Deliveries" : "Weekly Performance"}
      </h2>

      {activeTab === "recent" && (
        <div className="recent_deliveries_list">
          {recentDeliveries.length > 0 ? (
            recentDeliveries.map((delivery, index) => (
              <RecentDeliveryItem key={index} {...delivery} />
            ))
          ) : (
            <p className="empty_state">No recent deliveries found today.</p>
          )}
        </div>
      )}

      {activeTab === "weekly" && (
        <div className="weekly_breakdown_list">
          {weeklyData.length > 0 ? (
            weeklyData.map((data, index) => (
              <WeeklyPerformanceBar
                key={index}
                {...data}
                maxEarnings={maxEarnings}
              />
            ))
          ) : (
            <p className="empty_state">No weekly earnings data available.</p>
          )}
        </div>
      )}

      <h2 className="section_header">Payout Schedule</h2>
      <div className="payout_schedule_card">
        <div className="payout_header">
          <MdOutlineCheckCircle size={20} className="check_icon" />
          <span>Next Payout: **Fridays</span>
        </div>
        <p className="payout_details">
          Your earnings are paid out every Friday. Completed deliveries are
          processed within 24 hours.
        </p>
        <p className="expected_amount">
          Expected Amount: ₦{earningsOverview.pending}
        </p>
      </div>
    </div>
  );
}

export default RiderEarnings;
