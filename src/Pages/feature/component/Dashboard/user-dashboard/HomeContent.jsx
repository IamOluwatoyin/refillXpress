import React, { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import "./homecontent.css";
import { toast } from "react-toastify";
import { getNearbyVendors, getRecentOrders } from "../../../../../api/query";
import OrderModal from "./modals/OrderModal";
import { useNavigate } from "react-router";
import { useLoading } from "../../../../../context/LoadingContext";
import SpinnerModal from "../../../../../Auth/vendor-auth/spinner-modal"; 
const HomeContent = () => {
  const nav = useNavigate();
  const { loading, setLoading } = useLoading(); 
  const [info, setInfo] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [order, setOrder] = useState(false);
  const [nearby, setNearby] = useState(null);
  const [recent, setRecent] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) setInfo(storedUser);
  }, []);

  useEffect(() => {
    const fetchNearby = async () => {
      try {
        setLoading(true); // show global loading
        const res = await getNearbyVendors();
        setNearby(res.data.data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
        toast.error(err.response?.data?.message || "Failed to fetch vendors");
      } finally {
        setLoading(false); // hide global loading
      }
    };
    fetchNearby();
  }, [setLoading]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true); // show global loading
        const res = await getRecentOrders();
        setRecent(res.data.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          nav("/userlogin");
        } else {
          toast.error(err.response?.data?.message || "Failed to fetch orders");
        }
      } finally {
        setLoading(false); // hide global loading
      }
    };
    fetchRecent();
  }, [nav, setLoading]);

  return (
    <main className="homecontent" style={{ position: "relative" }}>
  {loading && <div className="global-loading">Loading...</div>}

      {order && (
        <OrderModal onClose={() => setOrder(false)} vendor={selectedVendor} />
      )}

      <header className="heading">
        <div className="texts">
          <h3>Welcome back {info?.firstName}</h3>
          Ready to order your next gas refill?
        </div>
      </header>

      <section className="actions">
        <div className="action">
          <GrLocation className="icon" style={{ color: "blue" }} />
          <p className="action-type">find vendors</p>
          <p>Browse gas suppliers near you</p>
        </div>
        <div className="action">
          <FiPackage className="icon" style={{ color: "orange" }} />
          <p className="action-type">my orders</p>
          <p>Track your deliveries</p>
        </div>
      </section>

      {/* Recent Orders */}
      <div className="views extreme">
        <div className="top">
          <p className="preview-title">recent orders</p>
          <button onClick={() => nav("myorders")} className="view-all">
            view all <BsArrowRight />
          </button>
        </div>

        {!recent || recent.length === 0 ? (
          <div className="empty-state">
            <p className="empty-message">You don’t have any orders yet.</p>
            <button className="order-now" onClick={() => nav("browsevendors")}>
              Place your first order
            </button>
          </div>
        ) : (
          recent.map((order) => (
            <div key={order.id} className="order-holder">
              <div className="my-order">
                <p>{order.orderNumber}</p>
                <p>{order.vendor?.businessName || "Unknown Vendor"}</p>
                <small>
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
              <div className="right">
                <div className="isDelivered">{order.status}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Nearby Vendors */}
      <div className="views extreme">
        <div className="top">
          <p className="preview-title">nearby vendors</p>
          <button onClick={() => nav("browsevendors")} className="view-all">
            view all <BsArrowRight />
          </button>
        </div>

        {nearby?.map((vendor) => (
          <div key={vendor.id} className="order-holder">
            <div className="my-order">
              <div className="vendor-status">
                <p>{vendor.businessName}</p>
                <span className="available">available</span>
                <span className="verified">
                  <MdVerified /> verified
                </span>
              </div>
              <div className="info">
                <small>
                  <GoStar className="star" />
                  4.8
                </small>
                <small>2.1km</small>
                <small>
                  <TbCurrencyNaira className="the-currency" />
                  <span className="the-price">1,500/kg</span>
                </small>
              </div>
              <p>
                <span>
                  <BiTimeFive />
                </span>
                <small>7:30AM - 8:30PM</small>
              </p>
              <small>Mon - Sun</small>
            </div>
            <div className="right">
              <button
                onClick={() => {
                  setSelectedVendor(vendor);
                  setOrder(true);
                }}
                className="order-now"
              >
                order now
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomeContent;
