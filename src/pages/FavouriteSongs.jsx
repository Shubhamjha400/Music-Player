import React, { useState, useEffect } from 'react';
import { ListGroup, Image, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const FavouriteSongs = () => {
    const [favouriteSongs, setFavouriteSongs] = useState([]);

    useEffect(() => {
        // Read favorites from localStorage or default to an empty array.
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavouriteSongs(storedFavorites);
    }, []);

    const removeFavorite = (songId) => {
        const updatedFavorites = favouriteSongs.filter(song => song.id !== songId);
        setFavouriteSongs(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favourite-songs p-3">
            <h5 className="text-white mb-3">Favourite Songs</h5>
            {favouriteSongs.length ? (
                <ListGroup variant="flush">
                    {favouriteSongs.map((song, index) => (
                        <ListGroup.Item key={index} className="bg-transparent text-white border-0">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className='d-flex align-items-center'>{song.thumbnail && (
                                    <Image
                                        src={song.thumbnail}
                                        alt={song.title}
                                        rounded
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '1rem' }}
                                    />
                                )}
                                    <div>
                                        <div className="fw-bold">{song.title}</div>
                                        <div className="text-white">{song.artist}</div>
                                    </div>
                                </div>
                                <div className="remove-icon-container" style={{ width: '40px', textAlign: 'right' }}>
                                    <Button
                                        variant="link"
                                        className="text-white p-0"
                                        onClick={() => removeFavorite(song.id)}
                                    >
                                        <FaTimes size={18} />
                                    </Button>
                                </div>
                            </div>
                            {/* X Icon for removing the song from favorites */}


                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p className="text-muted">No favorites added yet.</p>
            )}
        </div>
    );
};

export default FavouriteSongs;
