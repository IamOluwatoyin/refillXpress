import React, { useState } from 'react'
import "./completionmodal.css"
import './ordermodal.css'
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import { FiPackage, FiPhone } from "react-icons/fi";
import { GrLocation } from 'react-icons/gr';
import DeliveryVerification from './DeliveryVerification';
import { IoMdClose } from 'react-icons/io';
import PaymentChoice from './PaymentChoice';
const CompletionModal = ({ order, onClose, onGenerateCode }) => {

  const [show, setShow] = useState(false)
  return (
    <div className='completionmodal'>
      {show && DeliveryVerification}
      <div className="the-modal-itself">
        <div className="modal-heading">
          <h4>order details</h4>  
          <p onClick={onClose}><IoMdClose /></p>
        </div>
        <div className="order-code">
          <h4>{order.orderNumber}</h4>
          <p>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}</p>
        </div>
        <div className="hr">
          <hr />
        </div>
        <div className="order-info">
          <FiPackage className='icon-type' />
          <div className="order-info-details">
            <span className="the-order-info">order</span>
            <p>Lpg 11kg</p>
          </div>
        </div>
        <div className="order-info">
          <GrLocation className='icon-type' />
          <div className="order-info-details">
            <span className="the-order-info">delivery address</span>
            <p>{order.deliveryAddress}</p>
          </div>
        </div>
         <div className="order-info">
          <FiPhone className='icon-type' />
          <div className="order-info-details">
            <span className="the-order-info">vendor</span>
            <p>{order.vendor.businessName}</p>
          </div>
        </div>
        {/* <div className="order-info">
          <BiTimeFive className='icon-type' />
          <div className="order-info-details">
            <span className="the-order-info">order</span>
            <p>Lpg 11kg</p>
          </div>
        </div> */}
        <div className="hr">
          <hr />
        </div>
        <div className="total-amt">
          <h4>total</h4>
          <p className='currency'><TbCurrencyNaira size={20} />{order.totalPrice}</p>
        </div>
        <div className='generate-holder'>
          <button onClick={onGenerateCode} className="generate">
           <FiPackage /> <span>generate delivery code</span>
        </button>

        </div>
      </div>
    </div>
  )
}

export default CompletionModal
