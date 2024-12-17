import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Sony_Music_Logo.png"
          alt="Sony Music Logo"
        />
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
