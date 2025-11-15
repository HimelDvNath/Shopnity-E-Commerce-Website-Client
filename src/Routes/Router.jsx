import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Footer from "../Components/Footer/Footer";
import LogIn from "../Components/LogIn/LogIn";
import AdminLayout from '../Layouts/AdminLaout/AdminLayout'
import AdminLogin from "../Components/AdminLogin/AdminLogin";
import UserRoute from "./UserRouter";
import AdminRoute from "./AdminRouter";
import ProductForm from "../pages/ProductFrom";

const router = createBrowserRouter([
    // {
    //     path: "/login",
    //     Component: LogIn,
    // },
    {
        path: "/",
        element: (
            <UserRoute>
                <HomeLayout />
            </UserRoute>
        ),
        children: [
            { index: true, path: "/home" },
            {
                path: "/shop",
                Component: Footer,
            },
            {
                path: "/login",
                element: <LogIn></LogIn>,
            },
        ],
    },
    {
        path: "/admin",
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        children: [
            {
              path:'/admin/add-product',
              Component:ProductForm
            }
        ],
    },
]);

export default router;
