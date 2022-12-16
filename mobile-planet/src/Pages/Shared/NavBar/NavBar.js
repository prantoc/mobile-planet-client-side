import React, { useContext } from 'react';
import { Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/logo.png'
import '../../../assets/css/main/main.css'
import { AuthContext } from '../../../contexts/AuthProvider';
import { errorToast, successToast } from '../../../toast/Toaster';
import avatar from '../../../assets/avater/man.png'
import { useAdmin } from '../../../hooks/useAdmin';
import { useSeller } from '../../../hooks/useSeller';
const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const navigate = useNavigate()
    const userLogout = () => {
        logoutUser()
            .then(() => {
                successToast(' Sign-out successful');
                navigate('/login')
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
                            className="me-auto my-2 my-lg-0 fw-bold"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="all-products">
                                <Nav.Link>All Products</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="blog">
                                <Nav.Link>Blog</Nav.Link>
                            </LinkContainer>
                            {!isSeller && !isAdmin && user &&
                                <LinkContainer to="/wishlist-items">
                                    <Nav.Link >Wish List</Nav.Link>
                                </LinkContainer>
                            }
                            {
                                user
                                &&
                                <LinkContainer to={isAdmin ? '/dashboard/category' : isSeller ? '/dashboard/seller/product' : '/booked-items'}>
                                    <Nav.Link >{isAdmin ? 'Dashboard' : isSeller ? 'Dashboard' : 'Booked Items'}</Nav.Link>
                                </LinkContainer>
                            }

                        </Nav>
                    </Navbar.Collapse>
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
                                        <Dropdown.Item ><Link className='nav-link' to='wishlist-items'>Booked Items</Link></Dropdown.Item>
                                        <Dropdown.Item ><Link className='nav-link' to='wishlist-items'>Wishlist Items</Link></Dropdown.Item>
                                        <Dropdown.Item onClick={userLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                :
                                <>
                                    <LinkContainer to="/login" className='me-1 d-block'>
                                        <Link className="nav-link bg-primary text-white px-3 p-2 rounded-pill">Login</Link>
                                    </LinkContainer>
                                    <LinkContainer to="/signup" className="d-none d-lg-block">
                                        <Link className="nav-link text-white px-3 p-2 rounded-pill cs-bg-primary">SignUp</Link>
                                    </LinkContainer>
                                </>
                        }
                    </div>
                </Container>

            </Navbar>

        </>
    );
};

export default NavBar;