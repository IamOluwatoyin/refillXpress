import React from "react";
import "./AnalyticsManagement.css";
import { FaNairaSign } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaStar, FaRegStar } from "react-icons/fa";
import ProgressBar from "../../ProgressBar";
const AnalyticsManagement = () => {
  return (
    <div className="AnalyticsWrapper">
      <p className="AnalyticsWrapperHeader"> Analytics</p>
     
      <div className="summary-section-analysis">
        <div className="summary-card-analysis">
          <div className="icon-analysis-holder">
            <div className="icon-analysis green">
              <FaNairaSign />
            </div>
            <span className="icon-span">+15% vs last month</span>
          </div>
          <h3 className="summary-value-analysis">₦200,000</h3>
          <p className="summary-label-analysis">This Month Revenue</p>
        </div>

        <div className="summary-card-analysis">
          <div className="icon-analysis-holder">
            <div className="icon-analysis blue">
              <GoPackage />
            </div>
            <span className="icon-span">+8% vs last month</span>
          </div>
          <h3 className="summary-value-analysis">1245</h3>
          <p className="summary-label-analysis">Total Orders</p>
        </div>

        <div className="summary-card-analysis">
          <div className="icon-analysis-holder">
            <div className="icon-analysis purple">
              <FaArrowTrendUp />
            </div>
            <span className="icon-span2">Excellent</span>
          </div>
          <h3 className="summary-value-analysis">96.2%</h3>
          <p className="summary-label-analysis">Completion Rate</p>
        </div>
      </div>
      <div className="overviewWrapper">
        <header className="overView-header">
          <h4>Performance Overview</h4>
        </header>
        <div className="graph-holder">
  {/* Order Completion Rate */}
  <div className="rate-divider">
    <div className="rate-top">
      <p>Order Completion Rate</p>
      <p className="percent">96.2%</p>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: "96.2%", backgroundColor: "#00A63E" }}></div>
    </div>
  </div>

  {/* Customer Rating */}
  <div className="rate-divider">
    <div className="rate-top">
      <p>Customer Rating</p>
      <div className="rating">
        <div className="stars">
          <FaStar className="filled" />
          <FaStar className="filled" />
          <FaStar className="filled" />
          <FaStar className="filled" />
          <FaStar className="unfilled" />
        </div>
        <p className="rating-value">4.85</p>
      </div>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: "85%", backgroundColor: "#FFD700" }}></div>
    </div>
  </div>
</div>

      </div>
      <div className="overviewWrapper">
        <header className="overView-header">
          <h4>Customer Satisfaction</h4>
        </header>
        <div className="graph-holder2">
  <div className="rate-dividerbox1">
    <p>Rating Distribution</p>
    
      <div className="rate-top">
          <div className="star-label">
        <span>5</span>
        <FaStar className="filled" />
      </div>
      <div>
        
      </div>
          <ProgressBar value={172} max={245} color="#facc15"
          
          />
          <p>172</p>
          
        </div>
    
  </div>

  <div className="rate-dividerbox2">
    <header className="overview-header">
        <p>Total reviews</p>
    </header>
    <div className="box-content">
      <h3>245</h3>
      <span>Customer reviews</span>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default AnalyticsManagement;

{/* <div className="rate-row">
      <div className="rate-label">
        <p>5 <FaStar className="filled" /></p>
        <p>172</p>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: "80%" }}></div>
      </div>
    </div>

    
     <div className="rate-row">
      <div className="rate-label">
        <p>4 <FaStar className="filled" /></p>
        <p>50</p>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: "60%" }}></div>
      </div> 
    </div> */}