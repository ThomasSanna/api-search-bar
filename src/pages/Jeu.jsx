import React, { useEffect } from 'react';
import { useRef } from 'react';
import "../styles/Jeu.css";
import Menu from "../components/Menu";
import Logo from "../components/Logo";
import videoBack from "../assets/videos/videoJeuBack.mp4";

const Jeu = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.play();
    }, []);

    const handleVideoEnd = () => {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
    };

    useEffect(() => {
        const bodyElement = document.querySelector('body');
        bodyElement.classList.add('jeu-body');
    }, []);

    return (
        <div className="jeu1">
            <Logo />
            <Menu />
            <div className="jeu-background">
                <video
                    ref={videoRef}
                    className="videojeuback"
                    autoPlay
                    loop
                    muted
                    onEnded={handleVideoEnd}
                >
                    <source src={videoBack} type="video/mp4" />
                </video>
                <span className='creditArtist'>Background Artist : <a href="https://edwardpak.tumblr.com/" target="_blank" rel="noreferrer">Edward Pak</a></span>
            </div>
            <main className='jeu1-main'>
                <h1>Bonjour</h1>
            </main>
        </div>
    );    
    };

export default Jeu;