import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import "../styles/Home.css";


const Home = () => {
  return (
    <>
     
      <Header />
      <Slider />
      <HeroSection />

      <Footer />
    </>
  );
};

export default Home;
