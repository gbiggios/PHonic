import React, { useState, useEffect } from 'react';
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import api from "../utils/api"; 
import "../styles/AdminCreateGenre.css";
import GenresList from "../components/GenresList";

const AdminCreateGenre = () => {
    const [genres, setGenres] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Cargar géneros desde la BD
    const fetchGenres = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/generos/");
            setGenres(response.data);
        } catch (err) {
            console.error(err);
            setError("Error al cargar los géneros musicales.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/api/generos/', {
                nombre: formData.name,
                descripcion: formData.description,
            });

            if (response.status === 201) {
                setSuccess('¡Género musical creado con éxito!');
                setFormData({ name: '', description: '' });
                // Agregar el nuevo género al estado de géneros
                setGenres((prevGenres) => [...prevGenres, response.data]);
            }
        } catch (err) {
            setError('Hubo un error al crear el género. Inténtalo nuevamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Slider />
            <div className="create-genre-container">
                <div className="form-wrapper">
                    <h1 className="form-title">Crear Género Musical</h1>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <form onSubmit={handleSubmit} className="genre-form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre del Género</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-button">Crear Género</button>
                            {error && <div className="error-message">{error}</div>}
                            {success && <div className="success-message">{success}</div>}
                        </form>
                    )}                 
                </div>
                <GenresList genres={genres} setGenres={setGenres} />
            </div>
            <Footer />
        </>
    );
};

export default AdminCreateGenre;
