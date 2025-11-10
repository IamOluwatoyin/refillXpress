import React from 'react'
import "./homecontent.css"
import "./customerreview.css"
import { MdVerified } from "react-icons/md";
import { GoStar } from "react-icons/go";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { RxCaretDown } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";

const CustomerReview = () => {
  return (
    <main className='customer-review'>
      <header className="extremes-header">
                <div className="texts">
                <h3>vendor reviews</h3>
                <p>Share yout experience with vendors</p>
                </div>
                <button className="write-review">
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
                            <p>quick gas supply co.</p>
            
                            <BsArrowRight />
                            <div className="select-vendor">
                                <ul>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                    <li>gas vendor</li>
                                </ul>
                            </div>
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
                <h1>0</h1><small>/5</small>
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
                        <p>john driver</p>
                        <p>+2348237824681</p>
                        <div className="hr">
                            <hr />
                        </div>
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
                        <p>john driver</p>
                        <p>+2348237824681</p>
                        <div className="hr">
                            <hr />
                        </div>
            </div>
        </section>
    </main>
  )
}

export default CustomerReview
