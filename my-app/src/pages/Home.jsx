import React from 'react';
import AppNavbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppNavbar />
      <div className="movies_container" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <h1>Welcome page</h1> {/*to be replaced by movies and a slider*/}
        <p>This is the homepage where you can find the latest movies and more!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
