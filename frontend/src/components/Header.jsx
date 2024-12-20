import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); 
  };

  const handleInicioClick = () => {
    navigate("/login"); 
  };

  const handleArtistasClick = () => {
    navigate("/artist-list"); 
  };

  const handleContactoClick = () => {
    navigate("/contacto"); 
  };

  const handleÁlbumesClick = () => {
    navigate("/albums"); 
  };

  return (
    <header>
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="PHonic Logo" />
      </div>
      <nav>
        <ul>
          <li onClick={handleInicioClick}>Login</li>
          <li onClick={handleArtistasClick}>Artistas</li>
          <li onClick={handleÁlbumesClick}>Albums</li>
          <li onClick={handleContactoClick}>Contacto</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
