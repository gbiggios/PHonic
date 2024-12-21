import React, { useState, useEffect } from "react";
import api from "../utils/api";
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
<<<<<<< HEAD
        const response = await api.get("/api/discos/");
        setDiscos(response.data);
=======
        const { data } = await API.get("/discos/");
        setDiscos(data);
>>>>>>> 794ecce09dda4416e0b47f88aeaff13da250ff51
      } catch (error) {
        console.error("Error fetching discos:", error);
      }
    };

    fetchDiscos();
  }, []);

<<<<<<< HEAD
  const handleDurationChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Solo números
    if (value.length > 4) value = value.slice(0, 4); // Máximo de 4 dígitos

    // Formatear a MM:SS
    if (value.length > 2) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }

    setDuracion(value);
  };

  const formatDurationForBackend = (duration) => {
    const [minutes, seconds] = duration.split(":").map((part) => part.padStart(2, "0"));
    return `00:${minutes}:${seconds}`; // Asegúrate de que el formato sea HH:MM:SS
  };
  

=======
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

>>>>>>> 794ecce09dda4416e0b47f88aeaff13da250ff51
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formattedDuration = formatDurationForBackend(duracion);
  
    const songData = {
      titulo,
      duracion: formattedDuration,
      fecha_lanzamiento: fechaLanzamiento,
      disco,
    };
  
    console.log("Datos enviados al backend:", songData);
  
    try {
<<<<<<< HEAD
      const response = await api.post("/api/canciones/", songData);
      if (onSongAdded) {
        onSongAdded(response.data); // Notifica al componente padre que se ha agregado una nueva canción
      }
=======
      const { data } = await API.post("/canciones/", songData);
      onSongAdded(data); // Notifica al componente padre sobre la nueva canción
>>>>>>> 794ecce09dda4416e0b47f88aeaff13da250ff51
      resetForm();
    } catch (error) {
      console.error("Error adding song:", error.response?.data || error);
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
          placeholder="MM:SS"
          value={duracion}
          onChange={handleDurationChange}
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
