import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const ActorCard = ({ actor }) => {
  return (
    <div className="movie-card">
      <Link to={`/actor/${actor.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
      </Link>
      <div className="movie-info">
        <h5>{actor.name}</h5>
      </div>
    </div>
  );
};

export default ActorCard;
