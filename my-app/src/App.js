import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './pages/movies/Movies';
import MovieDetails from './pages/movies/MovieDetails';
import Actors from './pages/actors/Actors';
import ActorDetails from './pages/actors/ActorDetails';
import SearchResults from './pages/SearchResults'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:category" element={<Movies />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/:actorId" element={<ActorDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
