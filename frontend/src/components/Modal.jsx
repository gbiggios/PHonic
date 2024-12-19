import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                {children}
                <button onClick={onClose} className="modal-close-button">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
