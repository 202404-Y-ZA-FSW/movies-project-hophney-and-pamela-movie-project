import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Styles.css';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const TVShowDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [actors, setActors] = useState([]);
  const [similarTVShows, setSimilarTVShows] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
        setTvShow(response.data);

        // Fetching credits to get main actors
        const creditsResponse = await axios.get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
        setActors(creditsResponse.data.cast.slice(0, 5)); // Getting first 5 actors
        
        // Fetching production companies
        setProductionCompanies(response.data.production_companies);
        
        // Fetching similar TV shows
        const similarTVShowsResponse = await axios.get(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=en-US`);
        setSimilarTVShows(similarTVShowsResponse.data.results.slice(0, 5)); // Getting first 5 similar TV shows
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    };

    const fetchTVShowTrailers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
        setTrailers(response.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube'));
      } catch (error) {
        console.error('Error fetching TV show trailers:', error);
      }
    };

    fetchTVShowDetails();
    fetchTVShowTrailers();
  }, [id]);

  if (!tvShow) return <div>Loading...</div>;

  return (
    <div>
      <AppNavbar />
      <Container fluid className="movie-details-container">
        <Row>
          <Col md={4}>
            <img src={`${IMAGE_BASE_URL}${tvShow.poster_path}`} alt={tvShow.name} className="img-fluid" />
          </Col>
          <Col md={8}>
            <h1>{tvShow.name}</h1>
            <p><strong>First Air Date:</strong> {new Date(tvShow.first_air_date).toLocaleDateString()}</p>
            <p><strong>Rating:</strong> {tvShow.vote_average}</p>
            <p><strong>Overview:</strong> {tvShow.overview}</p>
            <p><strong>Genres:</strong> {tvShow.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Number of Seasons:</strong> {tvShow.number_of_seasons}</p>
            <p><strong>Number of Episodes:</strong> {tvShow.number_of_episodes}</p>
            <p><strong>Original Language:</strong> {tvShow.original_language}</p>
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
            <h2>Similar TV Shows</h2>
            <div className="related-movies">
              {similarTVShows.map(similarTVShow => (
                <div key={similarTVShow.id} className="related-movie">
                  <img src={`${IMAGE_BASE_URL}${similarTVShow.poster_path}`} alt={similarTVShow.name} className="related-movie-poster" />
                  <p>{similarTVShow.name}</p>
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

export default TVShowDetails;
