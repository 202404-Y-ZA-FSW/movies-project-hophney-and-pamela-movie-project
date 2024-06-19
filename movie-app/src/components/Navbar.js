import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('YOUR_GENRE_API_ENDPOINT')
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav>
      <h1>MovieSite</h1>
      <div>
        <Link to="/">Home</Link>
        <div>
          <button>Genres</button>
          <div>
            {genres.map(genre => (
              <Link key={genre.id} to={`/genres/${genre.id}`}>{genre.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <button>Movies</button>
          <div>
            <Link to="/movies/top-rated">Top Rated</Link>
            <Link to="/movies/popular">Popular</Link>
            <Link to="/movies/latest">Latest</Link>
            <Link to="/movies/now-playing">Now Playing</Link>
            <Link to="/movies/upcoming">Upcoming</Link>
          </div>
        </div>
        <Link to="/actors">Actors</Link>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search movies or actors..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;