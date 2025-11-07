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

 useEffect(() => {
  const quantity = parseFloat(orderInput.quantity) || 0;
  const pricePerKg = vendor?.pricePerKg || 0;
  const deliveryFee = vendor?.deliveryFee || 0;

  setTotal(quantity * pricePerKg + deliveryFee);
}, [orderInput.quantity, vendor?.pricePerKg, vendor?.deliveryFee]);


  const beforeInput = (e) => {
    if (e.data && !/^\d+$/.test(e.data)) {
      e.preventDefault();
      toast.error("Numbers only");
    }
  };

  const handleSend = async () => {
    if (!orderInput.cylinderSize || !orderInput.quantity || !orderInput.deliveryAddress) {
      toast.warn("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASEURL}/order/create-order`,
        {
          cylinderSize: orderInput.cylinderSize,
          quantity: orderInput.quantity,
          deliveryAddress: orderInput.deliveryAddress,
          vendorId: vendor?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Order created successfully!");
        setTimeout(() => {
          onClose(); 
          navigate("/userdashboard/myorders"); s
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ordermodal">
      <div className="the-modal-itself">
        <div className="modal-heading">
          <h4>Gas Refill</h4>
          <CgClose onClick={onClose} />
        </div>

        {/* Vendor Info */}
        <div className="vendors-name">
          <p className="the-vendor-name">{vendor?.businessName || "Vendor"}</p>
          <small>{vendor?.businessAddress || "—"}</small>
        </div>

        {/* Cylinder Size */}
        <div className="specs">
          <label htmlFor="size">Cylinder Size (kg)</label>
          <div className="the-spec">
            <input
              type="text"
              className="the-spec-input"
              id="size"
              maxLength={2}
              onChange={(e) =>
                setOrderInput({ ...orderInput, cylinderSize: e.target.value })
              }
              onBeforeInput={beforeInput}
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="specs">
          <label htmlFor="quantity">Quantity</label>
          <div className="the-spec">
            <input
  type="text"
  className="the-spec-input"
  id="quantity"
  value={orderInput.quantity}
  onChange={(e) => {
    // Only allow digits
    const numericValue = e.target.value.replace(/\D/g, "");
    setOrderInput({ ...orderInput, quantity: numericValue });
  }}
/>

            <small className="small">
              price: <TbCurrencyNaira size={12} />
              {vendor?.pricePerKg || 0}/kg
            </small>
          </div>
        </div>

        {/* Address */}
        <div className="specs">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            className="the-spec-input"
            onChange={(e) =>
              setOrderInput({
                ...orderInput,
                deliveryAddress: e.target.value,
              })
            }
          ></textarea>
        </div>

        {/* Delivery Info */}
        <div className="vendors-name">
          <p>Service Type</p>
        </div>
        <div className="delivery-fee-info">
          <div className="inline-delivery-info">
            <div className="smallblackdot-bg">
              <div className="smallblackdot"></div>
            </div>
            <small>
              This delivery is for customers within this location — fee:
              <TbCurrencyNaira size={12} /> {vendor?.deliveryFee || 0}
            </small>
          </div>
        </div>

        {/* Summary */}
        <div className="item-details">
          <div className="calc">
            <p>
              Gas ({orderInput.quantity || 0}) × {vendor?.pricePerKg || 0}
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
              {vendor?.deliveryFee || 0}
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

        {/* Buttons */}
        <div className="choice-btns">
          <button onClick={onClose} className="cancel-order">
            cancel
          </button>
          <button
            onClick={handleSend}
            className="cancel-order to-continue"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
