import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaShoppingCart } from 'react-icons/fa';
import { successToast } from '../../../toast/Toaster';

const BookOrderModal = ({ user, handleClose, setShow, show, product, refetch }) => {
    const [load, setLoad] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const handleAddProduct = data => {
        setLoad(true)
        const today = new Date();
        const { _id, productName, resellPrice, productImage, sellerEmail } = product
        const { location, buyerNumber } = data
        const bookOrder = {
            productId: _id, productName, productImage, resellPrice, buyerName: user?.displayName, buyerEmail: user?.email, buyerNumber: buyerNumber, meetingLocation: location, sellerEmail, createdAt: today, wishlist: false, paid: false
        }

        const config = {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }

        axios.post('https://b612-used-products-resale-server-side-prantoc.vercel.app/book-product', bookOrder, config)
            .then(res => {
                if (res.data.acknowledged) {
                    setShow(false)
                    setLoad(false)
                    successToast('You booked a product successfully!')
                    refetch()
                    reset()
                }
            })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <div className='shadow-lg bg-body'>
                    <Modal.Header closeButton>
                        <Modal.Title>Book this Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form className='row' onSubmit={handleSubmit(handleAddProduct)}>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Product name</label>
                                    <input {...register("name")} type="text" className="form-control" id="exampleInputName" defaultValue={product.productName} disabled />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Product Price</label>
                                    <input {...register("price")} type="text" className="form-control" id="exampleInputName" defaultValue={product.resellPrice} disabled />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Your Name</label>
                                    <input {...register("buyerName")} type="text" className="form-control" id="exampleInputName" defaultValue={user?.displayName} disabled />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Your Email</label>
                                    <input {...register("buyerEmail")} type="text" className="form-control" id="exampleInputName" defaultValue={user?.email} disabled />
                                </div>
                            </div>


                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Meeting Location</label>
                                    <input {...register("location", {
                                        required: { value: true, message: "Meeting location is required" },
                                    })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.location ? "true" : "false"} />
                                    {errors.location && <p className='text-danger fw-bold my-1' role="alert">{errors.location?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Your Mobile Number</label>
                                    <input {...register("buyerNumber", {
                                        required: { value: true, message: " Mobile Number is required" },
                                    })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.buyerNumber ? "true" : "false"} />
                                    {errors.buyerNumber && <p className='text-danger fw-bold my-1' role="alert">{errors.buyerNumber?.message}</p>}
                                </div>
                            </div>



                            <button type="submit" className="btn btn-primary text-center col-4 mx-auto mt-3 rounded">
                                <div>
                                    {load
                                        ?
                                        <div className="spinner-border text-dark" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        <>Book Now <FaShoppingCart></FaShoppingCart> </>}
                                </div>
                            </button>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>

        </>
    );
};

export default BookOrderModal;