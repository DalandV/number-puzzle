import React from "react";
import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar">
    <div className="container">
      <span className="mb-0 h1 ">8 Puzzle</span>

      <span className="nav justify-content-end">
        {/* <button className="btn mr-1" id="nav-btn1">
          Sign Up
        </button>
        <button className="btn" id="nav-btn2">
          Login
        </button> */}
      </span>
    </div>
  </nav>
);

export default Navbar;
