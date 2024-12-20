import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Artist_Information.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../utils/api";

const ArtistInformation = () => {
  const { id } = useParams(); // Obtener el ID del artista desde la URL
  const [artist, setArtist] = useState(null); // Inicializamos como null para manejar errores más fácilmente
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        // Obtener datos básicos del artista
        const { data: artistData } = await api.get(`/api/artistas/${id}/`);

        // Obtener discos relacionados con el artista
        const { data: discos } = await api.get(`/api/discos/`);
        const discosData = discos.filter((disco) =>
          disco.artistas.includes(parseInt(id))
        );

        // Agregar géneros y canciones para cada disco
        const updatedDiscos = await Promise.all(
          discosData.map(async (disco) => {
            const { data: generos } = await api.get(`/api/discos/${disco.id}/generos/`);
            const { data: canciones } = await api.get(`/api/canciones/`);
            return {
              ...disco,
              generos,
              canciones: canciones.filter((cancion) => cancion.disco === disco.id),
            };
          })
        );

        // Obtener redes sociales relacionadas con el artista
        const { data: redesSociales } = await api.get(`/api/redes_sociales/`);
        const redesData = redesSociales.filter(
          (red) => parseInt(red.artista) === parseInt(id)
        );

        // Actualizar estado con datos completos
        setArtist({
            ...artistData,
            discos: updatedDiscos || [],
            redesSociales: redesData || [],
        });
        
      } catch (error) {
        console.error("Error al cargar los datos del artista:", error);
        setArtist(null); // Manejo de errores
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [id]);

  if (loading) return <p>Cargando datos...</p>;
  if (!artist)
    return <p>Error: No se encontraron datos del artista o ocurrió un problema.</p>;

  return (
    <>
      <Header />
      <div className="artist-container">
        {/* Nombre y biografía */}
        <h1 className="artist-name">{artist.nombre_artistico}</h1>
        <h3 className="artist-real-name">Nombre Real: {artist.nombre}</h3>
        <p className="artist-birthdate">
          Fecha de Nacimiento: {artist.fecha_nacimiento}
        </p>

        {/* Biografía */}
        <section className="artist-section">
          <h2>Biografía</h2>
          <p className="artist-bio">{artist.biografia}</p>
        </section>

        {/* Discos y Canciones */}
        <section className="artist-section">
          <h2>Discos y Canciones</h2>
          <div className="album-container">
            {artist.discos.map((album, index) => (
              <div key={index} className="album-item">
                <h3>{album.titulo}</h3>
                <p>
                  <strong>Géneros:</strong>{" "}
                  {album.generos.map((genre) => genre.nombre).join(", ")}
                </p>
                <h4>Canciones:</h4>
                <ul className="song-list">
                  {album.canciones.map((song, i) => (
                    <li key={i} className="song-item">
                      <p><strong>Título:</strong> {song.titulo}</p>
                      <p><strong>Duración:</strong> {song.duracion}</p>
                      <p><strong>Fecha de Lanzamiento:</strong> {song.fecha_lanzamiento}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Redes Sociales */}
        <section className="artist-section">
          <h2>Redes Sociales</h2>
          <ul>
            {artist.redesSociales.map((red, index) => (
              <li key={index}>
                <strong>{red.nombre}:</strong>{" "}
                <a href={red.enlace} target="_blank" rel="noopener noreferrer">
                  {red.enlace}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ArtistInformation;