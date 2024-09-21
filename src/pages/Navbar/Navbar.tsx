import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route location

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle link clicks: only toggle the menu if the link is not the active link
  const handleLinkClick = (path: string) => {
    if (location.pathname !== path) {
      toggleMenu(); // Only close the menu if the link is not the current path
    }
  };

  return (
    <nav className="navbar">
      {/* Hamburger icon for mobile */}
      <div className="navbar-hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            onClick={() => handleLinkClick("/dashboard")}  // Pass path to handleLinkClick
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/patients"
            className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            onClick={() => handleLinkClick("/patients")}
          >
            Patients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            onClick={() => handleLinkClick("/doctors")}
          >
            Doctors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/medical-staffs"
            className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            onClick={() => handleLinkClick("/medical-staffs")}
          >
            Medical Staffs
          </NavLink>
        </li>
      </ul>

      {/* Profile icon */}
      <div className="navbar-profile">
        <FaRegUser className="profile-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
