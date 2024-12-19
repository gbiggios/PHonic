import React, { useState } from "react";
import api from "../utils/api";
import Modal from "../components/Modal";
import "../styles/GenresList.css";
import Spinner from "../components/Spinner";

const GenresList = ({ genres, setGenres }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editGenre, setEditGenre] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleEdit = (genre) => {
        setEditGenre({ ...genre });
    };

    const handleEditSubmit = async () => {
        try {
            setLoading(true);
            await api.put(`/api/generos/${editGenre.id}/`, {
                nombre: editGenre.nombre,
                descripcion: editGenre.descripcion,
            });
            // Actualizar el género en el estado
            setGenres((prevGenres) =>
                prevGenres.map((g) =>
                    g.id === editGenre.id ? { ...editGenre } : g
                )
            );
            setEditGenre(null);
        } catch (err) {
            console.error("Error al actualizar género:", err);
            setError("Error al actualizar el género.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await api.delete(`/api/generos/${selectedGenre.id}/`);
            // Eliminar el género del estado
            setGenres((prevGenres) =>
                prevGenres.filter((g) => g.id !== selectedGenre.id)
            );
            setModalOpen(false);
        } catch (err) {
            console.error("Error al eliminar género:", err);
            setError("Error al eliminar el género.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="genres-container">
                <h1 className="genres-title">Géneros Musicales</h1>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="genres-grid">
                        {genres.map((genre) => (
                            <div key={genre.id} className="genre-card">
                                {editGenre?.id === genre.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editGenre.nombre}
                                            onChange={(e) =>
                                                setEditGenre({
                                                    ...editGenre,
                                                    nombre: e.target.value,
                                                })
                                            }
                                        />
                                        <textarea
                                            value={editGenre.descripcion}
                                            onChange={(e) =>
                                                setEditGenre({
                                                    ...editGenre,
                                                    descripcion: e.target.value,
                                                })
                                            }
                                        />
                                        <button onClick={handleEditSubmit}>
                                            Guardar
                                        </button>
                                        <button onClick={() => setEditGenre(null)}>
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="genre-name">{genre.nombre}</h2>
                                        <p className="genre-description">
                                            {genre.descripcion}
                                        </p>
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEdit(genre)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => {
                                                setSelectedGenre(genre);
                                                setModalOpen(true);
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Modal
                isOpen={modalOpen}
                title="Confirmar Eliminación"
                onClose={() => setModalOpen(false)}
            >
                <p>
                    ¿Estás seguro de que quieres eliminar el género musical "
                    {selectedGenre?.nombre}"?
                </p>
                <button className="modal-delete-button" onClick={handleDelete}>
                    Sí, Eliminar
                </button>
            </Modal>
        </>
    );
};

export default GenresList;
