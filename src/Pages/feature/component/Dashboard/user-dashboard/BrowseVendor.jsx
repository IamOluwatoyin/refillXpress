import React, {useState, useContext, useEffect} from 'react'
import "./browsevendor.css"
import "./homecontent.css"
import { MdVerified } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import OrderModal from './modals/OrderModal';
import ViewVendor from './modals/ViewVendor';
import axios from 'axios';
import { BASEURL } from '../../../../../api/base';

const BrowseVendor = () => {
    const [vendors, setVendors] = useState([])
    const [selected, setSelected] = useState(null)
    const [showView, setShowView] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
useEffect(()=> {
  const getvendorVendors = async () => {
    try {
      const res = await axios.get(`${BASEURL}/vendor/getAllvendors`)
      const retrived = res.data.data
      console.log(retrived)
      setVendors(retrived)
    } catch(err) {
      console.log("error fetching data", err.message)
    }

}
getvendorVendors()
}, [])

const order = (vendor) => {
    setSelected(vendor)
    setShowOrder(true)
    setShowView(false)
} 

const view = (vendor) => {
     setSelected(vendor)
     setShowView(true)
    setShowOrder(false)
}



  return (
    <main className='browsevendor'>
        { showView && <ViewVendor vendor={selected} onClose={()=> setShowView(false)} openOrder={()=> order(selected)}  />} 
        {showOrder && <OrderModal  vendor={selected} onClose={()=> setShowOrder(false)}/>}
      <header className="heading">
            <div className="texts">
                <h3> browse vendor</h3>
                Find and locate your vendors
            </div>
        </header>
        {/* <div className="search-bar">
             <div className="search">
            <LuSearch /> <span>Search location</span>
            </div>
            <div className="search-drop">
                <span>Newest first <RxCaretDown /></span>
            </div> 
        </div> */}
        <section className="views extreme">    
        {vendors?.map((vendor)=> (
            <div className="order-holder">
        <div className="my-order">
            <div className='vendor-status'>
                <p>{vendor.businessName}</p><span className='available'>{vendor.businessAvailability}</span> <span className='verified'><MdVerified />{vendor.status} </span>
            </div>
            <div className='info'>
            <smvendor><FaStar className='star' />4.8</smvendor>
            <smvendor>2.1km</smvendor>
            <smvendor><TbCurrencyNaira className='the-currency' /><span className='the-price'>1,500/kg</span></smvendor>
            </div>
            <p>
                <span><BiTimeFive /></span>
                <smvendor>{vendor.operatingHours}</smvendor>
            </p>
            <smvendor>Mon - Sun</smvendor>
        </div>
        <div className='right'>
            <button onClick={()=> order(vendor)} className="order-now">
            order now
        </button>
        <button onClick={()=> view(vendor)} className="order-now to-view">
            view
        </button>
        </div>
        </div>
        ))}
                      
        </section>
    </main>
  );
};

export default BrowseVendor;
