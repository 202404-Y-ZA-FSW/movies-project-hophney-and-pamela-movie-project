import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchActorDetails } from '../../util/API'; 
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const ActorDetails = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const getActorDetails = async () => {
      try {
        const actorData = await fetchActorDetails(actorId);
        setActor(actorData);
      } catch (err) {
        setError(err); /*only and only if api fails then error can be handled*/
      }
    };
    getActorDetails();
  }, [actorId]);

  if (error) {
    return <div>Error fetching actor details: {error.message}</div>;
  }

  if (!actor) return <div>Loading...</div>;

  const { profile_path, name, gender, popularity, birthday, biography } = actor;

  return (
    <div>
      <AppNavbar />
      <div className="container mt-4">
        {actor && ( //to check if actor is avilable or not
          <div className="row">
            <div className="col-md-4">
              <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} className="img-fluid" alt={name} />
            </div>
            <div className="col-md-8">
              <h2>{name}</h2>
              <p><strong>Gender:</strong> {gender === 2 ? 'Male' : 'Female'}</p>
              <p><strong>Popularity:</strong> {popularity}</p>
              <p><strong>Birthday:</strong> {birthday}</p>
              <p><strong>Biography:</strong> {biography}</p>
              <h5>Movies:</h5>
              <ul>
                {actor?.movie_credits?.cast && actor.movie_credits.cast.map((movie) => ( 
                  <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </li>
                ))}
                {!actor?.movie_credits?.cast && (
                  <p>No movies found for this actor.</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ActorDetails;
