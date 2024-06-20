import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=10aef7c000aeb272dacfd5f6f1135300`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <img className="details-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2 className="details-title">{movie.title}</h2>
      <p className="details-date">{movie.release_date}</p>
      <p className="details-overview">{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;