import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Styles.css';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const ActorDetails = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null); // State for trailer

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=en-US`);
        setActor(response.data);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    };

    const fetchActorMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`);
        const moviesData = response.data.cast;

        // Fetch main actors for each movie
        const moviesWithActors = await Promise.all(
          moviesData.map(async movie => {
            const creditsResponse = await axios.get(`${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`);
            const mainActors = creditsResponse.data.cast.slice(0, 5); // Getting first 5 actors
            return { ...movie, mainActors };
          })
        );

        setMovies(moviesWithActors);
      } catch (error) {
        console.error('Error fetching actor movies:', error);
      }
    };

    const fetchActorTrailer = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/person/${actorId}/videos?api_key=${API_KEY}&language=en-US`);
        setTrailer(response.data.results[0]); // Assuming the first result is the desired trailer
      } catch (error) {
        console.error('Error fetching actor trailer:', error);
      }
    };

    fetchActorDetails();
    fetchActorMovies();
    fetchActorTrailer();
  }, [actorId]);

  if (!actor) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <AppNavbar />
      <Container fluid className="actor-profile-container">
        <Row className="actor-details-row">
          <Col md={4}>
            <img src={`${IMAGE_BASE_URL}${actor.profile_path}`} alt={actor.name} className="actor-image" />
          </Col>
          <Col md={8}>
            <h1 className="actor-name">{actor.name}</h1>
            <div className="actor-details">
              <p><strong>Known For:</strong> {actor.known_for_department}</p>
              <p><strong>Popularity:</strong> {actor.popularity}</p>
              <p><strong>Birthday:</strong> {actor.birthday}</p>
              <p><strong>Place of Birth:</strong> {actor.place_of_birth}</p>
              <p><strong>Biography:</strong> {actor.biography}</p>
            </div>
            {trailer && (
              <div className="actor-trailer">
                <h5>Trailer:</h5>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </Col>
        </Row>
        <hr />
        <h2>Movies Actor Acted In</h2>
        <Row>
          {movies.map(movie => (
            <Col key={movie.id} md={3} className="mb-4">
              <a href={`/movie/${movie.id}`} className="actor-card">
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="img-fluid" />
                <h4 className="actor-name">{movie.title}</h4>
                <p><strong>Main Actors:</strong></p>
                <ul>
                  {movie.mainActors.map(actor => (
                    <li key={actor.id}>{actor.name}</li>
                  ))}
                </ul>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ActorDetails;
