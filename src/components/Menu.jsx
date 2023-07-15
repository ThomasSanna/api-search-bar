import React, { useState } from "react";
import iconMenu from "../assets/images/iconMenu.svg";
import "../styles/Menu.css";
import { Link } from "react-router-dom";
import Logo from '../components/Logo'


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
    } else{
      menuIcon.style.rotate = '0deg';
      menu.style.height = '0';
      menu.style.width = '0';
      menu.style.borderRadius = '0 0 0 100%';
      menu.style.pointerEvents = 'none';
      menu.style.opacity = '0';
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
        <img className="menu-icon menu-icon-night" onClick={menuOpenClose} src={iconMenu} alt="iconMenu" />
      </picture>
      <div className="menu-container">
        <Logo />
        <ul className="menu-center">
          <Link onClick={verifDoublon} to="/" activeClassName="active" className="menu-item">Rechercher des chapitres</Link>
          <Link onClick={verifDoublon} to="/episodes" activeClassName="active" className="menu-item">Rechercher des épisodes</Link>
        </ul>
        <ul className="menu-foot">
          <li className='menu-c-o'>© Eiichiro Oda - One Piece</li>
          <li className='menu-c-w'><a target="_blank" rel='noreferrer' href="https://ko-fi.com/wadeekt">Me soutenir sur Ko-Fi</a> ❤️</li>
        </ul>
        <Link className='link-adblock linkapropos' activeClassName='active' to="/apropos">À propos du site</Link>
      </div> 
    </div>
  );
};

export default Menu;