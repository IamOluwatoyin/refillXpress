import React from 'react'
import "./browsevendor.css"
import "./homecontent.css"
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";

const BrowseVendor = () => {
  return (
    <main className='browsevendor'>
      <header className="heading">
            <div className="texts">
                <h3> browse vendor</h3>
                Find and locate your vendors
            </div>
        </header>
        <div className="search-bar">
            <div className="search">
            <LuSearch /> <span>Search location</span>
            </div>
            <div className="search-drop">
                <span>Newest first <RxCaretDown /></span>
            </div>
        </div>
        <section className="views stretch">
    <div className="top">
        <p className="preview-title">nearby vendors</p>
    </div>
    <div className="order-holder">
        <div className="my-order">
            <div className='vendor-status'>
                <p>QuickGas express  </p><span className='available'>available</span> <span className='verified'><MdVerified />verified </span>
            </div>
            <div className='info'>
            <small><GoStar className='star' />4.8</small>
            <small>2.1km</small>
            <small><TbCurrencyNaira className='the-currency' /><span className='the-price'>1,500/kg</span></small>
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
        <button className="order-now to-view">
            view
        </button>
        </div>
        </div>                  
        <div className="top">
        <p className="preview-title">nearby vendors</p>
    </div>
    <div className="order-holder">
        <div className="my-order">
            <div className='vendor-status'>
                <p>QuickGas express  </p><span className='available'>available</span> <span className='verified'><MdVerified />verified </span>
            </div>
            <div className='info'>
            <small><GoStar className='star' />4.8</small>
            <small>2.1km</small>
            <small><TbCurrencyNaira className='the-currency' /><span className='the-price'>1,500/kg</span></small>
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
        <button className="order-now to-view">
            view
        </button>
        </div>
        </div>                  
            <div className="top">
        <p className="preview-title">nearby vendors</p>
    </div>
    <div className="order-holder">
        <div className="my-order">
            <div className='vendor-status'>
                <p>QuickGas express  </p><span className='available'>available</span> <span className='verified'><MdVerified />verified </span>
            </div>
            <div className='info'>
            <small><GoStar className='star' />4.8</small>
            <small>2.1km</small>
            <small><TbCurrencyNaira className='the-currency' /><span className='the-price'>1,500/kg</span></small>
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
        <button className="order-now to-view">
            view
        </button>
        </div>
        </div>                  
        </section>
    </main>
  )
}

export default BrowseVendor
