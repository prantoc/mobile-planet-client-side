import React from 'react';
import Advertise from '../Advertise/Advertise/Advertise';
import Banner from '../Banner/Banner';
import Category from '../Category/Category/Category';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Category></Category>
            <Advertise></Advertise>
        </>
    );
};

export default Home;