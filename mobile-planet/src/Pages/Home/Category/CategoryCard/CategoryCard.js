import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { categoryName, categoryImage } = category
    return (
        <>
            <Col md={3} className="mb-2 text-center animate__animated animate__backInUp">
                <Link to={`/category/${categoryName}`} className='nav-link'>
                    <Card className='advertise-card'>
                        <Card.Body className='fw-bold'> <img src={categoryImage} alt="" /> {categoryName}</Card.Body>
                    </Card>
                </Link>
            </Col>
        </>
    );
};

export default CategoryCard;