import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Headers
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import UserHeader from "./components/UserHeader"; // Agregado

// Páginas Generales
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Artist_List from "./pages/Artist_List"

// Páginas de Usuario
import UserHome from "./pages/UserHome";

// Páginas Administrador
import AdminHome from "./pages/AdminHome";
import AdminCreateGenre from "./pages/AdminCreateGenre";
import AdminArtist from "./pages/AdminArtist";
import AdminArtistsList from "./pages/AdminArtistsList";
import AdminArtistDetail from "./pages/AdminArtistDetail";

// Componente Layout para condicionar encabezado
function Layout({ children }) {
  const location = useLocation();

  // Determinar el encabezado según el pathname
  const getHeader = () => {
    if (location.pathname.startsWith("/admin-")) {
      return <AdminHeader />;
    }
    if (location.pathname.startsWith("/user-")) {
      return <UserHeader />;
    }
    return <Header />;
  };

  return (
    <>
      {getHeader()}
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
          <Route path="/Artist_List" element={<Artist_List />} />
          Artist_List
          {/* Usuario */}
          <Route path="/user-home" element={<UserHome />} />

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
