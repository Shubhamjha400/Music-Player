import React, { useState } from "react";
import { Form, ListGroup, Image, InputGroup } from "react-bootstrap";
import songsData from "../data/songs";
import { FaSearch } from "react-icons/fa";

const SongList = ({ onSelectSong }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSongs = songsData.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="song-list py-3">
            <h4 className="text-white mb-3">For You</h4>

            <InputGroup className="mb-3 translucent-search">
                <Form.Control
                    type="text"
                    placeholder="Search songs..."
                    aria-label="Search songs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text className="search-icon">
                    <FaSearch />
                </InputGroup.Text>
            </InputGroup>



            <ListGroup variant="flush">
                {filteredSongs.map((song) => (
                    <ListGroup.Item
                        key={song.id}
                        className="d-flex justify-content-between align-items-center song-list-item"
                        onClick={() => onSelectSong(song)}
                    >
                        <Image src={song.thumbnail} alt={song.title} rounded width="50" height="50" style={{ marginRight: '5px' }} />
                        <div className="song-info flex-grow-1 ml-2">
                            <div className="song-title">{song.title}</div>
                            <div className="song-artist">{song.artist}</div>
                        </div>
                        <div className="song-duration">{song.duration}</div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default SongList;