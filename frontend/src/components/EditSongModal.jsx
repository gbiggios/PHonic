import React, { useState, useEffect } from "react";
import API from "../utils/api"; // Importamos la configuración centralizada de Axios
import "../styles/EditSongModal.css"; // Asegúrate de que el estilo del modal esté correcto

const EditSongModal = ({ song, onClose, onSongUpdated }) => {
  const [formData, setFormData] = useState({
    titulo: song.titulo,
    duracion: song.duracion,
    fecha_lanzamiento: song.fecha_lanzamiento,
    disco: song.disco, // Usar el ID del disco
  });
  const [discos, setDiscos] = useState([]);
  const [errorDetails, setErrorDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch discos para el dropdown
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setErrorDetails(null);
    try {
      const { data } = await API.put(`/canciones/${song.id}/`, formData);
      onSongUpdated(data); // Actualiza la canción en el estado del padre
      onClose(); // Cierra el modal
    } catch (error) {
      if (error.response) {
        setErrorDetails(error.response.data); // Muestra errores del servidor
      }
      console.error("Error updating song:", error);
    } finally {
      setLoading(false);
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
            required
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
            required
          />
        </label>
        <label>
          Fecha de Lanzamiento:
          <input
            type="date"
            name="fecha_lanzamiento"
            value={formData.fecha_lanzamiento}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Disco:
          <select
            name="disco"
            value={formData.disco}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Seleccione un disco
            </option>
            {discos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.titulo}
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
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditSongModal;
