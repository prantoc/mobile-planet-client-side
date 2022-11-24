import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import paymentIcon from '../../../assets/service/secure-payment.png'
import serviceIcon from '../../../assets/service/courier.png'
import searchIcon from '../../../assets/service/verification.png'
const Service = () => {
    return (
        <>
            <Container className='py-5 my-5'>
                <h1 className='text-center py-5 fw-bold'>WE'VE GOT YOUR BACK</h1>
                <Row>
                    <Col md={4}>
                        <Card className='border-0 text-center'>
                            <Card.Body className='fw-bold'> <img src={paymentIcon} alt="" /> Secured Payment</Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='border-0 text-center'>
                            <Card.Body className='fw-bold'> <img src={serviceIcon} alt="" /> Qualityfull Products</Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='border-0 text-center'>
                            <Card.Body className='fw-bold'> <img src={searchIcon} alt="" /> Quickly Get Product</Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Service;