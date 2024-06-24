<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './pages/movies/Movies';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Actors from './pages/actors/Actors';
import ActorDetails from './pages/ActorDetails/ActorDetails';
import SearchResults from './pages/SearchResults/SearchResults';
import Home from './pages/Home/Home';
import GenreMovies from './pages/Genre/Genre'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import TVShows from './pages/TVShows/TVShows';
import TVShowDetails from './components/TVShowsDetails/TVShowDetails';
import NotFound from './pages/NotFound/NotFound';

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
        <Route path="/genre/:genreId" element={<GenreMovies />} /> 
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/tvshow/:id" element={<TVShowDetails />} />
        <Route component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
=======
>>>>>>> f045d57b74d14aad970c1b325ee802a7006fed58
