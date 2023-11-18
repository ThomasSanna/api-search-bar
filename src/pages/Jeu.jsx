import React, { useEffect } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Jeu.css";
import "../styles/Jeubis.css";
import "../styles/winWindow.css";
import Menu from "../components/Menu";
import Logo from "../components/Logo";
import ButtonRefresh from "../components/ButtonRefresh.jsx";
import videoBack from "../assets/videos/videoJeuBack.mp4";
import luffyG5Win from "../assets/videos/luffyG5Win.mp4";
import imgPersoJeu from '../scripts/imgPersoJeu';
import genrePersoJeu from '../scripts/genrePersoJeu.jsx';

const Jeu = () => {

    const [data, setData] = React.useState(null);
    const [dataFiltered, setDataFiltered] = React.useState(null);
    const [dataFilteredInput, setDataFilteredInput] = React.useState(null);
    const [persoAFind, setPersoAFind] = React.useState(null);
    const [idAFind, setIdAFind] = React.useState(null);
    const [indexPersoAFind, setIndexPersoAFind] = React.useState(null);
    const [persoTest, setPersoTest] = React.useState([]);
    const [persoTestAsc, setPersoTestAsc] = React.useState([]);
    const [isWin, setIsWin] = React.useState(false);
    const [totalWin, setTotalWin] = React.useState(0);
    const [dataCrew, setDataCrew] = React.useState(null);

    useEffect(() => {
        document.title = "One Piece - Enigme";
    });

    useEffect(() => {
        fetch('https://api.api-onepiece.com/crews')
            .then((res) => res.json())
            .then((res) => setDataCrew(res));
    }, []);

    useEffect(() => {
        fetch('https://api.api-onepiece.com/characters')
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    useEffect(() => {
        if(localStorage.getItem('totalWin')) {
            setTotalWin(parseInt(localStorage.getItem('totalWin')));
        } else {
            localStorage.setItem('totalWin', 0);
        }
    }, []);

    useEffect(() => {
        if (totalWin > 0) {
            localStorage.setItem('totalWin', totalWin);
        }
    }, [totalWin]);

    useEffect(() => {
        if (data) {
            // correction des noms
            data[590].french_name = 'Rock (Yeti Cool Brothers)'
            data[591].french_name = 'Scotch (Yeti Cool Brothers)'
            data[96].french_name = 'Charlotte Katakuri'
            data[663].french_name = 'Karasu'
            data[179].french_name = 'Tamago'
            data[77].french_name = 'Fisher Tiger'
            data[40].french_name = 'Gin'
            data[677].french_name = 'Gem'
            data[39].french_name = 'Don Krieg'
            data[52].french_name = 'Charlotte Laura'
            data[367].french_name = 'Pika'
            data[346].french_name = 'Barbe Brune'
            
            // correction du crew_id
            data[689].crew_id = 130;

            // correction des bounties
            data[0].bounty = "3.000.000.000";
            data[1].bounty = "1.111.000.000";
            data[2].bounty = "366.000.000";
            data[4].bounty = "1.032.000.000";
            data[3].bounty = "500.000.000";
            data[5].bounty = "1.000";
            data[6].bounty = "930.000.000";
            data[7].bounty = "394.000.000";
            data[8].bounty = "383.000.000";
            data[9].bounty = "1.100.000.000";
            data[53].bounty = "3.000.000.000";
            data[58].bounty = "3.000.000.000";
            data[31].bounty = "3.189.000.000"

            // correction des sizes
            data[77].size = "520cm";

            // -------
            setDataFiltered(data.filter(
                (item) => {
                    return (item.size !== null && item.size !== '') && 
                           (item.bounty !== null && item.bounty !== '') &&
                        //    (item.bounty === null || item.bounty === '') &&
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
            }).slice(0, 3 + totalWin));
            setDataFilteredInput(dataFiltered);
        }
    }, [data]);

    const filterInput = () => {
        const searchText = document.querySelector('#inputPerso').value.toLowerCase().split(' ');
        const filteredInput = dataFiltered.filter((item) => {
            return searchText.every(letter => item.french_name.toLowerCase().includes(letter));
        });
        // order by item.french_name
        if (searchText === '' || searchText.length === 0) {
            setDataFilteredInput(dataFiltered);
        } else {
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
    }

    const coredaRef = useRef(null);
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
        document.querySelector('html').classList.add('jeu-html');
    }, []);

    const showSuggestion = () => {
        filterInput()
        const suggestionPerso = document.querySelector('.suggestion-perso');
        suggestionPerso.classList.add('show');
    }

    useEffect(() => {
        const suggestionPerso = document.querySelector('.suggestion-perso');
        document.addEventListener('click', (e)=> {
            if (e.target.id === 'inputPerso' || e.target.id === 'suggIDPerso' || e.target.id === 'googleSearch') {
                return;
            } else {
                suggestionPerso.classList.remove('show');
            }
        });
    }, []);

    const searchPerso = (e) => {
        if (e.target.id === 'googleSearch') {
            return;
        }
        const suggestionPerso = document.querySelector('.suggestion-perso');
        suggestionPerso.classList.remove('show');
        const inputPerso = document.querySelector('#inputPerso');
        inputPerso.value = ""
        filterInput()
        const idPerso = e.target.id;
        addTestPerso(idPerso);
        if (testIsWin(idPerso)) {
            setTotalWin(totalWin + 1);
            setIsWin(true);
            if (totalWin && totalWin < 2) {
                coredaRef.current.play();
            }
        }
    }

    const testIsWin = (id) => {
        return parseInt(id) === parseInt(idAFind);
    }

    const addTestPerso = (id) => {
        const persoObjetTest = dataFiltered.filter((item) => {
            return parseInt(item.id) === parseInt(id);
        })
        setPersoTestAsc([...persoTestAsc, persoObjetTest]);
        setPersoTest([...persoTestAsc, persoObjetTest].reverse());
        const premierEnfant = document.querySelector('.test-perso-container:nth-child(2)');
        const premierEnfant2 = document.querySelector('.test-perso-container2:nth-child(2)');
        if (premierEnfant) {
            premierEnfant.style.scale = '1.1';
            premierEnfant.style.transition = 'all 0.1s ease-in-out';
            setTimeout(() => {
                premierEnfant.style.scale = '1';
                premierEnfant.style.transition = 'all 0.25s ease-in-out';
            }, 200);
        }
        if (premierEnfant2) {
            premierEnfant2.style.scale = '1.1';
            premierEnfant2.style.transition = 'all 0.1s ease-in-out';
            setTimeout(() => {
                premierEnfant2.style.scale = '1';
                premierEnfant2.style.transition = 'all 0.25s ease-in-out';
            }, 200);
        }
    }

    useEffect(() => {
        if (dataFiltered) {
            // const longData = Object.keys(dataFiltered).length;
            const randomPerso = totalWin>103 ? Math.floor(Math.random() * 103) : Math.floor(Math.random() * (3+totalWin));
            setPersoAFind(dataFiltered[randomPerso]);
            setIdAFind(dataFiltered[randomPerso].id);
        }
    }, [dataFiltered]);

    // Fonction age = n ans to n, n entier
    const ageToNumber = (age) => {
        const ageSplit = age.split(' ');
        return parseInt(ageSplit[0]);
    }

    // Fonction taille = 132cm (without space) to 132
    const sizeToNumber = (size) => {
        let sizeSplitCM = size.split('cm')[0];
        sizeSplitCM = sizeSplitCM.split(' ')
        let strSize = ''
        for (let i = 0; i < sizeSplitCM.length; i++) {
            strSize += sizeSplitCM[i].toString()
        }
        return parseInt(strSize);
    }

    // Fonction bounty = 1.000.000.000 to 1000000000
    const bountyToNumber = (bounty) => {
        if (bounty !== null) {
            let bountySplit = bounty.split('.');
            let strBounty = '';
            for (let i = 0; i < bountySplit.length; i++) {
                strBounty += bountySplit[i].toString();
            }
            return parseInt(strBounty);
        }
        return null
    }

    const testAge = (age) => {
        if(age === persoAFind.age) {
            return 'testPersoTrue';
        } else {
            let strCompareAge = '';
            if (estPlusGrand(ageToNumber(age), ageToNumber(persoAFind.age))) {
                strCompareAge = 'estPlusPetit';
            } else {
                strCompareAge = 'estPlusGrand';
            }
            return 'testPersoFalse ' + strCompareAge;
        }
    }

    const testSize = (size) => {
        if(size === persoAFind.size) {
            return 'testPersoTrue';
        } else {
            let strCompareSize = '';
            if (estPlusGrand(sizeToNumber(size), sizeToNumber(persoAFind.size))) {
                strCompareSize = 'estPlusPetit';
            } else {
                strCompareSize = 'estPlusGrand';
            }
            return 'testPersoFalse ' + strCompareSize;
        }
    }

    const testJob = (job) => {
        if(job === persoAFind.job) {
            return 'testPersoTrue';
        } else {
            return 'testPersoFalse';
        }
    }

    const testGenre = (genre) => {
        if(indexPersoAFind !== null && genre === genrePersoJeu[indexPersoAFind]) {
            return 'testPersoTrue';
        } else {
            return 'testPersoFalse';
        }
    }

    const testBounty = (bounty) => {
        if(bounty === persoAFind.bounty) {
            return 'testPersoTrue';
        } else {
            let strCompareBounty = '';
            if (estPlusGrand(bountyToNumber(bounty), bountyToNumber(persoAFind.bounty))) {
                strCompareBounty = 'estPlusPetit';
            } else {
                strCompareBounty = 'estPlusGrand';
            }
            return 'testPersoFalse ' + strCompareBounty;
        }
    }

    const testCrew = (crew) => {
        if(crew === persoAFind.crew_id) {
            return 'testPersoTrue';
        } else {
            return 'testPersoFalse';
        }
    }

    const testFruit = (fruit) => {
        if((Number.isInteger(parseInt(fruit)) && Number.isInteger(parseInt(persoAFind.fruit_id))) || (!Number.isInteger(parseInt(fruit)) && !Number.isInteger(parseInt(persoAFind.fruit_id)))) {
            return 'testPersoTrue';
        } else {
            return 'testPersoFalse';
        }
    }

    const estPlusGrand = (a, b) => {
        return a > b;
    }

    const crewName = (id) => {
        const crewName = dataCrew.filter((item)=>{
            return parseInt(id) === parseInt(item.id)
        })
        return crewName[0].french_name;
    }

    const voirResultat = () => {
        setIsWin(false)
        const inputPerso = document.querySelector('#inputPerso');
        inputPerso.style.display = 'none';
    }

    useEffect(() => {
        if(persoAFind && dataFilteredInput) {
            setIndexPersoAFind(dataFilteredInput.findIndex((element) => element.id === persoAFind.id))
        }
    }, [dataFilteredInput, persoAFind]);

    return (
        
        <div className="jeu1">
            <Logo />
            <Menu />
            <ButtonRefresh />
            <audio ref={coredaRef}>
                <source src="/audios/coreda.mp3" type="audio/mpeg" />
            </audio>
            { 
            isWin &&
                <div className="win-window">
                    <video
                        ref={videoRef}
                        className="luffyg5video videojeuback"
                        autoPlay
                        loop
                        muted
                        onEnded={handleVideoEnd}
                    >
                        <source src={luffyG5Win} type="video/mp4" />
                    </video>
                    <span className='creditArtist'>Background Editor : <a href="https://www.youtube.com/@Molob" target="_blank" rel="noreferrer">Molob</a></span>
                        { imgPersoJeu[totalWin+2] ?
                            <div className='newperso-container'>
                                <h3>Nouveau Personnage !</h3>
                                <img className='new-perso-img' src={imgPersoJeu[totalWin+2]} alt="" /> 
                            </div>
                            :
                            <div className='newperso-container'>
                                <h3>Vous avez débloqué tous les personnages !</h3>
                            </div>
                        }
                    <div>
                        <h1>Bravo ! <br /> Trouvé en {persoTest.length <= 1 ? persoTest.length + " essai" : persoTest.length + " essais"}</h1>
                        <h2>Un total de {totalWin <= 1 ? totalWin + ' victoire' : totalWin + ' victoires'} !</h2>
                    </div>
                    <div className='buttons-fin-jeu'>
                        <button className="bretr button-retry" onClick={() => window.location.reload(false)}>Rejouer</button>
                        <button className="button-resultat button-retry" onClick={voirResultat}>Voir le résultat</button>
                    </div>
                </div>
            }

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
                        <h1 className='h1jeu'>One Piece</h1>
                        <p className='pjeu'>Trouvez le personnage que j'ai choisis à l'aide de ses caractéristiques !</p>
                    </div>
                    <div className='horizontalLine'></div>
                    <div className='recherche-container'>
                        <div className="recherchePerso">
                            <input onFocus={showSuggestion} onChange={filterInput} placeholder='Monkey D. Luffy...' type="text" name="inputPerso" id="inputPerso" />
                        </div>
                        <div className='suggestion-perso' id='suggIDPerso'>
                            {
                                dataFilteredInput && dataFilteredInput.map((item) => {
                                    const idPersoTest = persoTest.map((item) => {
                                        return item[0].id;
                                    });
                                    if (idPersoTest.indexOf(item.id)>=0){
                                        return null;
                                    }
                                    return (
                                        <ul onClick={searchPerso} className='suggestion-perso-item' id={item.id}>
                                            <li id={item.id} onClick={searchPerso}>
                                                <span className='suggImSpan' id={item.id}>
                                                    {/* {dataFiltered.findIndex((element) => element.id === item.id)} */}
                                                    <img id={item.id} className='imgSuggPerso' 
                                                        src={imgPersoJeu[dataFiltered.findIndex((element) => element.id === item.id)] ?
                                                                imgPersoJeu[dataFiltered.findIndex((element) => element.id === item.id)] :
                                                                "https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                                                        alt="Illustration du personnage" />
                                                    <span id={item.id}>{item.french_name}</span>
                                                </span>
                                                <a id='googleSearch' title='Recherchez sur internet qui est ce personnage si vous ne le connaissez pas.' href={"https://www.google.com/search?q=" + item.french_name + ' One Piece'} rel='noreferrer' target="_blank"> ? </a>
                                            </li>
                                        </ul>
                                    );
                                })
                            }
                            <div className='marginBot'>Débloquez + de personnages <br /> en gagnant !</div>
                        </div>
                    </div>
                </div>
                { (window.innerWidth > 850) ?
                    <div className='test-container'>
                        {
                            persoTest && persoTest.length !== 0 &&
                            <div className='legende-test'>
                                <div></div>
                                <span className='legende-test-span'>Age <div className="linehori"></div></span>
                                <span className='legende-test-span'>Taille<div className="linehori"></div></span>
                                <span className='legende-test-span'>Métier<div className="linehori"></div></span>
                                <span className='legende-test-span'>Genre<div className="linehori"></div></span>
                                <span className='legende-test-span'>Prime<div className="linehori"></div></span>
                                <span className='legende-test-span'>Crew<div className="linehori"></div></span>
                                <span className='legende-test-span'>Fruit<div className="linehori"></div></span>
                            </div>
                        }
                        {
                            persoTest && persoTest.map((item) => {
                                return (
                                    <div className='test-perso-container' id={item[0].id}>
                                        <img className='testPersoImg' src={imgPersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)] ?
                                                    imgPersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)] :
                                                    "https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                                            alt="Illustration du personnage" />
                                        <span className={testAge(item[0].age)}>{item[0].age}</span>
                                        <span className={testSize(item[0].size)}>{item[0].size}</span>
                                        <span className={testJob(item[0].job)}>{item[0].job}</span>
                                        <span className={testGenre(genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)] ? genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)]:0)}>
                                            {genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)]? genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)]===0? 'Homme':'Femme' : 'Homme'}
                                        </span>
                                        <span className={testBounty(item[0].bounty)}>{item[0].bounty} ฿</span>
                                        <span className={testCrew(item[0].crew_id)}>{crewName(item[0].crew_id)}</span>
                                        <span className={testFruit(item[0].fruit_id)}>{item[0].fruit_id ? 'Oui' : 'Non'}</span>
                                    </div>
                                );
                            })
                        }
                    </div> 
                    :
                    <div className='scrollmenu'>
                        {
                            persoTest && persoTest.length !== 0 &&
                            <div className='div-test legende-test2'>
                                <span className='span-test legende-test-span2'>Perso<div className="linehori2"></div></span>
                                <span className='span-test legende-test-span2'>Age <div className="linehori2"></div></span>
                                <span className='span-test legende-test-span2'>Taille<div className="linehori2"></div></span>
                                <span className='span-test st-g legende-test-span2'>Métier<div className="linehori2"></div></span>
                                <span className='span-test legende-test-span2'>Genre<div className="linehori2"></div></span>
                                <span className='span-test st-g legende-test-span2'>Prime<div className="linehori2"></div></span>
                                <span className='span-test st-g legende-test-span2'>Crew<div className="linehori2"></div></span>
                                <span className='span-test legende-test-span2'>Fruit<div className="linehori2"></div></span>
                            </div>
                        }
                        {
                            persoTest && persoTest.map((item) => {
                                return (
                                    <div className='div-test test-perso-container2' id={item[0].id}>
                                        <img className='img-test testPersoImg2' src={imgPersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)] ?
                                                    imgPersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)] :
                                                    "https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                                            alt="Illustration du personnage" />
                                        <span className={'span-test stest ' + testAge(item[0].age)}>{item[0].age}</span>
                                        <span className={'span-test stest ' + testSize(item[0].size)}>{item[0].size}</span>
                                        <span className={'span-test stest st-g ' + testJob(item[0].job)}>{item[0].job}</span>
                                        <span className={'span-test stest ' + testGenre(genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)] ? genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)]:0)}>
                                            {genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)]? genrePersoJeu[dataFiltered.findIndex((element) => element.id === item[0].id)]===0? 'Homme':'Femme' : 'Homme'}
                                        </span>
                                        <span className={'span-test stest st-g ' + testBounty(item[0].bounty)}>{item[0].bounty} ฿</span>
                                        <span className={'span-test stest st-g ' + testCrew(item[0].crew_id)}>{crewName(item[0].crew_id)}</span>
                                        <span className={'span-test stest ' + testFruit(item[0].fruit_id)}>{item[0].fruit_id ? 'Oui' : 'Non'}</span>
                                    </div>
                                );
                            })
                        }
                        { 
                        persoTest && persoTest.length !== 0 &&
                            <div className="cont-slider">
                                <div className="arr-slider"></div>
                                <div className="text-slider">Défiler pour révéler des informations</div>
                            </div>
                        }   
                    </div> 
                }
            </main>
        </div>
    );    
    };

export default Jeu;