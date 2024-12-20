import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Modal from '../components/Modal';
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import '../styles/AdminArtistDetail.css';

const AdminArtistDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [availableGenres, setAvailableGenres] = useState([]);
    const [, setSuccess] = useState("");
    const [, setError] = useState("");
    const [originalArtist, setOriginalArtist] = useState(null);
    const [artist, setArtist] = useState({
        nombre_artistico: '',
        nombre: '',
        biografia: '',
        fecha_nacimiento: '',
        redesSociales: [],
        discos: [
            {
                titulo: '',
                fecha_lanzamiento: '',
                generos: [],
                canciones: [], // Las canciones deben ser un array
            },
        ],
        generos: [],
    });


    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                // Fetch datos básicos del artista
                const artistResponse = await api.get(`/api/artistas/${id}/`);
                const artistData = artistResponse.data;

                // Fetch discos relacionados con el artista
                const discosResponse = await api.get(`/api/discos/`);
                const discosData = discosResponse.data.filter((disco) =>
                    disco.artistas.includes(parseInt(id))
                );

                // Fetch géneros asociados a los discos
                let generosAsociados = [];
                for (const disco of discosData) {
                    const generosResponse = await api.get(`/api/discos/${disco.id}/generos/`);
                    generosAsociados.push(...generosResponse.data);
                }

                // Eliminar duplicados de géneros
                const generosUnicos = Array.from(
                    new Set(generosAsociados.map((genero) => genero.id))
                ).map((id) => generosAsociados.find((genero) => genero.id === id));

                // Agregar canciones a los discos
                for (const disco of discosData) {
                    const cancionesResponse = await api.get(`/api/canciones/`);
                    disco.canciones = cancionesResponse.data.filter((cancion) => cancion.disco === disco.id) || [];
                }

                // Fetch redes sociales relacionadas con el artista
                const redesResponse = await api.get(`/api/redes_sociales/`);
                const redesData = redesResponse.data.filter((red) => `${red.artista}` === `${id}`);

                // Setear todos los datos en el estado
                setArtist({
                    nombre_artistico: artistData.nombre_artistico || '',
                    nombre: artistData.nombre || '',
                    biografia: artistData.biografia || '',
                    fecha_nacimiento: artistData.fecha_nacimiento || '',
                    discos: discosData,
                    redesSociales: redesData,
                    generos: generosUnicos || [], // Géneros únicos relacionados
                });

                setOriginalArtist({
                    nombre_artistico: artistData.nombre_artistico || '',
                    nombre: artistData.nombre || '',
                    biografia: artistData.biografia || '',
                    fecha_nacimiento: artistData.fecha_nacimiento || '',
                    discos: discosData,
                    redesSociales: redesData,
                    generos: generosUnicos || [],
                });
            } catch (error) {
                console.error("Error fetching artist details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllGenres = async () => {
            try {
                const response = await api.get("/api/generos/");
                setAvailableGenres(response.data);
            } catch (err) {
                console.error("Error al cargar géneros:", err);
            }
        };

        fetchArtistData();
        fetchAllGenres();
    }, [id]);





    // manejar correctamente las actualizaciones de campos anidados
    const handleChange = (e, index, field, section = null, parentIndex = null) => {
        const value = e.target.value;

        if (section && parentIndex !== null) {
            // Estamos modificando una canción dentro de un disco
            const updatedDiscos = [...artist.discos]; // Copiamos los discos
            const updatedDisco = { ...updatedDiscos[parentIndex] }; // Copiamos el disco actual

            // Aseguramos que `canciones` es un array válido
            if (!Array.isArray(updatedDisco.canciones)) {
                updatedDisco.canciones = [];
            }

            const updatedCanciones = [...updatedDisco.canciones]; // Copiamos las canciones del disco actual
            const updatedCancion = { ...updatedCanciones[index] }; // Copiamos la canción específica

            updatedCancion[field] = value; // Actualizamos el campo de la canción
            updatedCanciones[index] = updatedCancion; // Reemplazamos la canción actualizada en el array de canciones
            updatedDisco.canciones = updatedCanciones; // Reemplazamos las canciones actualizadas en el disco
            updatedDiscos[parentIndex] = updatedDisco; // Reemplazamos el disco actualizado en los discos

            // Actualizamos el estado del artista
            setArtist({ ...artist, discos: updatedDiscos });
        } else if (section) {
            // Modificando elementos de secciones de nivel superior (e.g., redes sociales)
            const updatedSection = [...artist[section]];
            const updatedItem = { ...updatedSection[index] };
            updatedItem[field] = value;
            updatedSection[index] = updatedItem;
            setArtist({ ...artist, [section]: updatedSection });
        } else {
            // Modificando un campo de nivel superior
            setArtist({ ...artist, [field]: value });
        }
    };




    const handleAddField = (section, newField, parentIndex = null) => {
        if (parentIndex !== null) {
            // Estamos agregando un elemento anidado (e.g., una canción dentro de un disco)
            const updatedSection = [...artist.discos];
            const updatedItem = { ...updatedSection[parentIndex] };
            const updatedNestedSection = [...updatedItem[section], newField];
            updatedItem[section] = updatedNestedSection;
            updatedSection[parentIndex] = updatedItem;
            setArtist({ ...artist, discos: updatedSection });
        } else {
            // Agregando a una sección de nivel superior
            setArtist({
                ...artist,
                [section]: [...artist[section], newField],
            });
        }
    };


    const handleRemoveField = (section, index, parentIndex = null) => {
        if (parentIndex !== null) {
            // Estamos eliminando un elemento anidado
            const updatedSection = [...artist.discos];
            const updatedItem = { ...updatedSection[parentIndex] };
            const updatedNestedSection = [...updatedItem[section]];
            updatedNestedSection.splice(index, 1);
            updatedItem[section] = updatedNestedSection;
            updatedSection[parentIndex] = updatedItem;
            setArtist({ ...artist, discos: updatedSection });
        } else {
            // Eliminando de una sección de nivel superior
            const updatedSection = [...artist[section]];
            updatedSection.splice(index, 1);
            setArtist({ ...artist, [section]: updatedSection });
        }
    };


    const handleToggleEdit = () => {
        if (isEditing) {
            setArtist(originalArtist); // Revertir cambios
        }
        setIsEditing(!isEditing);
    };


    const handleEdit = async () => {
        setLoading(true);
        setSuccess("");
        setError("");

        // Validar datos requeridos
        if (!artist.nombre_artistico || !artist.nombre || !artist.biografia || !artist.fecha_nacimiento) {
            setError("Por favor, completa todos los campos obligatorios.");
            setLoading(false);
            return;
        }

        try {
            // Actualizar datos básicos del artista
            console.log("Enviando datos del artista:", artist);
            await api.put(`/api/artistas/${id}/`, {
                nombre_artistico: artist.nombre_artistico,
                nombre: artist.nombre,
                biografia: artist.biografia,
                fecha_nacimiento: artist.fecha_nacimiento,
            });

            // Actualizar o crear discos y canciones asociadas
            for (const disco of artist.discos) {
                try {
                    let discoId;
                    const discoPayload = {
                        titulo: disco.titulo,
                        fecha_lanzamiento: disco.fecha_lanzamiento,
                        generos: disco.generos.map((g) => (typeof g === "object" ? g.id : g)), // Garantizar IDs
                        artistas: [id], // Vincula el disco al artista actual
                    };

                    console.log("Payload del disco:", JSON.stringify(discoPayload, null, 2));

                    if (disco.id) {
                        // Actualizar disco existente
                        const response = await api.put(`/api/discos/${disco.id}/`, discoPayload);
                        discoId = response.data.id;
                    } else {
                        // Crear nuevo disco
                        const response = await api.post(`/api/discos/`, discoPayload);
                        discoId = response.data.id;
                    }

                    // Actualizar o crear canciones del disco
                    for (const cancion of disco.canciones) {
                        try {
                            const cancionPayload = {
                                titulo: cancion.titulo,
                                duracion: cancion.duracion,
                                fecha_lanzamiento: cancion.fecha_lanzamiento,
                                disco: discoId,
                            };

                            console.log("Payload de la canción:", JSON.stringify(cancionPayload, null, 2));

                            if (cancion.id) {
                                await api.put(`/api/canciones/${cancion.id}/`, cancionPayload);
                            } else {
                                await api.post(`/api/canciones/`, cancionPayload);
                            }
                        } catch (error) {
                            console.error(`Error actualizando/creando canción: ${cancion.titulo}`, error.response?.data);
                        }
                    }
                } catch (error) {
                    console.error(`Error actualizando/creando disco: ${disco.titulo}`, error.response?.data);
                }
            }

            // Actualizar o crear redes sociales
            for (const red of artist.redesSociales) {
                try {
                    const redPayload = {
                        nombre: red.nombre,
                        enlace: red.enlace,
                        artista: id,
                    };

                    console.log("Payload de la red social:", JSON.stringify(redPayload, null, 2));

                    if (red.id) {
                        await api.put(`/api/redes_sociales/${red.id}/`, redPayload);
                    } else {
                        await api.post(`/api/redes_sociales/`, redPayload);
                    }
                } catch (error) {
                    console.error(`Error actualizando/creando red social: ${red.nombre}`, error.response?.data);
                }
            }

            setSuccess("¡Datos actualizados correctamente!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error general al actualizar:", error.response?.data || error.message);
            setError("Ocurrió un error al actualizar los datos. Por favor, inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async () => {
        console.log("Intentando eliminar artista...");
        setLoading(true);

        try {
            // Eliminar al artista directamente
            console.log(`Eliminando artista con ID: ${id}`);
            await api.delete(`/api/artistas/${id}/`, {
                params: {
                    'Content-Type': 'application/json', // Incluye el parámetro en la URL
                },
                headers: {
                    'Content-Type': 'application/json', // Asegura que el encabezado también esté presente
                },
            });

            alert("El artista fue eliminado correctamente.");
            navigate('/admin-artist-list'); // Redirige después de eliminar
        } catch (error) {
            console.error("Error eliminando el artista:", error.response?.data || error);
            alert("Ocurrió un error al intentar eliminar el artista. Por favor, intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };







    return (
        <>
            <Slider />
            {loading && (
                <div className="spinner-overlay">
                    <Spinner />
                </div>
            )}
            <div className="admin-artist-container">
                <h1 className="artist-detail-title">
                    {artist.nombre_artistico || 'Información no disponible'}
                </h1>

                <form className="admin-artist-form">
                    <label>Nombre Artístico:</label>
                    <input
                        type="text"
                        value={artist.nombre_artistico}
                        onChange={(e) => handleChange(e, null, "nombre_artistico")}
                        required
                        disabled={!isEditing}
                    />

                    <label>Nombre Real:</label>
                    <input
                        type="text"
                        value={artist.nombre}
                        onChange={(e) => handleChange(e, null, "nombre")}
                        required
                        disabled={!isEditing}
                    />

                    <label>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        value={artist.fecha_nacimiento || ""}
                        onChange={(e) => handleChange(e, null, "fecha_nacimiento")}
                        required
                        disabled={!isEditing}
                    />

                    <label>Biografía:</label>
                    <textarea
                        value={artist.biografia}
                        onChange={(e) => handleChange(e, null, "biografia")}
                        required
                        disabled={!isEditing}
                    ></textarea>

                    <h2>Redes Sociales</h2>
                    {artist.redesSociales.length > 0 ? (
                        artist.redesSociales.map((red, index) => (
                            <div key={index}>
                                <label>Plataforma:</label>
                                <input
                                    type="text"
                                    value={red.nombre || ""}
                                    onChange={(e) => handleChange(e, index, "nombre", "redesSociales")}
                                    required
                                    disabled={!isEditing}
                                />
                                <label>URL:</label>
                                <input
                                    type="url"
                                    value={red.enlace || ""}
                                    onChange={(e) => handleChange(e, index, "enlace", "redesSociales")}
                                    required
                                    disabled={!isEditing}
                                />
                                {isEditing && (
                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() => handleRemoveField("redesSociales", index)}
                                    >
                                        Quitar
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay redes sociales disponibles.</p>
                    )}

                    {isEditing && (
                        <button
                            type="button"
                            onClick={() =>
                                handleAddField("redesSociales", { plataforma: "", url: "" })
                            }
                        >
                            Agregar Red Social
                        </button>
                    )}

                    {/* Géneros Musicales */}
                    <h2>Géneros Musicales</h2>
                    {artist.generos.length > 0 ? (
                        artist.generos.map((genero, index) => (
                            <div key={index} className="admin-artist-genre-section">
                                <label>Género:</label>
                                <select
                                    value={genero.id || ""}
                                    onChange={(e) =>
                                        handleChange(e, index, "id", "generos")
                                    }
                                    disabled={!isEditing}
                                    required
                                >
                                    <option value="">Selecciona un género</option>
                                    {availableGenres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.nombre}
                                        </option>
                                    ))}
                                </select>
                                {isEditing && (
                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() => handleRemoveField("generos", index)}
                                    >
                                        Quitar
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay géneros asociados.</p>
                    )}

                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => handleAddField("generos", { id: "" })}
                        >
                            Agregar Género
                        </button>
                    )}

                    <h2>Discos y Canciones</h2>
                    {artist.discos.length > 0 ? (
                        artist.discos.map((disco, index) => (
                            <div key={index} className="disco-container">
                                {/* Información del Disco */}
                                <div className="disco-header">
                                    <label>Título del Disco:</label>
                                    <input
                                        type="text"
                                        value={disco.titulo || ""}
                                        onChange={(e) => handleChange(e, index, "titulo", "discos")}
                                        disabled={!isEditing}
                                        required
                                    />
                                    <label>Fecha de Lanzamiento:</label>
                                    <input
                                        type="date"
                                        value={disco.fecha_lanzamiento || ""}
                                        onChange={(e) => handleChange(e, index, "fecha_lanzamiento", "discos")}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Canciones del Disco */}
                                <div className="canciones-container">
                                    <h3>Canciones</h3>
                                    {Array.isArray(disco.canciones) && disco.canciones.length > 0 ? (
                                        disco.canciones.map((cancion, i) => (
                                            <div key={i} className="cancion-item">
                                                <label>Título de la Canción:</label>
                                                <input
                                                    type="text"
                                                    value={cancion.titulo || ""}
                                                    onChange={(e) =>
                                                        handleChange(e, i, "titulo", "canciones", index)
                                                    }
                                                    disabled={!isEditing}
                                                    required
                                                />
                                                <label>Duración (HH:MM:SS):</label>
                                                <input
                                                    type="text"
                                                    placeholder="HH:MM:SS"
                                                    value={cancion.duracion || ""}
                                                    onChange={(e) =>
                                                        handleChange(e, i, "duracion", "canciones", index)
                                                    }
                                                    disabled={!isEditing}
                                                    required
                                                />
                                                <label>Fecha de Lanzamiento:</label>
                                                <input
                                                    type="date"
                                                    value={cancion.fecha_lanzamiento || ""}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            i,
                                                            "fecha_lanzamiento",
                                                            "canciones",
                                                            index
                                                        )
                                                    }
                                                    disabled={!isEditing}
                                                    required
                                                />
                                                {isEditing && (
                                                    <button
                                                        type="button"
                                                        className="remove-button"
                                                        onClick={() => handleRemoveField("canciones", i, index)}
                                                    >
                                                        Quitar Canción
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay canciones disponibles.</p>
                                    )}
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleAddField(
                                                    "canciones",
                                                    { titulo: "", duracion: "", fecha_lanzamiento: "" },
                                                    index
                                                )
                                            }
                                        >
                                            Agregar Canción
                                        </button>
                                    )}
                                </div>

                                {/* Botón para Quitar Disco */}
                                {isEditing && (
                                    <div className="remove-disco-container">
                                        <button
                                            type="button"
                                            className="remove-disco-button"
                                            onClick={() => handleRemoveField("discos", index)}
                                        >
                                            Quitar Disco
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay discos disponibles.</p>
                    )}

                    {/* Botón para Agregar Disco */}
                    {isEditing && (
                        <button
                            type="button"
                            className="add-disco-button"
                            onClick={() =>
                                handleAddField("discos", {
                                    titulo: "",
                                    fecha_lanzamiento: "",
                                    canciones: [],
                                })
                            }
                        >
                            Agregar Disco
                        </button>
                    )}

                    <div>
                        {isEditing ? (
                            <>
                                <div className="action-buttons">
                                    <button type="button" className="save-button" onClick={handleEdit}>
                                        Guardar
                                    </button>
                                    <button type="button" className="cancel-button" onClick={handleToggleEdit}>
                                        Cancelar
                                    </button>
                                </div>

                            </>
                        ) : (
                            <button type="button" onClick={handleToggleEdit}>
                                Editar
                            </button>
                        )}
                    </div>
                </form>

                {/* Botón de eliminar artista */}
                <div className="delete-artist-container">
                    <button
                        type="button"
                        className="delete-artist-button"
                        onClick={() => {
                            console.log("Botón de eliminar presionado");
                            setShowModal(true);
                        }}
                    >
                        Eliminar Artista
                    </button>

                </div>

            </div>
            {/* Uso del Modal */}
            {showModal && (
                <Modal
                    isOpen={showModal}
                    title="Confirmar eliminación"
                    onClose={() => setShowModal(false)}
                >
                    <p>¿Está seguro de que desea eliminar este artista? Esta acción no se puede deshacer.</p>
                    <div className="modal-actions">
                        <button onClick={handleDelete} className="modal-close-button">
                            Sí, eliminar
                        </button>
                        
                    </div>
                </Modal>
            )}


            <Footer />
        </>
    );

};

export default AdminArtistDetail;
