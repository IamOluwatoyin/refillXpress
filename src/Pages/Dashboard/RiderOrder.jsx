import React from "react";
import {
  MdOutlineCheckCircle,
  MdOutlineRemoveCircle,
  MdOutlineTimer,
  MdAutorenew,
} from "react-icons/md";
import { FaTruckLoading } from "react-icons/fa";

import "../../styles/riderOrder.css";

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

  const ordersToShow = [order1, order2];

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

      <div className="request_info_section">
        <h3 className="request_info_title">Available Refill Requests</h3>
        <p className="request_info_subtitle">
          Pick a refill order to start earning
        </p>
      </div>

      <div className="gas_cylinder_service_info blue_bg">
        Gas Cylinder Refill service:{" "}
        <span className="service_details">
          Collect empty cylinders &rarr; Take to vendors for refilling &rarr;
          Return filled cylinders to customers
        </span>
      </div>

      <div className="requests_list">
        {ordersToShow.map((order, index) => (
          <RefillRequestItem key={index} {...order} />
        ))}
      </div>
    </div>
  );
};

export default RiderOrder;
