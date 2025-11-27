import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import LogIn from "../Components/LogIn/LogIn";
import AdminLayout from "../Layouts/AdminLaout/AdminLayout";
import UserRoute from "./UserRouter";
import AdminRoute from "./AdminRouter";
import ProductForm from "../pages/ProductFrom";
import Home from "../Components/Home/Home";
import ProductDetails from "../pages/ProductDetails";
import Loader from "../Components/Loader/Loader";
import RegisterForm from "../pages/RegisterForm";
import { Suspense } from "react";
import Wishlist from "../pages/WishList";
import CartList from "../pages/CartList";
import Users from "../pages/Users";
import ProductsListAdmin from "../pages/ProductsListAdmin";
import UpdateProductForm from "../pages/UpdateProductForm";
import BuyNow from "../pages/BuyNow";
import OrderListAdmin from "../pages/OrderListAdmin";
import OrderUser from "../pages/OrderUser";
import ProfileUser from "../pages/ProfileUser";

const router = createBrowserRouter([
    {
        path: "/",
        hydrateFallbackElement: <Loader />,
        element: (
            <UserRoute>
                <Suspense fallback={<Loader />}>
                    <HomeLayout />
                </Suspense>
            </UserRoute>
        ),
        children: [
            {
                index: true,
                path: "/",
                hydrateFallbackElement: <Loader />,
                loader: async () => {
                    const res = await fetch("http://localhost:3000/products");
                    return res.json();
                },

                element:(<Suspense fallback={<Loader/>}><Home /></Suspense>),
            },
            {
                path:'/wishlist',
                element: <Wishlist/>
            },
            {
                path:'/cartlist',
                element: <CartList/>
            },
            {
                path:'/cartlist/buy-now',
                element: <BuyNow/>
            },
            {
                path: "/productDetails/:id",
                hydrateFallbackElement: <Loader />,
                loader: async ({ params }) => {
                    const res = await fetch(
                        `http://localhost:3000/products/${params.id}`
                    );
                    return res.json();
                },
                element: <ProductDetails />,
            },
            {
                path: "/login",
                element: <LogIn></LogIn>,
            },
            {
                path: "/register-form",
                element: <RegisterForm />,
            },
            {
                path: "/user/profile",
                hydrateFallbackElement: <Loader />,
                loader: async () => {
                    const res = await fetch("http://localhost:3000/users");
                    return res.json();
                },
                element: <ProfileUser />,
            },
            {
                path: "/user/order/:id",
                hydrateFallbackElement: <Loader />,
                loader: async () => {
                    const res = await fetch("http://localhost:3000/orders");
                    return res.json();
                },
                element: <OrderUser />,
            },
        ],
    },
    {
        path: "/admin",
        id :'admin-parent',
        hydrateFallbackElement: <Loader />,
        loader: async () => {
                    const res = await fetch("http://localhost:3000/products");
                    return res.json();
                },
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        children: [
            {
                path: "/admin/add-product",
                hydrateFallbackElement: <Loader />,
                Component: ProductForm,
            },
            {
                path:"/admin/users",
                Component: Users
            },
            {
                path:"/admin/products-list",
                Component: ProductsListAdmin
            },
            {
                path: `/admin/products/:id/edit`,
                hydrateFallbackElement: <Loader />,
                loader: async ({ params }) => {
                    const res = await fetch(
                        `http://localhost:3000/products/${params.id}`
                    );
                    return res.json();
                },
                Component: UpdateProductForm
            },
            {
                path:"/admin/orders-list",
                Component: OrderListAdmin
            },
           
        ],
        
    },
]);

export default router;
