import React from 'react';
import Advertise from '../Advertise/Advertise/Advertise';
import Banner from '../Banner/Banner';
import Category from '../Category/Category/Category';
import Service from '../Service/Service';

const Home = () => {
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