import React from 'react';
import useTitle from '../../../hooks/useTitle';
import Advertise from '../Advertise/Advertise/Advertise';
import Banner from '../Banner/Banner';
import Category from '../Category/Category/Category';
import Service from '../Service/Service';

const Home = () => {
    useTitle('Home')
    return (
        <>
            <Banner></Banner>
            <Category></Category>
            <Advertise></Advertise>
            <Service></Service>
        </>
    );
};

export default Home;