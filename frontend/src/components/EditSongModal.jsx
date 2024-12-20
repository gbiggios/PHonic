import React, { useState } from "react";

const EditSongModal = ({ song, onClose, onSongUpdated }) => {
  const [formData, setFormData] = useState({
    titulo: song.titulo,
    duracion: song.duracion,
    fecha_lanzamiento: song.fecha_lanzamiento,
    disco: song.disco, // Usar el ID del disco
  });

  const [errorDetails, setErrorDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/canciones/${song.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorDetails(errorData); // Muestra detalles del error si ocurre
        throw new Error("Error updating song");
      }

      const updatedSong = await response.json();
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
            {/* Este dropdown debe ser rellenado dinámicamente */}
            <option value="" disabled>
              Seleccione un disco
            </option>
            {/* Opciones dinámicas de discos */}
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
