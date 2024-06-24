import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/Moviecard';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Styles.css';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const Movies = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category || 'popular'}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (!data.results) {
          console.error('No movie results found for this category');
          return;
        }
        setMovies(data.results);
      })
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div className="page-container">
      <AppNavbar />
      <div className="movies-container">
        {category && (
          <div>
            <h2>{category?.charAt(0).toUpperCase() + category?.slice(1)} Movies</h2>
            {movies.length > 0 && (
              <div className="movie-list">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
            {!movies.length && <p>No movies found for this category.</p>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
