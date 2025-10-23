import React from 'react'
import "./resetpassword.css"

const ResetPassword = () => {
    return (
        <div className='reset'>
            <article className="article">
                <header className="header">
                    <h3>RefillXpress</h3>
                </header>
                <form className="form">
                    <div className="form-heading">
                        <h1>reset password</h1>
                        <p>Dont't worry, it happens a lot!</p>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">email address</label>
                        <div className="input-div">
                            <input type="text" placeholder='your email here...' />
                            
                        </div>
                    </div>
                </form>
            </article>
        </div>
    )
}

export default ResetPassword
