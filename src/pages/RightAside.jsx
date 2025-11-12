import React from 'react';
import { Link } from 'react-router';

const RightAside = () => {
    return (
        <div className='mt-5 '>
            <Link className='p-3 bg-gray-300 hover:bg-gray-400 rounded-2xl'>Add Product</Link>
        </div>
    );
};

export default RightAside;