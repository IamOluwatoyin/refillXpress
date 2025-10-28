import React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import {useNavigate} from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div>
      <span onClick={() => navigate('/vendor-dashboard')}>
        <MdDashboard />
        <p>Dashboard</p>
      </span>
      <span onClick={() => navigate('/vendor-dashboard/vendor-order')}>
        <BiShoppingBag />
        <p>Order</p>
      </span>
        <span onClick={() => navigate('/vendor-dashboard/vendor-profile')}>
        <BiShoppingBag />
        <p>Profile</p>
      </span>
    </div>
  );
};

export default Sidebar;
