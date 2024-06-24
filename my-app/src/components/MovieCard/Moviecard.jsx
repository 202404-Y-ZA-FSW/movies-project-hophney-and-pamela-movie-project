import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </Link>
      <div className="movie-info">
        <h5>{movie.title}</h5>
      </div>
    </div>
  );
};

export default MovieCard;
