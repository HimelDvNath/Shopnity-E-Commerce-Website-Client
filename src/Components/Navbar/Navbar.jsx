import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { FaRegUserCircle, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    };

    const navLinks = [
        { path: "/", label: "About" },
        { path: "/shop", label: "Shop" },
        { path: "/", label: "Categories" },
        { path: "/", label: "New Arrivals" },
        { path: "/", label: "Contact" },
        { path: "/", label: "About Us" }
    ];

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className="relative inline-block text-gray-700 font-medium
             after:content-[''] after:absolute after:w-0 after:h-[2px]
             after:bg-amber-400 after:left-0 after:bottom-0 
             after:transition-all after:duration-300 hover:after:w-full 
             mx-3 lg:mx-5"
        >
            {children}
        </Link>
    );

    return (
        <div className='bg-base-100 shadow-sm'>
            <div className='navbar px-4 sm:px-6 lg:px-10'>
                {/* Mobile Menu */}
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost lg:hidden'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h8m-8 6h16'
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow'
                        >
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink to={link.path}>{link.label}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Logo */}
                    <div 
                        onClick={() => navigate('/')} 
                        className='flex items-center cursor-pointer'
                    >
                        <img
                            src={logo}
                            alt='logo'
                            className='w-12 h-12 sm:w-14 sm:h-14 rounded-full'
                        />
                        <span className='font-bold text-blue-950 text-lg sm:text-xl lg:text-2xl ml-2'>
                            Shopnity
                        </span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className='navbar-center hidden lg:flex'>
                    <div className='flex space-x-2'>
                        {navLinks.map((link, index) => (
                            <NavLink key={index} to={link.path}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className='navbar-end'>
                    <div className='flex items-center gap-3 sm:gap-4 lg:gap-5'>
                        {/* Search Bar */}
                        <div className="hidden sm:block">
                            <label className='input input-bordered flex items-center gap-2 h-10'>
                                <svg
                                    className='w-4 h-4 opacity-50'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <g
                                        strokeLinejoin='round'
                                        strokeLinecap='round'
                                        strokeWidth='2.5'
                                        fill='none'
                                        stroke='currentColor'
                                    >
                                        <circle cx='11' cy='11' r='8'/>
                                        <path d='m21 21-4.3-4.3'/>
                                    </g>
                                </svg>
                                <input
                                    type='search'
                                    className='grow w-24 lg:w-32'
                                    placeholder='Search'
                                />
                            </label>
                        </div>

                        {/* Mobile Search Icon */}
                        <div className="sm:hidden">
                            <button className="btn btn-ghost btn-circle">
                                <svg
                                    className='w-5 h-5'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <g
                                        strokeLinejoin='round'
                                        strokeLinecap='round'
                                        strokeWidth='2.5'
                                        fill='none'
                                        stroke='currentColor'
                                    >
                                        <circle cx='11' cy='11' r='8'/>
                                        <path d='m21 21-4.3-4.3'/>
                                    </g>
                                </svg>
                            </button>
                        </div>

                        {/* Wishlist */}
                        <Link to='/wishlist' className="btn btn-ghost btn-circle">
                            <FaRegHeart size={20} className="text-gray-700" />
                        </Link>

                        {/* Cart */}
                        <Link to='/cartlist' className="btn btn-ghost btn-circle">
                            <FaShoppingCart size={20} className="text-gray-700" />
                        </Link>

                        {/* User Menu */}
                        <div className="relative">
                            {user ? (
                                <>
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className='btn btn-ghost btn-circle'
                                    >
                                        <FaRegUserCircle size={24} className="text-blue-600" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div
                                        className={`
                                            absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg 
                                            border border-gray-200 overflow-hidden transition-all 
                                            duration-200 z-50
                                            ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
                                        `}
                                    >
                                        <button 
                                            onClick={() => {
                                                navigate('/user/profile');
                                                setOpen(false);
                                            }} 
                                            className='block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors'
                                        >
                                            Profile
                                        </button>
                                        <button 
                                            onClick={() => {
                                                navigate(`/user/order/${user.uid}`);
                                                setOpen(false);
                                            }} 
                                            className='block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors'
                                        >
                                            View Order
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleLogOut();
                                                setOpen(false);
                                            }}
                                            className='block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-red-600'
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <Link to='/login' className="btn btn-ghost btn-circle">
                                    <FaRegUserCircle size={24} className="text-gray-700" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile dropdown */}
            {open && (
                <div 
                    className="fixed inset-0 z-40 lg:hidden" 
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
};

export default Navbar;