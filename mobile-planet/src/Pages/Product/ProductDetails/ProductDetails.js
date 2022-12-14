import React, { useContext, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '../../Shared/Loading/Loading';
import moment from 'moment';
import { FaCheckCircle, FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaShareSquare, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import BookOrderModal from '../BookOrderModal/BookOrderModal';
import { useAdmin } from '../../../hooks/useAdmin';
import { useSeller } from '../../../hooks/useSeller';
import { useQuery } from '@tanstack/react-query';
import useTitle from '../../../hooks/useTitle';
const ProductDetails = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const product = useLoaderData();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigation = useNavigation()
    useTitle(product.productName)

    const { data: bookedProduct, isLoading, refetch } = useQuery({
        queryKey: ['booked-product', user?.email, product?._id],
        queryFn: () => fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/bookedProduct?email=${user?.email}&id=${product?._id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }).then(res => res.json())
    })

    const { data: wishlist, isLoading: wishLoading, refetch: wishRefatch } = useQuery({
        queryKey: ['wishlist', product?._id],
        queryFn: () => fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/wishlistProduct?id=${product?._id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }).then(res => res.json())
    })

    const handleAddToWishList = (id) => {
        fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/addToWishlistProduct?id=${id}&name=${product.productName}&img=${product.productImage}&price=${product.resellPrice}`, {
            method: 'put',
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.acknowledged) {
                    refetch()
                    wishRefatch()
                }
            })
    }


    if (navigation.state === "loading" || isLoading || wishLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            <Container className='py-4'>
                <Row>
                    <Col lg={12} className=" mx-auto">
                        <div className="card mb-3 shadow-lg p-3 bg-body rounded border-0 mx-auto" >
                            <div className="row g-0">
                                <div className='col-md-8 px-5 animate__animated animate__backInLeft'>
                                    <div>
                                        <div className="d-flex align-items-center mb-2">
                                            <h4 className="card-title me-3">{product.productName}</h4>

                                            {product.advertise === true &&
                                                <Badge bg="primary">Advertised</Badge>}
                                        </div>
                                        <div>
                                            <span className='mb-2 d-block'><FaMapMarkerAlt></FaMapMarkerAlt> {product.location}</span>
                                            <small className="text-muted">{moment(product.createdAt,).format('MMMM Do YYYY, h:mm:ss a')}</small>
                                        </div>
                                        <div className="card-body">
                                            <div>

                                                <PhotoProvider>
                                                    <PhotoView src={product.productImage}>
                                                        <img role='button' className="img-fluid rounded-start h-100" src={product.productImage} alt="" />
                                                    </PhotoView>
                                                </PhotoProvider>
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
                                <div className='col-md-4 mt-md-0 mt-5 animate__animated animate__backInRight sticky-top'>
                                    <div>
                                        <div className="d-flex align-items-center mb-3 justify-content-between">
                                            <span > <FaShareSquare className='text-secondary'></FaShareSquare> Share</span>
                                            {
                                                !isAdmin && !isSeller && user &&
                                                <span role="button" className={wishlist?.wishlist === true ? 'text-primary' : 'secondary'} onClick={() => handleAddToWishList(product._id)}>
                                                    <FaHeart className='me-1' />
                                                    Wishlist
                                                </span>

                                            }
                                            {!isAdmin && !isSeller &&
                                                user &&
                                                bookedProduct?.productId === product._id ?
                                                <Button variant='secondary'>Booked</Button>
                                                :
                                                user &&
                                                <Button variant="primary" onClick={handleShow}>
                                                    Book Now <FaShoppingCart></FaShoppingCart>
                                                </Button>
                                            }
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
                                                    <a className='nav-link text-primary' href={`tel:${product.sellerPhone}`}><FaPhoneAlt></FaPhoneAlt> <small className='d-none d-lg-block'>call now</small></a>
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

            <BookOrderModal refetch={refetch} user={user} handleClose={handleClose} setShow={setShow} show={show} product={product}></BookOrderModal>

        </>
    );
};

export default ProductDetails;