import React, { useContext } from 'react';
import { Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo.png'
import '../../../assets/css/main/main.css'
import { AuthContext } from '../../../contexts/AuthProvider';
import { errorToast, successToast } from '../../../toast/Toaster';
import avatar from '../../../assets/avater/man.png'
import { useAdmin } from '../../../hooks/useAdmin';
const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const userLogout = () => {
        logoutUser()
            .then(() => {
                successToast(' Sign-out successful');
            }).catch((e) => {
                errorToast(e);
            });
    }
    return (
        <>
            <Navbar expand="lg" className='shadow-lg p-3 dark-nav-bg'>
                <Container fluid>
                    <Navbar.Brand className='fw-bold logo'>
                        <Link to='/' className='nav-link'>
                            <img src={logo} alt='Logo' /> <span style={{ color: "#00a0ff" }}>Mobile Planet</span>
                        </Link>
                    </Navbar.Brand>
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
                            {isAdmin && <LinkContainer to="/dashboard">
                                <Nav.Link className='cs-color-primary fw-bold'>Admin-Dashboard</Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>

                </Container>
                <div className='py-1 d-flex justify-content-end'>
                    {
                        user
                            ?
                            <Dropdown>
                                <Dropdown.Toggle className='border-0 pt-0 mt-0' variant="outline-light" id="dropdown-basic">
                                    <Image roundedCircle style={{ height: '38px' }} src={user.photoURL ? user.photoURL : avatar} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='position-absolute end-100 translate-middle-x' style={{ zIndex: '9999' }}>
                                    <Dropdown.Item >{user?.displayName}</Dropdown.Item>
                                    <Dropdown.Item onClick={userLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            :
                            <>
                                <LinkContainer to="/login" className='me-1 d-block'>
                                    <Link className="nav-link bg-primary text-white px-3 p-2 rounded-pill">Login</Link>
                                </LinkContainer>
                                <LinkContainer to="/signup">
                                    <Link className="nav-link text-white px-3 p-2 rounded-pill cs-bg-primary">SignUp</Link>
                                </LinkContainer>
                            </>
                    }
                </div>
            </Navbar>

        </>
    );
};

export default NavBar;