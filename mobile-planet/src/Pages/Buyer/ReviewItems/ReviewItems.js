
import React, { useContext, useState } from 'react';

import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

import PaymentModal from '../../Payment/PaymentModal/PaymentModal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import useTitle from '../../../hooks/useTitle';
import ReviewItemsCard from './ReviewItemsCard';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const ReviewItems = () => {
    useTitle('Booked Items')
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [bookedProducts, setBookedProducts] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    const [bookedProduct, setBookedProduct] = useState('');


    // useEffect(() => {
    //     setIsLoading(true)
    //     const config = {
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('mobile-planet')}`
    //         }
    //     }
    //     axios.get(`https://b612-used-products-resale-server-side-prantoc.vercel.app/bookedProducts?email=${user?.email}`, config)
    //         .then(res => {
    //             setBookedProducts(res.data)
    //             setIsLoading(false)
    //         })
    // }, [user?.email, setBookedProducts])


    const { data: bookedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['wishlistedProducts', user?.email],
        queryFn: () => fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/bookedProducts?email=${user?.email}`, {
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
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                    {
                        isLoading ?
                            <Loading></Loading>
                            :
                            bookedProducts?.length > 0 ?
                                bookedProducts.map(bkp =>
                                    <ReviewItemsCard refetch={refetch} key={bkp._id} bkp={bkp} setBookedProduct={setBookedProduct} handleShow={handleShow} ></ReviewItemsCard>

                                )
                                :
                                <div className="text-center">
                                    <h2 className='btn btn-danger col-4'>No Data Found !</h2>
                                </div>

                    }
                </div>
            </div>

            {show === true && <Elements stripe={stripePromise}>
                <PaymentModal refetch={refetch} bookedProduct={bookedProduct} setShow={setShow} show={show} handleClose={handleClose}></PaymentModal>
            </Elements>}
        </>
    );
};

export default ReviewItems;