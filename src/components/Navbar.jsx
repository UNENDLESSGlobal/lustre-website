import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ searchElement }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="nav-logo-placeholder"></div>
        <span className="nav-company-name">lustre</span>
      </div>
      
      <div className="nav-center desktop-search">
        {searchElement}
      </div>

      <div className="nav-links desktop-links">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>HOME</NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>PRODUCTS</NavLink>
        <NavLink to="/support" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>SUPPORT</NavLink>
      </div>

      <button className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          {searchElement}
        </div>
        <div className="mobile-nav-links">
          <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu} end>HOME</NavLink>
          <NavLink to="/products" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>PRODUCTS</NavLink>
          <NavLink to="/support" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>SUPPORT</NavLink>
        </div>
      </div>
    </nav>
  )
}
