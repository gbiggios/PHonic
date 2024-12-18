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

  return (
    <header>
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="PHonic Logo" />
      </div>
      <nav>
        <ul>
          <li onClick={handleInicioClick}>Inicio</li>
          <li>Artistas</li>
          <li>Álbumes</li>
          <li>Contacto</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
