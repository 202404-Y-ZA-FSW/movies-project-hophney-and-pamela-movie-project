import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,similar`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setCredits(data.credits);
        setRelatedMovies(data.similar.results);
        const trailer = data.videos.results.find(video => video.type === 'Trailer');
        setTrailer(trailer ? trailer.key : '');
      })
      .catch(err => console.error(err));
  }, [movieId]);

  return (
    <>
      <AppNavbar />
      <div className="movie-details-container">
        <div className="movie-header">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <p><strong>Language:</strong> {movie.original_language}</p>
            <p><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
            <p><strong>Director:</strong> {credits.crew?.find(member => member.job === 'Director')?.name}</p>
            <p>{movie.overview}</p>
          </div>
        </div>
        <div className="movie-cast">
          <h2>Main Cast</h2>
          <div className="grid">
            {credits.cast?.slice(0, 5).map(actor => (
              <div key={actor.cast_id} className="actor-card">
                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="related-movies">
          <h2>Related Movies</h2>
          <div className="grid">
            {relatedMovies.map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
        {trailer && (
          <div className="movie-trailer">
            <h2>Trailer</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <div className="movie-production">
          <h2>Production Companies</h2>
          <div className="grid">
            {movie.production_companies?.map(company => (
              <div key={company.id} className="company-card">
                {company.logo_path && (
                  <img src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt={company.name} />
                )}
                <p>{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
