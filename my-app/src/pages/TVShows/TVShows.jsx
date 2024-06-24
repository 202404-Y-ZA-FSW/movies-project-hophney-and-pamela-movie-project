import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';
import Footer from '../../components/Footer/Footer';
import AppNavbar from '../../components/Navbar/Navbar';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setTvShows(data.results);
      })
      .catch(error => console.error('Error fetching TV shows:', error));
  }, []);

  return (
    <div className="page-container">
      <AppNavbar />
      <div className="home-container"> {/* Changed to home-container */}
        <h2>Popular TV Shows</h2>
        <div className="movie-list">
          {tvShows.map(show => (
            <Link key={show.id} to={`/tvshow/${show.id}`} className="movie-card-link">
              <div className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.name} />
                <div className="movie-info">
                  <h5 className="movie-title">{show.name}</h5> {/* Added movie-title class */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;
