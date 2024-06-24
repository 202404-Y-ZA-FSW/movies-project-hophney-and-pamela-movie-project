import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Styles.css';

const NotFound = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="not-found-container">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
