import React from 'react'
import "./Dashboard-Header.css"

const DashboardHeader = () => {
  return (
    <div className='dashboard-wrapper'>
      <div className='header-wrapper'>
        <header className='header-container'>
       <img src="/Images/logo.svg"className='imgLogo'/>
       <h2>
              Refill<span>Xpress</span>
            </h2>
      </header>
      </div>

    </div>
  )
}

export default DashboardHeader
