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
        discos: [],
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
                    disco.canciones = cancionesResponse.data.filter((cancion) => cancion.disco === disco.id);
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
    




    // Handle Input Changes
    const handleChange = (e, index, field, section = null, parentIndex = null) => {
        const value = e.target.value;
        if (section) {
            const updatedSection = [...artist[section]];
            if (parentIndex !== null) {
                updatedSection[parentIndex][section][index][field] = value;
            } else {
                updatedSection[index][field] = value;
            }
            setArtist({ ...artist, [section]: updatedSection });
        } else {
            setArtist({ ...artist, [field]: value });
        }
    };

    const handleAddField = (section, newField, parentIndex = null) => {
        if (parentIndex !== null) {
            const updatedDiscos = [...artist.discos];
            updatedDiscos[parentIndex][section].push(newField);
            setArtist({ ...artist, discos: updatedDiscos });
        } else {
            setArtist({
                ...artist,
                [section]: [...artist[section], newField],
            });
        }
    };

    const handleRemoveField = (section, index, parentIndex = null) => {
        if (parentIndex !== null) {
            const updatedDiscos = [...artist.discos];
            updatedDiscos[parentIndex][section].splice(index, 1);
            setArtist({ ...artist, discos: updatedDiscos });
        } else {
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

        if (artist.generos.length === 0) {
            setError("Debes seleccionar al menos un género musical.");
            setLoading(false);
            return;
        }

        try {
            // Actualizar datos del artista
            await api.put(`/api/artistas/${id}`, {
                nombre_artistico: artist.nombre_artistico,
                nombre: artist.nombre,
                biografia: artist.biografia,
                fecha_nacimiento: artist.fecha_nacimiento,
                generos: artist.generos.map((g) => g.id),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            

            // Actualizar géneros musicales asociados
            await api.put(`/api/artistas/${id}/generos/`, {
                generos: artist.generos.map((g) => g.id), // Envía solo los IDs de los géneros
            });


            // Actualizar discos y canciones
            for (const disco of artist.discos) {
                if (disco.id) {
                    // Actualizar disco existente
                    await api.put(`/api/discos/${disco.id}`, disco);
                } else {
                    // Crear nuevo disco
                    const discoResponse = await api.post(`/api/discos/`, {
                        ...disco,
                        artista: id,
                    });
                    const discoId = discoResponse.data.id;

                    for (const cancion of disco.canciones) {
                        if (cancion.id) {
                            await api.put(`/api/canciones/${cancion.id}`, cancion);
                        } else {
                            await api.post(`/api/canciones/`, { ...cancion, disco: discoId });
                        }
                    }
                }
            }

            // Actualizar redes sociales
            for (const red of artist.redesSociales) {
                if (red.id) {
                    await api.put(`/api/redes_sociales/${red.id}`, red);
                } else {
                    await api.post(`/api/redes_sociales/`, { ...red, artista: id });
                }
            }

            setSuccess("¡Artista actualizado correctamente!");
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating artist:', error);
            setError("Error al actualizar el artista.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            // Eliminar relación entre el artista y sus géneros musicales
            console.log(`Eliminando relaciones de géneros del artista con ID: ${id}`);
            await api.delete(`/api/artistas/${id}/generos/`);

            // Eliminar todas las redes sociales relacionadas
            for (const red of artist.redesSociales) {
                console.log(`Eliminando red social con ID: ${red.id}`);
                await api.delete(`/api/redes_sociales/${red.id}`);
            }

            // Eliminar todas las canciones de los discos relacionados
            for (const disco of artist.discos) {
                for (const cancion of disco.canciones) {
                    console.log(`Eliminando canción con ID: ${cancion.id}`);
                    await api.delete(`/api/canciones/${cancion.id}`);
                }

                // Eliminar el disco
                console.log(`Eliminando disco con ID: ${disco.id}`);
                await api.delete(`/api/discos/${disco.id}`);
            }

            // Finalmente, eliminar el artista
            console.log(`Eliminando artista con ID: ${id}`);
            await api.delete(`/api/artistas/${id}`);

            alert("Artista y todos sus datos relacionados fueron eliminados correctamente.");
            navigate('/admin-artist-list');
        } catch (error) {
            console.error('Error eliminando el artista y sus datos relacionados:', error);
            alert("Ocurrió un error al intentar eliminar el artista. Por favor, intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };



    if (loading) return <Spinner />;
    if (!artist) return <p>Error al cargar los datos del artista.</p>;



    return (
        <>
            <Slider />
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
                                    onChange={(e) =>
                                        handleChange(e, index, "plataforma", "redesSociales")
                                    }
                                    required
                                    disabled={!isEditing}
                                />
                                <label>URL:</label>
                                <input
                                    type="url"
                                    value={red.enlace || ""}
                                    onChange={(e) =>
                                        handleChange(e, index, "url", "redesSociales")
                                    }
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

                                {/* Canciones del Disco */}
                                <h3>Canciones</h3>
                                {disco.canciones.length > 0 ? (
                                    disco.canciones.map((cancion, i) => (
                                        <div key={i} className="cancion-container">
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
                                                <div className="button-group">
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
                                                    <button
                                                        type="button"
                                                        className="remove-button"
                                                        onClick={() => handleRemoveField("canciones", i, index)}
                                                    >
                                                        Quitar Canción
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay canciones disponibles.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay discos disponibles.</p>
                    )}

                    {/* Botones para Agregar y Quitar Discos */}
                    {isEditing && (
                        <div className="button-group centered">
                            <button
                                type="button"
                                onClick={() =>
                                    handleAddField("discos", {
                                        titulo: "",
                                        fecha_lanzamiento: "",
                                        generos: [],
                                        canciones: [],
                                    })
                                }
                            >
                                Agregar Disco
                            </button>
                            {artist.discos.length > 0 && (
                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={() => handleRemoveField("discos", artist.discos.length - 1)}
                                >
                                    Quitar Disco
                                </button>
                            )}
                        </div>
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
            </div>
            {showModal && (
                <Modal>
                    <p>¿Está seguro de que desea eliminar este artista?</p>
                    <button onClick={handleDelete} className="modal-button">
                        Sí, eliminar
                    </button>
                    <button onClick={() => setShowModal(false)} className="modal-button cancel">
                        Cancelar
                    </button>
                </Modal>
            )}
            <Footer />
        </>
    );

};

export default AdminArtistDetail;
