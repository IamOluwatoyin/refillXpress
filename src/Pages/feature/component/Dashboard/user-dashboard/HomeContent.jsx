import React from 'react'
import { GrLocation } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";

import "./homecontent.css"
const HomeContent = () => {
  return (
    <main className='homecontent'>
        <header className="heading">
            <div className="texts">
                <h3>welcome back Glory</h3>
                Ready to order your next gas refill?
            </div>
        </header>
        <section className="actions">
            <div className="action">
                <GrLocation className='icon' style={{color: "blue"}} />
                <p className="action-type">
                    find vendors
                </p>
                <p>Browse gas suppliers near you</p>
            </div>
            <div className="action">
                <FiPackage className='icon' style={{color: "orange"}} />
                <p className="action-type">
                    my orders
                </p>
                <p>Track your deliveries</p>
            </div>
        </section>
        <div className="views">
            <div className="top">
                <p className="preview-title">recent orders</p>
                <button className="view-all">view all <BsArrowRight /></button>
            </div>
            <div className="order-holder">
                <div className="order">
                    <p>ORD-1024</p>
                    <p>LPG 12kg Quick gas express</p>
                    <small>August 30, 2025</small>
                </div>
                <div className="right">
                    <button className="delivered">delivered</button>
                </div>
            </div>
            <div className="order-holder">
                <div className="order">
                    <p>ORD-1023</p>
                    <p>LPG 12kg City gas.co</p>
                    <small>July 4, 2025</small>
                </div>
                <div className="right">
                    <button className="delivered">delivered</button>
                </div>
            </div>
        </div>
        <div className="views">
            <div className="top">
                <p className="preview-title">nearby vendors</p>
                <button className="view-all">view all <BsArrowRight /></button>
            </div>
            <div className="order-holder">
                <div className="order">
                    <div className='vendor-status'>
                        <p>QuickGas express  </p><span className='available'>available</span> <span className='verified'><MdVerified />verified </span>
                    </div>
                    <div className='info'>
                    <small><GoStar className='star' />4.8</small>
                    <small>2.1km</small>
                    <small><TbCurrencyNaira className='currency' /><span className='price'>1,500/kg</span></small>
                    </div>
                    <p>
                        <span><BiTimeFive /></span>
                        <small>7:30AM - 8:30PM</small>
                    </p>
                    <small>Mon - Sun</small>
                </div>
                <div className='right'>
                    <button className="order-now">
                    order now
                </button>
                </div>
            </div>
             <div className="order-holder">
                <div className="order">
                    <div className='vendor-status'>
                        <p>MaxGas supply  </p><span className='available'>available</span> <span className='verified'><MdVerified />verified </span>
                    </div>
                    <div className='info'>
                    <small><GoStar className='star' />4.6</small>
                    <small>2.1km</small>
                    <small><TbCurrencyNaira className='currency' /><span className='price'>1,000/kg</span></small>
                    </div>
                    <p>
                        <span><BiTimeFive /></span>
                        <small>7:30AM - 8:30PM</small>
                    </p>
                    <small>Mon - Sun</small>
                </div>
                <div className='right'>
                    <button className="order-now">
                    order now
                </button>
                </div>
            </div>
             <div className="order-holder">
                <div className="order">
                    <div className='vendor-status'>
                        <p>QuickGas express  </p><span className='available out-of-stock'>out of stock</span> 
                    </div>
                    <div className='info'>
                    <small><GoStar className='star' />4.8</small>
                    <small>2.1km</small>
                    <small><TbCurrencyNaira className='currency' /><span className='price'>1,500/kg</span></small>
                    </div>
                    <p>
                        <span><BiTimeFive /></span>
                        <small>7:30AM - 8:30PM</small>
                    </p>
                    <small>Mon - Sun</small>
                </div>
                <div className='right'>
                    <button className="order-now disabled">
                    order now
                </button>
                </div>
            </div>
        </div>
    </main>
  )
}

export default HomeContent
