import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useRouteError } from 'react-router-dom';
import errorGif from '../../../assets/error/error-404.gif'
const Error = () => {
    const error = useRouteError()
    return (
        <Container>
            <Row>
                <Col lg={6} md={6} sm={12} className="mx-auto text-center">
                    <img className='img-fluid' src={errorGif} alt="" />
                    <h2 className='cs-color-primary'>{error.statusText || error.message}</h2>
                    <Button variant='danger'><Link to="/" className='nav-link mx-auto'><FaArrowLeft /> Go to Homepage</Link></Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Error;