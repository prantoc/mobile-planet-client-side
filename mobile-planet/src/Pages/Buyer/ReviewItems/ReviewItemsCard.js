import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
const ReviewItemsCard = ({ bkp, setBookedProduct, handleShow }) => {

    const { isLoading } = useQuery({
        queryKey: ['paymentProduct', bkp?.productId],
        queryFn: () => fetch(`http://localhost:5000/paymentProduct?id=${bkp?.productId}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }).then(res => res.json())

    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            <div className="col-md-6 col-lg-4 col-xl-4 mb-5">
                <div className="card card-stepper" style={{ borderRadius: '16px' }}>
                    <div className="card-header p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-2"> Order ID <span className="fw-bold text-body">{bkp._id}</span></p>
                                <p className="text-muted mb-0"> Place On <span className="fw-bold text-body">{moment(bkp.createdAt,).format('D,MMMM YYYY')}</span> </p>
                            </div>
                            <div>
                                {bkp.paid === true ?
                                    <span className='text-success fw-bold fs-5'>PAID</span> :
                                    <Button className='btn-sm' onClick={() => { setBookedProduct(bkp); handleShow() }}>Pay</Button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="d-flex flex-row mb-4 pb-2">
                            <div className="flex-fill">
                                <h5 className="bold">{bkp.productName.slice(0, 20)}</h5>
                                <p className="text-muted"> Qt: 1 item</p>
                                <h4 className="mb-3"> $ {bkp.resellPrice}</h4>
                                <p className="text-muted">Tracking Status on: <span className="text-body">11:30pm, Today</span></p>
                            </div>
                            <div>
                                <img
                                    src={bkp.productImage} width="150" height="150" alt="" className="align-self-center rounded-start" />
                            </div>
                        </div>
                        <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">



                            {bkp.paid === true ?
                                <>
                                    <li className="step0 active" id="step1"><span
                                        style={{ marginLeft: '22px', marginTop: '12px' }}>Placed</span></li>
                                    <li className="step0 active text-center" id="step2"><span>Payment</span></li>
                                    <li className="step0 active text-end" id="step3"><span
                                        style={{ marginRight: '22px' }}>Deliverd</span></li>
                                </>
                                :
                                <>
                                    <li className="step0 active" id="step1"><span
                                        style={{ marginLeft: '22px', marginTop: '12px' }}>Placed</span></li>
                                    <li className="step0  text-center" id="step2"><span>Payment</span></li>
                                    <li className="step0 text-muted text-end" id="step3"><span
                                        style={{ marginRight: '22px' }}>Deliverd</span></li>
                                </>
                            }



                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewItemsCard;