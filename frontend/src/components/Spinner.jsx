import React from "react";
import "../styles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div id="wrap">
        <div id="album">
          <div id="cover">
            <div id="print"></div>
          </div>
          <div id="vinyl">
            <div id="print"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
