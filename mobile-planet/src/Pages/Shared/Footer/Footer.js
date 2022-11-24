import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Footer = () => {
    return (
        <>
            <footer className="bg-footer shadow text-secondary text-center py-5">
                <div class="container">
                    <footer class="py-5">
                        <div class="row">
                            <div class="col-6 col-md-2 mb-3">
                                <h5>Section</h5>
                                <ul class="nav flex-column">
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Home</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Features</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Pricing</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">FAQs</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">About</Link></li>
                                </ul>
                            </div>
                            <div class="col-6 col-md-2 mb-3">
                                <h5>Section</h5>
                                <ul class="nav flex-column">
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Home</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Features</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Pricing</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">FAQs</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">About</Link></li>
                                </ul>
                            </div>
                            <div class="col-6 col-md-2 mb-3">
                                <h5>Section</h5>
                                <ul class="nav flex-column">
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Home</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Features</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">Pricing</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">FAQs</Link></li>
                                    <li class="nav-item mb-2"><Link href="#" class="nav-link p-0 text-muted">About</Link></li>
                                </ul>
                            </div>

                            <div class="col-md-5 offset-md-1 mb-3">
                                <form>
                                    <h5>Subscribe to our newsletter</h5>
                                    <p>Monthly digest of what's new and exciting from us.</p>
                                    <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                                        <Form className="d-flex shadow-md p-2 mb-5 ms-lg-4 bg-body border rounded-pill col-12 animate__animated animate__backInLeft">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email Address"
                                                className="me-2 border-0"
                                            />
                                            <PrimaryButton variant='primary px-5 py-2 rounded-pill'>Subscribe</PrimaryButton>
                                        </Form>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                            <p> © 2022 <a href="https://github.com/prantoc" className='cs-color-primary'>Pranto</a> - All rights reserved.</p>
                            <ul class="list-unstyled d-flex">
                                <li class="ms-3"><Link class="cs-color-primary fw-bold fs-5" href="#"> <FaFacebookF /> </Link></li>
                                <li class="ms-3"><Link class="cs-color-primary fw-bold fs-5" href="#"> <FaTwitter></FaTwitter> </Link></li>
                                <li class="ms-3"><Link class="cs-color-primary fw-bold fs-5" href="#"> <FaLinkedinIn></FaLinkedinIn> </Link></li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </footer>
        </>
    );
};

export default Footer;