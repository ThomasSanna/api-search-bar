import React from 'react'
import logoOP from '../assets/images/logoop.png'
import { NavLink } from 'react-router-dom'
import '../styles/Logo.css'

function Logo() {
  return (
    <div className='logo-monsite logo-monsite-night'>
        <NavLink className='one-piec-container' to='/'>
            <img className='logo-one-piece' src={logoOP} alt="Logo One Piece officiel." />
            <span className='link-logo-one-piece' >ONEPIECECHAPITRES.FR</span>
        </NavLink>
    </div>
  )
}

export default Logo
