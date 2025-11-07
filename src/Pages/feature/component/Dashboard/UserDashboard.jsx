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
import  logo  from "../../../../assets/dashboard_logo.png"
import { UserContext } from '../../../../context/UserContext';
import "./UserDashboard.css"

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
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
     nav("/userlogin")
    }
  }
  }, [])
  
useEffect(()=> {
  const handleResize = () => {
     if(window.innerWidth <= 630) {
    setSidebar(false) 
  } else {
    setSidebar(true)
  }
  }
  handleResize()
  window.addEventListener('resize', handleResize) 
  return ()=> window.removeEventListener('resize', handleResize)
}, [])

//  const { userDetail } = useContext(UserContext),
//  console.log(userDetail)
    const nav = useNavigate()
  return (
    <div className='userdashboard'>
      <div className="dashboard-grid">
        <header className="header">
          <div className="header-content">
            <div>
          <img  src= {logo} onClick={()=> nav("/")} className='logo-heading' /> 
          </div>
          <div className="user">
            <p className='glorys-profile'><FiUser className='user-placeholder'/></p>
            <div>
                  <span>{info?.firstName}</span> 
                  <span>{info?.role}</span>
            </div>
            {
              sidebar === false ? <button onClick={()=> setSidebar(true)} className="close" ><RxHamburgerMenu size={24} /></button> : <button onClick={()=> setSidebar(false)} className='burger'><CgClose size={24} /></button>
            }
          </div>
          </div>
        </header>
       {
        sidebar === true && (
           <div className="user-sidebar">
          <div className="navigation">
            <nav onClick={()=> switchTab("home", "/userdashboard")} className={currentRoute.pathname === "/userdashboard" ? "nav active" : "nav"}><BiHome className='nav-link'/><span>home</span></nav >
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="browsevendors"><GrLocation className='nav-link'/><span>browse vendors</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="myorders"><FiPackage className='nav-link'/><span>my orders</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="customer-review"><GoStar className='nav-link'/><span>reviews</span></NavLink>
            <NavLink className={({isActive}) => isActive? "nav active" : "nav"} to="customer-account"><FiUser className='nav-link'/><span>account</span></NavLink>
          </div>
        </div>
        )
       }
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
