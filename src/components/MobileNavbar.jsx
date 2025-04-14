import React, { useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, Image, Button } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const MobileNavBar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <>
            <Navbar bg="transparent " variant="dark" className="d-md-none">
                <Container fluid>
                    <Button variant="link" onClick={handleShow} className="text-white">
                        <BsList size={24} />
                    </Button>
                    <Navbar.Brand className="mx-auto">Spotify</Navbar.Brand>
                    <Image
                        src="/images/avatar.png"
                        roundedCircle
                        width="40"
                        height="40"
                        alt="User Avatar"
                    />
                </Container>
            </Navbar>

            <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" className="bg-dark text-white">
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={NavLink} to="/" onClick={handleClose} className="text-white my-2">
                            For You
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/top-tracks" onClick={handleClose} className="text-white my-2">
                            Top Tracks
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/favourites" onClick={handleClose} className="text-white my-2">
                            Favourites
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/recently-played" onClick={handleClose} className="text-white my-2">
                            Recently Played
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MobileNavBar;