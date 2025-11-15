import React from 'react';
import { Link } from 'react-router';

const RightAside = () => {
    return (
        <div className=''>
            <Link to='/admin/add-product' className='p-3 bg-gray-300 hover:bg-gray-400 rounded-2xl'>Add Product</Link>
        </div>
    );
};

export default RightAside;