import React, { useContext } from 'react';
import { FaHome, FaNotesMedical, FaShoppingCart, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useAdmin } from '../../../hooks/useAdmin';
import { useSeller } from '../../../hooks/useSeller';

const DashboardSidebar = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    return (
        <>
            <nav id="sidebarMenu" className="col-md-3 col-4 col-lg-2 d-md-block bg-light sidebar shadow-lg">

                <div className="position-sticky pt-5 sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            {isAdmin && <Link to="/dashboard" className="nav-link" aria-current="page">
                                <FaHome></FaHome> Dashboard
                            </Link>}
                        </li>
                        <li className="nav-item">
                            {isAdmin && <Link to="/dashboard/category" className="nav-link" aria-current="page">
                                <FaNotesMedical></FaNotesMedical> Category
                            </Link>}
                        </li>
                        <li className="nav-item">
                            {isAdmin && <Link to="/dashboard/product" className="nav-link">
                                <FaShoppingCart></FaShoppingCart> Products
                            </Link>}
                        </li>
                        <li className="nav-item">
                            {isAdmin && <Link to="/dashboard/users" className="nav-link">
                                <FaUserFriends></FaUserFriends> Users
                            </Link>}
                        </li>

                        {/* seller routes  */}
                        <li className="nav-item">
                            {isSeller && <Link to="/dashboard/seller/product" className="nav-link">
                                <FaShoppingCart></FaShoppingCart> Products
                            </Link>}
                        </li>
                        <li className="nav-item">
                            {isSeller && <Link to="/dashboard/seller/buyers-list" className="nav-link">
                                <FaUserFriends></FaUserFriends> Buyers
                            </Link>}
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file align-text-bottom me-1" aria-hidden="true"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                Orders
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users align-text-bottom me-1" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                Customers
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default DashboardSidebar;