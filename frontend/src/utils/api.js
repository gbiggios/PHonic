import axios from 'axios';
import Cookies from 'js-cookie'; // Asegúrate de que js-cookie esté instalado

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/`, // Tu base URL
    withCredentials: true, // Habilita el envío de cookies
});

// Interceptor para agregar el token CSRF
api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrftoken'); // Recupera el token CSRF de las cookies
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken; // Agrega el token como encabezado
    }
    return config;
});

export default api;
