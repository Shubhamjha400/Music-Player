import React, { useState, useRef, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaEllipsisH, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { Vibrant } from "node-vibrant/browser";
import { updateFavorite } from "../utils/favorites";
import { useLocation } from "react-router-dom";

const MusicPlayer = ({ currentSong, onNextSong, onPrevSong, onBackgroundChange }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [bgGradient, setBgGradient] = useState('linear-gradient(135deg, #000, #333)');
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const location = useLocation();
    const showUI = location.pathname === "/";

    useEffect(() => {
        if (currentSong) {
            Vibrant.from(currentSong.thumbnail)
                .getPalette()
                .then((palette) => {
                    let vibrantColor = [0, 0, 0]; // default fallback
                    if (palette.Vibrant && palette.Vibrant.rgb && Array.isArray(palette.Vibrant.rgb)) {
                        vibrantColor = palette.Vibrant.rgb;
                    }
                    const darkColor = vibrantColor.map(component => Math.floor(component * 0.2));
                    const gradient = `radial-gradient(circle at top left, rgb(${darkColor.join(',')}) 15%, #000 80%)`;
                    setBgGradient(gradient);
                    // Call the callback prop to update the entire app's background
                    if (onBackgroundChange) {
                        onBackgroundChange(gradient);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching color palette:', err);
                    const defaultGradient = 'linear-gradient(135deg, #000, #333)';
                    setBgGradient(defaultGradient);
                    if (onBackgroundChange) {
                        onBackgroundChange(defaultGradient);
                    }
                });
        }
    }, [currentSong, onBackgroundChange]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            setIsPlaying(false);
            setCurrentTime(0);
        }
    }, [currentSong]);

    // Update currentTime as audio plays
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Seek in the audio when the user changes the range input
    const handleChangeProgress = (e) => {
        const newTime = e.target.value;
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };


    // Toggle play/pause
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Toggle mute/unmute
    const handleMuteUnmute = () => {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(!isMuted);
    };

    // When the current song changes, load the new track
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentSong]);

    // Function to mark current song as favorite via the dropdown option
    const handleAddFavorite = () => {
        updateFavorite(currentSong);
    };


    return (
        <div className="music-player-container">
            {/* Persistent audio element: always mounted so playback continues */}
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} style={{ display: "none" }}>
                {currentSong && currentSong.musicUrl && (
                    <source src={currentSong.musicUrl} type="audio/mp3" />
                )}
            </audio>

            {/* Conditionally render the MusicPlayer UI only when on the Home route */}
            {showUI && currentSong && (
                <div className="music-player p-4 d-flex flex-column align-items-center justify-content-center h-100">
                    <h4 className="text-white">{currentSong.title || "Select a song"}</h4>
                    <p className="text-white">{currentSong.artist || ""}</p>
                    <div className="album-info text-center mb-4">
                        <img
                            src={currentSong.thumbnail}
                            alt={currentSong.title}
                            className="img-fluid rounded mb-2"
                            style={{ maxWidth: "400px", maxHeight: "400px" }}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="range"
                            className="form-range"
                            style={{ width: '400px' }}
                            min="0"
                            max={audioRef.current?.duration || 0}
                            step="0.01"
                            value={currentTime}
                            onChange={handleChangeProgress}
                        />
                    </div>
                    <div className="controls d-flex justify-content-center align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-white">
                                <FaEllipsisH size={24} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleAddFavorite}>
                                    Add to Favorites
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="link" className="text-white me-3" onClick={onPrevSong}>
                            <FaStepBackward size={24} />
                        </Button>
                        <Button variant="link" className="text-white me-3" onClick={handlePlayPause}>
                            {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
                        </Button>
                        <Button variant="link" className="text-white me-3" onClick={onNextSong}>
                            <FaStepForward size={24} />
                        </Button>
                        <Button variant="link" className="text-white me-3" onClick={handleMuteUnmute}>
                            {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;

