import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/SongsPage.css";
import AddSongForm from "../components/AddSongForm";
import EditSongModal from "../components/EditSongModal";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const SongsPage = () => {
  const [allSongs, setAllSongs] = useState([]); // Todas las canciones desde el backend
  const [songs, setSongs] = useState([]); // Canciones filtradas
  const [filters, setFilters] = useState({ artista: "", disco: "" });
  const [order, setOrder] = useState("asc");
  const [options, setOptions] = useState({ artistas: [], discos: [] });
  const [editingSong, setEditingSong] = useState(null);

  // Carga inicial de artistas, discos y canciones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistasResponse, discosResponse, cancionesResponse] = await Promise.all([
          api.get("/api/artistas/"),
          api.get("/api/discos/"),
          api.get("/api/canciones/"),
        ]);
        setOptions({
          artistas: artistasResponse.data,
          discos: discosResponse.data,
        });
        setAllSongs(cancionesResponse.data); // Guardar todas las canciones
        setSongs(cancionesResponse.data); // Inicialmente, todas las canciones están sin filtrar
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filtrar canciones dinámicamente en el frontend
  useEffect(() => {
    let filteredSongs = [...allSongs];
  
    if (filters.artista) {
      filteredSongs = filteredSongs.filter((song) =>
        song.disco_detalle?.artistas.some((artista) => artista.id.toString() === filters.artista)
      );
    }
  
    if (filters.disco) {
      filteredSongs = filteredSongs.filter((song) => song.disco_detalle?.id.toString() === filters.disco);
    }
  
    filteredSongs = filteredSongs.sort((a, b) => {
      const durationA = a.duracion.split(":").reduce((acc, time) => 60 * acc + parseInt(time, 10), 0);
      const durationB = b.duracion.split(":").reduce((acc, time) => 60 * acc + parseInt(time, 10), 0);
      return order === "asc" ? durationA - durationB : durationB - durationA;
    });
  
    console.log("Filtros aplicados:", filters);
    console.log("Canciones filtradas:", filteredSongs);
  
    setSongs(filteredSongs);
  }, [filters, order, allSongs]);
  

  // Manejo de cambio de filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Manejo de cambio de orden
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <>
      <Slider />
      <div className="songs-page">
        <h1 className="page-title">Gestión de Canciones</h1>
        <AddSongForm
          onSongAdded={(newSong) => {
            setAllSongs((prevSongs) => [...prevSongs, newSong]); // Agregar la nueva canción a la lista de todas las canciones
          }}
        />

        <div className="filters">
          <label>
            Artista:
            <select name="artista" value={filters.artista} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {options.artistas.map((artista) => (
                <option key={artista.id} value={artista.id}>
                  {artista.nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            Disco:
            <select name="disco" value={filters.disco} onChange={handleFilterChange}>
              <option value="">Todos</option>
              {options.discos.map((disco) => (
                <option key={disco.id} value={disco.id}>
                  {disco.titulo}
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
                  <button  className="edit-btn-renamed"  onClick={() => setEditingSong(song)}>Editar</button>
                  <button
                   className="delete-btn-renamed" 
                    onClick={() =>
                      setSongs((prevSongs) =>
                        prevSongs.filter((s) => s.id !== song.id)
                      )
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingSong && (
          <EditSongModal
            song={editingSong}
            onClose={() => setEditingSong(null)}
            onSongUpdated={(updatedSong) => {
              setAllSongs((prevSongs) =>
                prevSongs.map((song) =>
                  song.id === updatedSong.id ? updatedSong : song
                )
              );
              setEditingSong(null); // Cierra el modal
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default SongsPage;
