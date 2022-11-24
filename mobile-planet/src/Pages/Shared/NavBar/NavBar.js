import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo.png'
import '../../../assets/css/main/main.css'
const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className='shadow-lg p-3 dark-nav-bg'>
                <Container fluid>
                    <Navbar.Brand href="/" className='fw-bold logo'><img src={logo} alt='Logo' /> <span style={{ color: "#00a0ff" }}>Mobile Planet</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className='' />
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
                                <Nav.Link>All Products</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="blog">
                                <Nav.Link>Blog</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
                <div className='py-1 d-flex justify-content-end'>
                    <LinkContainer to="/login" className='me-1 d-block'>
                        <Link className="nav-link bg-primary text-white px-3 p-2 rounded-pill">Login</Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Link className="nav-link text-white px-3 p-2 rounded-pill cs-bg-primary">SignUp</Link>
                    </LinkContainer>
                </div>
            </Navbar>

        </>
    );
};

export default NavBar;