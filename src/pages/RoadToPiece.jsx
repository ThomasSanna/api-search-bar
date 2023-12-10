
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import "../styles/RoadToPiece.css";
import AOS from 'aos';

const RoadToPiece = () => {

    useEffect(() => {
        AOS.init({
            once: true
        });
    }, []);
    
    const getName = (image) => {
        // on doit passer de "@artiste,3.jpg" à "artiste"
        let name = image.replace('./', '');
        name = name.replace('@', '');
        name = name.replace('.jpg', '');
        name = name.replace('.png', '');
        if (name.includes(',')) {
            name = name.split(',')[0];
        }
        return name;
    }

    const openImage = (e) => {
        const popup = document.querySelector('.popup-image');
        const popupImg = document.querySelector('.popup-image-img');
        const popupClose = document.querySelector('.popup-image-close');

        popup.style.display = "flex";
        popupImg.src = e.target.previousSibling.src;

        popupClose.addEventListener('click', () => {
            popup.style.display = "none";
        });
    }

    useEffect(() => {
        const popup = document.querySelector('.popup-image');

        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-image')) {
                popup.style.display = "none";
                console.log(e.target.id)
            }
        });
    }, []);

    return (
        <div className="road-to-piece">
            <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
            <script>AOS.init();</script>
            <Menu />

            <div className="rtp-presentation">
                <h1 data-aos="fade-in" className="rtp-title">Road To Piece</h1>
                <p data-aos="fade-in" className="rtp-text">Projet pensé et organisé par <a href="https://twitter.com/Kawamatsu95" target="_blank" rel="noreferrer">Young Cap</a></p>
            </div>

            <div className="road-to-piece-container">

            {/* - RoadToPiece/East Blue/ (Romance Dawn, Orange Town, Baratie, Arlong Park, LogueTown)
                - RoadToPiece/Alabasta/ (Reverse Mountain, Whiskey Peak, Little Garden, Drum Island, Alabasta)
                - RoadToPiece/Skypiea/ (Jaya, Skypiea)
                - RoadToPiece/Water Seven/ (Long Ring Long Land, Davy Back Fight, Water Seven, Enies Lobby, Post Enies Lobby)
                - RoadToPiece/Thriller Bark */}

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="RomanceDown">Romance Down</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/East Blue/Romance Dawn/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/Romance Dawn/' + image.replace('./', '')} alt="Romance Dawn" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="OrangeTown">Orange Town</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/East Blue/Orange Town/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/Orange Town/' + image.replace('./', '')} alt="Orange Town" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="Baratie">Baratie</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/East Blue/Baratie/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/Baratie/' + image.replace('./', '')} alt="Baratie" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="ArlongPark">Arlong Park</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/East Blue/Arlong Park/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/Arlong Park/' + image.replace('./', '')} alt="Arlong Park" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="LogueTown">LogueTown</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/East Blue/LogueTown/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/LogueTown/' + image.replace('./', '')} alt="Logue Town" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="ReverseMountain">Reverse Mountain</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Alabasta/Reverse Mountain/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Reverse Mountain/' + image.replace('./', '')} alt="Logue Town" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="WhiskeyPeak">Whiskey Peak</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Alabasta/Whiskey Peak/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Whiskey Peak/' + image.replace('./', '')} alt="Whiskey Peak" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="LittleGarden">Little Garden</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Alabasta/Little Garden/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Little Garden/' + image.replace('./', '')} alt="Little Garden" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="DrumIsland">Drum Island</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Alabasta/Drum Island/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Drum Island/' + image.replace('./', '')} alt="Drum Island" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="Alabasta">Alabasta</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Alabasta/Alabasta/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Alabasta/' + image.replace('./', '')} alt="Alabasta" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="Jaya">Jaya</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Skypiea/Jaya/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Skypiea/Jaya/' + image.replace('./', '')} alt="Jaya" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="Skypiea">Skypiea</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Skypiea/Skypiea/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Skypiea/Skypiea/' + image.replace('./', '')} alt="Skypiea" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="LongRingLongLand">Long Ring Long Land</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Water Seven/Long Ring Long Land/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Long Ring Long Land/' + image.replace('./', '')} alt="Long Ring Long Land" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="DavyBackFight">Davy Back Fight</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Water Seven/Davy Back Fight/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Davy Back Fight/' + image.replace('./', '')} alt="Davy Back Fight" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="WaterSeven">Water Seven</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Water Seven/Water Seven/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Water Seven/' + image.replace('./', '')} alt="Water Seven" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="EniesLobby">Enies Lobby</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Water Seven/Enies Lobby/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Enies Lobby/' + image.replace('./', '')} alt="Enies Lobby" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="PostEniesLobby">Post Enies Lobby</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Water Seven/Post Enies Lobby/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Post Enies Lobby/' + image.replace('./', '')} alt="Post Enies Lobby" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="ThrillerBark">Thriller Bark</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/Thriller Bark/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Thriller Bark/' + image.replace('./', '')} alt="Thriller Bark" />
                                        <span className="rtp-auteur">
                                            <span className="cred-auteur">Artiste : <a href={"https://twitter.com/" + getName(image)} target="_blank" rel="noreferrer" className="cred-auteur">{getName(image)}</a></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                




            </div>
            <div className="popup-image">
                <div className="popup-image-container">
                    <span className="popup-image-close">X</span>
                    <img className="popup-image-img" id="yes" src="" alt="popup" />
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default RoadToPiece;