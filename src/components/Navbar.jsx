import React from 'react'
import "../styles/Navbar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <header className='Navbar-main'>
      <div className='upper' >
        <div className='upperChildOne'>
          <GiHamburgerMenu />
          <img className='left-side-logo' src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fk-plus_3b0baa.png" alt="" />
        </div>
        <div className="cart">
          <div className="label">
            1
          </div>
        <IoCartOutline/>
        </div>
      </div>
      <div className='lower'>
           <input className='searchBar' placeholder='Search for Products, Brands and More' type="text" />
      </div>

    </header>
  )
}

export default Navbar