import React from 'react'
import "../styles/Navbar.css"
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <header className='Navbar-main'>
      <div className='upper' >
        <div className='upperChildOne h-[20px]'>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="0.5em" width="0.5em" xmlns="http://www.w3.org/2000/svg"><path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path></svg>
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