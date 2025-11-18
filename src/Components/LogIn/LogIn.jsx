import React, { useCallback, useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import login from "../../assets/Login.json";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { auth } from "../../Firebase/Firebaseconfig";

const LogIn = () => {
    const { userLogIn, user } = useContext(AuthContext);
    const adminUID = "ZURaoFUsdSaY4oaqr4P9GEv7wM53";
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(user){
            navigate('/');
            return;
        }
    }, [user])
    const handleLogin = useCallback(async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await userLogIn(email, password);
            const loggedInUser = auth.currentUser;

            if (loggedInUser?.uid === adminUID) {
                setLoading(true);
                navigate("/admin");
                setLoading(false);
            } else {
                navigate("/");
            }

        } catch (error) {
            Swal.fire({
                title: `<span style="font-size:1.2rem; font-weight:600; color:#ef4444;">Email or password is incorrect!</span>`,
                html: `<p style="font-size:0.9rem; color:#374151; margin-top:0.5em;">Check your email and password</p>
                       <p style="font-size:0.9rem; color:#374151; margin-top:0.5em;">Try again!</p>`,
                icon: "error",
                iconColor: "#ef4444",
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#ef4444",
                background: "#fff",
                width: 400,
                padding: "1.2em 1.5em",
                showClass: {
                    popup: "animate__animated animate__fadeInDown animate__faster",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp animate__faster",
                },
            }).then((result) => {
                if (result.isConfirmed) navigate("/login");
            });
        }

    }, [userLogIn, navigate]);
    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-primary via-neutral-secondary to-neutral-tertiary-soft p-4'>
            <div className='hero w-full h-full'>
                <div className='hero-content flex-col-reverse lg:flex-row gap-10'>
                    <div className='w-full lg:w-1/2 flex justify-center'>
                        <Lottie
                            animationData={login}
                            loop
                            className='w-64 sm:w-80 md:w-96 lg:w-[420px]'
                        />
                    </div>

                    <div className='card bg-base-100/80 backdrop-blur-md w-full max-w-sm shadow-xl border border-neutral-tertiary-soft rounded-2xl p-4'>
                        <div className='card-body space-y-3'>
                            <h2 className='text-2xl font-bold text-center text-heading'>
                                Welcome
                            </h2>
                            <p className='text-sm text-center text-body'>
                                Login to continue your journey
                            </p>

                            <form onSubmit={handleLogin} className='space-y-3 mt-2'>
                                <label className='label font-medium'>Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    className='input input-bordered focus:ring-2 focus:ring-brand w-full'
                                    placeholder='Enter your email'
                                    required
                                />

                                <label className='label font-medium'>Password</label>
                                <div className='relative'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        className='input input-bordered focus:ring-2 focus:ring-brand w-full pr-10'
                                        placeholder='Enter password'
                                        required
                                    />
                                    <span
                                        className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500 z-10'
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </span>
                                </div>

                                <div className='text-gray-600 flex justify-between mt-2'>
                                    <p className='text-sm'>New to Shopnity?</p>
                                    <Link to='/register-form' className='link link-hover text-sm'>
                                        Create a new account?
                                    </Link>
                                </div>

                                <button className='btn btn-neutral w-full mt-1'>
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LogIn;
