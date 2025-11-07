import React from 'react'
import "./paymentchoice.css"
import { CgClose } from 'react-icons/cg'
import { IoCardOutline } from 'react-icons/io5'
import { BsBank } from "react-icons/bs";

const PaymentChoice = ({onClick}) => {
  return (
    <div className='payment-modal'>
      <div className="modal">
        <div className="cancel">
            <button onClick={onClick} className="x-btn">
                <CgClose />
            </button>
        </div>
        <h3>How would you like to pay? </h3>
        <div className="icon-choice">
                <label className='top'>
                    <span className='spn'><IoCardOutline /></span>
                    <strong>pay with card</strong>
                    <input type="radio" name='payment' />
                </label>
           <div className="line">
            <hr />
            </div> 
        </div>

        <div className="icon-choice">
                <label className='top'>
                    <span className='spn'><BsBank /></span>
                    <strong>pay with bank transfer</strong>
                    <input type="radio" name='payment' />
                </label>
           <div className="line">
            <hr />
            </div> 
        </div>
        <button className="continue">continue</button>
        <strong  onClick={onClick} className="back">go back</strong>
      </div>
    </div>
  )
}

export default PaymentChoice
