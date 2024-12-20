import React, { useEffect, useState } from "react";
import "../styles/SongsPage.css";
import AddSongForm from "../components/AddSongForm";
import EditSongModal from "../components/EditSongModal";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [latestSongs, setLatestSongs] = useState([]);
  const [filters, setFilters] = useState({ disquera: "", artista: "", disco: "" });
  const [order, setOrder] = useState("asc");
  const [options, setOptions] = useState({ disqueras: [], artistas: [], discos: [] });
  const [editingSong, setEditingSong] = useState(null);

  useEffect(() => {
    fetchLatestSongs();
    fetchFilteredSongs();
    fetchFilterOptions();
  }, [filters, order]);

  const fetchLatestSongs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/canciones/latest");
      if (!response.ok) throw new Error("Failed to fetch latest songs");
      const data = await response.json();
      setLatestSongs(data);
    } catch (error) {
      console.error("Error fetching latest songs:", error);
    }
  };

  const fetchFilteredSongs = async () => {
    try {
      const queryParams = new URLSearchParams({ ...filters, order });
      const response = await fetch(`http://127.0.0.1:8000/api/canciones/?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch filtered songs");
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/canciones/options");
      if (!response.ok) throw new Error("Failed to fetch filter options");
      const data = await response.json();
      setOptions({
        disqueras: data.disqueras || [],
        artistas: data.artistas || [],
        discos: data.discos || [],
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleSongAdded = (newSong) => {
    setSongs((prevSongs) => [newSong, ...prevSongs]);
    fetchLatestSongs();
  };

  const handleDeleteSong = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/canciones/${id}/`, {
        method: "DELETE",
      });
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
      fetchLatestSongs();
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleEditSong = (song) => {
    setEditingSong(song);
  };

  const handleSongUpdated = (updatedSong) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) => (song.id === updatedSong.id ? updatedSong : song))
    );
    setEditingSong(null);
    fetchLatestSongs();
  };

  return (
    <>
      <Slider />
    <div className="songs-page">
      <h1 className="page-title">Gestión de Canciones</h1>
      <AddSongForm onSongAdded={handleSongAdded} />

      <div className="filters">
        <label>
          Disquera:
          <select name="disquera" value={filters.disquera} onChange={handleFilterChange}>
            <option value="">Todas</option>
            {options.disqueras.map((disquera) => (
              <option key={disquera} value={disquera}>
                {disquera}
              </option>
            ))}
          </select>
        </label>
        <label>
          Artista:
          <select name="artista" value={filters.artista} onChange={handleFilterChange}>
            <option value="">Todos</option>
            {options.artistas.map((artista) => (
              <option key={artista} value={artista}>
                {artista}
              </option>
            ))}
          </select>
        </label>
        <label>
          Disco:
          <select name="disco" value={filters.disco} onChange={handleFilterChange}>
            <option value="">Todos</option>
            {options.discos.map((disco) => (
              <option key={disco} value={disco}>
                {disco}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ordenar por Duración:
          <select value={order} onChange={handleOrderChange}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </label>
      </div>

      <h2 className="section-title">Canciones Filtradas</h2>
      <table className="songs-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Artista</th>
            <th>Disco</th>
            <th>Duración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.titulo}</td>
              <td>
                {song.disco_detalle?.artistas
                  ? song.disco_detalle.artistas.map((artista) => artista.nombre).join(", ")
                  : "Sin artistas"}
              </td>
              <td>{song.disco_detalle?.titulo || "Sin disco"}</td>
              <td>{song.duracion}</td>
              <td>
                <button onClick={() => handleEditSong(song)}>Editar</button>
                <button onClick={() => handleDeleteSong(song.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSong && (
        <EditSongModal
          song={editingSong}
          onClose={() => setEditingSong(null)}
          onSongUpdated={handleSongUpdated}
        />
      )}
    </div>
    <Footer />
    </>
  );
};

export default SongsPage;
