import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Loading from '../../Shared/Loading/Loading';
import moment from 'moment';
import { FaTrash } from 'react-icons/fa';
import { successToast } from '../../../toast/Toaster';
import useTitle from '../../../hooks/useTitle';
import { Link } from 'react-router-dom';
const WishlistItems = () => {
    useTitle('Wishlist')
    const { data: wishlists = [], isLoading, refetch } = useQuery({
        queryKey: ['wishlistedProducts'],
        queryFn: () => fetch(`http://localhost:5000/wishlistedProducts`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }).then(res => res.json())

    })


    const handleRemoveToWishList = (id) => {
        fetch(`http://localhost:5000/removeWishlistProduct/${id}`, {
            method: 'get',
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.acknowledged) {
                    successToast('Product Remove to the wishlist!')
                    refetch()
                }
            })
    }




    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="list-group w-auto mt-4 card mx-auto">
                            {
                                isLoading ?
                                    <Loading></Loading>
                                    :
                                    wishlists?.length > 0 ?

                                        wishlists?.map(wl =>
                                            <div key={wl._id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" role='button'>
                                                <img src={wl.productImg} alt="" width="100" height="80" className="flex-shrink-0" />
                                                <div className="d-flex gap-2 w-100 justify-content-between align-items-center">
                                                    {wl.paid === true ?
                                                        <div className={`nav-link ${wl.paid === true && 'text-success'}`}>
                                                            <div>
                                                                <h5 className="mb-0">
                                                                    {wl.productName}
                                                                </h5>
                                                                <p className="mb-0 opacity-75">Price: ${wl.productPrice}</p>
                                                                <p className="mb-0 opacity-75">Added: {moment(wl.createdAt,).format('D,MMMM YYYY')}</p>
                                                            </div>
                                                        </div>

                                                        :
                                                        <Link to={`/product-details/${wl.productId}`} className={`nav-link ${wl.paid === true && 'text-success'}`}>
                                                            <div>
                                                                <h5 className="mb-0">
                                                                    {wl.productName}
                                                                </h5>
                                                                <p className="mb-0 opacity-75">Price: ${wl.productPrice}</p>
                                                                <p className="mb-0 opacity-75">Added: {moment(wl.createdAt,).format('D,MMMM YYYY')}</p>
                                                            </div>
                                                        </Link>

                                                    }
                                                    {wl.paid === true && <span className='text-success fw-bold fs-5'>PAID</span>}
                                                    <small className="text-danger ">
                                                        <FaTrash onClick={() => handleRemoveToWishList(wl._id)}></FaTrash>
                                                    </small>
                                                </div>
                                            </div>
                                        )
                                        :
                                        <div className="text-center py-5">
                                            <h2 className='btn btn-danger col-4'>No Data Found !</h2>
                                        </div>
                            }
                        </div>
                    </Col>
                    {/* <Col md={5}>
                        <div key={bkp._id} className="col-md-6 col-lg-4 col-xl-4 mb-5">
                            <div className="card card-stepper" style={{ borderRadius: '16px' }}>
                                <div className="card-header p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted mb-2"> Order ID <span className="fw-bold text-body">{bkp._id}</span></p>
                                            <p className="text-muted mb-0"> Place On <span className="fw-bold text-body">{moment(bkp.createdAt,).format('D,MMMM YYYY')}</span> </p>
                                        </div>
                                        <div>
                                            <Button>Pay</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex flex-row mb-4 pb-2">
                                        <div className="flex-fill">
                                            <h5 className="bold">{bkp.productName}</h5>
                                            <p className="text-muted"> Qt: 1 item</p>
                                            <h4 className="mb-3"> $ {bkp.resellPrice}</h4>
                                            <p className="text-muted">Tracking Status on: <span className="text-body">11:30pm, Today</span></p>
                                        </div>
                                        <div>
                                            <img
                                                src={bkp.productImage} width="150" alt="" className="align-self-center rounded-start" />
                                        </div>
                                    </div>
                                    <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
                                        <li className="step0 active" id="step1"><span
                                            style={{ marginLeft: '22px', marginTop: '12px' }}>PLACED</span></li>
                                        <li className="step0 active text-center" id="step2"><span>Payment</span></li>
                                        <li className="step0 text-muted text-end" id="step3"><span
                                            style={{ marginRight: '22px' }}>DELIVERED</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col> */}
                </Row>
            </Container>
        </>
    );
};

export default WishlistItems;