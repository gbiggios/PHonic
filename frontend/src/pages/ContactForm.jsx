import React from "react";
import "../styles/Contact_Form.css"; // Asegúrate de crear este archivo de estilos
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const ContactForm = () => {
  return (
    <>
       <Slider />
      <div className="contact-form-container">
        <h1 className="form-title">¡Contáctanos!</h1>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre Completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje"
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;