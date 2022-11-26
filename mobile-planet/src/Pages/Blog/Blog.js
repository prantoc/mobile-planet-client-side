import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';

const Blog = () => {
    return (
        <div>
            <Container className='my-5'>
                <Row>
                    <Col col={12}>
                        <Card className='shadow-lg mb-5 rounded text-secondary'>
                            <Card.Body>
                                <Card.Title >
                                    What are the different ways to manage a state in a React application?
                                </Card.Title>
                                <Card.Text>
                                    The Four Kinds of React State to Manage Local state, Global state, Server state, URL state.
                                </Card.Text>
                                <Card.Title >
                                    How does prototypical inheritance work?
                                </Card.Title>
                                <Card.Text>
                                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects.It is a method by which an object can inherit the properties and methods of another object.Traditionally, in order to get and set the Prototype of an object, we use Object.
                                </Card.Text>
                                <Card.Title >
                                    What is a unit test? Why should we write unit tests?
                                </Card.Title>
                                <Card.Text>
                                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                                </Card.Text>
                                <Card.Title >
                                    React vs. Angular vs. Vue?
                                </Card.Title>
                                <Card.Text>
                                    Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Blog;