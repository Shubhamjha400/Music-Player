import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SongList from '../components/SongList'
import MusicPlayer from '../components/MusicPlayer';

const Home = ({
    currentSong,
    handleSelectSong,
    handleNextSong,
    handlePrevSong,
    handleBackgroundChange
}) => {
    return (
        <Row className="h-100 home-row">
            {/* Music Player Column */}
            <Col xs={12} md={8} className="music-player-container order-1 order-md-2">
                <MusicPlayer
                    currentSong={currentSong}
                    onNextSong={handleNextSong}
                    onPrevSong={handlePrevSong}
                    onBackgroundChange={handleBackgroundChange}
                />
            </Col>
            {/* Song List Column */}
            <Col xs={12} md={4} className="song-list-container order-2 order-md-1">
                <SongList onSelectSong={handleSelectSong} />
            </Col>

        </Row>
    );
};

export default Home;