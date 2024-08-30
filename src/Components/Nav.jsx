import React from 'react'
import { Navbar, NavbarBrand, NavLink } from 'reactstrap'

export default function Nav(params) {

    const returnHome = params.returnHome;
     
  return (
    <>
    <Navbar
        className="fixed-top"
        color="dark"
        dark
      >
        
        <NavbarBrand href="/">
        Pokemon App
        </NavbarBrand>
        {
            returnHome==true ?
             <NavLink  href="/" className='text-warning'>
            <i className='fa-solid fa-chevron-left'></i>    Regresar
        </NavLink> : ''
            
        }
       
    </Navbar>
    </>
  )
}
