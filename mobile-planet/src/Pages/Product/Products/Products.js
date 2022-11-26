import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';

const Products = () => {
    const products = useLoaderData();
    console.log(products);
    const navigation = useNavigation()
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    return (
        <>
            <Container fluid className='my-5'>
                <Row>
                    <Col md={9} sm={12}>
                        <Row>
                            {
                                products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                            }
                        </Row>
                    </Col>
                    <Col md={3} sm={12}>
                        <Sidebar ></Sidebar>
                    </Col>

                </Row>
            </Container>

        </>
    );
};

export default Products;