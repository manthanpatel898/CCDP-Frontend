import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState("en"); // Language state

  // Check if the screen is mobile size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize(); // Set the initial state based on the screen width
    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => window.removeEventListener("resize", handleResize); // Clean up the event listener
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen); // Only toggle the menu for mobile screens
    }
  };

  // Handle link clicks: Only toggle menu if it's mobile screen
  const handleLinkClick = (path: string) => {
    if (isMobile && location.pathname !== path) {
      toggleMenu();
    }
  };

  // Handle language change
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    // Implement further logic for changing the language (i18n or similar)
    console.log("Language changed to:", event.target.value);
  };

  return (
    <nav className="navbar">
      {/* Hamburger icon for mobile */}
      <div className="navbar-hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar links */}
      <ul className={`navbar-links ${isOpen && isMobile ? "active" : ""}`}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            onClick={() => handleLinkClick("/dashboard")}
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
        {/* Language Dropdown */}
        <li className="navbar-language">
          <select value={language} onChange={handleLanguageChange} className="language-dropdown">
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
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
