import React from 'react';
import './Styles.css'; // Example CSS file for styling

const TVShowCard = ({ tvShow }) => {
 
  if (!tvShow) {
    return null; 
  }

  const { name, poster_path, overview, first_air_date } = tvShow;

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w300'; 

  return (
    <div className="tv-show-card">
      <div className="tv-show-poster">
        {poster_path ? (
          <img
            src={`${imageBaseUrl}${poster_path}`}
            alt={`${name} Poster`}
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      <div className="tv-show-details">
        <h3 className="tv-show-title">{name}</h3>
        <p className="tv-show-release-date">First Air Date: {first_air_date}</p>
        <p className="tv-show-overview">{overview}</p>
      </div>
    </div>
  );
};

export default TVShowCard;
