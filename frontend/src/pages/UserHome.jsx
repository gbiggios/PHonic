import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import "../styles/Home.css";
import Banners from "../components/Banners";

const UserHome = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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

export default UserHome;
