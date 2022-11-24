import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../Pages/Shared/DashboardSideBar/DashboardSidebar';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import '../assets/css/Dashboard/dashboard.css'
const DashboardLayout = () => {
    return (
        <>
            <header class=" sticky-top flex-md-nowrap p-0 bg-light ">
                <NavBar></NavBar>
            </header>
            <Container fluid>
                <Row>
                    <DashboardSidebar></DashboardSidebar>
                    <Outlet></Outlet>
                </Row>
            </Container>
        </>
    );
};

export default DashboardLayout;