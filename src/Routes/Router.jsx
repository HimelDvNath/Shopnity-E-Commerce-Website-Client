import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Footer from "../Components/Footer/Footer";
import LogIn from "../Components/LogIn/LogIn";
import UserLogin from "../Components/AdminLogin/AdminLogin";
import UserLayout from "../Layouts/AdminLaout/AdminLayout";
import AdminLayout from "../Layouts/AdminLaout/AdminLayout";
import AdminLogin from "../Components/AdminLogin/AdminLogin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
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
      path:'/admin',
      Component: AdminLayout,
      children:[
        {index: true, path:'/admin'},
        {
          path:'/admin/login',
          Component: AdminLogin
        },
        // {
        //   path:'/admin/registration',
        //   Component:
        // }
      ]
    }
]);

export default router;
