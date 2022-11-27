import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Badge, Image, Table } from 'react-bootstrap';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';
import moment from 'moment';
const Buyers = () => {
    const { user } = useContext(AuthContext);
    const { data: buyers, isLoading } = useQuery({
        queryKey: ['buyers', user?.email],
        queryFn: () => fetch(`http://localhost:5000/buyersList?email=${user?.email}`, {
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
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Product Price</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Buyer Number</th>
                            <th>Meeting Location</th>
                            <th>Payment Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <Loading></Loading>
                            :
                            buyers.length > 0 ?
                                buyers?.map((buyer, i) =>
                                    <tr key={i} className="align-content-center text-center">
                                        <td>{i + 1}</td>

                                        <td>{buyer.productName}</td>
                                        <td>
                                            <Image style={{ height: '48px' }} src={buyer.productImage} />
                                        </td>
                                        <td>{buyer.resellPrice}</td>
                                        <td>{buyer.buyerName}</td>
                                        <td>{buyer.buyerEmail}</td>
                                        <td>{buyer.buyerNumber}</td>
                                        <td>{buyer.meetingLocation}</td>
                                        <td>
                                            {
                                                buyer.paid === true ?
                                                    <Badge bg='success'>PAID</Badge>
                                                    :
                                                    <Badge bg='warning'>UNPAID</Badge>

                                            }
                                        </td>
                                        <td>{moment(buyer.createdAt,).startOf('hour').fromNow()}</td>
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