import React from 'react';
import { Container, Row } from 'react-bootstrap';

import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import CategoryCard from '../CategoryCard/CategoryCard';
const Categories = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetch(`http://localhost:5000/category`).then(res => res.json())

    })
    return (
        <>
            <Container className='py-5 my-5'>
                <h1 className='text-center py-5 fw-bold'>SHOP & SELL BY CATEGORY</h1>
                <Row>
                    {isLoading ?
                        <Loading></Loading>
                        :
                        categories?.length > 0 && categories?.map(cat => <CategoryCard key={cat._id} category={cat}></CategoryCard>)

                    }
                </Row>
            </Container>

        </>
    );
};

export default Categories;