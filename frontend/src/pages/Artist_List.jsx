import React from "react";
import "../styles/Artist_List.css";

const ArtistList = () => {
  // Datos estáticos de ejemplo
  const artists = [
    {
      id: 1,
      nombre_artistico: "Ricky Martin",
      nombre_real: "Enrique Martín Morales",
      biografia: "Cantante y actor puertorriqueño reconocido a nivel mundial.",
    },
    {
      id: 2,
      nombre_artistico: "Shakira",
      nombre_real: "Shakira Isabel Mebarak Ripoll",
      biografia: "Cantante colombiana conocida por éxitos como 'Hips Don't Lie'.",
    },
    {
      id: 3,
      nombre_artistico: "Luis Miguel",
      nombre_real: "Luis Miguel Gallego Basteri",
      biografia: "Uno de los mayores exponentes de la música latina.",
    },
  ];

  return (
    <div className="artist-list-container">
      <h1 className="artist-list-title">Listado de Artistas</h1>
      <div className="artist-list">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <h2 className="artist-name">{artist.nombre_artistico}</h2>
            <p className="artist-real-name">
              <strong>Nombre Real:</strong> {artist.nombre_real}
            </p>
            <p className="artist-bio">{artist.biografia}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
