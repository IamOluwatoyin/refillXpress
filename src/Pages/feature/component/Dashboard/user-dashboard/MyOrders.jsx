import React, { useEffect, useState } from "react";
import "./myorders.css";
import "./homecontent.css";
import { FiPackage } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import CompletionModal from "./modals/CompletionModal";
import { toast } from "react-toastify";
import { getAllOrders } from "../../../../../api/query";
import { handlePayment } from "../../../../../api/mutation";
import PaymentModal from "./modals/PaymentModal";
import SpinnerModal from "../../../../../Auth/vendor-auth/spinner-modal";
import PaymentPage from "../PaymentPage";

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
                 if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please log in again.");
     nav("/userlogin")
    }
                console.log(err.message)
            }
        }
        getActive()
    },[])

    const nav = useNavigate()
    const [show, setShow] = useState(false)
  return (
 <>
  <main className="myorders">
    {show && <CompletionModal order={orderDetails} onClose={() => setShow(false)} />}

    <header className="heading">
      <div className="texts">
        <h3>my orders</h3>
        <span>view your orders</span>
      </div>
    </header>

    {!activeOrders || activeOrders.length === 0 ? (
      <div style={{textAlign: "center", width: "95%"}}>
        <h1>No Orders Yet</h1>
      </div>
    ) : (
      activeOrders.map((active) => (
        <section key={active._id || active.orderNumber} className="views extreme shrink">
          <div className="order-title">
            <p className="preview-title">{active.orderNumber}</p>
            <div className={`available deliver ${active.status?.toLowerCase()}`}>
              {active.status}
            </div>
          </div>

          <div className="for-time">
            <small>Oct 20, 2025, 10:30AM</small>
          </div>

          <div className="order-type">
            <div className="icon-details">
              <em className="desc-icon">
                <FiPackage />
              </em>
              <div className="desc">
                <span>gas type</span>
                <p>{`${active.cylinderSize}kg`}</p>
              </div>
            </div>

            <div className="icon-details">
              <em className="desc-icon">
                <GrLocation />
              </em>
              <div className="desc">
                <span>delivery address</span>
                <p>{active.deliveryAddress}</p>
              </div>
            </div>

            <div className="icon-details">
              <em className="desc-icon">
                <FiPackage />
              </em>
              <div className="desc">
                <span>vendor</span>
                <p>{active.vendor?.businessName || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="hr">
            <hr />
          </div>

          <section className="delivery-info">
            <div className="drivers-info">
              <span>Driver</span>
              <p>John Driver</p>
              <span>+2348237824681</span>
            </div>

            <div className="complete-track">
              <button
                onClick={() => {
                  setOrderDetails(active);
                  setShow(true);
                }}
                className="isDelivered"
              >
                complete
              </button>

              <button
                onClick={() => nav("/userdashboard/track-order")}
                className="order-now adjust"
              >
                track delivery
              </button>
            </div>
          </section>

          <div className="hr">
            <hr />
          </div>

          <div className="total">
            <p>total amount</p>
            <p>
              <TbCurrencyNaira size={24} />
              {active.totalPrice}
            </p>
          </div>
        </section>
      ))
    )}
  </main>
</>
  )
}

export default MyOrders



