import React, { useState, useEffect } from "react";
import "./ordermodal.css";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { BASEURL } from "../../../../../../api/base";
import { TbCurrencyNaira } from "react-icons/tb";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"


const OrderModal = ({onClose, vendor}) => {
  const nav = useNavigate()
  const [payChoice, setPayChoice] = useState(false)
  const [orderInput, setOrderInput] = useState({
        cylinderSize: "",
        quantity: "",
        deliveryAddress: "",
  })
  const handleSend = async () => {
    console.log("running")
     if (!orderInput.cylinderSize || !orderInput.quantity && !orderInput.deliveryAddress) {
    toast.warn("Please fill all fields");
    return;
  }
  const token = localStorage.getItem("token")
    try {
      const res = await axios.post(`${BASEURL}/order/create-order` , {
        cylinderSize: orderInput.cylinderSize,
        quantity: orderInput.quantity,
        deliveryAddress: orderInput.deliveryAddress
      }, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )
    console.log(res)
      if(res.status === 201 || res.status === 200) {
        toast.success("order placed successfully")
        console.log(res.data)
         const orderId = res.data.order.id;
      const payRes = await axios.post(
        `${BASEURL}/user/initializePayment/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Payment init:", payRes.data);

      if (payRes.data?.data?.checkoutUrl) {
        window.location.href = payRes.data.data.checkoutUrl;
      } else {
        toast.error("Payment link not found");
      }
      }
    }  catch (err) {
  if (err.response) {
    console.error("Response error:", err.response.data);
  } else if (err.request) {
    console.error("No response received:", err.request);
  } else {
    console.error("Error setting up request:", err.message);
  }
  toast.error("Payment initialization failed");
  if (err.response.message = "Session timed out, please login to your account" || err.response.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please log in again.");
     nav("/userlogin")
    }
}
  }
  const beforeInput = (e) => {
    if (e.data && !/^\d+$/.test(e.data)) {
      e.preventDefault();
      toast.error("numbers only")
      return
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

            <div className="specs">
                <label htmlFor="size">quantity</label>
                <div className="the-spec">
                  <input type="text" className="the-spec-input" id='size' 
                   onChange={(e)=> setOrderInput({...orderInput, quantity: e.target.value})}
                  onBeforeInput={beforeInput}
                  />
                  {/* <small className='small'>price: 1000/kg</small> */}
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

            <div className="vendors-name">
              <p>service type</p>
            </div>
            <div className="delivery-fee-info">
              <div className="inline-delivery-info">
                <div className="smallblackdot-bg">
                  <div className="smallblackdot"></div>
                </div>
                <small>This delivery is only for customers within this location 
                  <span> {vendor.deliveryFee} </span>
                </small>
              </div>
            </div>
            <div className="item-details">
              <div className="calc">
                <p>{`Gas - ${orderInput.quantity} x ${orderInput.cylinderSize}kg x ${vendor.pricePerKg}`}</p>
                <p><TbCurrencyNaira size={20} />{orderInput.quantity * vendor.pricePerKg}</p>
              </div>
              <div className="calc">
                <p>Delivery Fee</p>
                <p><TbCurrencyNaira size={20} />{vendor.pricePerKg} </p>
              </div>
                <div className="line">
                  <hr />
                </div>
                <div className="calc">
                  <p>Total</p>
                <p><TbCurrencyNaira size={20}/>{orderInput.quantity * vendor.pricePerKg + vendor.pricePerKg}</p>
                </div>
            </div>
            <div className="choice-btns">
              <button onClick={onClose} className="cancel-order">
                cancel
              </button>
              <button onClick={handleSend} className="cancel-order to-continue">
                continue
              </button>
            </div>
      </div>
    </div>
  );
};

export default OrderModal;
