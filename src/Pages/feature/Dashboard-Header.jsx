import React from 'react'
import "./Dashboard-Header.css"
import { useNavigate } from 'react-router'


const DashboardHeader = () => {
  const nav = useNavigate()
  return (
    <div className='dashboard-wrapper'>
      <div className='header-wrapper'>
        <header className='header-container'>
       <img src="/Images/dashboard_logo.png"className='imgLogo'onClick={()=>nav("/")}/>
       <h2>
              Refill<span>Xpress</span>
            </h2>
      </header>
      </div>

    </div>
  )
}

export default DashboardHeader
