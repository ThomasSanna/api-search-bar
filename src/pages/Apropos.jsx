import React, {useEffect} from 'react'
import '../styles/Home.css'
import '../styles/Footer.css'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import '../styles/Menu.css'
import '../styles/Apropos.css'
import Logo from '../components/Logo'
import { NavLink } from 'react-router-dom'

function Apropos() {
  useEffect(() => {
    document.title = 'One Piece - À propos'
    const metaDescription = document.querySelector('meta[name="description"]')
    metaDescription.content = 'Retrouvez vos épisodes préférés de One Piece en streaming VOSTFR!'
  }, [])
  return (
    <div>
        <Logo />
        <Menu />
        <div className='apropos-cont'>
            <h1>A propos</h1><br />
            <p>Ce site internet a été entièrement mis en place par <a target='_blank' rel='noreferrer' href="https://twitter.com/wadeekt">WadeeKT</a>.</p><br />
            <p>Ce site sert principalement à retrouver vos meilleurs chapitres avec la plus grande précision. Celui-ci n'aurait pas pu voir le jour sans l'API extraordinaire de <a target='_blank' rel='noreferrer' href="https://twitter.com/NathDie1">Nathan DIERICKX</a> : <a target='_blank' rel='noreferrer' href="https://api-onepiece.com">api-onepiece.com</a> </p> <br />
            <p><NavLink to="/">onepiecechapitre.fr</NavLink> sera régulièrement mis à jour. Une idée d'ajout ? <a target='_blank' rel='noreferrer' href="https://twitter.com/messages/compose?recipient_id=1224711922790162432&text=G%20une%20idée%20d'ajout">Contactez-moi sur Twitter</a> !</p>
            <p>J'accorde une grande importance à la confidentialité et à la sécurité des données de l'utilisateurs. Pour garantir une expérience en ligne fluide et sécurisée, j'ai opté pour une approche innovante. Plutôt que de stocker des données sensibles sur notre serveur, j'utilise une méthode différente. Je récupère les informations nécessaires directement à partir de sites tiers réputés et fiables tels que <a target='_blank' rel='noreferrer' href="https://v4.voiranime.com">VoirAnime.com</a>, <a target='_blank' rel='noreferrer' href="https://littlexgarden.com/">LittlexGarden.com</a> ou encore <a target='_blank' rel='noreferrer' href="https://ww9.readonepiece.com">readonepiece.com</a>, tout en respectant leurs politiques de confidentialité et leurs droits d'auteur. Cela nous permet de vous offrir un accès à du contenu de qualité sans compromettre la sécurité de vos données personnelles. Vous pouvez ainsi naviguer sur mon site en toute tranquillité, sachant que vos informations ne sont jamais stockées sur quelconque serveur. Je m'engage à maintenir un environnement sécurisé tout en offrant une expérience utilisateur optimale.</p>
            <p className='invers-p'>Merci d'avoir été si nombreux à me soutenir lors de l'avancement du site, j'espère qu'il vous convient !</p>
            <p className='invers-p'>Un problème de fonctionnement ? <a target='_blank' rel='noreferrer' href="https://twitter.com/messages/compose?recipient_id=1224711922790162432&text=G%20un%20probleme">Contactez-moi sur Twitter</a> </p>
        </div>
        <Footer />
    </div>
  )
}

export default Apropos
