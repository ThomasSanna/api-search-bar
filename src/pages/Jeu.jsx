import React, { useEffect } from 'react';
import { useRef } from 'react';
import "../styles/Jeu.css";
import Menu from "../components/Menu";
import Logo from "../components/Logo";
import videoBack from "../assets/videos/videoJeuBack.mp4";

const Jeu = () => {
    const [data, setData] = React.useState(null);
    const [dataFiltered, setDataFiltered] = React.useState(null);
    const [dataFilteredInput, setDataFilteredInput] = React.useState(null);

    useEffect(() => {
        document.title = "One Piece - Jeu";
    });

    useEffect(() => {
        fetch('https://api.api-onepiece.com/characters')
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    useEffect(() => {
        if (data) {
            // correction des noms
            data[96].french_name = 'Charlotte Katakuri'
            data[663].french_name = 'Karasu'
            data[179].french_name = 'Tamago'
            data[77].french_name = 'Fisher Tiger'
            data[40].french_name = 'Gin'
            data[677].french_name = 'Gem'
            data[39].french_name = 'Don Krieg'
            data[52].french_name = 'Charlotte Laura'
            data[367].french_name = 'Pika'

            // -------
            setDataFiltered(data.filter(
                (item) => {
                    return (item.size !== null && item.size !== '') && 
                           (item.bounty !== null && item.bounty !== '') &&
                           (item.age !== null && item.age !== '') &&
                           (item.job !== null && item.job !== '') &&
                           (item.status !== null && item.status !== '') &&
                           (item.crew_id !== null) &&
                           (item.french_name !== 'Kelly Funk' && item.french_name !== 'Orlombus')
                }
            ).sort((a, b) => {
                if (a.french_name > b.french_name) {
                    return 1;
                }
                if (a.french_name < b.french_name) {
                    return -1;
                }
                return 0;
            }));
            setDataFilteredInput(dataFiltered);
        }
    }, [data]);

    const filterInput = () => {
        const searchText = document.querySelector('#inputPerso').value.toLowerCase().split(' ');
        const filteredInput = dataFiltered.filter((item) => {
            return searchText.every(letter => item.french_name.toLowerCase().includes(letter));
        });
        // order by item.french_name
        setDataFilteredInput(filteredInput.sort((a, b) => {
            if (a.french_name > b.french_name) {
                return 1;
            }
            if (a.french_name < b.french_name) {
                return -1;
            }
            return 0;
        }));
    }

    useEffect(() => {
        if (dataFiltered){
            console.log(dataFiltered);
        }
    }, []);

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
                <div className='jeu1-container'>
                    <div className='presentationJeu'>
                        <h1 className='h1jeu'>Quiz One Piece</h1>
                        <p className='pjeu'>Trouvez le personnage que j'ai choisis à l'aide de ses caractéristiques !</p>
                    </div>
                    <div className='horizontalLine'></div>
                    <div className='recherche-container'>
                        <div className="recherchePerso">
                            <input onChange={filterInput} placeholder='Monkey D. Luffy...' type="text" name="inputPerso" id="inputPerso" />
                            <img src="https://img.icons8.com/ios-filled/50/000000/search--v1.png" alt="search" className="searchIcon" />
                        </div>
                        <div className='suggestion-perso'>
                            {
                                dataFilteredInput && dataFilteredInput.map((item) => {
                                    return (
                                        <div className='suggestion-perso-item' id={item.id}>
                                            <p>{item.french_name}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );    
    };

export default Jeu;