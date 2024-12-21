import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import api from "../utils/api"; 
=======
import API from "../utils/api"; // Importamos la configuración centralizada de Axios
import "../styles/EditSongModal.css"; // Asegúrate de que el estilo del modal esté correcto
>>>>>>> 794ecce09dda4416e0b47f88aeaff13da250ff51

const EditSongModal = ({ song, onClose, onSongUpdated }) => {
  const [formData, setFormData] = useState({
    titulo: song.titulo,
    duracion: song.duracion,
    fecha_lanzamiento: song.fecha_lanzamiento,
    disco: song.disco, // Usar el ID del disco
  });
<<<<<<< HEAD
  const [discos, setDiscos] = useState([]); // Estado para almacenar los discos
=======
  const [discos, setDiscos] = useState([]);
>>>>>>> 794ecce09dda4416e0b47f88aeaff13da250ff51
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
    setLoading(true);
    setErrorDetails(null);
    try {
<<<<<<< HEAD
      const response = await api.put(`/api/canciones/${song.id}/`, formData);

      if (response.status !== 200) {
        const errorData = await response.json();
        setErrorDetails(errorData); // Muestra detalles del error si ocurre
        throw new Error("Error updating song");
      }

      const updatedSong = response.data;
      onSongUpdated(updatedSong);
=======
      const { data } = await API.put(`/canciones/${song.id}/`, formData);
      onSongUpdated(data); // Actualiza la canción en el estado del padre
      onClose(); // Cierra el modal
>>>>>>> 794ecce09dda4416e0b47f88aeaff13da250ff51
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
<<<<<<< HEAD
            {discos.map((disco) => (
              <option key={disco.id} value={disco.id}>
                {disco.titulo}
=======
            {discos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.titulo}
>>>>>>> 794ecce09dda4416e0b47f88aeaff13da250ff51
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
