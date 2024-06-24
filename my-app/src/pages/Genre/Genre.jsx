import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/Moviecard';
import AppNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const GenreMovies = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');

  useEffect(() => {
    // Fetch genre name
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const genre = data.genres.find(g => g.id === parseInt(genreId));
        setGenreName(genre ? genre.name : 'Genre');
      })
      .catch(err => console.error('Error fetching genres:', err));

    // Fetch movies by genre
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(err => console.error('Error fetching movies:', err));
  }, [genreId]);

  return (
    <div className="page-container">
      <AppNavbar />
      <div className="movies-container">
        <h2>{genreName} Movies</h2>
        {movies.length > 0 ? (
          <div className="movie-list">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p>No movies found for this genre.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GenreMovies;
