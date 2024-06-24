import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';
import './Styles.css';
import SignIn from '../../pages/SignIn/SignIn';

const API_KEY = '10aef7c000aeb272dacfd5f6f1135300';

const AppNavbar = () => {
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres);
      })
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  const handleGenreSelect = (genreId) => {
    navigate(`/genre/${genreId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const showMoviesDropdown = (e) => {
    const dropdown = e.currentTarget.querySelector('.movies-dropdown');
    if (dropdown) {
      dropdown.classList.add('show');
    }
  };

  const hideMoviesDropdown = (e) => {
    const dropdown = e.currentTarget.querySelector('.movies-dropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
  };

  const showGenresDropdown = (e) => {
    const dropdown = e.currentTarget.querySelector('.genres-dropdown');
    if (dropdown) {
      dropdown.classList.add('show');
    }
  };

  const hideGenresDropdown = (e) => {
    const dropdown = e.currentTarget.querySelector('.genres-dropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
  };

  const handleSignIn = (user) => {
    setUser(user);
    setShowSignInModal(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Navbar expand="lg" className="mb-3 custom-navbar">
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <i className="fas fa-film" style={{ color: '#bfbfbf' }}></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link
              as={Link}
              to="/movies/popular"
              className="nav-link custom-dropdown"
              onMouseEnter={showMoviesDropdown}
              onMouseLeave={hideMoviesDropdown}
            >
              Movies
              <div className="movies-dropdown">
                <Link to="/movies/popular" className="dropdown-item">Popular</Link>
                <Link to="/movies/top_rated" className="dropdown-item">Top Rated</Link>
                <Link to="/movies/upcoming" className="dropdown-item">Upcoming</Link>
                <Link to="/movies/now_playing" className="dropdown-item">Now Playing</Link>
              </div>
            </Nav.Link>
            <Nav.Link
              className="nav-link custom-dropdown"
              onMouseEnter={showGenresDropdown}
              onMouseLeave={hideGenresDropdown}
            >
              Genres
              <div className="genres-dropdown">
                {genres.map(genre => (
                  <Link key={genre.id} to={`/genre/${genre.id}`} className="dropdown-item" onClick={() => handleGenreSelect(genre.id)}>
                    {genre.name}
                  </Link>
                ))}
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/actors" className="nav-link">Actors</Nav.Link>
            <Nav.Link as={Link} to="/tvshows" className="nav-link">Tv Shows</Nav.Link>
          </Nav>
          <Form className="form-inline" inline onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search movies, actors or tv-shows..."
              className="mr-sm-2 form-control search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
          {user ? (
            <Button className="sign-in-button" onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <Button className="sign-in-button" onClick={() => setShowSignInModal(true)}>Sign In</Button>
          )}
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignIn onSignIn={handleSignIn} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
