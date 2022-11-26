import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';

const Products = () => {
    const products = useLoaderData();
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
                                products.length > 0 ?
                                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                                    :
                                    <div className="text-center">
                                        <h2 className='btn btn-danger col-4'>No Data Found !</h2>
                                    </div>
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