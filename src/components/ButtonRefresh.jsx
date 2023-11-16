import React from "react";
import "../styles/ButtonRefresh.css";

const ButtonRefresh = () => {
    const pageReset = () => {
        window.location.reload();
    }
    return (
        <img onClick={pageReset} title="Réinitialiser la partie actuelle" src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Refresh_font_awesome.svg" alt="Bouton de réinitialisation." className="btn-refresh" />
    );
}

export default ButtonRefresh;