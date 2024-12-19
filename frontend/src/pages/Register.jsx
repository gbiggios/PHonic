import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api"; 
import "../styles/Register.css";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");


  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await api.get("/api/csrf-token/");
        setCsrfToken(response.data.csrfToken);
      } catch (err) {
        console.error("Error fetching CSRF token:", err);
      }
    };
  
    fetchCsrfToken();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const response = await api.post(
        "/api/register/",
        { email, password },
        { headers: { "X-CSRFToken": csrfToken } }
      );
  
      if (response.status === 201) {
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Error al registrarse. Intenta de nuevo."
      );
    }
  };
  
  return (
    <>
      <Slider />
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Registrarse</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Registrarse</button>
          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}

          <div className="login-link">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login" className="link-neon">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
