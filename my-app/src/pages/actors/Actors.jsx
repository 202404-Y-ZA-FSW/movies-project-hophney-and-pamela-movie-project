import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const Actors = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setActors(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <AppNavbar />
      <div className="actors-container">
        <h2>Popular Actors</h2>
        <div className="grid">
          {actors.map(actor => (
            <div key={actor.id} className="actor-card">
              <Link to={`/actor/${actor.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                <p>{actor.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Actors;
