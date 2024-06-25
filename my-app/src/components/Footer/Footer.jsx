import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; 
import './Styles.css';

const Footer = () => {
  return (
    <footer className="footerContainer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:hophneylentsoana@gmail.com" className="footer-link">hophneylentsoana@gmail.com</a></p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <a href="https://github.com/Hophneylen" target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaGithub />
            </a>{' '}
            |{' '}
            <a href="https://www.linkedin.com/in/hophney-lentsoana-873285193/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaLinkedin />
            </a>{' '}
            |{' '}
            <a href="mailto:hophneylentsoana@gmail.com" className="footer-link">
              <FaEnvelope />
            </a>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p>&copy; 2024 Hophney Lentsoana and Pamela. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
