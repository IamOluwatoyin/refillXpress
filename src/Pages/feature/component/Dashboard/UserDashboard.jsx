import React, { useContext, useEffect, useState } from 'react'
import { HiFire } from 'react-icons/hi'
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { FiUser } from "react-icons/fi";
import { GoStar } from "react-icons/go";
import { FiPackage } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from 'react-icons/cg';
import "./UserDashboard.css"
import { UserContext } from '../../../../context/UserContext';
const UserDashboard = () => {
  const [sidebar, setSidebar] = useState(false) 
  const currentRoute = useLocation()
    const [info, setInfo] = useState(null)
  const [active, setActive] = useState("")

  const switchTab = (curr, route) => {
    setActive(curr)
    nav(route)
  }

 useEffect(() => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      const loggedIn = storedUser;
      if (loggedIn) setInfo(loggedIn);
    }
  } catch (error) {
    console.error("Invalid userInfo in localStorage:", error);
    
     
  }
  }, [])
  
 const { userDetail } = useContext(UserContext)
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
            <p className='glorys-profile'><FiUser className='user-placeholder'/></p>
            <div>
                  <span>{info?.firstName}</span> 
                  <span>{info?.role}</span>
            </div>
            <RxHamburgerMenu className='burger' size={24} />
          </div>
          </div>
        </header>
        <div className="sidebar">
          <div className="navigation">
            <nav onClick={()=> switchTab("home", "/userdashboard")} className={currentRoute.pathname === "/userdashboard" ? "nav active" : "nav"}><BiHome className='nav-link'/><span>home</span></nav >
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="browsevendors"><GrLocation className='nav-link'/><span>browse vendors</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="myorders"><FiPackage className='nav-link'/><span>my orders</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="customer-review"><GoStar className='nav-link'/><span>reviews</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="customer-account"><FiUser className='nav-link'/><span>account</span></NavLink>
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
