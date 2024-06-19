import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './Components/Navbar';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import SearchPage from './pages/SearchPage';
import ActorsPage from './pages/ActorsPage';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/actors" element={<ActorsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;