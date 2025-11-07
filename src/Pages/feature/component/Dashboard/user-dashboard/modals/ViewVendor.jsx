import React, { useEffect, useState } from "react";
import "./viewvendor.css";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { CgClose, CgTime } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";

const ViewVendor = ({ vendor, onClose, openOrder }) => {

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><CgClose /></button>
        <h2 className="modal-title">MaxGas Supply</h2>

        <div className="modal-rating">
          <span> <FaStar color="gold" />4.8 (234 reviews)</span>
          <span className="tag top-rated">Top Rated</span>
          <span className="tag in-stock">In Stock</span>
        </div>

        <p className="vendorModal-description">
          {vendor.description || "Fast and reliable gas delivery service with years of experience."}
        </p>
  <div className="vendor-info">
 <div className="inner-box">
     <div className="box box-start">
      <div className="info">
          <GrLocation className="location-icons" />
            <div className="icon-desc">
             <span>location</span>
             <span>{vendor.businessAddress}</span>
            </div>
      </div>

      <div className="info">
          <FiPhone className="location-icons"/>
            <div className="icon-desc">
             <span>phone</span>
             <span>location</span>
             <span>location</span>
            </div>
      </div>
    </div>

    <div className="box box-start
    ">
      <div className="info">
          <CgTime className="location-icons" />
            <div className="icon-desc">
             <span>delivery time</span>
             <span>location</span>
             <span>location</span>
            </div>
      </div>

      <div className="info">
          
            <div className="icon-desc">
             <strong>operating hours</strong>
             <small>MON - SAT: 8AM - 8PM </small>
            </div>
      </div>
    </div>
 </div>

  </div>
        <div className="base-price">
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

        <button onClick={openOrder} className="order-btn">Order Now</button>
      </div>
    </div>
  );
};

export default ViewVendor;
