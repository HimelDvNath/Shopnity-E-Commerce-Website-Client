import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const HomeLayout = () => {
    return (
        <div>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className="w-10/12 mx-auto py-10">
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </div>
    );
};

export default HomeLayout;
