import React from 'react'
import "./myorders.css"
import "./homecontent.css"
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";


const MyOrders = () => {
  return (
    <main className='myorders'>
      <header className="heading">
            <div className="texts">
                <h3> my orders</h3>
                view your orders
            </div>
        </header>
        <section className="views shrink">
            <div className="order-title">
                <div className="order-title">
                    <p className="preview-title">#GR45821</p>
                    <div className="available deliver">
                        out for delivery
                    </div>
                </div>
            </div>
            <div className="for-time">
                    <small>Oct 20, 2025, 10:30AM</small>
                </div>
                <div className="order-type">
                    <div className="icon-details">
                        <em className='desc-icon'><FiPackage /></em>
                        <div className="desc">
                            <span>gas type</span>
                            <p>LPG - 11kg</p>
                        </div>
                    </div>
                    <div className="icon-details">
                        <em className='desc-icon'><FiPackage /></em>
                        <div className="desc">
                            <span>gas type</span>
                            <p>LPG - 11kg</p>
                        </div>
                    </div>
                    <div className="icon-details">
                        <em className='desc-icon'><FiPackage /></em>
                        <div className="desc">
                            <span>gas type</span>
                            <p>LPG - 11kg</p>
                        </div>
                    </div>
                    
                </div>
                <div className='hr'>
                    <hr />
                </div>
                <section className="delivery-info">
                    <div className="driver-info">
                        <span>Driver</span>
                        <p>john driver</p>
                        +2348237824681
                    </div>
                    <div className="complete-track">
                        <button className="delivered">
                            complete
                        </button>
                        <button className="order-now adjust">
                            track delivery
                        </button>
                    </div>
                </section>
                <div className="hr">
                    <hr />
                </div>
                <div className="total">
                    <p>total amount</p>
                    <p><TbCurrencyNaira size={24} />12,500</p>
                </div>
        </section>
    </main>
  )
}

export default MyOrders
