import React from 'react'
import "./Dashboard-Header.css"
import { useNavigate } from 'react-router'
import { FaBars, FaTimes } from 'react-icons/fa'

const DashboardHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const nav = useNavigate()
  return (
    <div className='dashboard-wrapper'>
      <div className='header-wrapper'>
        <header className='header-container'>
          <div className="header-left">
            <img src="/Images/logo.svg" className='imgLogo' onClick={()=>nav("/")} alt="Logo"/>
            <h2>
              Refill<span>Xpress</span>
            </h2>
          </div>
          
          {/* Hamburger Menu */}
          <button 
            className="hamburger-menu"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>
      </div>
    </div>
  )
}

export default DashboardHeader