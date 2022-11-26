import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { FaCheckCircle, FaQuestion } from 'react-icons/fa';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { approveItemAlret, approveSwlFire, deleteItemAlret, swlFire } from '../../../../toast/Toaster';
import Loading from '../../../Shared/Loading/Loading';

const Users = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/users?email=${user.email}`
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
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

                    axios.delete(`http://localhost:5000/users/${id}`, config)
                        .then(res => {
                            if (res.data.acknowledged) {
                                swlFire('User has been deleted successfully!')
                                refetch()
                            }
                        })

                }
            })

    }


    const handleUserVerify = (id, mgs) => {
        approveItemAlret()
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/users/${id}`, {
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
            <h3>Users</h3>
            <div className='shadow-lg p-3 my-3 bg-body rounded'>
                <Table striped>
                    <thead className='text-center'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>
                                Verified
                                <FaQuestion title='Click the button to verify and unverified'></FaQuestion>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <Loading></Loading>
                            :
                            users.length > 0 ?
                                users?.map((user, i) =>
                                    <tr key={i} className="align-content-center text-center">
                                        <td>{i + 1}</td>

                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 'seller' ? <Badge bg="primary">{user.role}</Badge> : <Badge bg="secondary">{user.role}</Badge>
                                            }
                                        </td>
                                        <td>
                                            {
                                                <span role='button' onClick={() => handleUserVerify(user._id, user.verified ? 'User Verified!' : 'User Unverified!')}>
                                                    {user.verified ? <FaCheckCircle title='Click to verify user' className='text-primary'></FaCheckCircle> : <FaCheckCircle className='text-secondary'></FaCheckCircle>}
                                                </span>
                                            }
                                        </td>
                                        <td>
                                            <Button variant='danger' onClick={() => handleDeleteProduct(user._id)}>Delete</Button>
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
        </>
    );
};

export default Users;