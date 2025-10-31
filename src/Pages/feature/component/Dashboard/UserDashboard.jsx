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
  const [active, setActive] = useState("home")
  const setter = (next) => {
    setActive("")
    setActive(next)
  }
  console.log(active)
  const nav = useNavigate()
  return (
    <div className='dashboard'>
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
            <p className='profile'><FiUser /></p>
            <div>
              <span>Glory Otene</span>
            <span>Customer</span>
            </div>
          </div>
          </div>
        </header>
        <div className="sidebar">
          <div className="navigation">
            <NavLink  className={active === "home"? `nav active` : "nav"}><BiHome className='nav-link'/><span>home</span></NavLink >
            <NavLink onClick={()=> setter("browse")} className={active === "browse"? `nav active` : "nav"} to="browsevendors"><GrLocation className='nav-link'/><span>browse vendors</span></NavLink>
            <NavLink onClick={()=> setter("orders")} className={active === "orders"? `nav active` : "nav"} to="myorders"><FiPackage className='nav-link'/><span>my orders</span></NavLink>
            <nav onClick={()=> setter("reviews")} className={active === "reviews"? `nav active` : "nav"}><GoStar className='nav-link'/><span>reviews</span></nav>
            <nav onClick={()=> setter("account")} className={active === "account"? `nav active` : "nav"}><FiUser /><span>account</span></nav>
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
