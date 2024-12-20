import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Header.css";
import logo from "../assets/logo.png";

const AdminHeader = () => {
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

  const handleCreateArtistClick = () => {
    navigate("/admin-artist"); // Ruta para crear artista
  };

  const handleCreateGenreClick = () => {
    navigate("/admin-create-genre"); // Ruta para crear género musical
  };

  const handleViewArtistsClick = () => {
    navigate("/admin-artist-list"); // Ruta para ver artistas
  };

  const handleManageSongsClick = () => {
    navigate("/admin-songs"); // Ruta para gestionar canciones
  };

  return (
    <header>
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Admin Logo" />
      </div>
      <nav>
        <ul>
          <li onClick={handleCreateArtistClick}>Crear Artista</li>
          <li onClick={handleViewArtistsClick}>Ver Artistas</li>
          <li onClick={handleCreateGenreClick}>Crear Género</li>
          <li onClick={handleManageSongsClick}>Gestionar Canciones</li>
          <li onClick={handleLogoutClick}>Cerrar Sesión</li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
