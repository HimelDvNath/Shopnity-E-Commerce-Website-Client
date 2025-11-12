import React, { useContext, useEffect } from "react";
import login from "../../assets/Login.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useNavigate } from "react-router";
const LogIn = () => {
    const { user, userLogIn } = useContext(AuthContext);
    const adminUID = "ZURaoFUsdSaY4oaqr4P9GEv7wM53";
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            if (user.uid === adminUID) navigate("/admin");
            else navigate("/user");
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        userLogIn(email, password)
            .then((currentUser) => {
                if (currentUser.user.uid === adminUID) {
                    console.log("dhk");
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    return (
        <div className='w-full h-[100vh]'>
            <div className='hero bg-base-200 w-full h-full'>
                <div className='hero-content flex-col lg:flex-row-reverse'>
                    <div className='text-center lg:text-left'>
                        <Lottie
                            animationData={login}
                            loop={true}
                            background='transparent'
                            speed='1'
                            className='w-100 h-100'
                            // autoplay
                        />
                    </div>
                    <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
                        <div className='card-body'>
                            <form onSubmit={handleLogin} className='fieldset'>
                                <label className='label'>Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    className='input focus:border-0'
                                    placeholder='Email'
                                />
                                <label className='label'>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    className='input focus:border-0'
                                    placeholder='Password'
                                />
                                <div>
                                    <a className='link link-hover'>
                                        Forgot password?
                                    </a>
                                </div>
                                <button className='btn btn-neutral mt-4'>
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
