
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

const RoadToPiece = () => {
    let images = [];
    const context = require.context('../assets/RoadToPiece', true);
    images = context.keys().map((image) => image.replace('./', ''));
    console.log(images);

    return (
        <div className="road-to-piece">
            <Menu />
            <h1>Road to piece</h1>
            <div className="road-to-piece-cont">
                {images.map((image, index) => {
                    return (
                        <div key={index} className="road-to-piece-img-cont">
                            <img
                                className="road-to-piece-img"
                                src={require(`../assets/RoadToPiece/${image}`).default}
                                alt={image}
                            />
                        </div>
                    );
                })}
                <img src="17.png" alt="" />
            </div>
            <Footer />
        </div>
    );
};


export default RoadToPiece;