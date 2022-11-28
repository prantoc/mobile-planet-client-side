import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLoaderData, useNavigation } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';

const Products = () => {
    useTitle('Products')
    const products = useLoaderData();
    const navigation = useNavigation()
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    return (
        <>
            <Container fluid className='my-5'>
                <Row>
                    <Col lg={9} md={8} sm={12} className="order-2 order-lg-0">
                        <Row>
                            {
                                products.length > 0 ?
                                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                                    :
                                    <div className="text-center">
                                        <h2 className='btn btn-danger col-4'>No Data Found !</h2>
                                    </div>
                            }
                        </Row>
                    </Col>
                    <Col lg={3} md={4} sm={12} className="order-1 order-lg-0">
                        <Sidebar ></Sidebar>
                    </Col>

                </Row>
            </Container>

        </>
    );
};

export default Products;