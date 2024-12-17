import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Slider.css';

// Importación de las 6 imágenes desde src/assets
import artist1 from '../assets/artist1.png';
import artist2 from '../assets/artist2.png';
import artist3 from '../assets/artist3.png';
import artist4 from '../assets/artist4.png';
import artist5 from '../assets/artist5.png';
import artist6 from '../assets/artist6.png';
import defaultImage from '../assets/default-image.png';

function Slider() {
  const [slides] = useState([
    { id: 1, name: 'Artista 1', image: artist1 },
    { id: 2, name: 'Artista 2', image: artist2 },
    { id: 3, name: 'Artista 3', image: artist3 },
    { id: 4, name: 'Artista 4', image: artist4 },
    { id: 5, name: 'Artista 5', image: artist5 },
    { id: 6, name: 'Artista 6', image: artist6 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  }, [currentIndex, slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSlideClick = () => {
    const currentSlide = slides[currentIndex];
    if (currentSlide) {
      navigate(`/artistas/${currentSlide.id}`); // Redirige a la página del artista
    }
  };

  return (
    <div className="slider">
      {slides.length > 0 ? (
        <>
          <div
            className="slider-content"
            onClick={handleSlideClick}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={slides[currentIndex]?.image}
              alt={slides[currentIndex]?.name}
              onError={(e) => (e.target.src = defaultImage)} // Imagen por defecto
            />
          </div>
          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
          <div className="dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        <div className="slider-placeholder">
          <p>Cargando imágenes...</p>
        </div>
      )}
    </div>
  );
}

export default Slider;
