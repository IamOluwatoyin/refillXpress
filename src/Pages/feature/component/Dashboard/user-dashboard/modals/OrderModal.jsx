import React from 'react'
import "./ordermodal.css"
const OrderModal = () => {
  return (
    <div className='ordermodal'>
      <div className="modal-itself">
            <div className="modal-heading">
                <h4>gas refill</h4>
                x
            </div>
            <div className='vendors-name'>
              <p className='the-vendor-name'>maxGas supply</p>
            </div>
            <div className="specs">
                <label htmlFor="size">cylinder size(kg)</label>
                <div className="the-spec">
                  <input type="text" className="the-spec-input" id='size' maxLength={2}/>
                </div>
            </div>
            <div className="specs">
                <label htmlFor="size">quantity</label>
                <div className="the-spec">
                  <input type="text" className="the-spec-input" id='size' />
                  <small className='small'>price: 1000/kg</small>
                </div>
            </div>
            <div className="specs">
              <label htmlFor="address">delivery address</label>
              <textarea name="delivery" id="address" className='the-spec-input'> 
                
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
                <p>gas(1 1kg + 1000/kg)</p>
                <p>11000</p>
              </div>
              <div className="calc">
                <p>gas(1 1kg + 1000/kg)</p>
                <p>11000</p>
              </div>
                <div className="line">
                  <hr />
                </div>
                <div className="calc">
                  <p>gas(1 1kg + 1000/kg)</p>
                <p>11000</p>
                </div>
            </div>
            <div className="choice-btns">
              <button className="cancel-order">
                cancel
              </button>
              <button className="cancel-order continue">
                continue
              </button>
            </div>
      </div>
    </div>
  )
}

export default OrderModal
