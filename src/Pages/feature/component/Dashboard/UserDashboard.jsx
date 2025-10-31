import React, { useState } from 'react'
import { HiFire } from 'react-icons/hi'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { FiUser } from "react-icons/fi";
import { GoStar } from "react-icons/go";
import { FiPackage } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import "./UserDashboard.css"
const UserDashboard = () => {
    const nav = useNavigate()
  return (
    <div className='userdashboard'>
      <div className="dashboard-grid">
        <header className="header">
          <div className="header-content">
            <h6 onClick={()=> nav("/")} className='logo-heading'>
          <span className='fire'>
              <HiFire /> 
          </span>
          Refill<span className='logo-style'>Xpress</span>
          </h6>
          <div className="user">
            <p className='profile'><FiUser className='user-placeholder'/></p>
            <div>
              <span>Glory Otene</span>
            <span>Customer</span>
            </div>
          </div>
          </div>
        </header>
        <div className="sidebar">
          <div className="navigation">
            <NavLink className={({isActive}) => isActive? `nav active` : "nav"}><BiHome className='nav-link'/><span>home</span></NavLink >
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="browsevendors"><GrLocation className='nav-link'/><span>browse vendors</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="myorders"><FiPackage className='nav-link'/><span>my orders</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="reviews"><GoStar className='nav-link'/><span>reviews</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="account"><FiUser className='nav-link'/><span>account</span></NavLink>
          </div>
        </div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
