import React, { useEffect, useState } from "react";

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
        dat.chapter_title.toLowerCase().includes(searchText)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <input type="text" className="searchbar" onChange={handleSearch} />
      {filteredData && (
        <div>
          {filteredData.map((dat) => (
            <div className="chapter" key={dat.id}>
              <p className="number">{dat.chapter_number.slice(3, dat.chapter_number.length)}</p>
              <p className="titre">{dat.chapter_title}</p>
              <p className="description">{dat.chapter_description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
