import React from 'react';
import { Col } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
const ProductCard = ({ product }) => {
    return (
        <>
            <Col lg={6} className="animate__animated animate__backInLeft mx-auto mb-2">
                <Link to={`/product-details/${product._id}`} className='nav-link'>
                    <div className="card mb-3 shadow-sm px-3 bg-body rounded border-0 mx-auto advertise-card" >
                        <div className="row g-0">
                            <div className="col-md-4 py-2">
                                <img className="rounded-start h-100 product-card-img" src={product.productImage} alt="" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title">{product.productName}</h5>
                                        {product.advertise === true &&
                                            <span className=' advertise-tag position-absolute end-0' bg="primary">Advertised</span>}
                                    </div>
                                    <div>
                                        <span className='mb-2 d-block'><FaMapMarkerAlt></FaMapMarkerAlt> {product.location}, {product.productCategory}</span>
                                        <span className='fw-bold' style={{ color: "#00a0ff" }}>${product.resellPrice}</span>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-center">

                                        <p className="card-text"><small className="text-muted">{moment(product.createdAt,).startOf('hour').fromNow()}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </Col>
        </>
    );
};

export default ProductCard;