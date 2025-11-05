import React from 'react'
import "./customeraccount.css"
import "./homecontent.css"
import { FiPackage } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";


const CustomerAccount = () => {
  return (
    <main className='customer-account'>
      <header className="heading">
            <div className="texts">
                <h3>account</h3>
                <span>Manage your profile</span>
            </div>
        </header>
        <section className="views stretch">
            <div className="top">
                <p className="preview-title">
                    personal information
                </p>
            </div>
            <article className="upload">
            <div className="profile-box">
                <input type="file" id='pic' />
            </div>
            <div >
                <p>profile picture</p>
                <span>Upload a proffessional video of yourself</span>
            </div>
            <label htmlFor="pic">
                <p className='green-circle'>
                    <FiPackage />
                </p>
            </label>
        </article>

        <section className="inputs">
            <div className="div-input">
                <label htmlFor="">full name</label>
                <input type="text" />
            </div>
            <div className="div-input">
                <label htmlFor="">email address</label>
                <input type="text" />
            </div>
        </section>
        <section className="inputs">
            <div className="div-input">
                <label htmlFor="">phone number</label>
                <input type="text" />
            </div>
            <div className="div-input">
                <label htmlFor="">residential address </label>
                <input type="text" />
            </div>
        </section>
        </section>
        <div className="views stretch">
            <div className="top">
                <p className="preview-title">
                    <GrLocation className='nav-link' /> saved addersses  
                </p>
            </div>
                <div className="order-holder">
                    <div className="my-order">
                        <p className='destination'>home</p>
                        <span className='address'>No 1 sinzu street Ojodu</span>
                    </div>
                    
                </div>
                <div className="order-holder">
                    <div className="my-order">
                        <p className='destination'>office</p>
                        <span className='address'> Bakare rd Ogba</span>
                    </div>
                </div>
                <div className="order-holder">
                    <div className="add-destination">
                        <button className='addbutton'>
                            add new address
                        </button>
                    </div>
                </div>
        </div>
    </main>
  )
}

export default CustomerAccount
