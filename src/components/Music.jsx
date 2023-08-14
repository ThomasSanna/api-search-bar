import React, { useEffect, useState } from 'react'
import '../styles/Music.css'

function Music() {
    const [indexmusic, setIndexmusic] = useState(0)
    const [allMusic, setAllMusic] = useState(null)
    const [musicTitle, setMusicTitle] = useState(null)
    const [lienMusic, setLienMusic] = useState(null)

    useEffect(() => {
        setAllMusic([
            "https://vocaroo.com/embed/15JBXt07FjFL?autoplay=0", // One Piece OST Epic Version
            "https://vocaroo.com/embed/1fTcQ63yOvv8?autoplay=1", // One Piece OST Sad Version
            "https://vocaroo.com/embed/1jnfjU1AlWmy?autoplay=1", // Opening One Piece 01-24
            "https://vocaroo.com/embed/1b7CzSphqPJ1?autoplay=1", // Lofi 1
            "https://vocaroo.com/embed/1jpnv0CfwxX6?autoplay=1" // Lofi 2
        ])
        setMusicTitle([
            "Epic One Piece OST",
            "Sad One Piece OST",
            "Openings One Piece",
            "Lofi 1",
            "Lofi 2"
        ])
        setLienMusic([
            "https://youtu.be/fy3RwQKO9Bc",
            "https://www.youtube.com/watch?v=Yit2fOfV30k&t=2s",
            "https://youtu.be/z1FGY-Y69U0",
            "https://youtu.be/xocnshwEbrM",
            "https://www.youtube.com/watch?v=TgRlX8PK1bY&t=7s"
        ])
    }, [])

    useEffect(() => {
        if (window.innerWidth > 1024) {
            document.querySelector('.music-container').addEventListener('mouseover', () => {
                document.querySelector('.music-container').style.right = '0px'
            })
            document.querySelector('.music-container').addEventListener('mouseout', () => {
                document.querySelector('.music-container').style.right = '-206px'
            })
        } else {
            document.querySelector('.music-container').style.right = '0px'
        }
    }, [])

    const GoNext = () => {
        if (indexmusic === allMusic.length - 1) {
            setIndexmusic(0)
        } else {
            setIndexmusic(indexmusic + 1)
        }
    }

    const GoPrevious = () => {
        if (indexmusic === 0) {
            allMusic && setIndexmusic(allMusic.length - 1)
        } else {
            setIndexmusic(indexmusic - 1)
        }
    }

  return (
    <div className='music-container'>
        <div className='musicallcontainer'>
            <span onClick={GoPrevious} className='flechesmusic fmgauche'>{'<'}</span>
            <span className='container-musiciframe'>
                <h3 className='music-title'><a className='music-lien' target='__blank' href={lienMusic? lienMusic[indexmusic]:''}>{musicTitle? musicTitle[indexmusic] : 'Aucun titre trouvé'}</a></h3>
                <div className='iframemusiccontainer'><iframe className='iframemusic' width="300" height="60" src={allMusic ? allMusic[indexmusic] : ''} frameborder="0" allow="autoplay" title='Ecoutez de la musique en lisant vos chapitres préférés'></iframe></div>
            </span>
            <span onClick={GoNext} className='flechesmusic fmdroit'>{'>'}</span>
        </div>
    </div>
  )
}

export default Music
