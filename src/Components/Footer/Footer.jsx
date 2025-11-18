import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Footer = () => {
    const links = (
        <>
            <Link
                to='/'
                className="relative inline-block text-black font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                About
            </Link>
            <Link
                to='/shop'
                className="relative inline-block text-black font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                Shop
            </Link>

            <Link
                to='/'
                className="relative inline-block text-black font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                Categories
            </Link>
            <Link
                to='/'
                className="relative inline-block text-black font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                New Arrivals
            </Link>
            <Link
                to='/'
                className="relative inline-block text-black font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                Contact
            </Link>
            <Link
                to='/'
                className="relative inline-block text-black font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                About Us
            </Link>
        </>
    );
    return (
        <footer className='footer footer-horizontal footer-center bg-gray-400 text-white text-primary-content p-10'>
            <aside>
                <div className='flex flex-col place-items-center gap-2'>
                    <img
                        src={logo}
                        alt='logo'
                        className='w-15 h-15 rounded-full'
                    />
                    <a className='font-bold text-blue-950 text-lg md:text-xl lg:text-3xl'>
                        Shopnity
                    </a>
                </div>
                <p className='font-bold'>
                    {links}
                </p>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                </p>
            </aside>

        </footer>
    );
};

export default Footer;
