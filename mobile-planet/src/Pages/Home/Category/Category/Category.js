import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import apple from '../../../../assets/brand/apple.png'
import nokia from '../../../../assets/brand/nokia.png'
import samsung from '../../../../assets/brand/samsung.png'
import oppo from '../../../../assets/brand/oppo.png'
import { Link } from 'react-router-dom';
const Category = () => {
    return (
        <>
            <Container className='py-5 my-5'>
                <h1 className='text-center py-5 fw-bold'>SHOP & SELL BY CATEGORY</h1>
                <Row>
                    <Col md={3} className="mb-2 text-center animate__animated animate__backInUp">
                        <Link className='nav-link'>
                            <Card>
                                <Card.Body className='fw-bold'> <img src={apple} alt="" /> Apple</Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} className="mb-2 text-center animate__animated animate__backInUp">
                        <Link className='nav-link'>
                            <Card>
                                <Card.Body className='fw-bold'> <img src={nokia} alt="" /> Nokia</Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} className="mb-2 text-center animate__animated animate__backInUp">
                        <Link className='nav-link'>
                            <Card>
                                <Card.Body className='fw-bold'> <img src={samsung} alt="" /> Samsung</Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} className="mb-2 text-center animate__animated animate__backInUp">
                        <Link className='nav-link'>
                            <Card>
                                <Card.Body className='fw-bold'> <img src={oppo} alt="" /> Oppo</Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Category;