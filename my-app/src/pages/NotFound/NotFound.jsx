import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="not-found-container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
