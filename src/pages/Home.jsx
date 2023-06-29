import React, { useEffect, useState } from "react";
import "../styles/Home.css";

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
    const searchText = e.target.value.toLowerCase();
    const filtered = data.filter(
      (dat) =>
        dat.chapter_title.toLowerCase().includes(searchText) ||
        (dat.chapter_description &&
          dat.chapter_description.toLowerCase().includes(searchText)) ||
        dat.chapter_number
          .slice(4, dat.chapter_number.length)
          .includes(searchText)
    );
    setFilteredData(filtered);
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
        <div className="header-search">
          <input type="text" className="searchbar" onChange={handleSearch} placeholder="Numéro, Titre ou Description du chapitre.." />
          <h5>Il y a {filteredData && filteredData.length} résultats</h5>
        </div>
      </div>
      {filteredData && (
        <div className="chapter-container">
          {filteredData.map((dat) => (
            <a
              href={"https://littlexgarden.com/one-piece/" + dat.id + "/1"}
              rel="noreferrer"
              target="_blank"
              className="chapter-link"
              key={dat.id}
            >
              <p className="chapter-number">
                {dat.chapter_number.slice(3, dat.chapter_number.length)}
              </p>
              <p className="chapter-title">{dat.chapter_title}</p>
              <p className="chapter-description">
                {dat.chapter_description
                  ? dat.chapter_description
                  : "Ce chapitre n'a pas de description."}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
