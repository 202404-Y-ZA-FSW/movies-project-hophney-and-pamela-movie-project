import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Batman', poster: '/path/to/batman.jpg', description: '...', rating: '4.5', releaseDate: '2022' },
    { id: 2, title: 'Superman', poster: '/path/to/superman.jpg', description: '...', rating: '4.2', releaseDate: '2021' },
  ]);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleSearch = (query) => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div>
      <h1>Home</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default HomePage;