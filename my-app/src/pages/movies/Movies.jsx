import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Movies = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category || 'popular'}?api_key=`) 
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
    <>
      <AppNavbar />
      <div className="movies-container">
        {category && ( // Conditionally render if category exists
          <>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Movies</h2>
            {movies.length > 0 && ( // Check if movies exist and data.results is not undefined
              <div className="grid">
                {movies.map(movie => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            )}
            {!movies.length && ( // Display message if no movies found
              <p>No movies found for this category.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Movies;
