import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/Moviecard'; 
import Navbar from '../../components/Navbar/Navbar';  
import Footer from '../../components/Footer/Footer';
import './Styles.css';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(response => {
        setTopMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching top movies:', error);
      });
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="home-container">
        <h2>Latest Movies</h2>
        <div className="movie-list">
          {topMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
