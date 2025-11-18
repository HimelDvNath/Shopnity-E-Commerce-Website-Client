import React, { Suspense } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";
import Loader from "../../Components/Loader/Loader";

const HomeLayout = () => {
    return (
        <div>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className="w-11/12 mx-auto py-5">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;
