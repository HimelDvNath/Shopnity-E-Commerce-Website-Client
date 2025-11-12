import React from "react";
import UserNavbar from "../../Components/Navbar/AdminNavbar";
import { Outlet } from "react-router";
import RightAside from "../../pages/RightAside";

const AdminLayout = () => {
    return (
        <div>
            <header>
                <nav>
                    <UserNavbar></UserNavbar>
                </nav>
            </header>
            <main className='grid grid-cols-12'>
                <aside className='col-span-2'>
                    <RightAside></RightAside>
                </aside>
                <section className='col-span-10'>
                    <Outlet></Outlet>
                </section>
            </main>
        </div>
    );
};

export default AdminLayout;
