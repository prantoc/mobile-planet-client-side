import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Container, Row } from 'react-bootstrap';

import ProductCard from '../../../Product/ProductCard/ProductCard';
const Advertise = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: () => fetch(`http://localhost:5000/advertiseProducts`).then(res => res.json())

    })
    if (isLoading) {
        return
    }
    return (
        <>
            {products?.length > 0 &&
                <Container className='py-5 my-5'>
                    <h1 className='text-center py-5 fw-bold'>ADVERTISE PRODUCT</h1>
                    <Row>
                        {
                            products?.map(p => <ProductCard key={p._id} product={p}></ProductCard>)
                        }

                    </Row>
                </Container>
            }

        </>
    );
};

export default Advertise;