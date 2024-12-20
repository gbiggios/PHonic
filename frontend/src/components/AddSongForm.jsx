import React, { useState, useEffect } from "react";
import "../styles/AddSongForm.css";
import API from "../utils/api"; // Importamos la configuración centralizada de Axios

const AddSongForm = ({ onSongAdded }) => {
  const [titulo, setTitulo] = useState("");
  const [duracion, setDuracion] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [disco, setDisco] = useState("");
  const [discos, setDiscos] = useState([]);
  const [artistas, setArtistas] = useState([]); // Almacena los artistas del disco seleccionado
  const [loading, setLoading] = useState(false);

  // Fetch discos desde el backend
  useEffect(() => {
    const fetchDiscos = async () => {
      try {
        const { data } = await API.get("/discos/");
        setDiscos(data);
      } catch (error) {
        console.error("Error fetching discos:", error);
      }
    };

    fetchDiscos();
  }, []);

  // Maneja la selección del disco y busca los artistas
  const handleDiscoChange = (e) => {
    const selectedDiscoId = e.target.value;
    setDisco(selectedDiscoId);

    // Busca detalles del disco seleccionado para obtener los artistas
    const selectedDisco = discos.find((d) => d.id === parseInt(selectedDiscoId, 10));
    if (selectedDisco) {
      setArtistas(selectedDisco.artistas || []);
    } else {
      setArtistas([]); // Limpia los artistas si no hay disco seleccionado
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const songData = {
      titulo,
      duracion,
      fecha_lanzamiento: fechaLanzamiento,
      disco,
    };

    try {
      const { data } = await API.post("/canciones/", songData);
      onSongAdded(data); // Notifica al componente padre sobre la nueva canción
      resetForm();
    } catch (error) {
      console.error("Error adding song:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitulo("");
    setDuracion("");
    setFechaLanzamiento("");
    setDisco("");
    setArtistas([]);
  };

  return (
    <form className="add-song-form" onSubmit={handleSubmit}>
      <h2>Agregar Nueva Canción</h2>
      <label>
        Título:
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </label>
      <label>
        Duración:
        <input
          type="text"
          placeholder="hh:mm:ss"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />
      </label>
      <label>
        Fecha de Lanzamiento:
        <input
          type="date"
          value={fechaLanzamiento}
          onChange={(e) => setFechaLanzamiento(e.target.value)}
          required
        />
      </label>
      <label>
        Disco:
        <select value={disco} onChange={handleDiscoChange} required>
          <option value="">Selecciona un disco</option>
          {discos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.titulo}
            </option>
          ))}
        </select>
      </label>
      {artistas.length > 0 && (
        <div className="artistas">
          <h4>Artistas del Disco:</h4>
          <ul>
            {artistas.map((artista) => (
              <li key={artista.id}>
                {artista.nombre} ({artista.nombre_artistico})
              </li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Agregar Canción"}
      </button>
    </form>
  );
};

export default AddSongForm;
