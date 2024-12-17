import React, { useEffect, useState } from "react";
import { getArtistas } from "../services/artistasService";
import "../styles/Highlights.css";

const Highlights = () => {
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getArtistas();
      setArtistas(data);
    }
    fetchData();
  }, []);

  return (
    <section className="section">
      <h2>Artistas Destacados</h2>
      <div className="container">
        {artistas.map((artista) => (
          <div key={artista.id} className="card">
            <h3>{artista.nombre_artistico}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
