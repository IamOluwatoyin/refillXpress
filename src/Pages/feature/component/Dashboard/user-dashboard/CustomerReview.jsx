import React, { useEffect, useState } from 'react'
import "./homecontent.css"
import "./customerreview.css"
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { BsArrowDown, BsArrowRight, BsArrowUp, BsCaretDown, BsCaretDownFill, BsFillCaretDownFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASEURL } from '../../../../../api/base';
import ReviewModal from './modals/ReviewModal';


const CustomerReview = () => {
const [reviews, setReviews] = useState(null)
const [selectedVendor, setSelectedVendor] = useState(null)
const [showPop, setShowPop] = useState(false)
const [vendorSuggest,  setVendorSugest] = useState(null)
const [text, setText] = useState("")
const [showSearch, setShowSearch] = useState(false)
 
useEffect(()=> {
    const getReviews = async () => {
        try {
            const res = await axios.get(`${BASEURL}/reviews`)
            setReviews(res.data.data)
            console.log(res.data.data)
        } catch (err) {
            toast.error("unable to fetch reviews please check your internet connection")
            console.log(err)
        }
    }
    const getVendors = async () => {
        try {
            const res = await axios.get(`${BASEURL}/vendor/getAllvendors`)
            setVendorSugest(res.data.data)
            const ans = res.data.data
            console.log(ans)
        } catch (err) {
            toast.error("unable to fetch vendors please check your internet connection")
            console.log(err)
        }
    }

    getReviews()
    getVendors()
}, [])

  return (
    <main className='customer-review'>
       { showPop &&  <ReviewModal  vendor={selectedVendor} onClose={()=> setShowPop(false)} />}
      <header className="review-header">
                <div >
                <h3>vendor reviews</h3>
                <p>Share yout experience with vendors</p>
                </div>
                <button onClick={()=> setShowPop(true)} className="write-review">
                    + Write a Review
                </button>
        </header>
        <div className="views extreme">
            <div className="top">
                <p className="preview-title">
                    Share your experience with vendors
                </p>
            </div>
    
                <div className="gas-vendor-select">
                        <div className="vendor-to-review">
                            <div className='suggest'>
                                <span><CiSearch /></span>
                                <input type="text" value={text} onChange={(e)=> {
                                    setShowSearch(true)
                                    setText(e.target.value)
                                }} placeholder='max gas supply' />
                            </div>
                            {/* <BsCaretDownFill /> */}
                        
                            {showSearch && <ul className="select-vendor">
                                {vendorSuggest?.filter(vendor=> vendor.businessName.toLowerCase().includes(text.toLowerCase()))
                                .map((v)=> (
                                    <li key={v.id} onClick={()=> {
                                        setText(v.businessName)
                                        setSelectedVendor(v)
                                        setShowSearch(false)
                                    }}>{v.businessName}</li>
                                ))}
                            </ul>}
                    </div>
                </div>
        </div>
        <section className="views extreme shrink">
            <div className="top">
                <p className="preview-title">
                    overall
                </p>
                <button className="review-this-vendor">
                    <GoStar />
                    review this vendor
                </button>
            </div>
            <div className='rate-section'>
                <div className="the-rating">
                <h1>4.4</h1><small>/5</small>
            </div>
            <p><GoStar /> 264 reviews</p>
            </div>
        </section>
        <section className="views extreme shrink">
            <div className="top">
                <p className="preview-title">
                    customer feedback
                </p>
            </div>
            <div className="customer-feedback">
                <div className="top">
                    <span>Driver</span>
                    <div>
                        <GoStar />
                    <GoStar />
                    <GoStar />
                    <GoStar />
                    <GoStar />
                    </div>
                </div>
                        <p>Best vendor ever!</p>
                        
                        <div className="hr">
                            <hr />
                        </div>
            </div>
             {/* <div className="customer-feedback">
                <div className="top">
                    <span>Driver</span>
                    <div>
                        <GoStar />
                    <GoStar />
                    <GoStar />
                    <GoStar />
                    <GoStar />
                    </div>
                </div>
                        <p>john driver</p>
                        <p>+2348237824681</p>
                        <div className="hr">
                            <hr />
                        </div>
            </div> */}
           { reviews?.map((rev)=> (
                <div className="customer-feedback">
                <div className="top">
                    <span>{rev.firstName}</span>
                    <div>
                        <GoStar />
                    <GoStar />
                    <GoStar />
                    <GoStar />
                    <GoStar />
                    </div>
                </div>
                        <span>{rev.timestamp}</span>
                        <div className="hr">
                            <hr />
                        </div>
            </div>
            ))}
        </section>
    </main>
  )
}

export default CustomerReview
