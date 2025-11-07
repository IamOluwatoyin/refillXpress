import React, { useState } from "react";
import "./viewvendor.css";
import { GrLocation } from "react-icons/gr";
import OrderModal from "./OrderModal";

const ViewVendor = ({ vendor, onClose }) => {
  const [showOrderModal, setShowOrderModal] = useState(false);

  if (!vendor) return null;

  return (
    <div className="vendorModal-backdrop" onClick={onClose}>
      <div className="vendorModal-box" onClick={(e) => e.stopPropagation()}>
        <button className="vendorModal-close" onClick={onClose}>×</button>

        <h2 className="vendorModal-title">{vendor.businessName}</h2>

        <div className="vendorModal-rating">
          <span>⭐ {vendor.rating || "4.8"} ({vendor.totalReviews || "234"} reviews)</span>
          <span className="vendor-tag top-rated">{vendor.isTopRated ? "Top Rated" : "Verified"}</span>
          <span className="vendor-tag in-stock">{vendor.businessAvailability}</span>
        </div>

        <p className="vendorModal-description">
          {vendor.description || "Fast and reliable gas delivery service with years of experience."}
        </p>

        <div className="vendor-info-section">
          <div className="vendor-location-icons">
            <span><GrLocation /></span>
            <div>
              <span className="transform">Location</span>
              <p>{vendor.businessAddress}</p>
              {vendor.distance && <small>{vendor.distance} away</small>}
            </div>
          </div>

          <div className="vendor-location-icons">
            <span><GrLocation /></span>
            <div>
              <span className="transform">Phone</span>
              <p>{vendor.businessPhoneNumber}</p>
            </div>
          </div>

          <div className="vendor-location-icons">
            <span><GrLocation /></span>
            <div>
              <span className="transform">Delivery time</span>
              <p>{vendor.deliveryTime || "45-60 min"}</p>
            </div>
          </div>

          <div className="vendor-location-icons">
            <span><GrLocation /></span>
            <div>
              <strong className="transform">Operating hours</strong>
              <p>
                {vendor.openingTime && vendor.closingTime
                  ? `${vendor.openingTime} - ${vendor.closingTime}`
                  : "MON - SAT: 8AM - 8PM"}
              </p>
            </div>
          </div>
        </div>

        <div className="vendor-base-price">
          <span>Base Price</span>
          <h3>₦{vendor.basePrice || "1,000"}/kg</h3>
        </div>

        {vendor.reviews && vendor.reviews.length > 0 && (
          <div className="vendorModal-reviews">
            <h4>Customer Reviews</h4>
            {vendor.reviews.map((review, i) => (
              <div className="vendor-review" key={i}>
                <p>
                  <strong>{review.name}</strong> ⭐⭐⭐⭐⭐ <span>{review.time}</span>
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <button
          className="vendor-order-btn"
          onClick={() => setShowOrderModal(true)}
        >
          Order Now
        </button>

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
