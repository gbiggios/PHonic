import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import '../styles/AdminArtistsList.css';

const AdminArtistsList = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await api.get('/api/artistas/');
                console.log("Datos recibidos:", response.data);
                setArtists(response.data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtists();
    }, []);

    return (
        <>
            {loading && <Spinner />}
            <Slider />
            <div className={`artists-list-container ${loading ? 'loading' : ''}`}>
                <h1 className="artists-list-title">Listado de Artistas</h1>
                <div className="artists-grid">
                    {artists.length > 0 ? (
                        artists.map((artist) => (
                            <div
                                key={artist.id}
                                className="artist-card"
                                onClick={() => navigate(`/admin-artist-detail/${artist.id}`)}
                            >
                                <h2>{artist.nombre_artistico}</h2>
                                <p>{artist.nombre}</p>

                            </div>
                        ))
                    ) : (
                        <p>No hay artistas disponibles.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminArtistsList;
