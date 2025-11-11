import React from "react";
import UserNavbar from "../../Components/Navbar/AdminNavbar";
import { Outlet } from "react-router";

const AdminLayout = () => {
    return (
        <div>
            <header>
                <nav>
                    <UserNavbar></UserNavbar>
                </nav>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AdminLayout;
