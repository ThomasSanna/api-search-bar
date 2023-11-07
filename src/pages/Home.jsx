import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import croixSVG from "../assets/images/croix.svg";
import reverseImage from "../assets/images/reverse.png";
import arrowDown from "../assets/images/down.png";
import arrowTriangle from "../assets/images/arrowTriangle.svg";
import fullScreenIcon from "../assets/images/fullscreen.svg";
import lowBatteryIcon from "../assets/images/lowbattery.svg";
import fullScreenExitIcon from "../assets/images/fullscreenexit.svg";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import descRapide from "../scripts/descRapideChapitres/AUPDATEdescRapideChap"
import persoParC from "../scripts/persosParChap/AUPDATEpersosParChap.jsx"
import characterIcon from "../assets/images/character.svg";
import Music from "../components/Music";
import { imgTomes } from "../scripts/imgTome.jsx";


function Home() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLowBattery, setIsLowBattery] = useState(false);
  const [maxChapter, setMaxChapter] = useState(null);

  useEffect(() => {
    if (currentId) {
      localStorage.setItem("currentIdCh", currentId)
    }
  }, [currentId]);

  const audioRef = useRef(null);
  const coredaRef = useRef(null);

  useEffect(() => {
    setMaxChapter(data ? data[data.length - 1].id : null);
  }, [data]);

  useEffect(() => {
    fetch("https://api.api-onepiece.com/chapters")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  useEffect(() => {
    document.title = "One Piece - Chapitres";
  }, []);

  useEffect(() => {
    document.querySelector(".searchbar").focus();
  }, []);

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".searchbar");
    searchInput.focus();
  });
  

  const resetSearch = (e) => {
    e.target.style.display = "none";
    document.querySelector(".searchbar").value = "";
    document.querySelector(".searchbar").focus();
    updateFilteredData(data);
  }

  const clickMauvais = () => {
    document.querySelector(".searchbar").focus();
  }

  const handleSearch = (e) => {
    let croix = document.querySelector(".croix-croix");
    if (e.target.value === "") {
      croix.style.display = "none";
    } else {
      croix.style.display = "flex";
    }
    updateFilteredData(data);
  };

  const clickChangeFilter = (e) => {
    e.target.checked = !e.target.checked;
    if (e.target.checked) {
      e.target.classList.add("filter-checked");
    } else {
      e.target.classList.remove("filter-checked");
    }
    const withnumber = document.getElementById("withnumber");
    const withtitle = document.getElementById("withtitle");
    const withdescription = document.getElementById("withdescription");
    const withperso = document.getElementById("withperso");

    if (!withnumber.checked && !withtitle.checked && !withdescription.checked && !withperso.checked) {
      withnumber.checked = true;
      withnumber.classList.add("filter-checked");
    }

    updateFilteredData(data);
  };

  const dbclickChangeFilter = (e) => {
    e.target.checked = true;
    e.target.classList.add("filter-checked");

    const withnumber = document.getElementById("withnumber");
    const withtitle = document.getElementById("withtitle");
    const withdescription = document.getElementById("withdescription");
    const withperso = document.getElementById("withperso");

    let arr = [withnumber, withtitle, withdescription, withperso];

    arr.forEach((el) => {
      if (!(e.target===el)) {
        el.checked = false;
        el.classList.remove("filter-checked");
      }
    });

    updateFilteredData(data);
  }

  const reverseNum = () => {
    document.querySelector(".reverse-back").checked =
      !document.querySelector(".reverse-back").checked;
    if (document.querySelector(".reverse-back").checked) {
      document.querySelector(".reverse-back").classList.add("reverse-checked");
    } else {
      document
        .querySelector(".reverse-back")
        .classList.remove("reverse-checked");
    }
    updateFilteredData(data);
  };

  const updateFilteredData = (data) => {
    const withnumber = document.getElementById("withnumber");
    const withtitle = document.getElementById("withtitle");
    const withdescription = document.getElementById("withdescription");
    const withperso = document.getElementById("withperso");
    const searchText = document.querySelector(".searchbar").value.toLowerCase().split(" ");
    const reversed = document.querySelector(".reverse-back").checked;

    const filtered = data.filter((dat) => {
      const titleKeywords = withtitle.checked && searchText.every(keyword => dat.chapter_title.toLowerCase().includes(keyword));
      const descriptionKeywords = descRapide[dat.id] && withdescription.checked && searchText.every(keyword => descRapide[dat.id]? descRapide[dat.id].toLowerCase().includes(keyword) : false);
      const numberKeywords = withnumber.checked && searchText.every(keyword => dat.id.toString().includes(keyword));
      const persoKeywords = persoParC[dat.id] && withperso.checked && searchText.every(keyword =>   Array.isArray(persoParC[dat.id])? persoParC[dat.id].join(' ').toLowerCase().includes(keyword) : false);

      return titleKeywords || descriptionKeywords ||  numberKeywords || persoKeywords;
    });

    setFilteredData(reversed ? filtered.reverse() : filtered);

    switch (document.querySelector(".searchbar").value.toLowerCase()) {
      default:
        break;
      case "pohnny":
        audioRef.current.play();
        break;
      case "gzmlucas":
        window.open('https://www.youtube.com/watch?v=pSNn6DNtdS0&t=2s', '_blank');
        break;
      case 'littlexgarden':
        window.open('https://littlexgarden.com/', '_blank');
        break;
      case 'franime':
        window.open('https://franime.fr/', '_blank');
        break;
      case "wadeekt":
        coredaRef.current.play();
        window.open('https://twitter.com/WadeeKT', '_blank');
    }
  };


  const iframeOpen = (e) => {
    if ((e.target && e.target.classList.contains("mibperso")) || (e.target.parentElement && e.target.parentElement.classList.contains('mitperso')) || (e.target.parentElement.parentElement && e.target.parentElement.parentElement.classList.contains('mitperso'))) {
      return;
    }
    setCurrentId(e.target.id.toString());
    document.querySelector(".iframe-container").style.display = "flex";
    const chapterContainer = document.querySelector(".chapter-container");
    if (window.innerWidth <= 1000) {
      chapterContainer.style.width = '100vw'
    } else {
      chapterContainer.style.width = "calc(100% - 500px)";
    }
    const currId = e.target.id.toString();
    verifArrowOnClick(currId);
  };

  const closeIframe = () => {
    document.querySelector(".iframe-container").style.display = "none";
    const chapterContainer = document.querySelector(".chapter-container");
    chapterContainer.style.width = "100%";
  };

  const arcFilter = (e) => {
    if (window.innerWidth <= 850) {
      openArcTab()
      openFuncTab()
    }

    const reversed = document.querySelector(".reverse-back").checked;
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let tab = []
    let count = 0
    const arc = e.target.id + e.target.parentElement.id; // Pour éviter le bug du clic sur le b (bold)

    for (let i = 0; i < arc.length; i++) {
      if (numbers.includes(arc[i])) {
        count++
        if (count === 1) {
          tab.push(arc[i])
        } else {
          tab[tab.length - 1] += arc[i]
        }
      } else {
        count = 0
      }
    };

    const filtered = data.filter((dat) => {
      return tab.includes(dat.tome.id.toString())
    });
    setFilteredData(reversed ? filtered.reverse() : filtered);
  };

  const openArcTab = () => {
    const headerTome = document.querySelector(".header-tome-tri");
    const tomeContainer = document.querySelector(".tome-select-container");
    headerTome.checked = !headerTome.checked;
    if (headerTome.checked) {
      headerTome.classList.add("arc-checked");
      if (window.innerWidth <= 850) {
        tomeContainer.style.height = "calc(100vh - 140px)";
      } else if (window.innerWidth <= 1300) {
        tomeContainer.style.height = "calc(100vh - 69px)";
      } else {
        tomeContainer.style.height = "calc(100vh - 90px)";
      }
      tomeContainer.style.border = "1px solid #fff";
      tomeContainer.style.paddingBottom = "50px";
    }
    else {
      headerTome.classList.remove("arc-checked");
      tomeContainer.style.height = "0";
      tomeContainer.style.border = "none";
      tomeContainer.style.padding = "0";
    }
  }

  const countAnnee = (anneefirst) => {
    if (anneefirst) {
      let annee = parseInt(anneefirst.slice(0, 4))
      let anneeactuelle = new Date().getFullYear()
      return - annee + parseInt(anneeactuelle)
    } else {
      return "XX"
    }
  }

  const moreInfoTabAppear = (e) => {
    e.target.nextElementSibling.style.display = "flex";
  }

  const moreInfoTabDisappear = (e) => {
    e.target.nextElementSibling.style.display = "none";
  }

  const mita = (e) => {
    e.target.checked = !e.target.checked;

    if (!e.target.checked) {
      e.target.parentElement.classList.add("mitactive");
    }
    else {
      e.target.parentElement.classList.remove("mitactive");
    }
  }


  const goChapSP = (e) => {
    let arrowPrecedent = document.querySelector(".arrow-precedent");
    let arrowSuivant = document.querySelector(".arrow-suivant");



    if (e.target === arrowPrecedent) {
      setCurrentId((parseInt(currentId) - 1).toString());
    }
    else if (e.target === arrowSuivant) {
      setCurrentId((parseInt(currentId) + 1).toString());
    }

    verifArrow(parseInt(currentId)-1, e);
  }

  const verifArrow = (id, e) => {
    let currID = parseInt(id);
    let arrowPrecedent = document.querySelector(".arrow-precedent");
    let arrowSuivant = document.querySelector(".arrow-suivant");
    if (e.target === arrowPrecedent && currID === 1) {
      arrowPrecedent.style.opacity = "0";
      arrowPrecedent.style.pointerEvents = "none";
    }
    else if (e.target === arrowSuivant && currID === parseInt(maxChapter) + 1) {
      arrowSuivant.style.opacity = "0";
      arrowSuivant.style.pointerEvents = "none";
    }
    else {
      arrowPrecedent.style.opacity = "100%";
      arrowSuivant.style.opacity = "100%";
      arrowPrecedent.style.pointerEvents = "auto";
      arrowSuivant.style.pointerEvents = "auto";
    }
    document.querySelector(".iframe-chap").focus();
  }

  const verifArrowOnClick = (id) => {
    let currID = parseInt(id);
    let arrowPrecedent = document.querySelector(".arrow-precedent");
    let arrowSuivant = document.querySelector(".arrow-suivant");
    if (currID === 1) {
      arrowPrecedent.style.opacity = "0";
      arrowPrecedent.style.pointerEvents = "none";
      arrowSuivant.style.opacity = "100%";
      arrowSuivant.style.pointerEvents = "auto";
    }
    else if (currID === parseInt(maxChapter) + 3) {
      arrowSuivant.style.opacity = "0";
      arrowSuivant.style.pointerEvents = "none";
      arrowPrecedent.style.opacity = "100%";
      arrowPrecedent.style.pointerEvents = "auto";
    }
    else {
      arrowPrecedent.style.opacity = "100%";
      arrowSuivant.style.opacity = "100%";
      arrowPrecedent.style.pointerEvents = "auto";
      arrowSuivant.style.pointerEvents = "auto";
    }
    document.querySelector(".iframe-chap").focus();
  }

  const fullScreenScript = () => {
    setIsFullScreen(!isFullScreen);
    const iframeContainer = document.querySelector(".iframe-container");
    if (!isFullScreen){
      iframeContainer.classList.add("iframe-fullscreen");
    } else {
      iframeContainer.classList.remove("iframe-fullscreen");
    }
    document.querySelector(".iframe-chap").focus();
  };

  const lowBatteryFunc = () => {
    let hBattery = document.querySelector('.header-battery')
    let BatImage = document.querySelector('.image-battery')
    setIsLowBattery(!isLowBattery);
    if (!isLowBattery){
      hBattery.classList.add("header-battery-active");
      BatImage.classList.add("battery-image-active");
    } else {
      hBattery.classList.remove("header-battery-active");
      BatImage.classList.remove("battery-image-active");
    }
  }

  const openFuncTab = () => {
    let telFilterContainer = document.querySelector('.tel-filter-container')
    let arrowTelFilter = document.querySelector('.arrow-tel-filter')
    let telFilter = document.querySelector('.tel-filter')
    
    arrowTelFilter.checked = !arrowTelFilter.checked;
    if (arrowTelFilter.checked) {
      telFilterContainer.style.height = "53px";
      telFilter.style.display = "flex";
      arrowTelFilter.style.transform = "rotate(180deg)";
    } else {
      telFilterContainer.style.height = "0";
      telFilter.style.display = "none";
      arrowTelFilter.style.transform = "rotate(0deg)";
    }
  }

  // ----°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-----------------------------------------------------------------
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,300&family=Rubik:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <audio ref={audioRef}>
        <source src="/audios/pohnnyeaster.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={coredaRef}>
        <source src="/audios/coreda.mp3" type="audio/mpeg" />
      </audio>

      {/* polices : Noto Serif, Rubik */}
      <p className='info-beta'>Beta</p>
      {/* <p className="backupannonce">Pour le déploiement, je n'ai pas mis d'images par chapitres pour économiser les données : ajout plus tard !</p> */}
      <Music  />
      <header className="header-container">
        <span onClick={lowBatteryFunc} className="header-battery">
          <img className="image-battery" src={lowBatteryIcon} alt="logo save battery" title="Consommez moins de données avec en activant cette option." />
        </span>
        <span className="header-search">
          <Link className="sous-search" to="/episodes">Rechercher un épisode</Link>
          <span className="cont-searchbar">
            <input
              type="text"
              className="searchbar"
              onChange={handleSearch}
              placeholder="Numéro, Titre ou Description du chapitre.."
            />
            <span onClick={clickMauvais} className="croix-search">
              <div onClick={resetSearch} className="croix-croix"><span className="lacroix">x</span></div>
            </span>
            <span className="buttons-search">
              <span onClick={reverseNum} className="reverse-back">
                <img
                  className="button-reverse"
                  src={reverseImage}
                  alt="bouton reverse"
                  title="Trier par ordre décroissant"
                />
              </span>
            </span>
          </span>
          <h5 className="nb-result">
            {filteredData
              ? filteredData.length === 1
                ? "1 chapitre trouvé."
                : filteredData.length + " chapitres trouvés."
              : null}
          </h5>
        </span>
        <span className="header-checkbox">
          {/* <div className="sme tri-par">Trier par :</div> */}
          <div
            title="Trier par numéros des chapitres"
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withnumber"
          >
            Numéros
          </div>
          <div
            title="Trier par titres des chapitres"
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withtitle"
          >
            Titres
          </div>
          <div
            title="Trier par descriptions des chapitres"
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withdescription"
          >
            Descriptions
          </div>
          <div
            title="Trier par personnages présents dans le chapitre"
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withperso"
          >
            Persos
          </div>
          <div title='Triez par numéro ou titre ou description ou personnage par chapitre. Double-cliquez sur la catégorie que vous voulez pour selectionner seulement celle-ci.' className='info-i'>i</div>
        </span>
        <span className="header-tome-tri-container">
          <span onClick={openArcTab} className="header-tome-tri header-tome-tri-pc">
            <span>
              Trier par Arc
            </span>
            <img className="arrow-down" src={arrowDown} alt="flèche vers le bas" />
          </span>
          <div className="tome-select-container">
            <ul className="liste-tome">
              <li onClick={arcFilter} id="[1]" title="Romance Dawn: Volume 1"><b>Romance Dawn</b>: Volume 1</li>
              <li onClick={arcFilter} id="[2,3]" title="Orange Town: Volumes 2-3"><b>Orange Town</b>: Volumes 2-3</li>
              <li onClick={arcFilter} id="[4,5]" title="Syrup Village: Volumes 4-5"><b>Syrup Village</b>: Volumes 4-5</li>
              <li onClick={arcFilter} id="[6,7,8]" title="Baratie: Volumes 6-8"><b>Baratie</b>: Volumes 6-8</li>
              <li onClick={arcFilter} id="[8,9,10,11]" title="Arlong Park: Volumes 8-11"><b>Arlong Park</b>: Volumes 8-11</li>
              <li onClick={arcFilter} id="[11,12]" title="Loguetown: Volumes 11-12"><b>Loguetown</b>: Volumes 11-12</li>
              <li onClick={arcFilter} id="[12]" title="Reverse Mountain: Volumes 12"><b>Reverse Mountain</b>: Volumes 12</li>
              <li onClick={arcFilter} id="[12,13]" title="Whiskey Peak: Volumes 12-13"><b>Whiskey Peak</b>: Volumes 12-13</li>
              <li onClick={arcFilter} id="[13,14,15]" title="Little Garden: Volumes 13-15"><b>Little Garden</b>: Volumes 13-15</li>
              <li onClick={arcFilter} id="[15,16,17]" title="Drum Island: Volumes 15-17"><b>Drum Island</b>: Volumes 15-17</li>
              <li onClick={arcFilter} id="[18,19,20,21,22,23,24]" title="Alabasta: Volumes 18-24"><b>Alabasta</b>: Volumes 18-24</li>
              <li onClick={arcFilter} id="[24,25]" title="Jaya: Volumes 24-25"><b>Jaya</b>: Volumes 24-25</li>
              <li onClick={arcFilter} id="[26,27,28,29,30,31,32]" title="Skypiea: Volumes 26-32"><b>Skypiea</b>: Volumes 26-32</li>
              <li onClick={arcFilter} id="[32,33,34]" title="Long Ring Long Land: Volumes 32-34"><b>Long Ring Long Land</b>: Volumes 32-34</li>
              <li onClick={arcFilter} id="[34,35,36,37,38,39]" title="Water Seven: Volumes 34-39"><b>Water Seven</b>: Volumes 34-39</li>
              <li onClick={arcFilter} id="[39,40,41,42,43,44]" title="Enies Lobby: Volumes 39-44"><b>Enies Lobby</b>: Volumes 39-44</li>
              <li onClick={arcFilter} id="[45,46]" title="Post-Enies Lobby: Volumes 45-46"><b>Post-Enies Lobby</b>: Volumes 45-46</li>
              <li onClick={arcFilter} id="[46,47,48,49,50]" title="Thriller Bark: Volumes 46-50"><b>Thriller Bark</b>: Volumes 46-50</li>
              <li onClick={arcFilter} id="[50,51,52,53]" title="Archipel des Sabaody: Volumes 50-53"><b>Archipel des Sabaody</b>: Volumes 50-53</li>
              <li onClick={arcFilter} id="[53,54]" title="Amazon Lily: Volumes 53-54"><b>Amazon Lily</b>: Volumes 53-54</li>
              <li onClick={arcFilter} id="[54,55,56]" title="Impel Down: Volumes 54-56"><b>Impel Down</b>: Volumes 54-56</li>
              <li onClick={arcFilter} id="[56,57,58,59,60,61]" title="Marineford: Volumes 56-61"><b>Marineford</b>: Volumes 56-61</li>
              <li onClick={arcFilter} id="[61]" title="Post-War: Volume 61"><b>Post-War</b>: Volume 61</li>
              <li onClick={arcFilter} id="[61]" title="Retour à Sabaody: Volumes 61"><b>Retour à Sabaody</b>: Volumes 61</li>
              <li onClick={arcFilter} id="[61,62,63,64,65,66]" title="Fishman Island: Volumes 61-66"><b>Fishman Island</b>: Volumes 61-66</li>
              <li onClick={arcFilter} id="[66,67,68,69,70]" title="Punk Hazard: Volumes 66-70"><b>Punk Hazard</b>: Volumes 66-70</li>
              <li onClick={arcFilter} id="[70,71,72,73,74,75,76,77,78,79,80]" title="Dressrosa: Volumes 70-80"><b>Dressrosa</b>: Volumes 70-80</li>
              <li onClick={arcFilter} id="[80,81,82]" title="Zou: Volumes 80-82"><b>Zou</b>: Volumes 80-82</li>
              <li onClick={arcFilter} id="[82,83,84,85,86,87,88,89,90]" title="Whole Cake Island: Volumes 82-90"><b>Whole Cake Island</b>: Volumes 82-90</li>
              <li onClick={arcFilter} id="[90]" title="Reverie: Volume 90"><b>Reverie</b>: Volume 90</li>
              <li onClick={arcFilter} id="[90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105]" title="Wano Country: Volumes 90-105"><b>Wano Country</b>: Volumes 90-105</li>
              <li onClick={arcFilter} id="[106,107]" title="Egg Head: Volumes 106-107"><b>Egg Head</b>: Volumes 106-107</li>
            </ul>
          </div>
        </span>
      </header>
      <Menu />

      <div  className="tel-filter-container">
        <img onClick={openFuncTab} className="arrow-tel-filter" src={arrowDown} alt="flèche vers le bas" />
        <div className="tel-filter">
        <Link to="/episodes" activeClassName="active" className="go-to-other">Rechercher des épisodes</Link>
          <span span onClick={reverseNum} className="reverse-back rb-mobile">
            <img
              className="button-reverse br-mobile"
              src={reverseImage}
              alt="bouton reverse"
              title="Trier par ordre décroissant"
            />
          </span>
          <span onClick={openArcTab} className="header-tome-tri htt-tel">
            <span>
              Trier par Arc
            </span>
            <img className="arrow-down ad-tel" src={arrowDown} alt="flèche vers le bas" />
          </span>
        </div>
      </div>

      {/* CHAPTER VISUAL ---------------------------------------------------- */}

      <main className="main-container">
        {maxChapter? <div className="last-chap-container">Les chapitres <span className="lasts-chapters" id={parseInt(maxChapter) + 1} onClick={iframeOpen}>{parseInt(maxChapter) + 1}</span> ou <span className="lasts-chapters" id={parseInt(maxChapter) + 2} onClick={iframeOpen}>{parseInt(maxChapter) + 2}</span> ou <span className="lasts-chapters" id={parseInt(maxChapter) + 3} onClick={iframeOpen}>{parseInt(maxChapter) + 3}</span> sont déjà sortis ?!</div>
        : ""}
        {
          localStorage.getItem("currentIdCh", currentId) ? <div className="last-visit-container" id={parseInt(localStorage.getItem("currentIdCh", currentId))} onClick={iframeOpen}>Reprendre au chapitre <span className="lasts-chapters" id={parseInt(localStorage.getItem("currentIdCh", currentId))} onClick={iframeOpen}> {localStorage.getItem("currentIdCh", currentId)}</span></div> : ""

        }
        {filteredData && (
          <ul className="chapter-container">
            {filteredData.map((dat) => (
              <li onClick={iframeOpen} className="chapter-link">
                <img
                  className="backImage"
                  src = {isLowBattery?'https://ih0.redbubble.net/image.4686278250.7799/raf,360x360,075,t,fafafa:ca443f4786.jpg':imgTomes[dat.tome.id] ? imgTomes[dat.tome.id] : 'https://ih0.redbubble.net/image.4686278250.7799/raf,360x360,075,t,fafafa:ca443f4786.jpg'}
                  // src='https://ih0.redbubble.net/image.4686278250.7799/raf,360x360,075,t,fafafa:ca443f4786.jpg'
                  alt={"One Piece chapitre n°" + dat.id}
                  loading={isLowBattery? "eager":"lazy"}
                />
                <p className="chapter-number chapter-night">
                  {dat.id}
                </p>
                <p className="chapter-title chapter-night">{dat.chapter_title}</p>
                <p

                  id={dat.id}
                  className="chapter-description">

                  <div className="more-info-container micperso" id={dat.id}>
                    <div className="mitperso mitactive" id={dat.id} >
                      <ul className="listPerso" id={dat.id}>
                        {
                          Array.isArray(persoParC[dat.id])
                          ? persoParC[dat.id].sort().map((perso) => (<li id={dat.id}>{perso}</li>)) 
                          : persoParC[dat.id]
                        }
                      </ul>
                      <img className="mibperso" onClick={mita} id={dat.id} src={characterIcon} alt="Icone de personnage" />
                    </div>
                  </div>

                  <div className="more-info-container" id={dat.id}>
                    <p className="more-info-button" id={dat.id} onMouseOut={moreInfoTabDisappear} onMouseOver={moreInfoTabAppear}>i</p>
                    <div className="more-info-tab" id={dat.id} >
                      <p className="more-info-title">
                        "<i>{dat.chapter_title}</i>", Ch. n°{dat.id}
                      </p>

                      <p className="more-info-tome">
                        Tome n°{dat.tome.id}: "<i>{dat.tome.tome_title}</i>"
                      </p>
                      <p className="more-info-sortie">
                        <div>Sortie du Tome :</div>
                        <div>&nbsp;&nbsp;- Japon: {dat.tome.tome_japan_date_publish} (il y a {countAnnee(dat.tome.tome_japan_date_publish)} ans) </div>
                        <div>&nbsp;&nbsp;- France: {dat.tome.tome_french_date_publish} (il y a {countAnnee(dat.tome.tome_french_date_publish)} ans) </div>
                      </p>
                    </div>
                  </div>


                  <p 
                    className="ladescriptionduchapitrebordel"
                    id={dat.id}
                    title={descRapide[dat.id]
                        ? descRapide[dat.id]
                        : "Ce chapitre n'a pas de description."}>
                      {descRapide[dat.id] ? descRapide[dat.id].length <300? descRapide[dat.id] : descRapide[dat.id].slice(0, 300) + "..." : "Ce chapitre n'a pas de description."}
                  </p>
                  <span
                  id={dat.id}
                  className="aall-link">
                    <a
                      className="alink color-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        "https://littlexgarden.com/one-piece/" + dat.id + "/1"
                      }
                      id={dat.id}
                    >
                      Lire en couleur (VF).
                    </a>
                    <a
                      className="alink nb-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        "https://esj.tn/manga/one-piece-chapter-" + dat.id + "/"
                      }
                      id={dat.id}
                    >
                      Lire en noir et blanc (VA).
                    </a>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
        <div className="iframe-container">
          <picture onClick={closeIframe} className="close-iframe">
            <img src={croixSVG} className="close-iframe-img" alt="croix" />
          </picture>
          <iframe
            className="iframe-chap"
            src={currentId ? currentId<=parseInt(maxChapter) ? "https://littlexgarden.com/one-piece/" + currentId + "/1" : "https://mangamoins.shaeishu.co/?scan=OP" + currentId : ""}
            title="LittleXGarden.com"
          ></iframe>
          <div className="arrows-iframe">
            <img className="arrow-tri arrow-precedent" onClick={goChapSP} title={"Aller au chapitre " + (parseInt(currentId) - 1).toString()} src={arrowTriangle} alt="Flèche Chapitre précédent" />
            <img className="arrow-tri arrow-suivant" onClick={goChapSP} title={"Aller au chapitre " + (parseInt(currentId) + 1).toString()} src={arrowTriangle} alt="Flèche Chapitre suivant" />
          </div>
          <div className="full-screen-iframe">
            <img className="full-screen-icon" onClick={fullScreenScript} src={isFullScreen? fullScreenExitIcon : fullScreenIcon} alt="Passer en plein écran" title="Plein écran"  />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
