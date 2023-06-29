import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import croixSVG from "../assets/images/croix.svg";
import reverseImage from "../assets/images/reverse.png";
import arrowDown from "../assets/images/down.png";

function Home() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    fetch("https://api.api-onepiece.com/chapters")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  const handleSearch = (e) => {
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
    const searchText = document.querySelector(".searchbar").value.toLowerCase();
    const reversed = document.querySelector(".reverse-back").checked;

    const filtered = data.filter(
      (dat) =>
        (withtitle.checked &&
          dat.chapter_title.toLowerCase().includes(searchText)) ||
        (dat.chapter_description &&
          withdescription.checked &&
          dat.chapter_description.toLowerCase().includes(searchText)) ||
        (withnumber.checked &&
          dat.chapter_number
            .slice(3, dat.chapter_number.length)
            .includes(searchText))
    );
    setFilteredData(reversed ? filtered.reverse() : filtered);
  };

  const iframeOpen = (e) => {
    document.querySelector(".iframe-chap").src =
      "https://littlexgarden.com/one-piece/" + e.target.id + "/1";
    document.querySelector(".iframe-container").style.display = "flex";
    const chapterContainer = document.querySelector(".chapter-container");
    chapterContainer.style.width = "calc(100% - 500px)";
  };

  const closeIframe = () => {
    document.querySelector(".iframe-container").style.display = "none";
    const chapterContainer = document.querySelector(".chapter-container");
    chapterContainer.style.width = "100%";
  };

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,300&family=Rubik:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <div className="header-container">
        <span className="header-search">
          <span className="cont-searchbar">
            <input
              type="text"
              className="searchbar"
              onChange={handleSearch}
              placeholder="Numéro, Titre ou Description du chapitre.."
            />
            <span onClick={reverseNum} className="reverse-back">
              <img
                className="button-reverse"
                src={reverseImage}
                alt="bouton reverse"
                title="Trier par ordre décroissant"
              />
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
          <div className="sme">Trier par :</div>
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
          <span className="header-tome-tri">
            <span>
              Trier par Tome
            </span> 
              <img className="arrow-down" src={arrowDown} alt="flèche vers le bas" /> 
          </span>
          <div className="tome-select-container">
              
          </div>
        </span>
      </div>

      <div className="main-container">
        {filteredData && (
          <div className="chapter-container">
            {filteredData.map((dat) => (
              <div onClick={iframeOpen} className="chapter-link">
                <img
                  className="backImage"
                  src="https://www.glenat.com/sites/default/files/images/livres/couv/9782723488525-T.jpg"
                  alt="background"
                />
                <p className="chapter-number">
                  {dat.chapter_number.slice(3, dat.chapter_number.length)}
                </p>
                <p className="chapter-title">{dat.chapter_title}</p>
                <p
                  id={dat.chapter_number.slice(3, dat.chapter_number.length)}
                  className="chapter-description"
                >
                  {dat.chapter_description
                    ? dat.chapter_description
                    : "Ce chapitre n'a pas de description."}
                  <span className="aall-link">
                    <a
                      className="alink color-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        "https://littlexgarden.com/one-piece/" + dat.id + "/1"
                      }
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
                    >
                      Lire en noir et blanc (VA).
                    </a>
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="iframe-container">
          <picture onClick={closeIframe} className="close-iframe">
            <img src={croixSVG} className="close-iframe-img" alt="croix" />
          </picture>
          <iframe
            className="iframe-chap"
            src=""
            title="LittleXGarden.com"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Home;
