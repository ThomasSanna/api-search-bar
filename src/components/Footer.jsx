import React from 'react'
import '../styles/Footer.css'
import moon from '../assets/images/moon.svg'

function Footer() {
  return (
    <div>
      <footer className='credit-all'>
        <img checked className='lune-nuit' title='Mode Nuit/Jour' src={moon} alt="Lune - Mode Nuit/Jour d'interface." />
        <p className='credit-oda'>© Eiichiro Oda - One Piece</p>
        <p className='credit-website'>Site internet créé par <a className='credit-link' title='https://twitter.com/wadeekt' href='https://twitter.com/wadeekt'>WadeeKT</a> en colaboration avec <a className='credit-link' title='https://littlexgarden.com' href="https://littlexgarden.com">Little Garden</a>.</p>
      </footer>
    </div>
  )
}

export default Footer
