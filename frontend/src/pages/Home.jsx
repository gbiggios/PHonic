import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import "../styles/Home.css";
import Banners from "../components/Banners";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`content-wrapper ${loading ? "hidden" : ""}`}>

        <Slider />
        <HeroSection />
        <Banners/>
        <Footer />
      </div>

      {loading && <Spinner />}
    </>
  );
};

export default Home;
