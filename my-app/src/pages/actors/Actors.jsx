// src/pages/Actors/Actors.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ActorCard from '../../components/ActorCard/ActorCard'; 
import './Styles.css';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const Actors = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`)
      .then(response => {
        setActors(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching popular actors:', error);
      });
  }, []);

  return (
    <div className="page-container">
      <AppNavbar />
      <div className="home-container">
        <h2>Popular Actors</h2>
        <div className="movie-list">
          {actors.map(actor => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Actors;
