import React from "react";
import "../styles/Header.css";
import logo from "../assets/logo.png"; 

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="PHonic Logo" />
      </div>
      <nav>
        <ul>
          <li>Inicio</li>
          <li>Artistas</li>
          <li>Álbumes</li>
          <li>Contacto</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
