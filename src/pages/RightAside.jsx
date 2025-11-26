import React from 'react';
import { Link } from 'react-router';

const RightAside = () => {
    return (
        <div className='grid grid-cols-1 gap-2'>
            <Link to='/admin/add-product' className='p-3 text-center bg-gray-300 hover:bg-gray-400 rounded-2xl'>Add Product</Link>
            <Link to='/admin/users' className='p-3 text-center bg-gray-300 hover:bg-gray-400 rounded-2xl'>View Users</Link>
            <Link to='/admin/products-list' className='p-3 text-center bg-gray-300 hover:bg-gray-400 rounded-2xl'>Products List</Link>
            <Link to='/admin/orders-list' className='p-3 text-center bg-gray-300 hover:bg-gray-400 rounded-2xl'>Order List</Link>
        </div>
    );
};

export default RightAside;