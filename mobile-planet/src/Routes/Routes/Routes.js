import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import FrontendLayout from "../../Layout/FrontendLayout";
import Login from "../../Pages/Auth/Login/Login";
import SignUp from "../../Pages/Auth/SignUp/SignUp";
import Blog from "../../Pages/Blog/Blog";
import ReviewItems from "../../Pages/Buyer/ReviewItems/ReviewItems";
import WishlistItems from "../../Pages/Buyer/WishlistItems/WishlistItems";
import Category from "../../Pages/Dashboard/Category/Category/Category";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Product from "../../Pages/Dashboard/Product/Product/Product";
import Buyers from "../../Pages/Dashboard/Users/Buyers/Buyers";
import Users from "../../Pages/Dashboard/Users/Users/Users";
import Home from "../../Pages/Home/Home/Home";
import ProductDetails from "../../Pages/Product/ProductDetails/ProductDetails";
import Products from "../../Pages/Product/Products/Products";
import Error from "../../Pages/Shared/Error/Error";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontendLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/category/:name",
                element: <Products></Products>,
                loader: ({ params }) => fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/category/${params.name}`)
            },
            {
                path: "/product-details/:id",
                element: <ProductDetails></ProductDetails>,
                loader: ({ params }) => fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/product-details/${params.id}`)
            },
            {
                path: "/blog",
                element: <Blog></Blog>
            },
            {
                path: "/booked-items",
                element: <PrivateRoute><ReviewItems></ReviewItems></PrivateRoute>
            },
            {
                path: "/wishlist-items",
                element: <PrivateRoute><WishlistItems></WishlistItems></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <Error />,
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
                path: "/dashboard/users",
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: "/dashboard/seller/product",
                element: <SellerRoute><Product></Product></SellerRoute>
            },
            {
                path: "/dashboard/seller/buyers-list",
                element: <SellerRoute><Buyers></Buyers> </SellerRoute>
            },
        ]
    },
]);