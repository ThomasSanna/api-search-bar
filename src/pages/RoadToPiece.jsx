
import React, { useEffect } from "react";
import Footer from "../components/Footer";

const RoadToPiece = () => {
    let images = [];
    const context = require.context('../assets/images', true);
    images = context.keys().map((image) => image.replace('./', ''));
    // console.log(images);

    return (
        <div className="road-to-piece">
            <h1>Road to piece</h1>
            <p>
                {/* {
                    // Utilise maintenant la variable images déclarée à l'extérieur de useEffect
                    images.map((image) => (
                        <p>{image}</p>
                    ))
                } */}
                Bientot...
            </p>
            <Footer />
        </div>
    );
};


export default RoadToPiece;