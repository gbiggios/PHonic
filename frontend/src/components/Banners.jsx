import React from "react";
import "../styles/Banners.css";
import ph1 from '../assets/ph.png';
import ph2 from '../assets/2.png';
import ph3 from '../assets/3.png';
import ph4 from '../assets/4.png';
import ph5 from '../assets/5.png';
import ph6 from '../assets/6.png';
import ph7 from '../assets/7.png';
import ph8 from '../assets/8.png';
import ph9 from '../assets/9.png';
import ph11 from '../assets/11.png';

const staticData = [
  { id: 1, name: "Siguelo PH", image: ph1 },
  { id: 2, name: "Marcianeke", image: ph2 },
  { id: 3, name: "princesa alba", image: ph3 },
  { id: 4, name: "Polimá WestCoast", image: ph4 },
  { id: 5, name: "Rosalía", image: ph5 },
  { id: 6, name: "Jordan 23", image: ph6 },
  { id: 7, name: "Oliver Tree", image: ph7 },
  { id: 8, name: "Miley Cyrus", image: ph8 },
  { id: 9, name: "KISS", image: ph9 },
  { id: 10, name: "Amar Azul", image: ph11 },
];

const Banners = () => {
  return (
    <div className="banners">
      {staticData.map((item) => (
        <div className="banner-item" key={item.id}>
          <img
            src={item.image}
            alt={item.name}
            className="banner-image"
          />
          <div className="banner-overlay">
            <h3 className="banner-name">{item.name}</h3>
            <div className="banner-icons">
              <i className="fab fa-facebook-f"></i>
              
              <i className="fab fa-instagram"></i>
              <i className="fas fa-home"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banners;
