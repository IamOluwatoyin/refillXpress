import React from "react";
import {
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import "./VendorDashboard.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const VendorDashboard = () => {
  const nav =useNavigate()
  return (
    <div className="vendorDashboard-wrapper">
      <h2>Dashboard</h2>
      <span>Welcome back, Max gas supply! Here’s what’s happening today</span>

      {/* ===== Summary Cards ===== */}
      <div className="summary-section">
        <div className="summary-card">
          <div className="icon blue">
            <GoPackage />
          </div>
          <h3 className="summary-value">12</h3>
          <p className="summary-label">Today's Orders</p>
        </div>

        <div className="summary-card">
          <div className="icon yellow">
            <FaClock />
          </div>
          <h3 className="summary-value">3</h3>
          <p className="summary-label">Pending Orders</p>
        </div>

        <div className="summary-card">
          <div className="icon green">
            <FaCheckCircle />
          </div>
          <h3 className="summary-value">7</h3>
          <p className="summary-label">Completed Today</p>
        </div>

        <div className="summary-card">
          <div className="icon purple">
            <FaNairaSign />
          </div>
          <h3 className="summary-value">₦105,000</h3>
          <p className="summary-label">Today's Revenue</p>
        </div>
      </div>
      {/* ===== Pending Orders ===== */}
      <div className="pending-orders">
        <div className="pending-header">
          <h3>Pending Orders</h3>
          <button className="view-all" onClick={()=>nav("/vendor-dashboard/vendor-profile")}>
            View All <IoIosArrowForward />
          </button>
        </div>
        <p className="subtext">Requires immediate attention</p>

        <div className="order-card">
          <div className="order-header">
            <div>
              <span className="order-id">#GR45821</span>
              <span className="order-status">Pending</span>
            </div>
            <span className="price">₦12,500</span>
          </div>

          <p className="customer-name">Glory Otene</p>

          <div className="order-details">
            <div className="details-row">
              <div className="left-info">
                <p>
                  <GoPackage /> 15 kg
                </p>
              </div>
              <div className="center-info">
                <p>
                  <FaCalendarAlt /> Oct 20, 2025
                </p>
                <p>
                  <FaClock /> 10:00 AM - 11:00 AM
                </p>
                <p>
                  <FaPhoneAlt /> +2347067953040
                </p>
              </div>
            </div>

            <p className="address">
              <FaMapMarkerAlt /> No 1 Salua street Magodo
            </p>
          </div>

          <div className="order-actions">
            <button className="view-btn">View</button>
            <button className="accept-btn">Accept</button>
            <button className="reject-btn">Reject</button>
          </div>
        </div>
      </div>

      {/* ===== Recent Reviews ===== */}
      <div className="reviews-section">
        <h3>Recent Reviews</h3>
        <p className="subtext">Customer feedback</p>

        <div className="review-card">
          <div className="review-header">
            <strong>John D.</strong>
            <span>Oct 20, 2025</span>
          </div>
          <div className="stars">
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
          </div>
          <p>Excellent service! Very professional and punctual.</p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <strong>Sarah M.</strong>
            <span>Oct 19, 2025</span>
          </div>
          <div className="stars">
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
          </div>
          <p>Great experience! Highly recommend.</p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <strong>Mike R.</strong>
            <span>Oct 18, 2025</span>
          </div>
          <div className="stars">
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaStar className="filled" />
            <FaRegStar className="unfilled" />
          </div>
          <p>Good service overall. Delivery was a bit delayed.</p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
