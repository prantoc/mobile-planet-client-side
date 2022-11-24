import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
const Banner = () => {
    return (
        <>
            <Container fluid className='home-top-banner'>
                <Row className='bg-layer'>
                    <Col lg={6} md={12} sm={12}>
                        <div className="justify-center p-md-5 p-lg-0">
                            <h1 className='p-lg-5 mt-5 text-white lh-base animate__animated animate__backInLeft'> The Smart, Sustainable and
                                <br />  Trusted Way to Buy and Sell <span style={{ color: '#00a0ff', fontWeight: 'bold' }}>Phone</span>.</h1>
                            <Form className="d-flex shadow-md p-2 mb-5 ms-lg-4 bg-body border rounded-pill col-12 animate__animated animate__backInLeft">
                                <Form.Control
                                    type="search"
                                    placeholder="Search Items"
                                    className="me-2 border-0"
                                    aria-label="Search"
                                />
                                <PrimaryButton variant='primary px-5 py-2 rounded-pill'>Search</PrimaryButton>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Banner;