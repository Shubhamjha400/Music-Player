import React, { useEffect, useState } from 'react';
import { ListGroup, Image } from 'react-bootstrap';

const RecentlyPlayed = () => {
    const [recentSongs, setRecentSongs] = useState([]);

    useEffect(() => {
        // Load the recently played songs from sessionStorage
        const storedSongs = JSON.parse(sessionStorage.getItem('recentlyPlayed')) || [];
        setRecentSongs(storedSongs);
    }, []);

    return (
        <div className="recently-played my-4">
            <h5 className="text-white mb-3">Recently Played</h5>
            {recentSongs.length ? (
                <ListGroup variant="flush">
                    {recentSongs.map((song, index) => (
                        <ListGroup.Item key={index} className="bg-transparent text-white border-0">
                            {song.thumbnail && (
                                <Image
                                    src={song.thumbnail}
                                    alt={song.title}
                                    rounded
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '1rem' }}
                                />
                            )}
                            <strong>{song.title}</strong> - {song.artist}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p className="text-muted">No songs played recently.</p>
            )}
        </div>
    );
};

export default RecentlyPlayed;