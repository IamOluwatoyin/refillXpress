import React, { useState } from 'react'
import "./ordermodal.css"
import { CgClose } from "react-icons/cg";
import PaymentChoice from './PaymentChoice';
import axios from 'axios';
import { BASEURL } from '../../../../../../api/base';
import { TbCurrencyNaira } from "react-icons/tb";
import { toast } from 'react-toastify';



const OrderModal = ({onClose, vendor}) => {
  const [payChoice, setPayChoice] = useState(false)
  const [orderInput, setOrderInput] = useState({
        cylinderSize: "",
        quantity: "",
        deliveryAddress: "",
  })
  const handleSend = async (e) => {
     if (!orderInput.cylinderSize || !orderInput.quantity || !orderInput.deliveryAddress) {
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
        toast.success(res.data.message)
        setPayChoice(true)
      }
    } catch(err) {
      toast.error("failed")
    }
  }
  const beforeInput = (e) => {
    if (e.data && !/^\d+$/.test(e.data)) {
      e.preventDefault();
      toast.error("numbers only")
      return
    }
  };
  
  console.log(orderInput)
  return (
    <div className='ordermodal'>
      {payChoice && <PaymentChoice onClick={()=> setPayChoice(false)} />}
      <div className="the-modal-itself">
            <div className="modal-heading">
                <h4>gas refill</h4>
                <CgClose onClick={onClose}/>
            </div>
            <div className='vendors-name'>
              <p className='the-vendor-name'>maxGas supply</p>
            </div>

            <div className="specs">
                <label htmlFor="size">cylinder size(kg)</label>
                <div className="the-spec">
                  <input type="text" 
                  className="the-spec-input"
                   id='size' maxLength={2}
                   onChange={(e)=> setOrderInput({...orderInput, cylinderSize: e.target.value})}
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
                  <small className='small'>price: 1000/kg</small>
                </div>
            </div>

            <div className="specs">
              <label htmlFor="address">delivery address</label>
              <textarea name="delivery" id="address" className='the-spec-input'
              onChange={(e)=> setOrderInput({...orderInput, deliveryAddress: e.target.value})}
              > 
              </textarea>
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
                  <span>1000</span>
                </small>
              </div>
            </div>
            <div className="item-details">
              <div className="calc">
                <p>{`Gas ${orderInput.quantity} x ${orderInput.cylinderSize}kg x ${vendor.pricePerKg}`}</p>
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
  )
}

export default OrderModal
