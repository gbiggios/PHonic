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
import ArtistList from "./pages/ArtistList"
import ArtistInformation from "./pages/ArtistInformation";
import ContactForm from "./pages/ContactForm";
import Albums from "./pages/Albums";

// Páginas de Usuario
import UserHome from "./pages/UserHome";
import UserArtistList from "./pages/UserArtistList"
import UserContact from "./pages/UserContact"
import UserArtistInformation from "./pages/UserArtistInformation"
import UserAlbums from "./pages/UserAlbums"
import Profile from "./pages/Profile"

// Páginas Administrador
import AdminHome from "./pages/AdminHome";
import AdminCreateGenre from "./pages/AdminCreateGenre";
import AdminArtist from "./pages/AdminArtist";
import AdminArtistsList from "./pages/AdminArtistsList";
import AdminArtistDetail from "./pages/AdminArtistDetail";
import SongsPage from "./pages/SongsPage";

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
          <Route path="/artist-list" element={<ArtistList />} />
          <Route path="/artist_information/:id" element={<ArtistInformation />} />
          <Route path="/contacto" element={<ContactForm />} />
          <Route path="/albums" element={<Albums />} />
          
          {/* Usuario */}
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/user-artist-list" element={<UserArtistList />} />
          <Route path="/user-contacto" element={<UserContact />} />
          <Route path="/user-artist_information/:id" element={<UserArtistInformation />} />
          <Route path="/user-albums" element={<UserAlbums />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/songs" element={<SongsPage />} />

          
          {/* Administrador */}
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-create-genre" element={<AdminCreateGenre />} />
          <Route path="/admin-artist" element={<AdminArtist />} />
          <Route path="/admin-artist-list" element={<AdminArtistsList />} />
          <Route path="/admin-artist-detail/:id" element={<AdminArtistDetail />} />
          <Route path="/admin-songs" element={<SongsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
