import React from 'react'
import "./deliveryverification.css"
import { GoStar } from "react-icons/go";


const DeliveryVerification = () => {
  return (
    <div className='modal-bg'>
      <div className="modal-itself">
            <div className="modal-heading">
                <div className="left-part">
                    <GoStar />
                    <h4>delivery verification</h4>
                </div>
                <p className='x-btn'>x</p>
            </div>
            <div className="order-id">
                <div  className='small'>
                    <GoStar />
                </div>
                <div className='start'>
                    <p>order</p>
                    <p>type</p>
                    <p>vendor</p>
                </div>
                <div>
                    <button className="out-for-delivery">
                        out for delivery
                    </button>
                </div>
            </div>
            <div className="verification">
                <button className="verify-code">
                    <GoStar /> <span>verify code</span>
                </button>
            </div>
            <div className="security-notice">
                <div className='icon'><GoStar /></div>
                <div className='security'>
                    <span className='title'><GoStar /> security notice</span>
                    <p>
                        Only share your 6-digit verification code with the delivery person upon receiving your order. This confirms successful delivery.
                    </p>
                </div>
            </div>
            <div className="the-code-box">
                <GoStar className='shield' />
                <p>your delivery code</p>
                <h3>742891</h3>
                <small>Share this code with the delivery person.</small>
            </div>
      </div>
    </div>
  )
}

export default DeliveryVerification
