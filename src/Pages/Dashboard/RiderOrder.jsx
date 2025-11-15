import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  MdOutlineCheckCircle,
  MdOutlineRemoveCircle,
  MdOutlineLocationOn,
  MdClose,
} from "react-icons/md";
import { FaCheckCircle, FaLocationArrow, FaExchangeAlt } from "react-icons/fa";
import "../..//styles/riderOrder.css";

const formatNaira = (amount) => {
  if (amount == null) return "₦0";
  return Number(amount)
    .toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
    .replace("NGN", "₦");
};

const RefillOrderDetailsModal = ({ order, isOpen, onClose, onAccept }) => {
  if (!isOpen || !order || !order.steps) return null;

  const totalDistance = order.steps
    .reduce((sum, step) => {
      const distanceMatch = step.location.match(/(\d+\.?\d*)\s*km/);
      return sum + (distanceMatch ? parseFloat(distanceMatch[1]) : 0);
    }, 0)
    .toFixed(1);

  const pickupStep = order.steps.find((step) => step.title.includes("Pickup"));
  const vendorStep = order.steps.find((step) => step.title.includes("Refill"));
  const returnStep = order.steps.find((step) => step.title.includes("Return"));

  const RefillStep = ({
    icon: Icon,
    title,
    location,
    distance,
    type,
    phone,
  }) => (
    <div className="modal_refill_step">
      <div className="step_icon_wrapper">
        <Icon size={20} color={type === "Refill" ? "#9C27B0" : "#4CAF50"} />
        {type !== "Final Stop" && <div className="step_arrow">→</div>}
      </div>
      <div className="step_info_modal">
        <span className="step_title_modal">{title}</span>
        <span
          className={`step_type_tag ${type.toLowerCase().replace(" ", "_")}`}
        >
          {type}
        </span>
        <span className="step_location_modal">{location}</span>
        <span className="step_distance_phone">
          {distance} • {phone}
        </span>
      </div>
    </div>
  );

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <div className="modal_header">
          <h2 className="modal_title">Refill Order Details</h2>
          <p className="modal_subtitle">Complete refill journey information</p>
          <button className="modal_close_btn" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="modal_summary_box">
          <span className="you_ll_earn">You'll Earn</span>
          <span className="modal_earnings">
            {formatNaira(order.deliveryFee)}
          </span>
          <span className="total_distance_label">Total Distance</span>
          <span className="modal_total_distance">{totalDistance} km</span>
        </div>

        <h3 className="modal_section_title">Refill Journey</h3>
        <div className="modal_refill_journey">
          {pickupStep && (
            <RefillStep
              icon={MdOutlineCheckCircle}
              title="1. Pickup Empty Cylinder"
              location={order.pickupAddress}
              distance={pickupStep.location.split(" • ")[1] || "N/A"}
              type="First Stop"
              phone="08160994840"
            />
          )}
          <div className="step_separator">→</div>

          {vendorStep && (
            <RefillStep
              icon={FaExchangeAlt}
              title="2. Refill at Vendor"
              location={order.vendorLocation || "Vendor Refill Location"}
              distance={vendorStep.location.split(" • ")[1] || "N/A"}
              type="Refill"
              phone={order.vendorPhone || "N/A"}
            />
          )}
          <div className="step_separator">→</div>

          {returnStep && (
            <RefillStep
              icon={MdOutlineCheckCircle}
              title="3. Return Refilled Cylinder"
              location={order.deliveryAddress}
              distance={returnStep.location.split(" • ")[1] || "N/A"}
              type="Final Stop"
              phone="08160994840"
            />
          )}
        </div>

        <div className="modal_actions">
          <button className="btn_close_modal" onClick={onClose}>
            Close
          </button>
          <button
            className="btn_accept_modal"
            onClick={() => onAccept(order.userId)}
          >
            <MdOutlineCheckCircle size={18} /> Accept This Order
          </button>
        </div>
      </div>
    </div>
  );
};

const CompletedDeliveryItem = ({ order }) => {
  const rating = order.rating || 5;
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  const fee = order.deliveryFee || 0;
  const tip = order.tip || 0;

  return (
    <div className="completed_delivery_item">
      <div className="completed_header">
        <span className="completed_order_id">#{order.orderNumber}</span>
        <span className="status_badge completed">Completed</span>
        <span className="completed_fee">{formatNaira(fee)}</span>
      </div>

      <div className="completed_details">
        <div className="customer_time">
          <span className="customer_name_comp">
            {order.customerName || "Customer"}
          </span>
          <span className="delivery_time_comp">
            Delivered on {new Date(order.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <span className="gas_quantity">
          {order.cylinderSize}kg × {order.quantity}
        </span>
      </div>

      <div className="completed_meta">
        <span className="distance_rating">
          2.5 km <span className="completed_rating">{stars}</span>
        </span>
        <span className="bonus_tip">+{formatNaira(tip)} Tip</span>
      </div>
    </div>
  );
};

const ActiveOrderItem = ({ order, onNavigateToTracker }) => (
  <div className="active_order_card">
    <div className="active_order_header">
      <span className="active_order_id">Delivery #{order.orderNumber}</span>
      <span className="status_badge in_progress">{order.status}</span>
      <span className="active_order_fee">{formatNaira(order.deliveryFee)}</span>
    </div>

    <div className="active_order_details">
      <span className="refill_type">
        LPG {order.cylinderSize}kg × {order.quantity}
      </span>
      <span className="customer_name_detail">
        Customer: {order.customerName || "Unknown"}
      </span>
    </div>

    <div className="location_sections">
      <div className="location_card pickup_card">
        <span className="location_title">Pickup</span>
        <div className="location_address">
          <FaCheckCircle size={14} color="#4CAF50" />
          <span>{order.pickupAddress}</span>
        </div>
      </div>

      <div className="location_card delivery_card">
        <span className="location_title">Delivery</span>
        <div className="location_address">
          <MdOutlineLocationOn size={16} color="#777" />
          <span>{order.deliveryAddress}</span>
        </div>
      </div>
    </div>

    <div className="active_order_actions">
      <button className="btn_navigate" onClick={onNavigateToTracker}>
        <FaLocationArrow size={18} /> Start Route Navigation
      </button>
      <button className="btn_complete">
        <MdOutlineCheckCircle size={18} /> Complete Delivery
      </button>
    </div>
  </div>
);

const RefillRequestItem = ({
  orderId,
  time,
  deliveryFee,
  steps,
  onDetailsClick,
  onAccept,
  orderData,
}) => (
  <div className="request_item">
    <div className="request_header_image_style">
      <div className="request_info_group">
        <span className="order_id">{orderId}</span>
        <span className="order_time_details">{time}</span>
      </div>
      <div className="request_fee_group">
        <strong className="delivery_fee_image_style">
          {formatNaira(deliveryFee)}
        </strong>
        <span className="delivery_fee_label">delivery fee</span>
      </div>
    </div>

    <div className="request_steps_image_style">
      {steps.map((step, index) => (
        <div key={index} className="step_item_image_style">
          <div className="step_dot_line_image_style">
            {index === 0 ? (
              <span className="step_dot_filled"></span>
            ) : (
              <span className="step_dot_hollow"></span>
            )}
            {index < steps.length - 1 && (
              <span className="step_line_vertical"></span>
            )}
          </div>

          <div className="step_info_image_style">
            <span className="step_title_image_style">{step.title}</span>
            <span className="step_location_image_style">
              {step.location.includes(" • ")
                ? step.location.split(" • ")[0]
                : step.location}
            </span>
          </div>

          <div
            className={`step_background ${
              index === 0 ? "pickup" : index === 1 ? "refill" : "return"
            }`}
          ></div>
        </div>
      ))}
    </div>

    <div className="request_actions_image_style">
      <button
        className="btn_details_image_style"
        onClick={() => onDetailsClick({ ...orderData, steps })}
      >
        <MdOutlineRemoveCircle size={18} /> Details
      </button>
      <button className="btn_accept_image_style" onClick={onAccept}>
        <MdOutlineCheckCircle size={18} /> Accept
      </button>
    </div>
  </div>
);

const RiderOrder = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("available");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allOrders, setAllOrders] = useState({
    available: [],
    active: [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const transformRefillData = (refill) => ({
    ...refill,
    riderId: refill?.riderId || refill?.RiderId || null,
    id: refill.id,
    orderId: refill.orderNumber,
    orderNumber: refill.orderNumber,
    customerName:
      `${refill.user?.firstName || ""} ${refill.user?.lastName || ""}`.trim() ||
      "Customer",
    cylinderSize: refill.cylinderSize,
    quantity: refill.quantity,
    deliveryFee: refill.deliveryFee,
    totalPrice: refill.totalPrice,
    pickupAddress: refill.pickupAddress,
    deliveryAddress: refill.deliveryAddress,
    userId: refill.userId,
    vendorLocation: `${refill.vendor?.businessName || "Vendor"} (${
      refill.vendor?.businessAddress || "N/A"
    })`,
    vendorPhone: refill.vendor?.phoneNumber || "N/A",
    time: `${refill.cylinderSize}kg LPG Refill x${refill.quantity} • 35 min`,
    steps: [
      {
        title: "1. Pickup Empty Cylinder",
        location: `${refill.deliveryAddress} • 1.2 km`,
      },
      {
        title: "2. Refill at Vendor",
        location: `${refill.vendor?.businessName || "Vendor"} (${
          refill.vendor?.businessAddress || "N/A"
        }) • 0.8 km`,
      },
      {
        title: "3. Return Filled Cylinder",
        location: `${refill.deliveryAddress} • 1.2 km`,
      },
    ],
  });

  const fetchAllOrders = useCallback(async () => {
    if (!authToken) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const axiosInstance = axios.create({
        baseURL: "https://refillexpress.onrender.com/api/v1",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const res = await axiosInstance.get(
        "/rider/get/getActiveAndCompletedOrders"
      );
      const data = res.data.data || {};

      const availableData = (data.available || []).map(transformRefillData);
      const activeData = (data.active || []).map(transformRefillData);
      const completedData = (data.completed || []).map(transformRefillData);

      setAllOrders({
        available: availableData,
        active: activeData,
        completed: completedData,
      });

      console.log("✅ Available Orders:", availableData);
      console.log("✅ Active Orders:", activeData);
      console.log("✅ Completed Orders:", completedData);
    } catch (err) {
      console.error("Error fetching refills:", err);
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const handleDetailsClick = (orderData) => {
    setSelectedOrder(orderData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleNavigateToTracker = (orderId) => {
    navigate(`/rider-dashboard/order-tracker/${orderId}`);
  };

  const handleAcceptOrder = async (orderToAccept, userId) => {
    const orderIdToAccept = orderToAccept.id;
    const customerUserId = userId || orderToAccept.userId;

    if (!orderIdToAccept || !customerUserId || !authToken) {
      console.error("Cannot accept order: Missing required data.");
      return;
    }

    handleCloseModal();

    try {
      const axiosInstance = axios.create({
        baseURL: "https://refillexpress.onrender.com/api/v1",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      await axiosInstance.get(
        `/orders/confirmOrder/${orderIdToAccept}/${customerUserId}`
      );

      await fetchAllOrders();

      handleNavigateToTracker(orderIdToAccept);
    } catch (error) {
      console.error("Failed to accept order:", error);
      alert("Failed to accept order. Please check the console for details.");
    }
  };

  const handleAcceptModal = (userId) => {
    if (selectedOrder) {
      handleAcceptOrder(selectedOrder, userId);
    }
  };

  const tabs = [
    { key: "available", name: `Available (${allOrders.available.length})` },
    { key: "active", name: `Active (${allOrders.active.length})` },
    { key: "completed", name: `Completed (${allOrders.completed.length})` },
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

      {loading && <p className="loading_message">Loading deliveries...</p>}
      {error && !loading && <p className="error_message">Error: {error}</p>}

      {/* ---------- AVAILABLE ORDERS ---------- */}
      {activeTab === "available" && !loading && (
        <>
          <div className="request_info_section">
            <h3 className="request_info_title">Available Refill Requests</h3>
            <p className="request_info_subtitle">
              Pick a refill order to start earning
            </p>
          </div>

          <div className="gas_cylinder_service_info blue_bg">
            Gas Cylinder Refill service:{" "}
            <span className="service_details">
              Collect empty cylinders → Take to vendors for refilling → Return
              filled cylinders to customers
            </span>
          </div>

          <div className="requests_list">
            {allOrders.available.length === 0 ? (
              <p className="loading_message">
                No available orders at this time.
              </p>
            ) : (
              allOrders.available.map((order, index) => (
                <RefillRequestItem
                  key={index}
                  {...order}
                  onDetailsClick={handleDetailsClick}
                  onAccept={() => handleAcceptOrder(order)}
                  orderData={order}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* ---------- ACTIVE ORDERS ---------- */}
      {activeTab === "active" && !loading && (
        <div className="active_order_content">
          {allOrders.active.length === 0 ? (
            <p className="loading_message">No active orders currently.</p>
          ) : (
            allOrders.active.map((order, index) => (
              <ActiveOrderItem
                key={index}
                order={order}
                onNavigateToTracker={() => handleNavigateToTracker(order.id)}
              />
            ))
          )}
        </div>
      )}

      {/* ---------- COMPLETED ORDERS ---------- */}
      {activeTab === "completed" && !loading && (
        <div className="completed_order_content">
          {allOrders.completed.length === 0 ? (
            <p className="loading_message">No completed deliveries yet.</p>
          ) : (
            allOrders.completed.map((order, index) => (
              <CompletedDeliveryItem key={index} order={order} />
            ))
          )}
        </div>
      )}

      {/* ---------- MODAL ---------- */}
      <RefillOrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAcceptModal}
      />
    </div>
  );
};

export default RiderOrder;
