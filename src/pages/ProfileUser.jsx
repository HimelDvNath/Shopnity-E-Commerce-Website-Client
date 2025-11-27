import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const ProfileUser = () => {
    const users = useLoaderData();
    const {user} = useContext(AuthContext);
    const userData = users.find((eachUser)=> eachUser.email === user?.email);
    if(!user){
        return
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>User Profile</h1>
                    <p className='text-gray-600 mt-2'>Your account information</p>
                </div>

                {/* Profile Card */}
                <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
                    {/* User Details */}
                    <div className='space-y-4'>
                        <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                            <span className='text-gray-600 font-medium'>Name</span>
                            <span className='text-gray-900'>{userData.name}</span>
                        </div>
                        
                        <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                            <span className='text-gray-600 font-medium'>Email</span>
                            <span className='text-gray-900'>{userData.email}</span>
                        </div>
                        
                        <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                            <span className='text-gray-600 font-medium'>Phone</span>
                            <span className='text-gray-900'>{userData.countryCode} {userData.phone}</span>
                        </div>
                        
                        <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                            <span className='text-gray-600 font-medium'>User ID</span>
                            <span className='text-gray-900 text-sm'>{userData._id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;