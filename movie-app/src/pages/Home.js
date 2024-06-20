import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=10aef7c000aeb272dacfd5f6f1135300`)
      .then(response => {
        setTopMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching top movies:', error);
      });
  }, []);

  return (
    <div>
      <h2>Top Movies</h2>
      <div className="movie-list">
        {topMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;