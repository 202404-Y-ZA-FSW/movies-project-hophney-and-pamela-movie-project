import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, posterPath, releaseDate, genres } = movie; 

  return (
    <div className="card">
      <img className="card-img-top" src={posterPath} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Released: {releaseDate}</p>
        <p className="card-text">Genres: {genres.join(', ')}</p>
      </div>
    </div>
  );
};

export default MovieCard;
