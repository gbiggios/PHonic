import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "../styles/AddSongForm.css";

const AddSongForm = ({ onSongAdded }) => {
  const [titulo, setTitulo] = useState("");
  const [duracion, setDuracion] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [disco, setDisco] = useState("");
  const [discos, setDiscos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch discos from the backend
  useEffect(() => {
    const fetchDiscos = async () => {
      try {
        const response = await api.get("/api/discos/");
        setDiscos(response.data);
      } catch (error) {
        console.error("Error fetching discos:", error);
      }
    };

    fetchDiscos();
  }, []);

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
      const response = await api.post("/api/canciones/", songData);
      if (onSongAdded) {
        onSongAdded(response.data); // Notifica al componente padre que se ha agregado una nueva canción
      }
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
        <select
          value={disco}
          onChange={(e) => setDisco(e.target.value)}
          required
        >
          <option value="">Selecciona un disco</option>
          {discos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.titulo}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Agregar Canción"}
      </button>
    </form>
  );
};

export default AddSongForm;
