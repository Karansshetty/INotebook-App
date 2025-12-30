import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";

function Navbar() {
  const context=useContext(NoteContext);
  const {showAlert}=context;
  const location=useLocation();
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
    showAlert("Logged Out Successfully","success");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<div className="d-flex gap-2">
            <Link className="btn btn-primary" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link></div>:
           <button className="btn btn-primary mx-1" onClick={()=>{handleLogout()}}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
