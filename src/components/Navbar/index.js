import React,{useState} from 'react'
import './styles.scss'
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
          <li><a className="nav-links">Home</a></li>
          <li><a className="nav-links">Services</a></li>
          <li><a className="nav-links">About Us</a></li>
          <li><a className="nav-links">Contact Us</a></li>
          <li><a className="nav-links nav-links-btn">Sign Up</a></li>
        </ul>}
      </nav>
    </div>
  )
}

export default Navbar
