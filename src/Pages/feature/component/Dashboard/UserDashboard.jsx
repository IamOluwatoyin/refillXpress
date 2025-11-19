import React, { useState, useEffect, useContext } from 'react';
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
import { IoIosLogOut } from "react-icons/io";
import { LuSettings } from 'react-icons/lu';
import LogoutModal from './LogoutModal';

const UserDashboard = () => {
  const [sidebar, setSidebar] = useState(false);
  const [info, setInfo] = useState(null);  
  const currentRoute = useLocation();
  const [active, setActive] = useState("")
  const [logoutModal, setLogoutModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const nav = useNavigate();

  const hoverShow = () => {
    setShowMenu(!showMenu);
  }

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    const getUserInfo = () => {
      try {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
          console.log(storedUser)
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

  const SmallMenu = () => {
    return (
      <div className='small-menu'>
        <span>{`${info?.firstName || "user"} ${info?.lastName || "  "}`}</span>
        <small>{info?.email}</small>
        <p onClick={()=> {
          nav("customer-account")
          setShowMenu(false);
        }} style={{borderBlock: "1px solid #0000003a", paddingBlock: "0.8rem", cursor: "pointer"}}>
          <LuSettings /> <span>Account Settings</span>
        </p>
        <p onClick={()=> setLogoutModal(true)} style={{cursor: "pointer", color: "red", paddingBlock: "0.4rem"}}>
          <IoIosLogOut /> <span>Logout</span>
        </p>
      </div>
    )
  }

  const switchTab = (curr, route) => {
    setActive(curr)
    nav(route);
    closeSidebar(); // Close sidebar when navigating on mobile
  };

  return (
    <div className='userdashboard'>
      <>
        {logoutModal && <LogoutModal cancel={()=> setLogoutModal(false)} />}
      </>
      <div className="dashboard-grid">
        
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <img src="/Images/dashboard_logo.jpg"  className='logo-heading' /> 
            </div>
            <div className="header-right">
              <div onClick={hoverShow} onMouseLeave={()=> setTimeout(() => {
                setShowMenu(false)
              }, 10000)} className="user">
                <div className='glorys-profile img'>
                  {info?.profilePicture ? (
                    <img 
                      src={info.profilePicture} 
                      alt="Profile" 
                      className="user-profile-image" 
                    />
                  ) : (
                   <p className='glorys-profile'>
                    {info?.firstName?.charAt(0).toUpperCase().toString().concat(info?.lastName?.charAt(0).toUpperCase().toString()) || "U"}
                   </p>
                  )}
                </div>
                <div className="user-info">
                  <span>{info?.firstName}</span> 
                  <span>{info?.role}</span>
                </div>
              </div>
              <RxHamburgerMenu 
                className='sidebar-toggle' 
                size={24} 
                onClick={toggleSidebar}
              />
            </div>
          </div>
        </header> 
                {showMenu && <SmallMenu />}
       
        {/* Overlay for mobile */}
        {sidebar && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        <div className={`sidebar ${sidebar ? 'sidebar-open' : ''}`}>
          {sidebar && <img src="/public/images/dashboard_logo.jpg" alt="logo" />}
          <div className="navigation">
            <div className="sidebar-header">
              <CgClose className="close-sidebar" onClick={closeSidebar} />
            </div>
            <nav onClick={()=>switchTab("home", "/userdashboard")} style={{marginTop: "1rem"}} className={currentRoute.pathname === "/userdashboard" ?  "nav active" : "nav"} >
              <BiHome className='nav-link'/><span>home</span></nav>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="browsevendors" onClick={closeSidebar}>
              <GrLocation className='nav-link'/><span>browse vendors</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="myorders" onClick={closeSidebar}>
              <FiPackage className='nav-link'/><span>my orders</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="customer-review" onClick={closeSidebar}>
              <GoStar className='nav-link'/><span>reviews</span>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "nav active" : "nav"} to="customer-account" onClick={closeSidebar}>
              <FiUser className='nav-link'/><span>account</span>
            </NavLink>
            <span className='userDashboard-logout'>
              
              <IoIosLogOut
                style={{ fontSize: "28px", cursor:"pointer", color: "red" }}
                onClick={() => {
                 setLogoutModal(true)
                }}
              />
              <p onClick={()=> setLogoutModal(true)} style={{cursor: "pointer", color: "red", paddingBlock: "0.4rem"}}>Logout</p>
              
            </span>
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