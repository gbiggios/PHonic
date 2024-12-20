import React, { useState } from "react";
import "../styles/Profile.css";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Profile = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "@gmail.com",
    telefono: "+56 9 ",
    pais: "Chile",
    region: "Región de ",
    ciudad: "",
    rut: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    alert("Datos guardados con éxito: " + JSON.stringify(formData, null, 2));
    // Aquí puedes añadir lógica para enviar los datos al backend
  };

  return (
    <>
    <Slider />
    <div className="profile-form-container">
      <h1 className="profile-form-title">Mi Perfil</h1>
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pais">País</label>
          <select
            id="pais"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
          >
            <option value="Chile">Chile</option>
            <option value="Argentina">Argentina</option>
            <option value="Perú">Perú</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="region">Región</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="Región de Valparaíso">Región de Valparaíso</option>
            <option value="Región Metropolitana">Región Metropolitana</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <select
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          >
            <option value="Valparaíso">Valparaíso</option>
            <option value="Santiago">Santiago</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT</label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="save-button" onClick={handleSave}>
          Guardar
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Profile;