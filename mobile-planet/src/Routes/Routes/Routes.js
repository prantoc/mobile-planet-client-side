import { createBrowserRouter } from "react-router-dom";
import Frontend from "../../Layout/Frontend";
import Home from "../../Pages/Home/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Frontend></Frontend>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
]);