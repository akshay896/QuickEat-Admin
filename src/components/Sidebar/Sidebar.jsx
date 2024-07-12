import React from "react";
import "./Sidebar.css";
import { IoIosAddCircle } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { MdTask } from "react-icons/md";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to={"/add"} className="sidebar-option">
            <IoIosAddCircle className="fs-3 " />
            <p className="mt-3">Add</p>
          </NavLink>
          <NavLink to={"/list"} className="sidebar-option">
            <FaListUl className="fs-5" />
            <p className="mt-3">Food List</p>
          </NavLink>
          <NavLink to={"/orders"} className="sidebar-option">
            <MdTask className="fs-3" />
            <p className="mt-3">Orders</p>
          </NavLink>
        </div>
      </div>
    
  );
};

export default Sidebar;
