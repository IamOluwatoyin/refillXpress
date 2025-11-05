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
import { FiPackage } from "react-icons/fi";
import DeliveryVerification from './DeliveryVerification';

const CompletionModal = () => {
  const [show, setShow] = useState(false)
  return (
    <div className='completionmodal'>
      
      <div className="modal-itself">
        <div className="modal-heading">
          <h4>order details</h4>  
          <p>x</p>
        </div>
        <div className="order-code">
          <h4>ord-2341</h4>
          <p>2 hours ago</p>
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
          <FiPackage className='icon-type' />
          <div className="order-info-details">
            <span className="the-order-info">order</span>
            <p>Lpg 11kg</p>
          </div>
        </div>
        <div className="order-info">
          <FiPackage className='icon-type' />
          <div className="order-info-details">
            <span className="the-order-info">order</span>
            <p>Lpg 11kg</p>
          </div>
        </div>
        <div className="hr">
          <hr />
        </div>
        <div className="total-amt">
          <h4>total</h4>
          <p>12,500</p>
        </div>
        <div className='generate-holder'>
          <button onClick={()=> setShow(true)} className="generate">
            <FiPackage /> <span>generate delivery code</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompletionModal
