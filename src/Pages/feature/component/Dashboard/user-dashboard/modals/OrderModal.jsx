import React, { useState, useEffect } from "react";
import "./ordermodal.css";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { BASEURL } from "../../../../../../api/base";
import { TbCurrencyNaira } from "react-icons/tb";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ onClose, vendor }) => {
  const [orderInput, setOrderInput] = useState({
    cylinderSize: "",
    quantity: "",
    deliveryAddress: "",
  });

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [orderFromBackend, setOrderFromBackend] = useState(null);

  // your manual delivery fee
  const manualDeliveryFee = 2500;

  // Calculate total dynamically
  useEffect(() => {
    const quantity = parseFloat(orderInput.quantity) || 0;
    const pricePerKg = vendor?.pricePerKg || 0;

    // Only apply delivery fee if both quantity + address are filled
    const deliveryFee =
      quantity > 0 && orderInput.deliveryAddress.trim() !== "" ? manualDeliveryFee : 0;

    setTotal(quantity * pricePerKg + deliveryFee);
  }, [orderInput.quantity, orderInput.deliveryAddress, vendor?.pricePerKg]);

  const beforeInput = (e) => {
    if (e.data && !/^\d+$/.test(e.data)) {
      e.preventDefault();
      toast.error("Numbers only");
    }
  };

  const handleSend = async () => {
    if (!vendor?.isAvailable) {
      toast.error("Vendor is currently unavailable.");
      return;
    }

    if (!vendor?.inStock) {
      toast.error("Vendor is out of stock.");
      return;
    }

    if (vendor?.verificationStatus !== "approved") {
      toast.error("Vendor is not verified yet.");
      return;
    }

    if (!orderInput.cylinderSize || !orderInput.quantity || !orderInput.deliveryAddress) {
      toast.warn("Please fill all fields");
      return;
    }

    if (Number(orderInput.quantity) > Number(orderInput.cylinderSize)) {
      toast.error("Quantity cannot be greater than cylinder size");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASEURL}/order/create-order/${vendor.id}`,
        {
          cylinderSize: orderInput.cylinderSize,
          quantity: orderInput.quantity,
          deliveryAddress: orderInput.deliveryAddress,
          vendorId: vendor?.id,
          deliveryFee: manualDeliveryFee, // include your manual fee in payload
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Order created successfully!");
        setOrderFromBackend(res.data.order);

        setTimeout(() => {
          onClose();
          navigate("/userdashboard/myorders");
        }, 1200);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const isUnavailable =
    !vendor?.isAvailable ||
    !vendor?.inStock ||
    vendor?.verificationStatus !== "approved";

  return (
    <div className="ordermodal">
      <div className="the-modal-itself">
        <div className="modal-heading">
          <h4>Gas Refill</h4>
          <CgClose onClick={onClose} />
        </div>

        <div className="vendors-name">
          <p className="the-vendor-name">{vendor?.businessName}</p>
          <small>{vendor?.businessAddress}</small>
          <div className="vendor-status-info">
            <small>
              {vendor?.verificationStatus === "approved"
                ? " Verified Vendor"
                : " Pending Verification"}
            </small>
            <small>
              {vendor?.isAvailable
                ? vendor?.inStock
                  ? "🟢 Available"
                  : "🔴 Out of Stock"
                : "🟠 Unavailable"}
            </small>
          </div>
        </div>

        <div className="specs">
          <label htmlFor="size">Cylinder Size (kg)</label>
          <div className="the-spec">
            <input
              type="text"
              className="the-spec-input"
              id="size"
              maxLength={2}
              value={orderInput.cylinderSize}
              onChange={(e) =>
                setOrderInput({ ...orderInput, cylinderSize: e.target.value })
              }
              onBeforeInput={beforeInput}
            />
          </div>
        </div>

        <div className="specs">
          <label htmlFor="quantity">Quantity</label>
          <div className="the-spec">
            <input
              type="text"
              className="the-spec-input"
              id="quantity"
              value={orderInput.quantity}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");

                if (
                  orderInput.cylinderSize &&
                  Number(numericValue) > Number(orderInput.cylinderSize)
                ) {
                  toast.error("Quantity cannot exceed cylinder size");
                  return;
                }

                setOrderInput({ ...orderInput, quantity: numericValue });
              }}
            />
            <small className="small">
              price per kg: <TbCurrencyNaira size={12} />
              {vendor?.pricePerKg || 0}
            </small>
          </div>
        </div>

        <div className="specs">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            className="the-spec-input"
            onChange={(e) =>
              setOrderInput({ ...orderInput, deliveryAddress: e.target.value })
            }
          ></textarea>
        </div>

        <div className="vendors-name">
          <p>Service Type</p>
        </div>

        {/* SHOW DELIVERY FEE ONLY AFTER quantity + address are filled */}
        {Number(orderInput.quantity) > 0 &&
          orderInput.deliveryAddress.trim() !== "" && (
            <div className="delivery-fee-info">
              <div className="inline-delivery-info">
                <div className="smallblackdot-bg">
                  <div className="smallblackdot"></div>
                </div>
                <small>
                  Fee for this location: <TbCurrencyNaira size={12} />
                  {manualDeliveryFee}
                </small>
              </div>
            </div>
          )}

        <div className="item-details">
          <div className="calc">
            <p>
              Gas ({orderInput.quantity || 0}) × {vendor?.pricePerKg}
            </p>
            <p>
              <TbCurrencyNaira size={20} />
              {(parseFloat(orderInput.quantity) || 0) * (vendor?.pricePerKg || 0)}
            </p>
          </div>

          <div className="calc">
            <p>Delivery Fee</p>
            <p>
              <TbCurrencyNaira size={20} />
              {Number(orderInput.quantity) > 0 &&
              orderInput.deliveryAddress.trim() !== ""
                ? manualDeliveryFee
                : 0}
            </p>
          </div>

          <div className="line">
            <hr />
          </div>

          <div className="calc total">
            <p>Total</p>
            <p>
              <TbCurrencyNaira size={20} />
              {total}
            </p>
          </div>
        </div>

        <div className="choice-btns">
          <button onClick={onClose} className="cancel-order">
            cancel
          </button>
          <button
            onClick={handleSend}
            className="cancel-order to-continue"
            disabled={loading || isUnavailable}
          >
            {loading
              ? "Placing Order..."
              : !vendor?.isAvailable
              ? "Vendor Unavailable"
              : !vendor?.inStock
              ? "Out of Stock"
              : vendor?.verificationStatus !== "approved"
              ? "Vendor Not Verified"
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
