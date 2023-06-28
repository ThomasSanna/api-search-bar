import React, { useEffect } from "react";

function Home() {
    const [data, setData] = React.useState(null);
    useEffect(() => {
        fetch("https://api.api-onepiece.com/chapters")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    useEffect(() => {
        const Titres = data? data.map((sousdata) => {return sousdata.chapter_title}) : "no data"

    })

  return (
    <div>
        <h1>Home</h1>
        <p>One Piece</p>
    </div>
    );
}

export default Home;