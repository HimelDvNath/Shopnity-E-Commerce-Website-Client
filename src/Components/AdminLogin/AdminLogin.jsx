import React, { useContext } from "react";
import login from "../../assets/Login.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const AdminLogin = () => {
    const { userLogIn } = useContext(AuthContext);
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        userLogIn(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(userCredential)
                // ...
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
                                <div className='mt-2 space-x-3'>
                                    <a className='link link-hover hover:text-blue-800'>
                                        Forgot password?
                                    </a>
                                    <Link
                                        to='/admin/registration'
                                        className='link link-hover hover:text-blue-800'>
                                        Create a new account?
                                    </Link>
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

export default AdminLogin;
