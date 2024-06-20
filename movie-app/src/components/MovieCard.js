import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3 className="card-title">{movie.title}</h3>
      <p className="card-date">{movie.release_date}</p>
      <Link className="card-link" to={`/movies/${movie.id}`}>More Details</Link>
    </div>
  );
};

export default MovieCard;