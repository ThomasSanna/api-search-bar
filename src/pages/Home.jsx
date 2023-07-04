import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import croixSVG from "../assets/images/croix.svg";
import reverseImage from "../assets/images/reverse.png";
import arrowDown from "../assets/images/down.png";
import resetImage from "../assets/images/reset.svg";
import arrowTriangle from "../assets/images/arrowTriangle.svg";
import fullScreenIcon from "../assets/images/fullscreen.svg";
import lowBatteryIcon from "../assets/images/lowbattery.svg";
import fullScreenExitIcon from "../assets/images/fullscreenexit.svg";
import { coverArray } from "../scripts/coverChap.jsx";
import Footer from "../components/Footer";
import Menu from "../components/Menu";


function Home() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLowBattery, setIsLowBattery] = useState(false);

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

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".searchbar");
    searchInput.focus();
  });
  

  const resetSearch = () => {
    document.querySelector(".searchbar").value = "";
    updateFilteredData(data);
  }

  const handleSearch = () => {
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

    if (!withnumber.checked && !withtitle.checked && !withdescription.checked) {
      withnumber.checked = true;
      withnumber.classList.add("filter-checked");
    }

    updateFilteredData(data);
  };

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
    const searchText = document.querySelector(".searchbar").value.toLowerCase().split(" ");
    const reversed = document.querySelector(".reverse-back").checked;

    const filtered = data.filter((dat) => {
      const titleKeywords = withtitle.checked && searchText.every(keyword => dat.chapter_title.toLowerCase().includes(keyword));
      const descriptionKeywords = dat.chapter_description && withdescription.checked && searchText.every(keyword => dat.chapter_description.toLowerCase().includes(keyword));
      const numberKeywords = withnumber.checked && searchText.every(keyword => dat.chapter_number.slice(3, dat.chapter_number.length).includes(keyword));

      return titleKeywords || descriptionKeywords || numberKeywords;
    });

    setFilteredData(reversed ? filtered.reverse() : filtered);
  };


  const iframeOpen = (e) => {
    setCurrentId(e.target.id.toString());
    document.querySelector(".iframe-container").style.display = "flex";
    const chapterContainer = document.querySelector(".chapter-container");
    window.innerWidth <= 1000? chapterContainer.style.width = '100vw' : chapterContainer.style.width = "calc(100% - 500px)";
    const currId = e.target.id.toString();
    verifArrowOnClick(currId);
  };

  const closeIframe = () => {
    document.querySelector(".iframe-container").style.display = "none";
    const chapterContainer = document.querySelector(".chapter-container");
    chapterContainer.style.width = "100%";
  };

  const arcFilter = (e) => {
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
      tomeContainer.style.height = "calc(100vh - 90px)";
    }
    else {
      headerTome.classList.remove("arc-checked");
      tomeContainer.style.height = "0";
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
    else if (e.target === arrowSuivant && currID === coverArray.length - 1) {
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
    else if (currID === (coverArray.length - 1)) {
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

  


  // ----°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-----------------------------------------------------------------
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,300&family=Rubik:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {/* polices : Noto Serif, Rubik */}
      <p className="backupannonce">Back-ups de  <a href="https://onepiecechapitres.fr" target="_blank" rel="noreferrer">onepiecechapitres.fr</a> : <a href="https://onepiecechapitres.github.io" target="_blank" rel="noreferrer">onepiecechapitres.github.io</a>, <a href="https://wadeekt.github.io" target="_blank" rel="noreferrer">wadeekt.github.io</a> et <a href="https://wadeect.github.io" target="_blank" rel="noreferrer">wadeect.github.io</a></p>
      <header className="header-container">
        <span onClick={lowBatteryFunc} className="header-battery">
          <img className="image-battery" src={lowBatteryIcon} alt="logo save battery" title="Consommez moins de données avec en activant cette option." />
        </span>
        <span className="header-search">
          <span className="cont-searchbar">
            <input
              type="text"
              className="searchbar"
              onChange={handleSearch}
              placeholder="Numéro, Titre ou Description du chapitre.."
            />
            <span className="buttons-search">
              <span onClick={reverseNum} className="reverse-back">
                <img
                  className="button-reverse"
                  src={reverseImage}
                  alt="bouton reverse"
                  title="Trier par ordre décroissant"
                />
              </span>
              <span onClick={resetSearch} className="reverse-back">
                <img
                  className="button-reverse"
                  src={resetImage}
                  alt="bouton reset"
                  title="Réinitialiser la recherche"
                />
              </span>
            </span>
          </span>
          <h5 className="nb-result">
            {filteredData
              ? filteredData.length === 1
                ? "1 résultat trouvé."
                : filteredData.length + " résultats trouvés."
              : null}
          </h5>
        </span>
        <span className="header-checkbox">
          <div className="sme tri-par">Trier par :</div>
          <div
            checked
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withnumber"
          >
            Numéros
          </div>
          <div
            checked
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withtitle"
          >
            Titres
          </div>
          <div
            checked
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withdescription"
          >
            Descritpions
          </div>
        </span>
        <span className="header-tome-tri-container">
          <span onClick={openArcTab} className="header-tome-tri">
            <span>
              Trier par Arc
            </span>
            <img className="arrow-down" src={arrowDown} alt="flèche vers le bas" />
          </span>
          <div className="tome-select-container">
            <ul className="liste-tome">
              <li onClick={arcFilter} id="[1]" title="Romance Dawn: Volume 1"><b>Romance Dawn</b>: Volume 1</li>
              <li onClick={arcFilter} id="[2,3]" title="Orange Town: Volume 2-3"><b>Orange Town</b>: Volume 2-3</li>
              <li onClick={arcFilter} id="[4,5]" title="Syrup Village: Volume 4-5"><b>Syrup Village</b>: Volume 4-5</li>
              <li onClick={arcFilter} id="[6,7,8]" title="Baratie: Volume 6-8"><b>Baratie</b>: Volume 6-8</li>
              <li onClick={arcFilter} id="[8,9,10,11]" title="Arlong Park: Volume 8-11"><b>Arlong Park</b>: Volume 8-11</li>
              <li onClick={arcFilter} id="[11,12]" title="Loguetown: Volume 11-12"><b>Loguetown</b>: Volume 11-12</li>
              <li onClick={arcFilter} id="[12]" title="Reverse Mountain: Volume 12"><b>Reverse Mountain</b>: Volume 12</li>
              <li onClick={arcFilter} id="[12,13]" title="Whiskey Peak: Volume 12-13"><b>Whiskey Peak</b>: Volume 12-13</li>
              <li onClick={arcFilter} id="[13,14,15]" title="Little Garden: Volume 13-15"><b>Little Garden</b>: Volume 13-15</li>
              <li onClick={arcFilter} id="[15,16,17]" title="Drum Island: Volume 15-17"><b>Drum Island</b>: Volume 15-17</li>
              <li onClick={arcFilter} id="[18,19,20,21,22,23,24]" title="Alabasta: Volume 18-24"><b>Alabasta</b>: Volume 18-24</li>
              <li onClick={arcFilter} id="[24,25]" title="Jaya: Volume 24-25"><b>Jaya</b>: Volume 24-25</li>
              <li onClick={arcFilter} id="[26,27,28,29,30,31,32]" title="Skypiea: Volume 26-32"><b>Skypiea</b>: Volume 26-32</li>
              <li onClick={arcFilter} id="[32,33,34]" title="Long Ring Long Land: Volume 32-34"><b>Long Ring Long Land</b>: Volume 32-34</li>
              <li onClick={arcFilter} id="[34,35,36,37,38,39]" title="Water Seven: Volume 34-39"><b>Water Seven</b>: Volume 34-39</li>
              <li onClick={arcFilter} id="[39,40,41,42,43,44]" title="Enies Lobby: Volume 39-44"><b>Enies Lobby</b>: Volume 39-44</li>
              <li onClick={arcFilter} id="[45,46]" title="Post-Enies Lobby: Volume 45-46"><b>Post-Enies Lobby</b>: Volume 45-46</li>
              <li onClick={arcFilter} id="[46,47,48,49,50]" title="Thriller Bark: Volume 46-50"><b>Thriller Bark</b>: Volume 46-50</li>
              <li onClick={arcFilter} id="[50,51,52,53]" title="Archipel des Sabaody: Volume 50-53"><b>Archipel des Sabaody</b>: Volume 50-53</li>
              <li onClick={arcFilter} id="[53,54]" title="Amazon Lily: Volume 53-54"><b>Amazon Lily</b>: Volume 53-54</li>
              <li onClick={arcFilter} id="[54,55,56]" title="Impel Down: Volume 54-56"><b>Impel Down</b>: Volume 54-56</li>
              <li onClick={arcFilter} id="[56,57,58,59,60,61]" title="Marineford: Volume 56-61"><b>Marineford</b>: Volume 56-61</li>
              <li onClick={arcFilter} id="[61]" title="Post-War: Volume 61"><b>Post-War</b>: Volume 61</li>
              <li onClick={arcFilter} id="[61]" title="Retour à Sabaody: Volume 61"><b>Retour à Sabaody</b>: Volume 61</li>
              <li onClick={arcFilter} id="[61,62,63,64,65,66]" title="Fishman Island: Volume 61-66"><b>Fishman Island</b>: Volume 61-66</li>
              <li onClick={arcFilter} id="[66,67,68,69,70]" title="Punk Hazard: Volume 66-70"><b>Punk Hazard</b>: Volume 66-70</li>
              <li onClick={arcFilter} id="[70,71,72,73,74,75,76,77,78,79,80]" title="Dressrosa: Volume 70-80"><b>Dressrosa</b>: Volume 70-80</li>
              <li onClick={arcFilter} id="[80,81,82]" title="Zou: Volume 80-82"><b>Zou</b>: Volume 80-82</li>
              <li onClick={arcFilter} id="[82,83,84,85,86,87,88,89,90]" title="Whole Cake Island: Volume 82-90"><b>Whole Cake Island</b>: Volume 82-90</li>
              <li onClick={arcFilter} id="[90]" title="Reverie: Volume 90"><b>Reverie</b>: Volume 90</li>
              <li onClick={arcFilter} id="[90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106]" title="Wano Country: Volume 90-107"><b>Wano Country</b>: Volume 90-107</li>
              <li onClick={arcFilter} id="[106,107]" title="Egg Head: Volume 106-107"><b>Egg Head</b>: Volume 106-107</li>
            </ul>
          </div>
        </span>
        <Menu />
      </header>

      {/* CHAPTER VISUAL ---------------------------------------------------- */}

      <main className="main-container">
        {filteredData && (
          <ul className="chapter-container">
            {filteredData.map((dat) => (
              <li onClick={iframeOpen} className="chapter-link">
                <img
                  className="backImage"
                  src={isLowBattery? 'https://wallpaperaccess.in/public/uploads/preview/monkey-d-luffy-wano-wallpaper-one-piece-wano-arc-aesthetic-0.jpg' : coverArray[parseInt(dat.chapter_number.slice(3, dat.chapter_number.length))] ? coverArray[parseInt(dat.chapter_number.slice(3, dat.chapter_number.length))] : "https://miro.medium.com/v2/resize:fit:1200/1*bHiUeH6By-mQ0w8VE87yAA.png"}
                  alt={"One Piece chapitre n°" + dat.id.toString()}
                  loading={isLowBattery? "eager":"lazy"}
                />
                <p className="chapter-number chapter-night">
                  {dat.chapter_number.slice(3, dat.chapter_number.length)}
                </p>
                <p className="chapter-title chapter-night">{dat.chapter_title}</p>
                <p

                  id={dat.chapter_number.slice(3, dat.chapter_number.length)}
                  className="chapter-description">

                  <div className="more-info-container">
                    <p className="more-info-button" id={dat.chapter_number.slice(3, dat.chapter_number.length)} onMouseOut={moreInfoTabDisappear} onMouseOver={moreInfoTabAppear}>i</p>
                    <div className="more-info-tab" id={dat.chapter_number.slice(3, dat.chapter_number.length)} >
                      <p className="more-info-title">
                        "<i>{dat.chapter_title}</i>", Ch. n°{dat.chapter_number.slice(3, dat.chapter_number.length)}
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
                    id={dat.chapter_number.slice(3, dat.chapter_number.length)}
                    title={dat.chapter_description
                        ? dat.chapter_description
                        : "Ce chapitre n'a pas de description."}>
                      {dat.chapter_description ? dat.chapter_description.length <300? dat.chapter_description : dat.chapter_description.slice(0, 300) + "..." : "Ce chapitre n'a pas de description."}
                  </p>
                  <span
                  id={dat.chapter_number.slice(3, dat.chapter_number.length)}
                  className="aall-link">
                    <a
                      className="alink color-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        "https://littlexgarden.com/one-piece/" + dat.id + "/1"
                      }
                      id={dat.chapter_number.slice(3, dat.chapter_number.length)}
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
                      id={dat.chapter_number.slice(3, dat.chapter_number.length)}
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
            src={currentId ? "https://littlexgarden.com/one-piece/" + currentId + "/1" : ""}
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
