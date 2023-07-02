import React, { useEffect, useState } from 'react'
import '../styles/Episode.css'
import '../styles/Menu.css'
import croixSVG from "../assets/images/croix.svg";
import reverseImage from "../assets/images/reverse.png";
import arrowDown from "../assets/images/down.png";
import resetImage from "../assets/images/reset.svg";
import arrowTriangle from "../assets/images/arrowTriangle.svg";
import fullScreenIcon from "../assets/images/fullscreen.svg";
import fullScreenExitIcon from "../assets/images/fullscreenexit.svg";
import Footer from '../components/Footer'
import Menu from '../components/Menu'

function Episode() {

  useEffect(() => {
    document.title = 'One Piece - Episodes'
    const metaDescription = document.querySelector('meta[name="description"]')
    metaDescription.content = 'Retrouvez vos épisodes préférés de One Piece en streaming VOSTFR!'
  }, [])

  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    fetch("https://api.api-onepiece.com/episodes")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
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
      const titleKeywords = withtitle.checked && searchText.every(keyword => dat.title.toLowerCase().includes(keyword));
      const descriptionKeywords = dat.description && withdescription.checked && searchText.every(keyword => dat.description.toLowerCase().includes(keyword));
      const numberKeywords = withnumber.checked && searchText.every(keyword => dat.number.slice(2, dat.number.length).includes(keyword));

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
    else if (e.target === arrowSuivant && currID === data.length - 1) {
      arrowSuivant.style.opacity = "0";
      arrowSuivant.style.pointerEvents = "none";
    }
    else {
      arrowPrecedent.style.opacity = "100%";
      arrowSuivant.style.opacity = "100%";
      arrowPrecedent.style.pointerEvents = "auto";
      arrowSuivant.style.pointerEvents = "auto";
    }
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
    else if (currID === (data.length - 1)) {
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
  }

  const fullScreenScript = () => {
    setIsFullScreen(!isFullScreen);
    const iframeContainer = document.querySelector(".iframe-container");
    if (!isFullScreen){
      iframeContainer.classList.add("iframe-fullscreen");
    } else {
      iframeContainer.classList.remove("iframe-fullscreen");
    }
  };

  



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

      <header className="header-container">
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
              <li onClick={arcFilter} id="1" title="Romance Dawn: Volume 1"><b>Romance Dawn</b></li>
              <li onClick={arcFilter} id="2" title="Orange Town: Volume 2-3"><b>Orange Town</b></li>
              <li onClick={arcFilter} id="3" title="Syrup Village: Volume 4-5"><b>Syrup Village</b></li>
              <li onClick={arcFilter} id="4" title="Baratie: Volume 6-8"><b>Baratie</b></li>
              <li onClick={arcFilter} id="5" title="Arlong Park: Volume 8-11"><b>Arlong Park</b></li>
              <li onClick={arcFilter} id="6" title="Loguetown: Volume 11-12"><b>Loguetown</b></li>
              <li onClick={arcFilter} id="7" title="Reverse Mountain: Volume 12"><b>Reverse Mountain</b></li>
              <li onClick={arcFilter} id="8" title="Whiskey Peak: Volume 12-13"><b>Whiskey Peak</b></li>
              <li onClick={arcFilter} id="9" title="Little Garden: Volume 13-15"><b>Little Garden</b></li>
              <li onClick={arcFilter} id="10" title="Drum Island: Volume 15-17"><b>Drum Island</b></li>
              <li onClick={arcFilter} id="11" title="Alabasta: Volume 18-24"><b>Alabasta</b></li>
              <li onClick={arcFilter} id="12" title="Jaya: Volume 24-25"><b>Jaya</b></li>
              <li onClick={arcFilter} id="13" title="Skypiea: Volume 26-32"><b>Skypiea</b></li>
              <li onClick={arcFilter} id="14" title="Long Ring Long Land: Volume 32-34"><b>Long Ring Long Land</b></li>
              <li onClick={arcFilter} id="15" title="Water Seven: Volume 34-39"><b>Water Seven</b></li>
              <li onClick={arcFilter} id="16" title="Enies Lobby: Volume 39-44"><b>Enies Lobby</b></li>
              <li onClick={arcFilter} id="17" title="Post-Enies Lobby: Volume 45-46"><b>Post-Enies Lobby</b></li>
              <li onClick={arcFilter} id="18" title="Thriller Bark: Volume 46-50"><b>Thriller Bark</b></li>
              <li onClick={arcFilter} id="19" title="Archipel des Sabaody: Volume 50-53"><b>Archipel des Sabaody</b></li>
              <li onClick={arcFilter} id="20" title="Amazon Lily: Volume 53-54"><b>Amazon Lily</b></li>
              <li onClick={arcFilter} id="21" title="Impel Down: Volume 54-56"><b>Impel Down</b></li>
              <li onClick={arcFilter} id="22" title="Marineford: Volume 56-61"><b>Marineford</b></li>
              <li onClick={arcFilter} id="23" title="Post-War: Volume 61"><b>Post-War</b></li>
              <li onClick={arcFilter} id="24" title="Retour à Sabaody: Volume 61"><b>Retour à Sabaody</b></li>
              <li onClick={arcFilter} id="25" title="Fishman Island: Volume 61-66"><b>Fishman Island</b></li>
              <li onClick={arcFilter} id="26" title="Punk Hazard: Volume 66-70"><b>Punk Hazard</b></li>
              <li onClick={arcFilter} id="27" title="Dressrosa: Volume 70-80"><b>Dressrosa</b></li>
              <li onClick={arcFilter} id="28" title="Zou: Volume 80-82"><b>Zou</b></li>
              <li onClick={arcFilter} id="29" title="Whole Cake Island: Volume 82-90"><b>Whole Cake Island</b></li>
              <li onClick={arcFilter} id="30" title="Reverie: Volume 90"><b>Reverie</b></li>
              <li onClick={arcFilter} id="31" title="Wano Country: Volume 90-107"><b>Wano Country</b></li>
              <li onClick={arcFilter} id="32" title="Egg Head: Volume 106-107"><b>Egg Head</b></li>
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
                  src="https://miro.medium.com/v2/resize:fit:1200/1*bHiUeH6By-mQ0w8VE87yAA.png"
                  alt={"One Piece épisode n°" + dat.id.toString()}
                  loading="lazy"
                />
                <p className="chapter-number chapter-night">
                  {dat.number.slice(2, dat.number.length)}
                </p>
                <p className="chapter-title chapter-night">{dat.title}</p>
                <p
                  id={dat.number.slice(2, dat.number.length)}
                  className="chapter-description">

                  <div className="more-info-container">
                    <p className="more-info-button" id={dat.number.slice(2, dat.number.length)} onMouseOut={moreInfoTabDisappear} onMouseOver={moreInfoTabAppear}>i</p>
                    <div className="more-info-tab" id={dat.number.slice(2, dat.number.length)} >
                      <p className="more-info-title">
                        "<i>{dat.title}</i>", Ep. n°{dat.number.slice(2, dat.number.length)}
                      </p>
                    </div>
                  </div>
                  <p title={dat.description
                      ? dat.description
                      : "Ce chapitre n'a pas de description."}>
                    {dat.description
                      ? dat.description.slice(0, 300) + "..."
                      : "Ce chapitre n'a pas de description."}
                  </p>
                  <span className="aall-link">
                    <a
                      className="alink color-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        "https://www.onepiecestreaming.tv/one-piece-episode-" + dat.id + "-streaming-vostfr"
                      }
                      id={dat.number.slice(2, dat.number.length)}
                    >
                      Voir l'épisode en VostFR.
                    </a>
                    <a
                      className="alink nb-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        "https://www.streamenvf.com/anime/one-piece-vf/episode-" + dat.id
                      }
                      id={dat.number.slice(2, dat.number.length)}
                    >
                      Voir l'épisode en VF.
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
            src={currentId ? "https://www.onepiecestreaming.tv/one-piece-episode-" + currentId + "-streaming-vostfr" : ""}
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

export default Episode
