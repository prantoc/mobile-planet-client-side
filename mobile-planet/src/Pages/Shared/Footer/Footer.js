import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Footer = () => {
    return (
        <>
            <footer className="bg-footer shadow text-secondary text-center py-5">
                <div className="container">
                    <footer className="py-5">
                        <div className="row">
                            <div className="col-6 col-md-2 mb-3">
                                <h5>Section</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Home</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Features</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Pricing</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">FAQs</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">About</Link></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-2 mb-3">
                                <h5>Section</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Home</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Features</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Pricing</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">FAQs</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">About</Link></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-2 mb-3">
                                <h5>Section</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Home</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Features</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">Pricing</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">FAQs</Link></li>
                                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0 text-muted">About</Link></li>
                                </ul>
                            </div>

                            <div className="col-md-5 offset-md-1 mb-3">
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of what's new and exciting from us.</p>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <Form className="d-flex shadow-md p-2 mb-5 ms-lg-4 bg-body border rounded-pill col-12 animate__animated animate__backInLeft">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            className="me-2 border-0"
                                        />
                                        <PrimaryButton variant='primary px-5 py-2 rounded-pill'>Subscribe</PrimaryButton>
                                    </Form>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-sm-row justify-content-between py-2 my-2 border-top">
                            <p> © 2022 <a href="https://github.com/prantoc" className='cs-color-primary'>Pranto</a> - All rights reserved.</p>
                            <ul className="list-unstyled d-flex">
                                <li className="ms-3"><Link className="cs-color-primary fw-bold fs-5" href="#"> <FaFacebookF /> </Link></li>
                                <li className="ms-3"><Link className="cs-color-primary fw-bold fs-5" href="#"> <FaTwitter></FaTwitter> </Link></li>
                                <li className="ms-3"><Link className="cs-color-primary fw-bold fs-5" href="#"> <FaLinkedinIn></FaLinkedinIn> </Link></li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </footer>
        </>
    );
};

export default Footer;