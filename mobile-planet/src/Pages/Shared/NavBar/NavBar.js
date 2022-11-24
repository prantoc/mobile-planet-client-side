import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo.png'
const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className='shadow-lg p-3 dark-nav-bg'>
                <Container fluid>
                    <Navbar.Brand href="/" className='fw-bold logo'><img src={logo} alt='Logo' /> <span style={{ color: "#00a0ff" }}>Photography</span> <span style={{ color: "#64f0ff" }}>World</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="services">
                                <Nav.Link>Services</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="blog">
                                <Nav.Link>Blog</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="add-service">
                                <Nav.Link>Add Service</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="my-reviews">
                                <Nav.Link>My Reviews</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        <Nav className='py-1'>
                            <LinkContainer to="/login" >
                                <Link className="nav-link">Login</Link>
                            </LinkContainer>
                            <LinkContainer to="/signup">
                                <Link className="nav-link">SignUp</Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;