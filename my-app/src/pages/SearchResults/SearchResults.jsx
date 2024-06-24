import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchMedia } from '../../util/API'; 
import MovieCard from '../../components/MovieCard/Moviecard'; 
import ActorCard from '../../components/ActorCard/ActorCard'; 
import TVShowCard from '../../components/TVShowsCard/TVShowsCard';
import AppNavbar from '../../components/Navbar/Navbar'; 
import Footer from '../../components/Footer/Footer';
import './Styles.css';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const movieData = await searchMedia(query, 'movie');
        const tvShowData = await searchMedia(query, 'tv');
        const actorData = await searchMedia(query, 'person');

        const combinedResults = [
          ...movieData.results.map(result => ({ ...result, type: 'movie' })),
          ...tvShowData.results.map(result => ({ ...result, type: 'tv' })),
          ...actorData.results.map(result => ({ ...result, type: 'person' })),
        ];

        setSearchResults(combinedResults);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="page-container">
      <AppNavbar />
      <div className="home-container">
        <h2>Search Results for: {query}</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="search-results">
            {searchResults.length > 0 ? (
              <div className="result-list">
                {searchResults.map(result => (
                  <div key={result.id} className="result-item">
                    {result.type === 'movie' && <MovieCard movie={result} />}
                    {result.type === 'tv' && <TVShowCard movie={result} />}
                    {result.type === 'person' && <ActorCard actor={result} />}
                  </div>
                ))}
              </div>
            ) : (
              <p>No results found for "{query}".</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
