import React, { useState } from "react";
import "./viewvendor.css";
import { GrLocation } from "react-icons/gr";
import OrderModal from "./OrderModal";

const ViewVendor = ({ vendor, onClose }) => {
  const [showOrderModal, setShowOrderModal] = useState(false);

  if (!vendor) return null;

  //  Determine verification and availability for display & button
  const isVerified = vendor.verificationStatus === "approved";
  const isUnavailable = !vendor.isAvailable || !vendor.inStock || !isVerified;

  return (
    <div className="vendorModal-backdrop" onClick={onClose}>
      <div className="vendorModal-box" onClick={(e) => e.stopPropagation()}>
        <button className="vendorModal-close" onClick={onClose}>×</button>

        {/* Vendor Name */}
        <h2 className="vendorModal-title">{vendor.businessName}</h2>

        {/* Vendor Status / Ratings */}
        <div className="vendorModal-rating">
          <span>⭐ {vendor.rating || 0}</span>
          <span className={`vendor-tag ${isVerified ? "verified" : "unverified"}`}>
            {isVerified ? "Verified" : "Pending Verification"}
          </span>
          <span className={`vendor-tag ${vendor.isAvailable ? "available" : "unavailable"}`}>
            {vendor.isAvailable
              ? vendor.inStock
                ? "Available"
                : "Out of Stock"
              : "Unavailable"}
          </span>
        </div>

        {/* Description */}
        <p className="vendorModal-description">
          {vendor.description ||
            "Fast and reliable gas delivery service with years of experience."}
        </p>

        {/* Vendor Info Section */}
        <div className="vendor-info-section">
          {/* Address */}
          <div className="vendor-location-icons">
            <span><GrLocation /></span>
            <div>
              <span className="transform">Location</span>
              <p>{vendor.businessAddress || "—"}</p>
              {vendor.distance && <small>{vendor.distance} away</small>}
            </div>
          </div>

          {/* Operating hours */}
          <div className="vendor-location-icons">
            <div>
              <strong className="transform">Operating Hours</strong>
              <p>
                {vendor.openingTime && vendor.closingTime
                  ? `${vendor.openingTime} - ${vendor.closingTime}`
                  : "MON - SAT: 8AM - 8PM"}
              </p>
            </div>
          </div>

          {/* Delivery Time */}
          {vendor.deliveryTime && (
            <div className="vendor-location-icons">
              <div>
                <span className="transform">Delivery Time</span>
                <p>{vendor.deliveryTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* Base Price */}
        <div className="vendor-base-price">
          <span>Base Price</span>
          <h3>₦{vendor.pricePerKg || "0"}/kg</h3>
        </div>

        {/* Customer Reviews */}
        {vendor.reviews && vendor.reviews.length > 0 && (
          <div className="vendorModal-reviews">
            <h4>Customer Reviews</h4>
            {vendor.reviews.map((review, i) => (
              <div className="vendor-review" key={i}>
                <p>
                  <strong>{review.name}</strong> ⭐ {review.rating || "5"}{" "}
                  <span>{review.time}</span>
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Order Button */}
        <button
          className="vendor-order-btn"
          onClick={() => setShowOrderModal(true)}
          disabled={isUnavailable} 
        >
          {!vendor.isAvailable
            ? "Vendor Unavailable"
            : !vendor.inStock
            ? "Out of Stock"
            : !isVerified
            ? "Vendor Not Verified"
            : "Order Now"}
        </button>

        {/* Order Modal */}
        {showOrderModal && (
          <OrderModal
            vendor={vendor}
            onClose={() => setShowOrderModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewVendor;
