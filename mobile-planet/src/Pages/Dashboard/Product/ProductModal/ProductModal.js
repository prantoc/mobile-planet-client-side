import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { successToast } from '../../../../toast/Toaster';

const ProductModal = ({ handleClose, setShow, show, refetch }) => {
    const [load, setLoad] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgHostKey = process.env.REACT_APP_IMGBB_KEY;
    const handleAddProduct = data => {
        setLoad(true)
        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const { name, location, resellPrice, orginalPrice, usedYear, condition, description, purchaseYear, sellerName, sellerNumber } = data
                    const productImage = imgData.data.url
                    const today = new Date();
                    const product = {
                        productName: name, productImage, location, resellPrice, orginalPrice, usedYear, condition, description, purchaseYear, sellerName, sellerNumber, createdAt: today
                    }

                    const config = {
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('mobile-planet')}`
                        }
                    }

                    axios.post('http://localhost:5000/add-product', product, config)
                        .then(res => {
                            if (res.data.acknowledged) {
                                setShow(false)
                                successToast('Product Successfully Added !')
                                setLoad(false)
                                refetch()
                                reset()
                            }
                        })
                }
            })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <div className='shadow-lg bg-body'>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form className='row' onSubmit={handleSubmit(handleAddProduct)}>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Product name</label>
                                    <input {...register("name", {
                                        required: { value: true, message: "Product name is required" },
                                    })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.name ? "true" : "false"} />
                                    {errors.name && <p className='text-danger fw-bold my-1' role="alert">{errors.name?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputImg" className="form-label">Product Image</label>
                                    <input {...register("img", {
                                        required: { value: true, message: "Profile Photo is required" },
                                        validate: {
                                            lessThan10MB: (files) => files[0]?.size < 10000000 || "Max 10MB",
                                            acceptedFormats: (files) =>
                                                ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type) ||
                                                "Only PNG, JPEG e GIF",
                                        },
                                    })} type="file" className="form-control" id="exampleInputImg" aria-invalid={errors.img ? "true" : "false"} />
                                    {errors.img && <p className='text-danger fw-bold my-1' role="alert">{errors.img?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Location</label>
                                    <input {...register("location", {
                                        required: { value: true, message: "Location is required" },
                                    })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.location ? "true" : "false"} />
                                    {errors.location && <p className='text-danger fw-bold my-1' role="alert">{errors.location?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Resell Price</label>
                                    <input {...register("resellPrice", {
                                        required: { value: true, message: "Resell Price is required" },
                                    })} type="number" className="form-control" id="exampleInputName" aria-invalid={errors.resellPrice ? "true" : "false"} />
                                    {errors.resellPrice && <p className='text-danger fw-bold my-1' role="alert">{errors.resellPrice?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Orginal Price</label>
                                    <input {...register("orginalPrice", {
                                        required: { value: true, message: "Orginal Price is required" },
                                    })} type="number" className="form-control" id="exampleInputName" aria-invalid={errors.orginalPrice ? "true" : "false"} />
                                    {errors.orginalPrice && <p className='text-danger fw-bold my-1' role="alert">{errors.orginalPrice?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Years of Use</label>
                                    <input {...register("usedYear", {
                                        required: { value: true, message: "Years of Use is required" },
                                    })} type="number" className="form-control" id="exampleInputName" aria-invalid={errors.usedYear ? "true" : "false"} />
                                    {errors.usedYear && <p className='text-danger fw-bold my-1' role="alert">{errors.usedYear?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Product Condition</label>
                                    <select {...register("condition", {
                                        required: { value: true, message: "Product Condition is required" },
                                    })} aria-invalid={errors.condition ? "true" : "false"} className="form-select" >
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                    {errors.condition && <p className='text-danger fw-bold my-1' role="alert">{errors.condition?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Product Description</label>
                                    <textarea {...register("description", {
                                        required: { value: true, message: "Product Description is required" },
                                    })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.description ? "true" : "false"}></textarea>
                                    {errors.description && <p className='text-danger fw-bold my-1' role="alert">{errors.description?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Year of Purchase</label>
                                    <input {...register("purchaseYear", {
                                        required: { value: true, message: "Year of Purchase is required" },
                                    })} type="date" className="form-control" id="exampleInputName" aria-invalid={errors.purchaseYear ? "true" : "false"} />
                                    {errors.purchaseYear && <p className='text-danger fw-bold my-1' role="alert">{errors.purchaseYear?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Seller name</label>
                                    <input {...register("sellerName", {
                                        required: { value: true, message: "Seller name is required" },
                                    })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.sellerName ? "true" : "false"} />
                                    {errors.sellerName && <p className='text-danger fw-bold my-1' role="alert">{errors.sellerName?.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label htmlFor="exampleInputName" className="form-label">Seller Mobile Number</label>
                                    <input {...register("sellerNumber", {
                                        required: { value: true, message: "Seller Mobile Number is required" },
                                    })} type="text" className="form-control" id="exampleInputName" aria-invalid={errors.sellerNumber ? "true" : "false"} />
                                    {errors.sellerNumber && <p className='text-danger fw-bold my-1' role="alert">{errors.sellerNumber?.message}</p>}
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
                                        <>Add a Product <FaPlus></FaPlus></>}
                                </div>
                            </button>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

export default ProductModal;