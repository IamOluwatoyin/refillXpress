import React, { useEffect, useState } from "react";
import "./AnalyticsManagement.css";
import { FaNairaSign } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import ProgressBar from "../../ProgressBar";
import { getAnalytics, getSummary } from "../../../../api/query";
import { toast } from "react-toastify";

const AnalyticsManagement = () => {
  const [reviewSummary, setReviewSummary] = useState(null);
  const [vendorAnalytics, setVendorAnalytics] = useState(null);
  const id = localStorage.getItem(import.meta.env.VITE_VENDOR_ID);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getSummary();
        setReviewSummary(res?.data?.data);

        const response = await getAnalytics(id);
        setVendorAnalytics(response?.data?.data);
      } catch (error) {
        console.log("not working", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    };
    fetchSummary();
  }, [id]);


  const analytics = vendorAnalytics || {};
  const reviews = reviewSummary || {};

  return (
    <div className="AnalyticsWrapper">
      <p className="AnalyticsWrapperHeader"> Analytics</p>

      {/* Summary Section */}
      <div className="summary-section-analysis">
      
        <div className="summary-card-analysis">
          <div className="icon-analysis-holder">
            <div className="icon-analysis green">
              <FaNairaSign />
            </div>
            <span className="icon-span">+15% vs last month</span>
            <span className="icon-span">-</span>
          </div>
          <h3 className="summary-value-analysis">
            ₦{analytics.monthlyRevenue?.toLocaleString() || 0}
          </h3>
          <p className="summary-label-analysis">This Month Revenue</p>
        </div>

        {/* Total Orders */}
        <div className="summary-card-analysis">
          <div className="icon-analysis-holder">
            <div className="icon-analysis blue">
              <GoPackage />
            </div>
            <span className="icon-span">vs last month</span>
            <span className="icon-span">-</span>
          </div>
          <h3 className="summary-value-analysis">
            {analytics.totalOrders || 0}
          </h3>
          <p className="summary-label-analysis">Total Orders</p>
        </div>

        {/* Completion Rate */}
        <div className="summary-card-analysis">
          <div className="icon-analysis-holder">
            <div className="icon-analysis purple">
              <FaArrowTrendUp />
            </div>
            <span className="icon-span2">
              {analytics.completionRate
                ? `${analytics.completionRate}%`
                : "no rank yet"}
            </span>
          </div>
          <h3 className="summary-value-analysis">
            {analytics.completionRate || 0}%
          </h3>
          <p className="summary-label-analysis">Completion Rate</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="overviewWrapper">
        <header className="overView-header">
          <h4>Performance Overview</h4>
        </header>
        <div className="graph-holder">
          {/* Order Completion Rate */}
          <div className="rate-divider">
            <div className="rate-top">
              <p>Order Completion Rate</p>
              <p className="percent">{analytics.completionRate || 0}%</p>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${analytics.completionRate || 0}%`,
                  backgroundColor: "#00A63E",
                }}
              ></div>
            </div>
          </div>

          {/* Customer Rating */}
          <div className="rate-divider">
            <div className="rate-top">
              <p>Customer Rating</p>
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                      key={i}
                      className={
                        i <= Math.round(analytics.averageRating || 0)
                          ? "filled"
                          : "unfilled"
                      }
                    />
                  ))}
                </div>
                <p className="rating-value">
                  {analytics.averageRating || 0}
                </p>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(analytics.averageRating / 5) * 100 || 0}%`,
                  backgroundColor: "#FFD700",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Satisfaction */}
      <div className="overviewWrapper">
        <header className="overView-header">
          <h4>Customer Satisfaction</h4>
        </header>
        <div className="graph-holder2">
          <div className="rate-dividerbox1">
            <p>Rating Distribution</p>

            {!reviews?.ratingDistribution ? (
              <p>no reviews yet</p>
            ) : (
              Object.entries(reviews.ratingDistribution)
                .sort(([a], [b]) => b - a)
                .map(([star, count]) => (
                  <div key={star} className="rating-row">
                    <div className="star-label">
                      <span>{star}</span>
                      <FaStar className="filled" />
                    </div>

                    <ProgressBar
                      value={count}
                      max={reviews.totalReviews || 1}
                      color="#FFD700"
                    />

                    <p>{count}</p>
                  </div>
                ))
            )}
          </div>

          <div className="rate-dividerbox2">
            <header className="overview-header">
              <p>Total reviews</p>
            </header>
            <div className="box-content">
              <h3>{reviews?.totalReviews || 0}</h3>
              <span>Customer reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsManagement;
