import React, { useEffect } from 'react'
import '../styles/Footer.css'
import moon from '../assets/images/moon.svg'

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
    if (body.classList.contains('night')) {
      body.classList.remove('night')
      html.classList.remove('night-html')
      lune.classList.remove('lune-nuit-active')
      creditAll.classList.remove('credit-all-night')
    } else {
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
        <p className='credit-website'><a target="_blank" rel='noreferrer' href="https://ko-fi.com/wadeekt">Me soutenir sur Ko-Fi</a> ❤️</p>
      </footer>
    </div>
  )
}

export default Footer
