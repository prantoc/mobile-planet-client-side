import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { successToast } from '../../../toast/Toaster';

const PaymentModal = ({ show, handleClose, bookedProduct, setShow, refetch }) => {
    const { _id, resellPrice, productId, buyerName, buyerEmail } = bookedProduct

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://b612-used-products-resale-server-side-prantoc.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            },
            body: JSON.stringify({ resellPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resellPrice]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }










        //# payment processing 
        setLoading(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            // setLoading(false)
            return;
        }
        if (paymentIntent.status === "succeeded") {

            const payment = {
                resellPrice,
                transactionId: paymentIntent.id,
                buyerEmail,
                id: _id,
                productId
            }

            fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/payments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem('mobile-planet')}`
                },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        setLoading(false)
                        setShow(false)
                        refetch()
                        successToast('Your Payment has been completed successfully!')
                    }
                })
        }



    };


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment for {bookedProduct.productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="py-4">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />



                        <button className='btn btn-primary mt-3' type="submit" disabled={!stripe || !clientSecret}>

                            {
                                loading
                                    ?
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    'Pay now'
                            }
                        </button>

                    </form>
                    {cardError && <p className='text-danger fw-bold py-3'>{cardError}</p>}
                </Modal.Body>
            </Modal>

        </>
    );
};

export default PaymentModal;