import React from "react";
import "./viewvendor.css";
import { GrLocation } from "react-icons/gr";
const ViewVendor = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="modal-title">MaxGas Supply</h2>

        <div className="modal-rating">
          <span>⭐ 4.8 (234 reviews)</span>
          <span className="tag top-rated">Top Rated</span>
          <span className="tag in-stock">In Stock</span>
        </div>

        <p className="modal-description">
          Fast and reliable gas delivery service with over 4 years of experience.
        </p>

        <div className="info-section">
            <div className="location-icons">
                <span><GrLocation /></span>
                <div>
                    <span className="transform">location</span>
                    <p>No 1 Salau Street, Magodo</p>
                    <small>1.2km away</small>
                </div>
            </div>

            <div className="location-icons">
                <span><GrLocation /></span>
                <div>
                    <span className="transform">Phone</span>
                    <p>+234769560504</p>
                </div>
            </div>

            <div className="location-icons">
                <span><GrLocation /></span>
                <div>
                    <span className="transform">delivery time</span>
                    <p>45-60 min</p>
                </div>
            </div>

            <div className="location-icons">
                <span><GrLocation /></span>
                <div>
                    <strong className="transform">Operating hours</strong>
                    <p>MON - SAT: 8AM - 8PM</p>
                    
                </div>
            </div>
        </div>

        <div className="base-price">
          <span>Base Price</span>
          <h3>₦1,000/kg</h3>
        </div>

        <div className="reviews">
          <h4>Customer Reviews</h4>
          <div className="review">
            <p><strong>Sarah M.</strong> ⭐⭐⭐⭐⭐ <span>2 days ago</span></p>
            <p>Quick delivery and professional service. Highly recommend!</p>
          </div>
          <div className="review">
            <p><strong>Lisa K.</strong> ⭐⭐⭐⭐⭐ <span>2 weeks ago</span></p>
            <p>Always on time and very friendly staff.</p>
          </div>
        </div>

        <button className="order-btn">Order Now</button>
      </div>
    </div>
  );
};

export default ViewVendor;
