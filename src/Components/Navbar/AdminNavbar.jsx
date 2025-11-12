import React from 'react';
import { Link, useLocation } from "react-router";
import "../../App.css";
import logo from "../../assets/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const AdminNavbar = () => {
   const loginLocation = useLocation();
    // console.log(loginLocation);
    
    return (
        <div className=' bg-base-100 shadow-sm '>
            <div className='navbar px-10'>
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost lg:hidden'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                {" "}
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h8m-8 6h16'
                                />{" "}
                            </svg>
                        </div>
                        
                    </div>
                    <div className='flex place-items-center'>
                        <img
                            src={logo}
                            alt='logo'
                            className='w-15 h-15 rounded-full'
                        />
                        <a className='font-bold text-blue-950 text-lg md:text-xl lg:text-3xl'>
                            Shopnity
                        </a>
                    </div>
                </div>
                
                <div className='navbar-end'>
                    <div className='flex place-items-center gap-5'>
                        
                        <div>
                            {loginLocation.pathname === "/login" ? (
                                <Link to='/admin/login' className="btn bg-orange-400 p-0 w-30 text-white">User LogIn</Link>
                            ) : (
                                <Link to='/login'>
                                    <FaRegUserCircle size={30} color='' />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;