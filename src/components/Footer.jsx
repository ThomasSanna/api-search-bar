import React, { useEffect } from 'react'
import '../styles/Footer.css'
import moon from '../assets/images/moon.svg'
import kofiImg from '../assets/images/kofi_s_logo_nolabel.png'

function Footer() {

  useEffect(() => {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    html.classList.add("night-html");
    body.classList.add('night')
  }, [])

  const setNightTheme = () => {
    const creditAll = document.querySelector('.credit-all')
    const body = document.querySelector('body')
    const html = document.querySelector('html')
    const lune = document.querySelector('.lune-nuit')
    const aproposcontenu = document.querySelector('.apropos-cont')
    const logomonsite = document.querySelector('.logo-monsite')
    const menuIcon = document.querySelector('.menu-icon')
    const lastVisited = document.querySelector('.last-visit-container')
    if (body.classList.contains('night')) {
      if(menuIcon && aproposcontenu){
        menuIcon.classList.remove('menu-icon-night')
      }
      if(logomonsite && aproposcontenu){
        logomonsite.classList.remove('logo-monsite-night')
      }
      if (aproposcontenu){
        aproposcontenu.classList.remove('apropos-cont-night')
      }
      if (lastVisited){
        lastVisited.classList.add('police-noire')
      }
      body.classList.remove('night')
      html.classList.remove('night-html')
      lune.classList.remove('lune-nuit-active')
      creditAll.classList.remove('credit-all-night')
    } else {
      if(menuIcon){
        menuIcon.classList.add('menu-icon-night')
      }
      if (logomonsite){
        logomonsite.classList.add('logo-monsite-night')
      }
      if (aproposcontenu){
        aproposcontenu.classList.add('apropos-cont-night')
      }
      if (lastVisited){
        lastVisited.classList.remove('police-noire')
      }
      body.classList.add('night')
      html.classList.add('night-html')
      lune.classList.add('lune-nuit-active')
      creditAll.classList.add('credit-all-night')
    }
  }

  return (
    <div>
      <img onClick={setNightTheme} className='lune-nuit lune-nuit-active' title='Mode Nuit/Jour' src={moon} alt="Lune - Mode Nuit/Jour d'interface." />

      <footer className='credit-all credit-all-night'>
        <p className='credit-oda'>© Eiichiro Oda - One Piece</p>
        <p className='credit-website'><a target="_blank" rel='noreferrer' href="https://ko-fi.com/wadeekt"><img className='kofiLogoFooter' src={kofiImg} alt="Logo Ko-Fi" /></a></p>
      </footer>
    </div>
  )
}

export default Footer
