import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import FrontendLayout from "../../Layout/FrontendLayout";
import Login from "../../Pages/Auth/Login/Login";
import SignUp from "../../Pages/Auth/SignUp/SignUp";
import Category from "../../Pages/Dashboard/Category/Category/Category";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        element: <PrivateRoute>
            <AdminRoute>
                <DashboardLayout />
            </AdminRoute>
        </PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/dashboard/category",
                element: <AdminRoute><Category></Category></AdminRoute>
            },
        ]
    },
]);