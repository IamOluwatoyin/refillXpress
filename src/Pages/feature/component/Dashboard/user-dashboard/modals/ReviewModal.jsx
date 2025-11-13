import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { GoStar } from 'react-icons/go'
import "./Reviewmodal.css"
import axios from 'axios'
import { BASEURL } from '../../../../../../api/base'
import { toast } from 'react-toastify'

const ReviewModal = ({ vendor, onClose}) => {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)


const handleSubmit = async () => {
    if (review.length < 10) {
    toast.error("Please write at least 10 characters");
    return;
  }
  if (rating === 0) {
    toast.error("Please select a rating");
    return;
  }
  try {
    const token = localStorage.getItem("token")
    
    const res = await axios.post(`${BASEURL}/vendors/${vendor.id}/reviews`, 
        
        {
            rating: rating,
            message: review
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    if(res.status === 201) {
        toast.success("Review submitted successfully")
        onClose()
    }
  } catch(err) {
    const token = localStorage.getItem("token")
    console.log(err)
    console.log(vendor.id)
    toast.error(err.response.data.message || "an error occured")
    console.log(token)
  }
}

  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <div>
                <strong className='review'>Write a Review</strong>
            </div>
            <button onClick={onClose} className="close"><CgClose /></button>
            <div className="vendor-selected">
                <p>{vendor?.businessName || "no vendor yet"}</p>
            </div>
            <span>How would you rate this vendor?</span>
            <div className="stars">
             {[1, 2, 3, 4, 5].map((num) => (
               <GoStar
                 key={num}
                 size={25}
                 onClick={() => setRating(num)}
                 style={{
                   cursor: "pointer",
                   color: num <= rating ? "#FFA500" : "#ccc",
                   transition: "color 0.2s ease",
                 }}
               />
             ))}
            </div>

            <label>Tell us about your experience</label>    
            <textarea name="review" id="text" placeholder='What did you like? What could be improved?'
             minLength={10}
             onChange={(e)=> setReview(e.target.value)}
             value= {review}
             />
            <small>minimum 10 characters</small>
            <div className="btns">
                <button onClick={handleSubmit} className="cancel submit">submit review</button>
                <button onClick={onClose} className="cancel">cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ReviewModal