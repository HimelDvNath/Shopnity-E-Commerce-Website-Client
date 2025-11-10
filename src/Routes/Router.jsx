import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Footer from "../Components/Footer/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
      {index: true, path:'/home'},
      {
        path:'/shop',
        Component: Footer
      }
    ]
  },
]);

export default router;