import React,{useState} from 'react'
import './styles.scss'
import {Link} from 'react-router-dom'
const Navbar = () => {
  const[isActive,setIsActive]=useState(true);
  const toggleMenu=()=>{
    setIsActive(!isActive);
  }

  return (
    <div className="nav-container">
      <nav className="navbar">
        <h1 id="navbar-logo">LUXCO</h1>
        <div id="mobile-menu" className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        {isActive && <ul className="nav-menu active">
          <li><Link to="/products" className="nav-links">Products</Link></li>
          <li><Link to="/reports" className="nav-links">Reports</Link></li>
          <li><a className="nav-links">About Us</a></li>
          <li><a className="nav-links">Contact Us</a></li>
          <li><a className="nav-links nav-links-btn">Sign Up</a></li>
        </ul>}
      </nav>
    </div>
  )
}

export default Navbar
