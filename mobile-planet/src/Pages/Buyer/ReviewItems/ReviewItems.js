
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import moment from 'moment';
import axios from 'axios';
const ReviewItems = () => {
    const { user } = useContext(AuthContext);
    const [bookedProducts, setBookedProducts] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        const config = {
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }
        axios.get(`http://localhost:5000/bookedProducts?email=${user?.email}`, config)
            .then(res => {
                setBookedProducts(res.data)
                setIsLoading(false)
            })
    }, [user?.email, setBookedProducts])

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                    {
                        isLoading ?
                            <Loading></Loading>
                            :
                            bookedProducts?.length > 0 ?
                                bookedProducts.map(bkp =>
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
                                    </div>)
                                :
                                <div className="text-center">
                                    <h2 className='btn btn-danger col-4'>No Data Found !</h2>
                                </div>

                    }
                </div>
            </div>
        </>
    );
};

export default ReviewItems;