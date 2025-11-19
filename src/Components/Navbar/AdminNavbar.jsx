import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "../../App.css";
import logo from "../../assets/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import AuthProvider, { AuthContext } from "../../Provider/AuthProvider";

const AdminNavbar = () => {
    //    const loginLocation = useLocation();
    // console.log(loginLocation);
    const { user, logOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
            .then((res) => navigate("/"))
            .catch((err) => console.log(err));
    };

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
                        <div className='relative'>
                            {user ? (
                                <>
                                    {/* Button */}
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className='btn bg-orange-400 text-white px-4 py-2 rounded-lg'>
                                        Admin
                                    </button>

                                    {/* Dropdown */}
                                    <div
                                        className={`
              absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg 
              overflow-hidden transition-all duration-300 origin-top 
              ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
            `}>
                                        <button
                                            onClick={handleLogOut}
                                            className='block w-full text-center px-4 py-2 hover:bg-orange-100'>
                                            {user.email}
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

export default AdminNavbar;
