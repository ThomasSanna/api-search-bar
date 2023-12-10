
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import "../styles/RoadToPiece.css";
import AOS from 'aos';
import { imgArcsBis } from "../scripts/imgTome";

const RoadToPiece = () => {

    const arcs = [ 
        ["Romance Dawn", "RomanceDown", "East Blue"],
        ["Orange Town", "OrangeTown", "East Blue"],
        ["Baratie", "Baratie", "East Blue"],
        ["Arlong Park", "ArlongPark", "East Blue"],
        ["Logue Town", "LogueTown", "East Blue"],
        ["Reverse Mountain", "ReverseMountain", "Alabasta"],
        ["Whiskey Peak", "WhiskeyPeak", "Alabasta"],
        ["Little Garden", "LittleGarden", "Alabasta"],
        ["Drum Island", "DrumIsland", "Alabasta"],
        ["Alabasta", "Alabasta", "Alabasta"],
        ["Jaya", "Jaya", "Skypiea"],
        ["Skypiea", "Skypiea", "Skypiea"],
        ["Long Ring Long Land", "LongRingLongLand", "Water Seven"],
        ["Davy Back Fight", "DavyBackFight", "Water Seven"],
        ["Water Seven", "WaterSeven", "Water Seven"],
        ["Enies Lobby", "EniesLobby", "Water Seven"],
        ["Post Enies Lobby", "PostEniesLobby", "Water Seven"],
        ["Thriller Bark", "ThrillerBark", "Thriller Bark"],
    ];

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    useEffect(() => {
        document.title = "One Piece - Road To Piece";
    }, []);

    useEffect(() => {
        AOS.init({
            once: true
        });
    }, []);
    
    const getName = (image) => {
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
            <div className="rtp-som-contcont">
                <h1>Sommaire - Arcs</h1>
                <div className="rtp-sommaire-container">
                    {
                        arcs.map((arc, index) => (
                            <a href={"#" + arc[1]} className="rtp-sommaire">
                                <div className="link-sommaire">{arc[0]}</div>
                                <img className="img-sommaire" src={imgArcsBis[index+1]} alt="" />
                            </a>
                        ))
                    }
                </div>
            </div>

            <div className="road-to-piece-container">

                <div className="rtp-arc-container">
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="RomanceDown">Romance Down</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/East Blue/Romance Dawn/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/Romance Dawn/' + image.replace('./', '')} alt="Romance Dawn" loading="lazy" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/Baratie/' + image.replace('./', '')} loading="lazy" alt="Baratie" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/Arlong Park/' + image.replace('./', '')} loading="lazy" alt="Arlong Park" />
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
                    <h1 data-aos="fade-in" className="rtp-saga-title" id="LogueTown">Logue Town</h1>
                    <div className="rtp-arc-list-cont">
                        <ul className="rtp-arc-list">
                            {
                                require.context('../../public/RoadToPiece/East Blue/LogueTown/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/East Blue/LogueTown/' + image.replace('./', '')} loading="lazy" alt="Logue Town" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Reverse Mountain/' + image.replace('./', '')} loading="lazy" alt="Logue Town" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Whiskey Peak/' + image.replace('./', '')} loading="lazy" alt="Whiskey Peak" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Little Garden/' + image.replace('./', '')} loading="lazy" alt="Little Garden" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Drum Island/' + image.replace('./', '')} loading="lazy" alt="Drum Island" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Alabasta/Alabasta/' + image.replace('./', '')} loading="lazy" alt="Alabasta" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Skypiea/Jaya/' + image.replace('./', '')} loading="lazy" alt="Jaya" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Skypiea/Skypiea/' + image.replace('./', '')} loading="lazy" alt="Skypiea" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Long Ring Long Land/' + image.replace('./', '')} loading="lazy" alt="Long Ring Long Land" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Davy Back Fight/' + image.replace('./', '')} loading="lazy" alt="Davy Back Fight" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Water Seven/' + image.replace('./', '')} loading="lazy" alt="Water Seven" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Enies Lobby/' + image.replace('./', '')} loading="lazy" alt="Enies Lobby" />
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
                                        <img className="rtp-arc-img" src={'RoadToPiece/Water Seven/Post Enies Lobby/' + image.replace('./', '')} loading="lazy" alt="Post Enies Lobby" />
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
                                require.context('../../public/RoadToPiece/Thriller Bark/Thriller Bark/', true).keys().map((image) => (
                                    <li onClick={openImage} data-aos="zoom-in" className="rtp-li">
                                        <img className="rtp-arc-img" src={'RoadToPiece/Thriller Bark/Thriller Bark/' + image.replace('./', '')} loading="lazy" alt="Thriller Bark" />
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