import React, { use, useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import "../../App.css";
import logo from "../../assets/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import AuthProvider, { AuthContext } from "../../Provider/AuthProvider";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [open, setOpen] =useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
            .then((res) => navigate("/"))
            .catch((err) => console.log(err));
    };
    const links = (
        <>
            <Link
                to='/'
                className="relative inline-block text-gray-700 font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                About
            </Link>
            <Link
                to='/shop'
                className="relative inline-block text-gray-700 font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                Shop
            </Link>

            <Link
                to='/'
                className="relative inline-block text-gray-700 font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                Categories
            </Link>
            <Link
                to='/'
                className="relative inline-block text-gray-700 font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                New Arrivals
            </Link>
            <Link
                to='/'
                className="relative inline-block text-gray-700 font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                Contact
            </Link>
            <Link
                to='/'
                className="relative inline-block text-gray-700 font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full mx-5">
                About Us
            </Link>
        </>
    );
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
                        <ul
                            tabIndex='-1'
                            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
                            {/* link  */}
                            {links}
                        </ul>
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
                <div className='navbar-center hidden lg:flex'>
                    <ul className='menu menu-horizontal px-1'>{links}</ul>
                </div>
                <div className='navbar-end'>
                    <div className='flex place-items-center gap-5'>
                        <div>
                            <label className='input border-0 shadow-lg'>
                                <svg
                                    className='h-[1em] opacity-50'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'>
                                    <g
                                        strokeLinejoin='round'
                                        strokeLinecap='round'
                                        strokeWidth='2.5'
                                        fill='none'
                                        stroke='currentColor'>
                                        <circle cx='11' cy='11' r='8'></circle>
                                        <path d='m21 21-4.3-4.3'></path>
                                    </g>
                                </svg>
                                <input
                                    type='search'
                                    required
                                    placeholder='Search'
                                />
                            </label>
                        </div>

                        <Link to='/wishlist'>
                            <FaRegHeart size={30} color='' />
                        </Link>

                        <Link to='/cartlist'>
                            <FaShoppingCart size={30} color='' />
                        </Link>
                        <div>
                            {user ? (
                                <>
                                    {/* Button */}
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className=' text-black py-2 rounded-lg cursor-pointer z-30'>
                                        <FaRegUserCircle size={35} color="blue"/>
                                    </button>

                                    {/* Dropdown */}
                                    <div
                                        className={`
                                          absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg 
                                          overflow-hidden transition-all duration-300 origin-top z-30
                                          ${
                                              open
                                                  ? "scale-y-100 opacity-100"
                                                  : "scale-y-0 opacity-0"
                                          }
                                        `}>
                                        <button className='block w-full text-center px-4 py-2 hover:bg-orange-100'>
                                            {user.email}
                                        </button>
                                        <button onClick={()=>navigate('/user/profile')} className='block w-full text-center px-4 py-2 hover:bg-orange-100'>
                                            Profile
                                        </button>
                                        <button onClick={()=>navigate(`/user/order/${user.uid}`)} className='block w-full text-center px-4 py-2 hover:bg-orange-100'>
                                            View Order
                                        </button>
                                        <button
                                            onClick={handleLogOut}
                                            className='block text-center w-full  px-4 py-2 hover:bg-orange-100'>
                                            Log Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <Link to='/login'>
                                    <FaRegUserCircle size={30} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
