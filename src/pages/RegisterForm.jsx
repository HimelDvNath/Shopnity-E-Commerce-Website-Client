import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signup from "../assets/signup.json";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const RegisterForm = () => {
    const { userSignUp } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [phone, setPhone] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (passwordError || phoneError || !passwordMatch) return;

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        userSignUp(data.email, data.password)
            .then((currentUser) => {
                //send to the server
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).then((res) => res.json());

                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "SignUp successfully!",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    width: 300,
                    padding: "0.5em 1em",
                    background: "#fff",
                    iconColor: "#4ade80",
                    willClose: () => navigate("/"),
                });
            })
            .catch((error) => {
                const errorMsg = error.code.split("/")[1].replace(/-/g, " ");
                Swal.fire({
                    title: `<span style="font-size:1.2rem; font-weight:600; color:#ef4444;">${errorMsg}</span>`,
                    html: `<p style="font-size:0.9rem; color:#374151; margin-top:0.5em;">Try again!</p>`,
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
                });
            });
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setPasswordMatch(value === password);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.length < 6) {
            setPasswordError("Password must be at least 6 characters");
        } else {
            setPasswordError("");
        }

        if (confirmPassword) {
            setPasswordMatch(confirmPassword === value);
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPhone(value);

        if (value.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
        } else {
            setPhoneError("");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleConfirmPasswordFocus = () => {
        setConfirmPasswordFocused(true);
    };

    const handleConfirmPasswordBlur = () => {
        setConfirmPasswordFocused(true); // Keep showing error after blur if there's a mismatch
    };

    // Only show password mismatch error when confirm password is focused or has value and doesn't match
    const shouldShowPasswordMismatch =
        confirmPasswordFocused && confirmPassword && !passwordMatch;

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-primary via-neutral-secondary to-neutral-tertiary-soft p-4'>
            <div className='hero w-full'>
                <div className='hero-content flex-col-reverse lg:flex-row gap-10'>
                    {/* Lottie Animation */}
                    <div className='w-full lg:w-1/2 flex justify-center'>
                        <Lottie
                            animationData={signup}
                            loop
                            background='transparent'
                            speed={1}
                            className='w-64 sm:w-80 md:w-96 lg:w-[420px]'
                        />
                    </div>

                    {/* Registration Card */}
                    <div className='card bg-base-100/80 backdrop-blur-md w-full max-w-md shadow-xl border border-neutral-tertiary-soft rounded-2xl p-6'>
                        <div className='card-body space-y-4'>
                            <h2 className='text-2xl font-bold text-center text-heading'>
                                Create a User Account
                            </h2>
                            <p className='text-sm text-center text-body'>
                                Join us and explore new opportunities
                            </p>

                            <form
                                onSubmit={handleRegister}
                                className='space-y-4'>
                                {/* Full Name */}
                                <div>
                                    <label className='label font-medium'>
                                        Full Name
                                    </label>
                                    <input
                                        type='text'
                                        name='name'
                                        className='input input-bordered w-full rounded-lg focus:ring-2 focus:ring-brand transition-all duration-200'
                                        placeholder='Full Name'
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className='label font-medium'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        className='input input-bordered w-full rounded-lg focus:ring-2 focus:ring-brand transition-all duration-200'
                                        placeholder='Enter your email'
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className='label font-medium'>
                                        Phone Number
                                    </label>
                                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                                        <select
                                            name='countryCode'
                                            className='select outline-none w-full sm:w-32 rounded-lg border border-neutral-tertiary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200'
                                            defaultValue='+880'>
                                            <option value='+880'>
                                                🇧🇩 +880
                                            </option>
                                            <option value='+91'>🇮🇳 +91</option>
                                            <option value='+1'>🇺🇸 +1</option>
                                            <option value='+44'>🇬🇧 +44</option>
                                        </select>

                                        <input
                                            type='tel'
                                            name='phone'
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            className={`input input-bordered w-full rounded-lg focus:ring-2 transition-all duration-200 ${
                                                phoneError
                                                    ? "focus:ring-red-500 border-red-500"
                                                    : "focus:ring-brand"
                                            }`}
                                            placeholder='1XXXXXXXXX'
                                            required
                                        />
                                    </div>
                                    {phoneError && (
                                        <p className='text-red-500 text-sm mt-1'>
                                            {phoneError}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className='label font-medium'>
                                        Password
                                    </label>
                                    <div className='relative group'>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name='password'
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className={`input input-bordered w-full rounded-lg transition-all duration-200 pr-12 ${
                                                passwordError
                                                    ? "focus:ring-2 focus:ring-red-500 border-red-500"
                                                    : "focus:ring-2 focus:ring-brand"
                                            }`}
                                            placeholder='Create a password'
                                            required
                                        />
                                        <button
                                            type='button'
                                            onClick={togglePasswordVisibility}
                                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none transition-colors duration-200 z-10'>
                                            {showPassword ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {passwordError && (
                                        <p className='text-red-500 text-sm mt-1'>
                                            {passwordError}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className='label font-medium'>
                                        Confirm Password
                                    </label>
                                    <div className='relative group'>
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name='confirmPassword'
                                            value={confirmPassword}
                                            onChange={
                                                handleConfirmPasswordChange
                                            }
                                            onFocus={handleConfirmPasswordFocus}
                                            onBlur={handleConfirmPasswordBlur}
                                            className={`input input-bordered w-full rounded-lg transition-all duration-200 pr-12 ${
                                                shouldShowPasswordMismatch
                                                    ? "focus:ring-2 focus:ring-red-500 border-red-500"
                                                    : "focus:ring-2 focus:ring-brand"
                                            }`}
                                            placeholder='Confirm your password'
                                            required
                                        />
                                        <button
                                            type='button'
                                            onClick={
                                                toggleConfirmPasswordVisibility
                                            }
                                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none transition-colors duration-200 z-10'>
                                            {showConfirmPassword ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {shouldShowPasswordMismatch && (
                                        <p className='text-red-500 text-sm mt-1'>
                                            Passwords do not match
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    className='btn btn-neutral w-full mt-2'
                                    disabled={
                                        passwordError ||
                                        phoneError ||
                                        (confirmPassword && !passwordMatch)
                                    }>
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
