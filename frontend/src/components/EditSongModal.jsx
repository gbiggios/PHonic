import React, { useState, useEffect } from "react";
import api from "../utils/api"; 

const EditSongModal = ({ song, onClose, onSongUpdated }) => {
  const [formData, setFormData] = useState({
    titulo: song.titulo,
    duracion: song.duracion,
    fecha_lanzamiento: song.fecha_lanzamiento,
    disco: song.disco, // Usar el ID del disco
  });
  const [discos, setDiscos] = useState([]); // Estado para almacenar los discos
  const [errorDetails, setErrorDetails] = useState(null);

  // Fetch discos al cargar el modal
  useEffect(() => {
    const fetchDiscos = async () => {
      try {
        const response = await api.get("/api/discos/");
        setDiscos(response.data); // Asigna los discos obtenidos de la API
      } catch (error) {
        console.error("Error fetching discos:", error);
      }
    };

    fetchDiscos();
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/api/canciones/${song.id}/`, formData);

      if (response.status !== 200) {
        const errorData = await response.json();
        setErrorDetails(errorData); // Muestra detalles del error si ocurre
        throw new Error("Error updating song");
      }

      const updatedSong = response.data;
      onSongUpdated(updatedSong);
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Canción</h2>
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Duración:
          <input
            type="text"
            name="duracion"
            value={formData.duracion}
            onChange={handleInputChange}
            placeholder="HH:MM:SS"
          />
        </label>
        <label>
          Fecha de Lanzamiento:
          <input
            type="date"
            name="fecha_lanzamiento"
            value={formData.fecha_lanzamiento}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Disco:
          <select
            name="disco"
            value={formData.disco}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Seleccione un disco
            </option>
            {discos.map((disco) => (
              <option key={disco.id} value={disco.id}>
                {disco.titulo}
              </option>
            ))}
          </select>
        </label>
        {errorDetails && (
          <div className="error-message">
            <p>Error al guardar:</p>
            <pre>{JSON.stringify(errorDetails, null, 2)}</pre>
          </div>
        )}
        <div className="modal-actions">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditSongModal;
