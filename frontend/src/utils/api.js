import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/`, // Tu URL base
    withCredentials: true, // Envío de cookies habilitado
});

// Interceptor para agregar el token CSRF a las solicitudes
api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken; // Agregar el token CSRF al encabezado
    }
    return config;
});

export default api;
