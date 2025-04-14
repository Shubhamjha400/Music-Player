import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBar from './components/SIdeNavbar';
import songsData from './data/songs';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { updateRecentlyPlayed } from './utils/recentlyplayed';
import RecentlyPlayed from './pages/RecentlyPlayed'
import FavouriteSongs from './pages/FavouriteSongs'
import Home from './pages/Home';
import MobileNavBar from './components/MobileNavbar';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [appBgGradient, setAppBgGradient] = useState('linear-gradient(135deg, #000, #333)');

  const getCurrentIndex = () => {
    return songsData.findIndex(song => song.id === currentSong?.id);
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    updateRecentlyPlayed(song);
  };

  const handleNextSong = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % songsData.length;
    setCurrentSong(songsData[nextIndex]);
  };

  const handlePrevSong = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    setCurrentSong(songsData[prevIndex]);
  };
  const handleBackgroundChange = (gradient) => {
    setAppBgGradient(gradient);
  };
  return (
    <Router>
      <div
        style={{ background: appBgGradient, transition: 'background 0.5s ease-in-out', minHeight: '100vh' }}>
        {/* Mobile Navigation (only on small screens) */}
        <div className="d-block d-md-none">
          <MobileNavBar />
        </div>
        <Container fluid className="app-container">
          <Row className='g-0'>
            {/*Sidebar Column */}
            <Col md={2} className="d-none d-md-block side-nav-container">
              <SideNavBar />
            </Col>
            {/* Main Content Column */}
            <Col xs={12} md={10} className='main-content'>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      currentSong={currentSong}
                      handleSelectSong={handleSelectSong}
                      handleNextSong={handleNextSong}
                      handlePrevSong={handlePrevSong}
                      handleBackgroundChange={handleBackgroundChange}
                    />
                  }
                />
                <Route path='/recently-played' element={<RecentlyPlayed />} />
                <Route path='/favourites' element={<FavouriteSongs />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;