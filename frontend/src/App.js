import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Artist_Information from "./pages/Artist_Information";
import Home from "./pages/Home"; 
import Login from './pages/Login';
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Artist_Information" element={<Artist_Information />} />
      </Routes>
    </Router>
  );
}

export default App;
