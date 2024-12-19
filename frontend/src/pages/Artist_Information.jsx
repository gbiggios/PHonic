import React from "react";
import "../styles/Artist_Information.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Datos temporales de ejemplo
const artistData = {
  realName: "Enrique Martín Morales", // Nombre real
  stageName: "Ricky Martin", // Nombre artístico
  birthDate: "24 de diciembre de 1971",
  bio: "Ricky Martin es un cantante, actor y autor puertorriqueño. Es considerado uno de los artistas latinos más influyentes en la historia de la música, conocido por éxitos como 'Livin' la Vida Loca' y 'Vuelve'. Ha ganado múltiples premios Grammy y ha vendido millones de discos en todo el mundo.",
  genres: ["Pop", "Latino", "Baladas"],
  albums: ["Vuelve", "Almas del Silencio", "A Medio Vivir"],
  songs: ["Livin' la Vida Loca", "Vuelve", "La Mordidita"],
  socialMedia: {
    facebook: "https://facebook.com/rickymartin",
    instagram: "https://instagram.com/rickymartin",
    website: "https://rickymartinmusic.com",
  },
};

const InformacionArtista = () => {
  return (
    <>
      <Header />
      <div className="artist-container">
        {/* Nombres */}
        <h1 className="artist-name">{artistData.stageName}</h1>
        <h3 className="artist-real-name">Nombre Real: {artistData.realName}</h3>

        {/* Biografía */}
        <section className="artist-section">
          <h2>Biografía</h2>
          <p className="artist-bio">{artistData.bio}</p>
          <p className="artist-birthdate">
            Fecha de Nacimiento: <span>{artistData.birthDate}</span>
          </p>
        </section>

        {/* Géneros */}
        <section className="artist-section">
          <h2>Géneros</h2>
          <ul className="artist-genres">
            {artistData.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </section>

        {/* Discos */}
        <section className="artist-section">
          <h2>Discos</h2>
          <ul className="artist-albums">
            {artistData.albums.map((album, index) => (
              <li key={index}>{album}</li>
            ))}
          </ul>
        </section>

        {/* Canciones */}
        <section className="artist-section">
          <h2>Canciones</h2>
          <ul className="artist-songs">
            {artistData.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </section>

        {/* Redes Sociales */}
        <section className="artist-section">
          <h2>Redes Sociales</h2>
          <div className="artist-socials">
            <a href={artistData.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href={artistData.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href={artistData.socialMedia.website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i> Sitio Web
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default InformacionArtista;
