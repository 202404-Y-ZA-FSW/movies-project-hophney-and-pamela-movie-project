import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchGenres } from '../../util/API';

const AppNavbar = () => {
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData.genres);
    };
    getGenres();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand> {/*website Icon to be replace "Home" */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
          <Button variant="outline-success" type="submit">Home</Button> {/*Functionality needed for home button*/}
            <NavDropdown title="Genres" id="genres-dropdown">
              {genres.map((genre) => (
                <NavDropdown.Item key={genre.id} as={Link} to={`/genre/${genre.id}`}>
                  {genre.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Movies" id="movies-dropdown">
              {['Top Rated', 'Popular', 'Latest', 'Now Playing', 'Upcoming'].map((category) => (
                <NavDropdown.Item key={category} as={Link} to={`/movies/${category.toLowerCase().replace(' ', '-')}`}>
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to="/actors">Actors</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;