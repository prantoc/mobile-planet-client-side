import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import FrontendLayout from "../../Layout/FrontendLayout";
import Login from "../../Pages/Auth/Login/Login";
import SignUp from "../../Pages/Auth/SignUp/SignUp";
import Category from "../../Pages/Dashboard/Category/Category/Category";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Product from "../../Pages/Dashboard/Product/Product/Product";
import Home from "../../Pages/Home/Home/Home";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontendLayout />,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <AdminRoute> <Dashboard></Dashboard></AdminRoute>
            },
            {
                path: "/dashboard/category",
                element: <AdminRoute><Category></Category></AdminRoute>
            },
            {
                path: "/dashboard/product",
                element: <AdminRoute><Product></Product></AdminRoute>
            },
            {
                path: "/dashboard/seller/product",
                element: <SellerRoute><Product></Product></SellerRoute>
            },
        ]
    },
]);