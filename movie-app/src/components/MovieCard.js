import React from 'react';
import { Card, Poster, Details, Title } from './MovieCard.styles';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Poster src={movie.poster} alt={movie.title} />
      <Details>
        <Title>{movie.title}</Title>
        <Link to={`/movies/${movie.id}`}>View Details</Link>
      </Details>
    </Card>
  );
};

export default MovieCard;