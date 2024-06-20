import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      axios.get(`https://api.themoviedb.org/3/search/multi?api_key=10aef7c000aeb272dacfd5f6f1135300&query=${query}`)
        .then(response => {
          setResults(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <div className="movie-list">
        {results.map(result => (
          result.media_type === 'movie' && <MovieCard key={result.id} movie={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;