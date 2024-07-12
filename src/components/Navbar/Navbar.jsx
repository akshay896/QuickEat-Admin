import React from "react";
import "./Navbar.css";
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h4>
            Quick<span className="text-warning">Eat</span>
          </h4>
        </div>
        <MdAdminPanelSettings className="fs-2 me-5" />
      </div>
    </>
  );
};

export default Navbar;
