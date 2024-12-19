import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import api from "../utils/api";
import "../styles/AdminArtist.css";

const AdminArtist = () => {
  const [artist, setArtist] = useState({
    nombreArtistico: "",
    nombreReal: "",
    fechaNacimiento: "",
    biografia: "",
    generos: [],
    discos: [{ titulo: "", fechaLanzamiento: "", canciones: [{ titulo: "", duracion: "", fechaLanzamiento: "" }] }],
    redesSociales: [{ plataforma: "", url: "" }],
  });

  const [availableGenres, setAvailableGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Cargar géneros musicales
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get("/api/generos/");
        setAvailableGenres(response.data);
      } catch (err) {
        console.error("Error al cargar géneros:", err);
      }
    };

    fetchGenres();
  }, []);

  const handleChange = (e, index, field, section, parentIndex = null) => {
    const { value } = e.target;

    if (parentIndex !== null) {
      // Si estamos manejando canciones dentro de discos
      const updatedDiscos = [...artist.discos];
      updatedDiscos[parentIndex][section][index][field] = value;
      setArtist({ ...artist, discos: updatedDiscos });
    } else if (section) {
      // Si estamos manejando discos, redes sociales, o géneros
      const updatedSection = [...artist[section]];
      updatedSection[index][field] = value;
      setArtist({ ...artist, [section]: updatedSection });
    } else {
      // Si estamos manejando campos generales del artista
      setArtist({ ...artist, [field]: value });
    }
  };

  const addField = (section, newField, parentIndex = null) => {
    if (parentIndex !== null) {
      // Agregar canción a un disco específico
      const updatedDiscos = [...artist.discos];
      updatedDiscos[parentIndex][section].push(newField);
      setArtist({ ...artist, discos: updatedDiscos });
    } else {
      // Agregar género, disco o red social
      setArtist({
        ...artist,
        [section]: [...artist[section], newField],
      });
    }
  };

  // Verificar si el Nombre Artístico ya existe en la base de datos
  const checkDuplicateArtist = async (nombreArtistico) => {
    try {
      const response = await api.get(`/api/artistas/?search=${encodeURIComponent(nombreArtistico)}`);
      const artistas = response.data;

      // Validar si hay un artista con nombre exacto
      return artistas.some((artista) => artista.nombre_artistico.toLowerCase() === nombreArtistico.toLowerCase());
    } catch (err) {
      console.error("Error al verificar duplicados:", err);
      return false; // Asumimos que no hay duplicados si ocurre un error
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Validar datos requeridos antes de enviar
    if (!artist.nombreArtistico || !artist.nombreReal || !artist.biografia || !artist.fechaNacimiento) {
      setError("Por favor, completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    // Verificar si el nombre artístico ya existe
    const isDuplicate = await checkDuplicateArtist(artist.nombreArtistico);
    if (isDuplicate) {
      setError("El Nombre Artístico ya existe. Por favor, elige otro.");
      setLoading(false);
      return;
    }

    if (artist.generos.length === 0) {
      setError("Debes seleccionar al menos un género musical.");
      setLoading(false);
      return;
    }

    try {
      console.log("Datos enviados al servidor:", {
        nombre_artistico: artist.nombreArtistico,
        nombre: artist.nombreReal,
        biografia: artist.biografia,
        fecha_nacimiento: artist.fechaNacimiento,
        generos: artist.generos.map((g) => g.id),
      });

      // Crear artista
      const artistResponse = await api.post("/api/artistas/", {
        nombre_artistico: artist.nombreArtistico,
        nombre: artist.nombreReal,
        biografia: artist.biografia,
        fecha_nacimiento: artist.fechaNacimiento,
        generos: artist.generos.map((g) => g.id),
      });

      const artistId = artistResponse.data.id;

      // Crear discos y canciones asociadas
      for (const disco of artist.discos) {
        console.log("Enviando datos del disco:", {
          titulo: disco.titulo,
          fecha_lanzamiento: disco.fechaLanzamiento,
          artistas: [artistId],
          generos: artist.generos.map((g) => g.id),
        });

        const discoResponse = await api.post("/api/discos/", {
          titulo: disco.titulo,
          fecha_lanzamiento: disco.fechaLanzamiento,
          artistas: [artistId],
          generos: artist.generos.map((g) => g.id),
        });

        const discoId = discoResponse.data.id;

        for (const cancion of disco.canciones) {
          // Convertir duración de MM:SS a HH:MM:SS
          const duracion = cancion.duracion.includes(":")
            ? `00:${cancion.duracion}` // Agrega "00:" si no tiene horas
            : `00:00:${cancion.duracion}`; // Si faltan minutos y segundos
          
          console.log("Enviando datos de la canción:", {
            titulo: cancion.titulo,
            duracion: duracion,
            fecha_lanzamiento: cancion.fechaLanzamiento,
            disco: discoId
          });
        
          await api.post("/api/canciones/", {
            titulo: cancion.titulo,
            duracion: duracion, // Asegurarse de que el formato sea HH:MM:SS
            fecha_lanzamiento: cancion.fechaLanzamiento,
            disco: discoId
          });
        }     
      }

      // Crear redes sociales asociadas
      for (const red of artist.redesSociales) {
        await api.post("/api/redes_sociales/", {
          nombre: red.plataforma, 
          enlace: red.url,        
          artista: artistId,      
        });
      }
      

      setSuccess("¡Artista creado con éxito!");
      setArtist({
        nombreArtistico: "",
        nombreReal: "",
        biografia: "",
        fechaNacimiento: "",
        generos: [],
        discos: [{ titulo: "", fechaLanzamiento: "", canciones: [{ titulo: "", duracion: "", fechaLanzamiento: "" }] }],
        redesSociales: [{ plataforma: "", url: "" }],
      });
    } catch (err) {
      setLoading(false);
      if (err.response) {
        console.error("Error en la respuesta del servidor:", err.response.data);
        setError(`Error del servidor: ${err.response.data}`);
      } else if (err.request) {
        console.error("Error en la solicitud:", err.request);
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        console.error("Error desconocido:", err.message);
        setError(`Error desconocido: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };



  const removeField = (section, index, parentIndex = null) => {
    if (parentIndex !== null) {
      // Eliminar canción de un disco específico
      const updatedDiscos = [...artist.discos];
      updatedDiscos[parentIndex][section].splice(index, 1);
      setArtist({ ...artist, discos: updatedDiscos });
    } else {
      // Eliminar género, disco o red social
      const updatedSection = [...artist[section]];
      updatedSection.splice(index, 1);
      setArtist({ ...artist, [section]: updatedSection });
    }
  };


  return (
    <>
      <Slider />

      <div className="admin-artist-container">
        <h1 className="admin-artist-title">Registrar Artista</h1>

        <form onSubmit={handleSubmit} className="admin-artist-form">
          {/* Información General */}
          <label className="admin-artist-label">Nombre Artístico:</label>
          <input
            type="text"
            name="nombreArtistico"
            value={artist.nombreArtistico}
            onChange={(e) => handleChange(e, null, "nombreArtistico")}
            required
            className="admin-artist-input"
          />

          <label className="admin-artist-label">Nombre Real:</label>
          <input
            type="text"
            name="nombreReal"
            value={artist.nombreReal}
            onChange={(e) => handleChange(e, null, "nombreReal")}
            required
            className="admin-artist-input"
          />

          <label className="admin-artist-label">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={artist.fechaNacimiento || ""}
            onChange={(e) => handleChange(e, null, "fechaNacimiento")}
            required
            className="admin-artist-input"
          />


          <label className="admin-artist-label">Biografía:</label>
          <textarea
            name="biografia"
            value={artist.biografia}
            onChange={(e) => handleChange(e, null, "biografia")}
            required
            className="admin-artist-textarea"
          ></textarea>

          {/* Redes Sociales */}
          <h2 className="admin-artist-genres-title">Redes Sociales</h2>
          {artist.redesSociales.map((red, index) => (
            <div key={index} className="admin-artist-social-section">
              <label className="admin-artist-label">Plataforma:</label>
              <input
                type="text"
                value={red.plataforma}
                onChange={(e) => handleChange(e, index, "plataforma", "redesSociales")}
                required
                className="admin-artist-input"
              />
              <label className="admin-artist-label">URL:</label>
              <input
                type="url"
                value={red.url}
                onChange={(e) => handleChange(e, index, "url", "redesSociales")}
                required
                className="admin-artist-input"
              />
              <button
                type="button"
                onClick={() => removeField("redesSociales", index)}
                className="admin-artist-button remove-social-button"
              >
                Quitar Red Social
              </button>
            </div>
          ))}

          {/* Botón para agregar una nueva red social */}
          <button
            type="button"
            onClick={() => addField("redesSociales", { plataforma: "", url: "" })}
            className="admin-artist-button add-social-button"
          >
            Agregar Red Social
          </button>


          {/* Géneros Musicales */}
          <h2 className="admin-artist-genres-title">Géneros Musicales</h2>
          {artist.generos.map((genero, index) => (
            <div key={index} className="admin-artist-genre-section">
              <label className="admin-artist-label">Seleccionar Género:</label>
              <select
                value={genero.id}
                onChange={(e) => handleChange(e, index, "id", "generos")}
                required
                className="admin-artist-input"
              >
                <option value="">Selecciona un género</option>
                {availableGenres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.nombre}
                  </option>
                ))}
              </select>
              {/* Botón Quitar Género */}
              <button
                type="button"
                onClick={() => removeField("generos", index)}
                className="admin-artist-button remove-genre-button"
              >
                Quitar Género
              </button>
            </div>
          ))}

          {/* Botón Agregar Género Musical */}
          <button
            type="button"
            onClick={() => addField("generos", { id: "" })}
            className="admin-artist-button add-genre-button"
          >
            Agregar Género Musical
          </button>


          {/* Discos y Canciones */}
          <h2 className="admin-artist-genres-title">Discos y Canciones</h2>
          {artist.discos.map((disco, discoIndex) => (
            <div key={discoIndex} className="admin-artist-disco-section">
              {/* Información del Disco */}
              <label className="admin-artist-label">Título del Disco:</label>
              <input
                type="text"
                value={disco.titulo}
                onChange={(e) => handleChange(e, discoIndex, "titulo", "discos")}
                required
                className="admin-artist-input"
              />
              <label className="admin-artist-label">Fecha de Lanzamiento:</label>
              <input
                type="date"
                value={disco.fechaLanzamiento}
                onChange={(e) => handleChange(e, discoIndex, "fechaLanzamiento", "discos")}
                required
                className="admin-artist-input"
              />

              {/* Canciones del Disco */}
              <h3 className="admin-artist-canciones-title">Canciones del Disco</h3>
              <div className="admin-artist-canciones-container">
                {disco.canciones.map((cancion, cancionIndex) => (
                  <div key={cancionIndex} className="admin-artist-song-section">
                    <label className="admin-artist-label">Título de la Canción:</label>
                    <input
                      type="text"
                      value={cancion.titulo}
                      onChange={(e) =>
                        handleChange(e, cancionIndex, "titulo", "canciones", discoIndex)
                      }
                      required
                      className="admin-artist-input"
                    />
                    <label className="admin-artist-label">Duración (MM:SS):</label>
                    <input
                      type="text"
                      placeholder="MM:SS"
                      value={cancion.duracion}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, ""); 
                        if (value.length > 4) {
                          value = value.slice(0, 4); 
                        }

                        // Agrega automáticamente el ":" después de los primeros dos dígitos
                        if (value.length > 2) {
                          value = `${value.slice(0, 2)}:${value.slice(2)}`;
                        }

                        handleChange({ target: { value } }, cancionIndex, "duracion", "canciones", discoIndex);
                      }}
                      required
                      className="admin-artist-input"
                    />


                    <label className="admin-artist-label">Fecha de Lanzamiento:</label>
                    <input
                      type="date"
                      value={cancion.fechaLanzamiento}
                      onChange={(e) =>
                        handleChange(e, cancionIndex, "fechaLanzamiento", "canciones", discoIndex)
                      }
                      required
                      className="admin-artist-input"
                    />
                    {/* Botón Quitar Canción */}
                    <button
                      type="button"
                      onClick={() => removeField("canciones", cancionIndex, discoIndex)}
                      className="admin-artist-button remove-cancion-button"
                    >
                      Quitar Canción
                    </button>
                  </div>
                ))}
                {/* Botón Agregar Canción */}
                <button
                  type="button"
                  onClick={() =>
                    addField(
                      "canciones",
                      { titulo: "", duracion: "", fechaLanzamiento: "" },
                      discoIndex
                    )
                  }
                  className="admin-artist-button add-cancion-button"
                >
                  Agregar Canción
                </button>
              </div>

              {/* Botón Quitar Disco */}
              <div className="admin-artist-disco-buttons">
                <button
                  type="button"
                  onClick={() => removeField("discos", discoIndex)}
                  className="admin-artist-button remove-disco-button"
                >
                  Quitar Disco
                </button>
              </div>
            </div>
          ))}

          {/* Botón Agregar Disco */}
          <div className="admin-artist-add-disco">
            <button
              type="button"
              onClick={() =>
                addField("discos", { titulo: "", fechaLanzamiento: "", canciones: [] })
              }
              className="admin-artist-button add-disco-button"
            >
              Agregar Disco
            </button>
          </div>



          {/* Guardar Artista */}
          <button type="submit" className="admin-artist-button submit-button">
            Guardar Artista
          </button>
        </form>

        {loading && <Spinner />}
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      <Footer />
    </>
  );
};

export default AdminArtist;
