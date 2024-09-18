import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa"; // Use the outlined user icon
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link active">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/patients" className="navbar-link">
            Patients
          </Link>
        </li>
        <li>
          <Link to="/doctors" className="navbar-link">
            Doctors
          </Link>
        </li>
        <li>
          <Link to="/medical-staffs" className="navbar-link">
            Medical Staffs
          </Link>
        </li>
      </ul>
      <div className="navbar-profile">
        <FaRegUser className="profile-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
