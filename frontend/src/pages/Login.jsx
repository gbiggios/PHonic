import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/Login.css";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

const Login = () => {
  const [username, setUsername] = useState(""); // Cambiado de email a username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!username.trim()) {
      setError("Por favor, ingresa tu nombre de usuario.");
      return;
    }
    if (password.trim().length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await api.post("api/login/", { username, password });
      setLoading(false);
      const redirectUrl = response.data.redirect_url;
  
      // Depuración
      console.log("Redirect URL recibida:", redirectUrl);
  
      window.location.href = redirectUrl; // Redirige a la URL proporcionada
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.response?.data?.error || "Error al iniciar sesión. Intenta de nuevo.");
      setLoading(false);
    }
  };
  

  return (
    <>
      <Slider />
      <div className="login-container">
        {loading && <Spinner />}
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>
          <input
            type="text" // Cambiado de email a text
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Cambiado a username
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}

          <div className="register-link">
            <span>¿No tienes cuenta? </span>
            <Link to="/register" className="link-neon">
              ¡Regístrate!
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
