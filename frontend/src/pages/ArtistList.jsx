import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import "../styles/Artist_List.css";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("/api/artistas/");
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <>
      <Slider />
      <div className="artist-list-container">
        <h1 className="artist-list-title">Listado de Artistas</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="artist-list">
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div
                  key={artist.id}
                  className="artist-card"
                  onClick={() => {
                    console.log(`Navigating to /artist_information/${artist.id}`);
                    navigate(`/artist_information/${artist.id}`);
                  }}
                >
                  <h2 className="artist-name">{artist.nombre_artistico}</h2>
                  <p className="artist-real-name">
                    <strong>Nombre Real:</strong> {artist.nombre_real}
                  </p>
                  <p className="artist-bio">{artist.biografia}</p>
                </div>
              ))
            ) : (
              <p>No hay artistas disponibles.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ArtistList;
