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
                            <div className='mx-auto bg-light p-3 rounded-circle'><img src={paymentIcon} alt="" height={60} /></div>
                            <Card.Body className='fw-bold'> Secured Payment</Card.Body>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, nemo saepe fugit modi ullam cumque doloribus. Quaerat maiores tempore, explicabo vero expedita ullam ea corrupti ipsam ipsa architecto minus amet?</span>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='border-0 text-center'>
                            <div className='mx-auto bg-light p-3 rounded-circle'> <img src={serviceIcon} alt="" height={60} /></div>
                            <Card.Body className='fw-bold'>Qualityfull Products</Card.Body>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, nemo saepe fugit modi ullam cumque doloribus. Quaerat maiores tempore, explicabo vero expedita ullam ea corrupti ipsam ipsa architecto minus amet?</span>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='border-0 text-center'>
                            <div className='mx-auto bg-light p-3 rounded-circle'><img src={searchIcon} alt="" height={60} /></div>
                            <Card.Body className='fw-bold'>Quickly Get Product</Card.Body>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, nemo saepe fugit modi ullam cumque doloribus. Quaerat maiores tempore, explicabo vero expedita ullam ea corrupti ipsam ipsa architecto minus amet?</span>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Service;