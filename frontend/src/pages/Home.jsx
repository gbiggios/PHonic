import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Highlights from "./Highlights";
import Footer from "./Footer";
import "../styles/Home.css"; // Estilos adicionales para Home si los necesitas

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Highlights />
      <Footer />
    </>
  );
};

export default Home;
