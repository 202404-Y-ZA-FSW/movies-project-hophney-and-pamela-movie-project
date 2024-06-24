import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Import Link from react-router-dom
import { Container, Row, Col } from 'react-bootstrap';
import './Styles.css';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [actors, setActors] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        setMovie(response.data);

        // Fetching credits to get director and main actors
        const creditsResponse = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
        setActors(creditsResponse.data.cast.slice(0, 5)); // Getting first 5 actors
        const director = creditsResponse.data.crew.find(person => person.job === 'Director');
        setMovie(prevState => ({ ...prevState, director: director }));
        
        // Fetching production companies
        setProductionCompanies(response.data.production_companies);
        
        // Fetching related movies
        const similarMoviesResponse = await axios.get(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`);
        setRelatedMovies(similarMoviesResponse.data.results.slice(0, 5)); // Getting first 5 related movies
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMovieTrailers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        setTrailers(response.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube'));
      } catch (error) {
        console.error('Error fetching movie trailers:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailers();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <AppNavbar />
      <Container fluid className="movie-details-container">
        <Row>
          <Col md={4}>
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="img-fluid" />
          </Col>
          <Col md={8}>
            <h1>{movie.title}</h1>
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <p><strong>Language:</strong> {movie.original_language}</p>
            {movie.director && <p><strong>Director:</strong> {movie.director.name}</p>}
            <p><strong>Votes:</strong> {movie.vote_count}</p>
            <h2>Top Actors</h2>
            <div className="top-actors">
              <ul>
                {actors.map(actor => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>Related Movies</h2>
            <div className="related-movies">
              {relatedMovies.map(relatedMovie => (
                <div key={relatedMovie.id} className="related-movie">
                  <Link to={`/movie/${relatedMovie.id}`}>
                    <img src={`${IMAGE_BASE_URL}${relatedMovie.poster_path}`} alt={relatedMovie.title} className="related-movie-poster" />
                  </Link>
                  <p>{relatedMovie.title}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>Trailers</h2>
            <div className="trailers">
              {trailers.slice(0, 1).map(trailer => (
                <div key={trailer.id} className="mb-4">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>Production Companies</h2>
            <div className="production-companies">
              {productionCompanies.map(company => (
                <div key={company.id}>
                  <img src={`${IMAGE_BASE_URL}${company.logo_path}`} alt={company.name} className="production-logo" />
                  <p>{company.name}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default MovieDetails;
