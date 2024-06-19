import React from 'react';
import { DetailWrapper, Poster, Details, Title, Description, AdditionalInfo } from './MovieDetail.styles';

const MovieDetail = ({ movie }) => {
  return (
    <DetailWrapper>
      <Poster src={movie.poster} alt={movie.title} />
      <Details>
        <Title>{movie.title}</Title>
        <Description>{movie.description}</Description>
        <AdditionalInfo>
          <p>Rating: {movie.rating}</p>
          <p>Release Date: {movie.releaseDate}</p>
        </AdditionalInfo>
      </Details>
    </DetailWrapper>
  );
};

export default MovieDetail;