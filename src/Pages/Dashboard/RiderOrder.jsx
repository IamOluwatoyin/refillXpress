import React from "react";
import {
  MdOutlineCheckCircle,
  MdOutlineRemoveCircle,
  MdOutlineTimer,
  MdAutorenew,
  MdOutlineLocationOn,
  MdOutlineStar,
} from "react-icons/md";
import { FaTruckLoading, FaCheckCircle, FaLocationArrow } from "react-icons/fa";

import "../../styles/riderOrder.css";

const CompletedDeliveryItem = ({ order }) => {
  const stars = "★".repeat(order.rating) + "☆".repeat(5 - order.rating);

  return (
    <div className="completed_delivery_item">
      <div className="completed_header">
        <span className="completed_order_id">#{order.deliveryId}</span>
        <span className="status_badge completed">Completed</span>
        <span className="completed_fee">₦{order.fee}</span>
      </div>

      <div className="completed_details">
        <div className="customer_time">
          <span className="customer_name_comp">{order.customerName}</span>
          <span className="delivery_time_comp">{order.time}</span>
        </div>
        <span className="gas_quantity">
          {order.gasType} &times; {order.quantity}
        </span>
      </div>

      <div className="completed_meta">
        <span className="distance_rating">
          {order.distance} km <span className="completed_rating">{stars}</span>
        </span>
        <span className="bonus_tip">+₦{order.tip} Tip</span>
      </div>
    </div>
  );
};

const ActiveOrderItem = ({ order }) => (
  <div className="active_order_card">
    <div className="active_order_header">
      <span className="active_order_id">Delivery #{order.deliveryId}</span>
      <span className="status_badge in_progress">In-Progress</span>
      <span className="active_order_fee">₦{order.fee}</span>
    </div>

    <div className="active_order_details">
      <span className="refill_type">{order.refillType}</span>
      <span className="customer_name_detail">
        Customer: {order.customerName}
      </span>
    </div>

    <div className="location_sections">
      <div className="location_card pickup_card">
        <span className="location_title">Pickup</span>
        <div className="location_address">
          <FaCheckCircle size={14} color="#4CAF50" />
          <span>{order.pickupAddress}</span>
        </div>
      </div>

      <div className="location_card delivery_card">
        <span className="location_title">Delivery</span>
        <div className="location_address">
          <MdOutlineLocationOn size={16} color="#777" />
          <span>{order.deliveryAddress}</span>
        </div>
      </div>
    </div>

    <div className="active_order_actions">
      <button className="btn_navigate">
        <FaLocationArrow size={18} /> Navigate to Customer
      </button>
      <button className="btn_complete">
        <MdOutlineCheckCircle size={18} /> Complete Delivery
      </button>
    </div>
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

const RiderOrder = () => {
  const [activeTab, setActiveTab] = React.useState("available");

  const order1 = {
    orderId: "ORD-7542",
    time: "12kg LPG Refill • 35 min",
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

  const order2 = {
    orderId: "ORD-7543",
    time: "14kg LPG Refill • 28 min",
    deliveryFee: "1,500",
    steps: [
      {
        title: "Pickup Empty",
        location: "Sarah Johnson • 3.2 km",
        icon: FaTruckLoading,
        completed: true,
      },
      {
        title: "Refill at Vendor",
        location: "QuickGas Supply • 0.8 km",
        icon: null,
        completed: true,
      },
      {
        title: "Return Filled",
        location: "Sarah Johnson • 3.2 km",
        icon: FaTruckLoading,
        completed: false,
      },
    ],
  };
  const availableOrders = [order1, order2];

  const activeOrder = {
    deliveryId: "DEL-5024",
    refillType: "LPG 12kg",
    customerName: "Linda Anuogo",
    fee: "1,500",
    pickupAddress: "no 2 Salau street magodo",
    deliveryAddress: "no 2 Salau street magodo",
  };

  const completedDeliveries = [
    {
      deliveryId: "DEL-5023",
      customerName: "Michael Chen",
      time: "Today, 2:20 PM",
      distance: "2.1",
      rating: 5,
      gasType: "Oxygen",
      quantity: 1,
      fee: "1,500",
      tip: "62",
    },
    {
      deliveryId: "DEL-5022",
      customerName: "Emma Davis",
      time: "Today, 11:45 AM",
      distance: "4.5",
      rating: 4,
      gasType: "CO2",
      quantity: 1,
      fee: "1,500",
      tip: "50",
    },
  ];

  const tabs = [
    { key: "available", name: "Available (2)" },
    { key: "active", name: "Active (1)" },
    { key: "completed", name: "Completed" },
  ];

  return (
    <div className="rider_order_page">
      <h1 className="order_title">Deliveries</h1>
      <p className="order_subtitle">Manage your delivery assignments</p>

      <div className="order_tabs_wrapper">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`order_tab ${
              activeTab === tab.key ? "active_order_tab" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {activeTab === "available" && (
        <>
          <div className="request_info_section">
            <h3 className="request_info_title">Available Refill Requests</h3>
            <p className="request_info_subtitle">
              Pick a refill order to start earning
            </p>
          </div>

          <div className="gas_cylinder_service_info blue_bg">
            Gas Cylinder Refill service:{" "}
            <span className="service_details">
              Collect empty cylinders &rarr; Take to vendors for refilling
              &rarr; Return filled cylinders to customers
            </span>
          </div>

          <div className="requests_list">
            {availableOrders.map((order, index) => (
              <RefillRequestItem key={index} {...order} />
            ))}
          </div>
        </>
      )}

      {activeTab === "active" && (
        <div className="active_order_content">
          <ActiveOrderItem order={activeOrder} />
        </div>
      )}

      {activeTab === "completed" && (
        <div className="completed_order_content">
          <div className="request_info_section">
            <h3 className="request_info_title">Completed Deliveries</h3>
            <p className="request_info_subtitle">3 Today</p>
          </div>

          <div className="completed_deliveries_list">
            {completedDeliveries.map((order, index) => (
              <CompletedDeliveryItem key={index} order={order} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderOrder;
