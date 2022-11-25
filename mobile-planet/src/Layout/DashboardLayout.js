import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../Pages/Shared/DashboardSideBar/DashboardSidebar';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import '../assets/css/Dashboard/dashboard.css'
const DashboardLayout = () => {
    return (
        <>
            <header className=" sticky-top flex-md-nowrap p-0 bg-light ">
                <NavBar></NavBar>
            </header>
            <Container fluid>
                <Row>
                    <DashboardSidebar></DashboardSidebar>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 col-8">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

                        </div>
                        <Outlet></Outlet>
                    </main>
                </Row>
            </Container>
        </>
    );
};

export default DashboardLayout;