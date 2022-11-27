import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const Buyers = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/users?email=${user.email}`
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(url, {
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
            <h3>Buyers</h3>
            <div className='shadow-lg p-3 my-3 bg-body rounded'>
                <Table striped>
                    <thead className='text-center'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
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

export default Buyers;