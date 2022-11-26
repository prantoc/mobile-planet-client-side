import React from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardImg from '../../../../assets/banner/banner4.jpg'
const Advertise = () => {
    return (
        <>
            <Container className='py-5 my-5'>
                <h1 className='text-center py-5 fw-bold'>ADVERTISE PRODUCT</h1>
                <Row>
                    <Col lg={6} className="animate__animated animate__backInLeft">
                        <Link className='nav-link'>
                            <div className="card mb-3 shadow-sm px-3 bg-body rounded border-0 mx-auto advertise-card" >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img className="img-fluid rounded-start h-100" src={CardImg} alt="" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h4 className="card-title">Card title</h4>
                                                <Badge bg="primary">Advertised</Badge>
                                            </div>
                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className='fw-bold' style={{ color: "#00a0ff" }}>$200</span>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    </Col>

                </Row>
            </Container>

        </>
    );
};

export default Advertise;