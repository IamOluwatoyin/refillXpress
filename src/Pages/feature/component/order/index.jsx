import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import "./OrderManagement.css";
import { useState } from "react";

const OrderManagement = () => {
  const orders = [
    {
      id: "#GR45821",
      status: "Pending",
      name: "Glory Otene",
      weight: "15 kg",
      date: "Oct 20, 2025",
      time: "10:00 AM - 11:00 AM",
      address: "N0 1 Salua street Magodo",
      phone: "+2347067953040",
      price: "₦12500",
    },
    {
      id: "#GR45821",
      status: "Pending",
      name: "Glory Otene",
      weight: "15 kg",
      date: "Oct 20, 2025",
      time: "10:00 AM - 11:00 AM",
      address: "N0 1 Salua street Magodo",
      phone: "+2347067953040",
      price: "₦12500",
    },
     {
      id: "#GR45821",
      status: "Pending",
      name: "Glory Otene",
      weight: "15 kg",
      date: "Oct 20, 2025",
      time: "10:00 AM - 11:00 AM",
      address: "N0 1 Salua street Magodo",
      phone: "+2347067953040",
      price: "₦12500",
    },
  ];

  const [activeTab, setActiveTab] = useState("Pending");

  const tabs = [
    { label: "Pending (1)", key: "Pending" },
    { label: "Active (1)", key: "Active" },
    { label: "Completed (3)", key: "Completed" },
    { label: "Cancelled (1)", key: "Cancelled" },
  ];

  return (
   <div className="orderWrapper">
      <h2>Orders</h2>

      <div className="orderTabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
       
       
      </div>
       {/* <p>Currently viewing: {activeTab}</p> */}

      <div className="ordersList">
        {orders.map((order, index) => (
          <div className="orderCard" key={index}>
            <div className="orderTop">
              <div className="orderId">
                <span>{order.id}</span>
                <span className="status pending">{order.status}</span>
              </div>
              <div className="priceSection">
                <span className="price">{order.price}</span>
               
              </div>
            </div>

            <div className="orderDetails">
              <p className="name">{order.name}</p>

              <div className="infoRow">
                <div className="leftInfo">
                  <div className="item">
                    < GoPackage /> {order.weight}
                  </div>
                  <div className="item address">
                    <FaMapMarkerAlt /> {order.address}
                  </div>
                </div>

                <div className="centerInfo">
                  <div className="item">
                    <FaCalendarAlt /> {order.date}
                  </div>
                  <div className="item">
                    <FaClock /> {order.time}
                  </div>
                  <div className="item">
                    <FaPhoneAlt /> {order.phone}
                  </div>
                </div>

                <div className="rightBtns">
                  <button className="viewBtn">View</button>
                  <button className="acceptBtn">Accept</button>
                  <button className="rejectBtn">Reject</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
