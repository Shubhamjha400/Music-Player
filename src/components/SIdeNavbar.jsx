import React from "react";
import { Nav, Image } from "react-bootstrap";
import { BsSpotify } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="sidebar d-flex flex-column py-4">
            {/* Spotify Logo / Brand */}
            <div className="spotify-brand d-flex align-items-center mb-4 px-3">
                <BsSpotify size={32} className="me-2" />
                <h5 className="m-0">Spotify</h5>
            </div>

            {/* Navigation Links */}
            <Nav className="flex-column nav-links px-2">
                <Nav.Link as={NavLink} to='/' className="text-white py-2">
                    For You
                </Nav.Link>
                <Nav.Link className="text-white py-2">
                    Top Tracks
                </Nav.Link>
                <Nav.Link as={NavLink} to='/favourites' className="text-white py-2">
                    Favourites
                </Nav.Link>
                <Nav.Link as={NavLink} to='/recently-played' className="text-white py-2">
                    Recently Played
                </Nav.Link>
            </Nav>
            <div className="user-avatar mt-auto px-3">
                <img
                    src="/images/avatar.png"
                    alt="User Avatar"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                />
            </div>
        </div>
    );
};

export default SideBar;