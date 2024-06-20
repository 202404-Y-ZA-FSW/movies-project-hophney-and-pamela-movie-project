import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchMovies } from '../util/API';
import MoviesBox from '../components/MoviesBox';
import AppNavbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movieData = await searchMovies(query);
      setMovies(movieData.results);
    };
    getMovies();
  }, [query]);

  return (
    <>
      <AppNavbar />
      <div className="container mt-4">
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-3 mb-4" key={movie.id}>
              <MoviesBox movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;