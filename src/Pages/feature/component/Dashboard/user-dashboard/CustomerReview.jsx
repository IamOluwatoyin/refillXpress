import React, { useState, useEffect } from 'react'
import "./homecontent.css"
import "./customerreview.css"
import { GoStar } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASEURL } from '../../../../../api/base';
import ReviewModal from './modals/ReviewModal';
import { useLoading } from '../../../../../context/LoadingContext';
import GlobalLoading from '../../../../../context/GlobalLoading';
const CustomerReview = () => {

    const [vendors, setVendors] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [selectedVendor, setSelectedVendor] = useState(null)
    const [text, setText] = useState("")
    const [suggest, setSuggest] = useState(false)
    const [pop, setPop] = useState(false)
    const {loading, setLoading} = useLoading();
    useEffect(()=> {
    const getReviews = async () => {
        try {
          setLoading(true);
            const res = await axios.get(`${BASEURL}/reviews`)
            setReviews(res.data.data)
            console.log(res.data.data)
        } catch (err) {
            toast.error("unable to fetch reviews please check your internet connection")
            console.log(err)
        }finally {
          setLoading(false);  
        }
    }
    const getVendors = async () => {
      setLoading(true);
        try {
            const res = await axios.get(`${BASEURL}/vendor/getAllvendors`)
            setVendors(res.data.data)
            const ans = res.data.data
            console.log(ans)
        } catch (err) {
            toast.error("unable to fetch vendors please check your internet connection")
            console.log(err)
        }finally {
          setLoading(false);
        }
    }

    getReviews()
    getVendors()
}, [])

useEffect(() => {
  console.log("Suggest state:", suggest);
}, [suggest]);

  return (
    <main className='customer-review'>
      <GlobalLoading />
        {pop && <ReviewModal vendor={selectedVendor} onClose={()=> setPop(false)} />}
          
      <header className="extremes-header">
                <div className="review-texts">
                <h3>vendor reviews</h3>
                <p>Share your experience with vendors</p>
                </div>
               <button className="write-review" onClick={() => {
                  if (!selectedVendor) {
                    toast.info("Please select a vendor first")
                    return
                  }
                  setPop(true)
                }}>
                  + Write a Review
                </button>

        </header>
        <div className="search-review">
            <div className="review-top">
                <span className="review-title">
                    select a vendor to review
                </span>
            </div>
                <div className="gas-vendor-select">
                        <div className="vendor-to-review">
                          <div className='setVendor'>
                             {!text? <LuSearch /> : null} <input  
                             type='text' value={text} 
                             onChange={(e)=> {
                                 setText(e.target.value)
                             }} 
                             placeholder='search gas vendor'/>
                          </div>
                            <button onClick={()=> { ;
                            setSuggest(!suggest)} 
                          }
                            className='arrow-down'>
                                <BsArrowDown />
                            </button>
                           <>
  {suggest && (
    <ul className="select-vendor">
      {vendors && vendors.length > 0 ?
       (
        vendors
          .filter((vendor) =>
            vendor.businessName
              ?.toLowerCase()
              .includes(text.toLowerCase())
          )
          .map((v) => (
            <li
              key={v.id}
              onClick={() => {
                console.log("Clicked vendor:", v.businessName);
                setText(v.businessName);
                setSelectedVendor(v);
                setSuggest(false);
                toast.success(`${v.businessName} selected`);
              }}
            >
              {v.businessName}
            </li>
          ))
      ) : (
        <li>No vendors found</li>
      )}
    </ul>
  )}
</>

                    </div>
                </div>
        </div>
       <section className={reviews?.length === 0 ? "" : "views extreme shrink"}>
  <div className="top">
    <p className="preview-title">customer feedback</p>
  </div>

  {reviews && reviews.length > 0 ? (
    reviews.map((review) => (
      <div className="customer-feedback" key={review.id}>
        <div className="top">
          <span>{review.vendor?.businessName || "Vendor"}</span>
          <div>
            {[...Array(5)].map((_, i) => (
              <GoStar
                key={i}
                color={i < review.rating ? "#fbbf24" : "#d1d5db"}
              />
            ))}
          </div>
        </div>

        <p>{review.user?.name || "Anonymous"}</p>
        <p>{review.message}</p>

        <div className="hr">
          <hr />
        </div>
      </div>
    ))
  ) : (
    <p style={{ transform: "translate(75%,-50%)", color: "#888" }}>
      No reviews yet.
    </p>
  )}
</section>

       
    </main>
  )
}

export default CustomerReview