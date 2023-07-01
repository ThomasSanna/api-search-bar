import React, { useState } from "react";
import iconMenu from "../assets/images/iconMenu.svg";
import "../styles/Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const menuOpenClose = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu-container');
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      menuIcon.style.rotate = '90deg';
      menu.style.height = '100vh';
      menu.style.width = '100vw';
      menu.style.borderRadius = '0 0 0 0';
      menu.style.pointerEvents = 'all';
      menu.style.opacity = '1';
      menu.style.overflow = 'hidden';
    } else{
      menuIcon.style.rotate = '0deg';
      menu.style.height = '0';
      menu.style.width = '0';
      menu.style.borderRadius = '100% 0 100% 100%';
      menu.style.pointerEvents = 'none';
      menu.style.opacity = '0';
      menu.style.overflow = 'auto';
    }
  }

  const verifDoublon = (e) => {
    if (e.target.className === 'menu-item active') {
      menuOpenClose();
    }
  }

  return (
    <div>
      <picture className="menu-icon-container">
        <img className="menu-icon" onClick={menuOpenClose} src={iconMenu} alt="iconMenu" />
      </picture>
      <div className="menu-container">
        <ul className="menu-center">
          <NavLink onClick={verifDoublon} to="/" activeClassName="active" className="menu-item">Rechercher des chapitres</NavLink>
          <NavLink onClick={verifDoublon} to="/episodes" activeClassName="active" className="menu-item">Rechercher des épisodes</NavLink>
        </ul>
        <ul className="menu-foot">
          <li className='menu-c-o'>© Eiichiro Oda - One Piece</li>
          <li className='menu-c-w'>Site internet créé par <a className='credit-link' title='https://twitter.com/wadeekt' href='https://twitter.com/wadeekt'>WadeeKT</a> en colaboration avec <a className='credit-link' title='https://littlexgarden.com' href="https://littlexgarden.com">Little Garden</a>.</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;