import React, { useState, useEffect } from "react";
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
        const response = await fetch("http://127.0.0.1:8000/api/discos/");
        const data = await response.json();
        setDiscos(data);
      } catch (error) {
        console.error("Error fetching discos:", error);
      }
    };

    fetchDiscos();
  }, []);

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
      const response = await fetch("http://127.0.0.1:8000/api/canciones/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      });

      if (response.ok) {
        const newSong = await response.json();
        onSongAdded(newSong); // Notify parent component about the new song
        resetForm();
      } else {
        console.error("Error adding song");
      }
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
