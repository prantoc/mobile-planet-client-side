import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import { FaPlus, FaQuestion, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { useAdmin } from '../../../../hooks/useAdmin';
import { approveItemAlret, approveSwlFire, deleteItemAlret, swlFire } from '../../../../toast/Toaster';
import Loading from '../../../Shared/Loading/Loading';
import ProductModal from '../ProductModal/ProductModal';

const Product = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url = `http://localhost:5000/product/${user.email}`
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: () => fetch(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem('mobile-planet')}`
            }
        }).then(res => res.json())

    })


    const handleDeleteProduct = (id) => {
        deleteItemAlret()
            .then((result) => {
                if (result.isConfirmed) {
                    const config = {
                        headers: {
                            authorization: `bearer ${localStorage.getItem('mobile-planet')}`
                        }
                    }

                    axios.delete(`http://localhost:5000/product/${id}`, config)
                        .then(res => {
                            if (res.data.acknowledged) {
                                swlFire('Product has been deleted successfully!')
                                refetch()
                            }
                        })

                }
            })

    }


    const handleDisplayProduct = (id, mgs) => {
        approveItemAlret()
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/product/${id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `bearer ${localStorage.getItem('mobile-planet')}`
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.acknowledged) {
                                approveSwlFire(mgs)
                                refetch()
                            }
                        })

                }
            })

    }


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            <h3>Products</h3>
            <div className='shadow-lg p-3 my-3 bg-body rounded'>
                <div className="d-flex justify-content-end align-items-center mb-5">
                    <Button variant="primary" onClick={handleShow}>
                        Add a Product <FaPlus></FaPlus>
                    </Button>
                </div>
                <Table striped>
                    <thead className='text-center'>
                        <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Location</th>
                            <th>Resell Price</th>
                            <th>Orginal Price</th>
                            <th>Seller Name</th>
                            <th>Seller Number</th>
                            <th>Created At</th>
                            <th>Display Listing<FaQuestion title='Click the button to display and hide for listing'></FaQuestion></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {isLoading ?
                            <Loading></Loading>
                            :
                            products.length > 0 ?
                                products?.map((product, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>

                                        <td>{product.productCategory}</td>
                                        <td>{product.productName}</td>
                                        <td>
                                            <Image roundedCircle style={{ height: '48px' }} src={product.productImage} />
                                        </td>
                                        <td>{product.location}</td>
                                        <td>${product.resellPrice}</td>
                                        <td>${product.orginalPrice}</td>
                                        <td>{product.sellerName}</td>
                                        <td>{product.sellerNumber}</td>
                                        <td>{moment(product.createdAt, "YYYYMMDD").format('MMMM Do YYYY')}</td>
                                        <td>
                                            {
                                                isAdmin ?
                                                    <span role='button' onClick={() => handleDisplayProduct(product._id, product.displayListing ? 'Product hide for listing' : 'Product showed for listing')}>
                                                        {product.displayListing ? <FaRegEye className='text-success'></FaRegEye> : <FaRegEyeSlash className='text-danger'></FaRegEyeSlash>}
                                                    </span>
                                                    :
                                                    <span>
                                                        {product.displayListing ? <FaRegEye className='text-success'></FaRegEye> : <FaRegEyeSlash className='text-danger'></FaRegEyeSlash>}
                                                    </span>
                                            }
                                        </td>
                                        <td>
                                            <Button variant='danger' onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                                :
                                <tr >
                                    <td colSpan="12" className="text-center">
                                        <h2 className='btn btn-danger col-4'>No Data Found !</h2>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </Table>
            </div>

            <ProductModal user={user} handleClose={handleClose} setShow={setShow} show={show} refetch={refetch}></ProductModal>
        </>
    );
};

export default Product;