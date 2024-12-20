import React from "react";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

import "../styles/Albums.css";

import album1 from "../assets/1.png";
import album2 from "../assets/2.png";
import album3 from "../assets/3.png";
import album4 from "../assets/4.png";

const albumsData = [
  { id: 1, name: "Vizion", image: album1 },
  { id: 2, name: "Marcianadas", image: album2 },
  { id: 3, name: "Flow Queen", image: album3 },
  { id: 4, name: "West Beats", image: album4 },
];

const UserAlbums = () => {
  return (
    <>
      <Slider />
      <div className="albums">
        {albumsData.map((album) => (
          <div className="album-item" key={album.id}>
            <img
              src={album.image}
              alt={album.name}
              className="album-image"
            />
            <div className="album-overlay">
              <h3 className="album-name">{album.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default UserAlbums;
