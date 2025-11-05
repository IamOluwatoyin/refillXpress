import React, { useEffect, useState } from 'react'
import "./myorders.css"
import "./homecontent.css"
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { FiPackage } from "react-icons/fi";
import CompletionModal from './modals/CompletionModal';
import DeliveryVerification from './modals/DeliveryVerification';
import { useNavigate, Outlet } from 'react-router-dom';
import { BASEURL } from '../../../../../api/base';
import { toast } from 'react-toastify';
import axios from "axios";
const MyOrders = () => {
    const [orderDetails, setOrderDetails] = useState(null)
    const [activeOrders, setActiveOrders] = useState(null)
    useEffect(()=> {
        const getActive = async () => {
            const token = localStorage.getItem("token")
            const User = JSON.parse(localStorage.getItem("userInfo"))
            const userId = User.id
            try {
                const res = await axios.get(`${BASEURL}/orders/getActiveOrders/${userId}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
            )
                console.log(res.data.data)
                setActiveOrders(res?.data?.data)
            } catch(err) {
                console.log(err.message)
            }
        }
        getActive()
    },[])

    const nav = useNavigate()
    const [show, setShow] = useState(false)
  return (
  <>
    <main className='myorders'>
        {show && <CompletionModal order={orderDetails} onClose={() => setShow(false)}/>}
      <header className="heading">
            <div className="texts">
                <h3> my orders</h3>
                <span>view your orders</span>
            </div>
        </header>
        <>
       {activeOrders?.map((active)=> (
         <section className="views extreme shrink">        
                <div className="order-title">
                    <p className="preview-title">{active.orderNumber}</p>
                    <div className="available deliver">
                        {active.status}
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
                            <p>{`${active.cylinderSize}kg`}</p>
                        </div>
                    </div>
                    <div className="icon-details">
                        <em className='desc-icon'><GrLocation /></em>
                        <div className="desc">
                            <span>delivery address</span>
                            <p>{active.deliveryAddress}</p>
                        </div>
                    </div>
                    <div className="icon-details">
                        <em className='desc-icon'><FiPackage /></em>
                        <div className="desc">
                            <span>vendor</span>
                            <p>{active.vendor.businessName}</p>
                        </div>
                    </div>
                    
                </div>
                <div className='hr'>
                    <hr />
                </div>
                <section className="delivery-info">
                    <div className="drivers-info">
                        <span>Driver</span>
                        <p>john driver</p>
                        <span>+2348237824681</span>
                    </div>
                    <div className="complete-track">
                        <button onClick={()=> {
                            setOrderDetails(active)
                            setShow(true)
                        }} className="isDelivered">
                            complete
                        </button>
                        <button onClick={()=> nav("/userdashboard/track-order")} className="order-now adjust">
                            track delivery
                        </button>
                    </div>
                </section>
                <div className="hr">
                    <hr />
                </div>
                <div className="total">
                    <p>total amount</p>
                    <p><TbCurrencyNaira size={24} />{active.totalPrice}</p>
                </div>
        </section>
       ))}
        </>
    </main>
  </>
    
  )
}

export default MyOrders
