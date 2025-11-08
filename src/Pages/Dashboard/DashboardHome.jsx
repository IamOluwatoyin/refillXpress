import React, { useState } from "react";
import {
  MdOutlineAttachMoney,
  MdOutlineTimer,
  MdOutlineStar,
  MdOutlineCheckCircle,
  MdOutlineRemoveCircle,
  MdAutorenew,
  MdOutlineLocationOn,
  MdClose,
} from "react-icons/md";
import { FaTruckLoading, FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
import "../../styles/dashboardHome.css";
import { useNavigate } from "react-router";

const RefillOrderDetailsModal = ({ order, isOpen, onClose, onAccept }) => {
  if (!isOpen || !order) return null;

  const totalDistance = order.steps
    .reduce((sum, step) => sum + parseFloat(step.distance.split(" ")[0]), 0)
    .toFixed(1);
  const vendorStep = order.steps.find((step) => step.title.includes("Refill"));
  const pickupStep = order.steps.find((step) => step.title.includes("Pickup"));
  const returnStep = order.steps.find((step) => step.title.includes("Return"));

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
        <span className="step_distance_phone">
          {distance} • {type === "Refill" ? "08105885894" : "08160994840"}
        </span>
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
          <span className="modal_earnings">₦{order.deliveryFee},00</span>
          <span className="total_distance_label">Total Distance</span>
          <span className="modal_total_distance">{totalDistance} km</span>
        </div>

        <h3 className="modal_section_title">Refill Journey</h3>

        <div className="modal_refill_journey">
          <RefillStep
            icon={MdOutlineCheckCircle}
            title="1. Pickup Empty Cylinder"
            location={
              pickupStep.customerLocation ||
              "Glory otene\nno 2 sinzu street magodo"
            }
            distance={`${pickupStep.distance} from vendor`}
            type="First Stop"
          />
          {/* Using a simple arrow to separate steps visually */}
          <div className="step_separator">→</div>

          <RefillStep
            icon={FaExchangeAlt}
            title="2. Refill at Vendor"
            location={
              vendorStep.location || "MaxGas Supply\nno 2 salsu street mago"
            }
            distance={`${vendorStep.distance} from customer`}
            type="Refill"
          />
          <div className="step_separator">→</div>

          <RefillStep
            icon={MdOutlineCheckCircle}
            title="3. Return Refilled Cylinder"
            location={
              returnStep.customerLocation ||
              "glory otene\nno 2 sinzu street magodo"
            }
            distance={`${returnStep.distance} from vendor`}
            type="Final Stop"
          />
        </div>

        <div className="modal_actions">
          <button className="btn_close_modal" onClick={onClose}>
            Close
          </button>
          <button className="btn_accept_modal" onClick={onAccept}>
            <MdOutlineCheckCircle size={18} /> Accept This Order
          </button>
        </div>
      </div>
    </div>
  );
};
// --- End RefillOrderDetailsModal Component ---

const DashboardHome = () => {
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

  // Updated RefillRequestItem component to accept onDetailsClick prop
  const RefillRequestItem = ({
    orderId,
    time,
    deliveryFee,
    steps,
    onDetailsClick,
    orderData,
  }) => (
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
        {/* Updated button to use onDetailsClick */}
        <button
          className="btn_details"
          onClick={() => onDetailsClick(orderData)}
        >
          <MdOutlineRemoveCircle size={18} /> Details
        </button>
        <button
          className="btn_accept"
          onClick={() => navigate("order-tracker")}
        >
          <MdOutlineCheckCircle size={18} /> Accept
        </button>
      </div>
    </div>
  );

  const [activeTab, setActiveTab] = useState("available");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  // Function to open the modal with the selected order data
  const handleDetailsClick = (orderData) => {
    setSelectedOrder(orderData);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Function for modal accept action
  const handleAcceptModal = () => {
    // Logic for accepting the order from the modal
    navigate("order-tracker");
    handleCloseModal();
  };

  const order1 = {
    orderId: "ORD-7542",
    time: "31kg LPG Refill • 35 min",
    deliveryFee: "1,500",
    steps: [
      {
        title: "Pickup Empty Cylinder", // Updated title
        location: "Linda Anuogo • 1.2 km",
        customerLocation: "Glory otene\nno 2 sinzu street magodo", // Added customer location for modal
        distance: "1.2 km", // Added distance for modal calculation/display
        icon: FaTruckLoading,
        completed: true,
      },
      {
        title: "Refill at Vendor",
        location: "MaroGlas Supply • 0.8 km", // Updated distance for consistency with image
        customerLocation: "MaxGas Supply\nno 2 salsu street mago", // Added vendor location for modal
        distance: "0.8 km",
        icon: null,
        completed: false,
      },
      {
        title: "Return Refilled Cylinder", // Updated title
        location: "Linda Anuogo • 1.2 km",
        customerLocation: "glory otene\nno 2 sinzu street magodo", // Added customer location for modal
        distance: "1.2 km",
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
        <h1 className="welcome_title">Welcome Benjamin!</h1>
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
              <RefillRequestItem
                {...order1}
                onDetailsClick={handleDetailsClick}
                orderData={order1}
              />
              <RefillRequestItem
                {...order2}
                onDetailsClick={handleDetailsClick}
                orderData={order2}
              />
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

      {/* Refill Order Details Modal */}
      <RefillOrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAcceptModal}
      />
    </div>
  );
};

export default DashboardHome;
