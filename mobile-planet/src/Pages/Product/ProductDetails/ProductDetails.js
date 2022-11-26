import React from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import moment from 'moment';
import CardImg from '../../../assets/banner/banner4.jpg'
import { FaCheckCircle, FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaShareSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ProductDetails = () => {
    const product = useLoaderData();
    const navigation = useNavigation()
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    return (
        <>
            <Container className='py-4'>
                <Row>
                    <Col lg={12} className="animate__animated animate__backInLeft mx-auto">
                        <div className="card mb-3 shadow-lg p-3 bg-body rounded border-0 mx-auto" >
                            <div className="row g-0">
                                <div className='col-md-8 px-5'>
                                    <div>
                                        <div className="d-flex align-items-center mb-2">
                                            <h4 className="card-title me-3">{product.productName}</h4>
                                            <Badge bg="primary">Advertised</Badge>
                                        </div>
                                        <div>
                                            <span className='mb-2 d-block'><FaMapMarkerAlt></FaMapMarkerAlt> {product.location}</span>
                                            <small className="text-muted">{moment(product.createdAt,).format('MMMM Do YYYY, h:mm:ss a')}</small>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <img className="img-fluid rounded-start h-100" src={CardImg} alt="" />
                                                <h1 className='fw-bold mt-2' style={{ color: "#00a0ff" }}>${product.resellPrice}</h1>

                                                <div className='row mb-5'>
                                                    <div className="col-md-6 mb-2">
                                                        Condition : {product.condition}
                                                    </div>
                                                    <div className="col-md-6 mb-2">
                                                        Brand:  <Link to={`/category/${product.productCategory}`}>{product.productCategory}</Link>
                                                    </div>
                                                    <div className="col-md-6 mb-2">
                                                        Orginal Price :  ${product.orginalPrice}
                                                    </div>
                                                    <div className="col-md-6 mb-2">
                                                        Used year: {product.usedYear}
                                                    </div>
                                                    <div className="col-md-6 mb-2">
                                                        Purchase year: {moment(product.purchaseYear, "YYYYMMDD").fromNow()}
                                                    </div>
                                                </div>
                                                <span className='text-secondary'>
                                                    <h5>Description</h5>
                                                    {product.description}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 mt-md-0 mt-5'>
                                    <div>
                                        <div className="d-flex align-items-center mb-3">
                                            <span className='me-5'> <FaShareSquare></FaShareSquare> Share</span>
                                            <span role="button"><FaHeart></FaHeart> Wishlist</span>
                                        </div>
                                        <div className="list-group w-auto">
                                            <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                                <div className="d-flex gap-2 w-100 justify-content-between">
                                                    <div>
                                                        <h5 className="mb-0">{product.sellerName}
                                                            {
                                                                <span className='ms-1' role='button'>
                                                                    {product.verifiedSeller ? <FaCheckCircle title='Verified user' className='text-primary fs-6'></FaCheckCircle> : <FaCheckCircle title='Unverified User' className='text-secondary'></FaCheckCircle>}
                                                                </span>
                                                            }</h5>
                                                        <p className="my-1 opacity-75">{product.sellerEmail}</p>
                                                    </div>
                                                    <small className="opacity-80  text-primary"><a className='nav-link' href={`tel:${product.sellerPhone}`}><FaPhoneAlt></FaPhoneAlt> Call Now</a></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group w-auto mt-4 card">
                                        <h5 className='p-3 '>Safty Tips</h5>
                                        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                            <img src="https://github.com/twbs.png" alt="" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                            <div className="d-flex gap-2 w-100 justify-content-between">
                                                <div>
                                                    <h6 className="mb-0">List group item heading</h6>
                                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                                </div>
                                                <small className="opacity-50 text-nowrap">now</small>
                                            </div>
                                        </div>
                                        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                            <img src="https://github.com/twbs.png" alt="" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                            <div className="d-flex gap-2 w-100 justify-content-between">
                                                <div>
                                                    <h6 className="mb-0">List group item heading</h6>
                                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                                </div>
                                                <small className="opacity-50 text-nowrap">now</small>
                                            </div>
                                        </div>
                                        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                            <img src="https://github.com/twbs.png" alt="" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                            <div className="d-flex gap-2 w-100 justify-content-between">
                                                <div>
                                                    <h6 className="mb-0">List group item heading</h6>
                                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                                </div>
                                                <small className="opacity-50 text-nowrap">now</small>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default ProductDetails;