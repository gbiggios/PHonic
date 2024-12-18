import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/Login.css";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setError("");
    setSuccess("");

    // Validaciones
    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo válido (correo@correo.com).");
      return;
    }
    if (password.trim().length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true); 

    try {
      const response = await api.post("api/login/", { email, password });
      setSuccess("Inicio de sesión exitoso. Bienvenido.");
      console.log("Respuesta del servidor:", response.data);
      setLoading(false); 
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.response?.data?.error || "Error al iniciar sesión. Intenta de nuevo.");
      setLoading(false); 
    }
  };

  return (
    <>
     <Header />
      <Slider />
      <div className="login-container">
        {loading && <Spinner />} 
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
