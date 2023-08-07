import React, { useEffect } from 'react'
import '../styles/SwitchViewer.css'
import FrAnimeLogo from '../assets/images/franimelogo.jpg'
import VoirAnimeLogo from '../assets/images/voiranimelogo.png'

function SwitchViewer() {

  useEffect(() => {

    let container = document.querySelector('.switchview-container')
    setTimeout(() => {
      container.classList.add('adroite')
    }, 7000);
  })

  const ChangeViewer = (e) => {
    const img1 = document.querySelector('.imgviewer1')
    const img2 = document.querySelector('.imgviewer2')
    if (e.target === img1 && !img1.classList.contains('viewerchecked')) {
      img1.classList.add('viewerchecked')
      img2.classList.remove('viewerchecked')
    }
    if (e.target === img2 && !img2.classList.contains('viewerchecked')) {
      img2.classList.add('viewerchecked')
      img1.classList.remove('viewerchecked')
    }
  }
  const adroiteup = () => {
    let container = document.querySelector('.switchview-container')
    container.classList.remove('adroite')
  }
  const adroitedown = () => {
    let container = document.querySelector('.switchview-container')
    container.classList.add('adroite')
  }
  return (
    <div onMouseOver={adroiteup} onMouseOut={adroitedown} className='switchview-container'>
      <img className='imgviewer imgviewer1 viewerchecked' src={FrAnimeLogo} alt="Logo FRANIME" onClick={ChangeViewer} title="Mettre FrAnime comme lecteur d'épisodes" />
      <img className='imgviewer imgviewer2' src={VoirAnimeLogo} alt="Logo VOIRANIME" onClick={ChangeViewer} title="Mettre VoirAnime comme lecteur d'épisodes" />
    </div>
  )
}

export default SwitchViewer

