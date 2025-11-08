import React, { useState, useEffect } from 'react';
import { HiFire } from 'react-icons/hi';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { GoStar } from "react-icons/go";
import { FiPackage } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from 'react-icons/cg';
import "./UserDashboard.css";

const UserDashboard = () => {
  const [sidebar, setSidebar] = useState(false);
  const [info, setInfo] = useState(null);  info
  const currentRoute = useLocation();
  const nav = useNavigate();

  
  useEffect(() => {
  const getUserInfo = () => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        setInfo(JSON.parse(storedUser));
      } else {
        setInfo(null);
      }
    } catch (error) {
      console.error("Invalid userInfo in localStorage:", error);
      setInfo(null);
    }
  };

  
  getUserInfo();

  // Listen for localStorage changes (works if CustomerAccount updates localStorage)
  const handleStorageChange = (e) => {
    if (e.key === "userInfo") {
      getUserInfo();
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);


  const switchTab = (curr, route) => {
    nav(route);
  };

  return (
    <div className='userdashboard'>
      <div className="dashboard-grid">
       
        <header className="header">
          <div className="header-content">
            <div>
              <img src="/Images/dashboard_logo.png" onClick={()=> nav("/")} className='logo-heading' /> 
            </div>
            <div className="user">
              <p className='glorys-profile'>
                {info?.profilePicture ? (
                  <img 
                    src={info.profilePicture} 
                    alt="Profile" 
                    className="user-profile-image" 
                  />
                ) : (
                  <FiUser className='user-placeholder'/>
                )}
              </p>
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
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="/userdashboard">
              <BiHome className='nav-link'/><span>home</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="browsevendors">
              <GrLocation className='nav-link'/><span>browse vendors</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="myorders">
              <FiPackage className='nav-link'/><span>my orders</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="customer-review">
              <GoStar className='nav-link'/><span>reviews</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="customer-account">
              <FiUser className='nav-link'/><span>account</span>
            </NavLink>
          </div>
        </div>

      
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
