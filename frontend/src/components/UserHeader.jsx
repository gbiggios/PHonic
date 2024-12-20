import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Header.css";
import logo from "../assets/logo.png";

const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // Redirige a la página principal
  };

  const handleLogoutClick = () => {
    // Eliminar información de sesión
    sessionStorage.removeItem("authToken"); // Si guardas un token
    sessionStorage.removeItem("user"); // Si guardas datos del usuario

    // Opcional: Limpia todo el sessionStorage
    sessionStorage.clear();

    // Redirigir al usuario a la página de login
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/user-home"); // Ruta para el perfil del usuario
  };

  return (
    <header>
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="User Logo" />
      </div>
      <nav>
        <ul>
          <li onClick={handleProfileClick}>Mi Perfil</li>
          <li>Artistas</li>
          <li>Álbumes</li>
          <li>Contacto</li>
          <li onClick={handleLogoutClick}>Cerrar Sesión</li>
        </ul>
      </nav>
    </header>
  );
};

export default UserHeader;
