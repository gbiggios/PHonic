import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Headers
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";

// Páginas Generales
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Páginas Administrador
import AdminHome from "./pages/AdminHome";
import AdminCreateGenre from "./pages/AdminCreateGenre";
import AdminArtist from "./pages/AdminArtist";
import AdminArtistsList from "./pages/AdminArtistsList";
import AdminArtistDetail from "./pages/AdminArtistDetail";

// Componente Layout para condicionar encabezado
function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-");

  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* General */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Administrador */}
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-create-genre" element={<AdminCreateGenre />} />
          <Route path="/admin-artist" element={<AdminArtist />} />
          <Route path="/admin-artist-list" element={<AdminArtistsList />} />
          <Route path="/admin-artist-detail/:id" element={<AdminArtistDetail />} />



          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
