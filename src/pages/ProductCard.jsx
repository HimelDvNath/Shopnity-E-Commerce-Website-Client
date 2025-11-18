// src/components/ProductCard/ProductCard.js
import React from "react";
import { Link } from "react-router";
import WishlistButton from "./WishlistButton";


const ProductCard = ({ product }) => {
    const {
        brand,
        category,
        discountPercentage,
        image,
        price,
        returnPolicy,
        stock,
        tags,
        title,
        warrantyInformation,
        _id,
    } = product;

    return (
        <div className='card bg-base-100 shadow-sm w-full h-[500px] flex flex-col relative'>
            {/* Product Image */}
            <div className='relative h-100 overflow-hidden p-3'>
                <img
                    className='h-full w-full object-cover rounded'
                    src={image}
                    alt={`${title} product image`}
                />
            </div>
            
            {/* Wishlist Heart Button */}
            <div className='absolute right-3 top-3'>
                <WishlistButton 
                    productId={_id} 
                    productData={product}
                />
            </div>

            {/* Product Details */}
            <Link to={`/productDetails/${_id}`} className="flex-1 flex flex-col">
                <div className='card-body flex-1 '>
                    <h2 className='card-title text-xl font-bold text-heading line-clamp-2'>
                        {title}
                    </h2>
                    <div className='text-gray-600 space-y-1 text-sm'>
                        <p className="font-semibold">Brand: {brand}</p>
                        <p className="text-lg font-bold text-green-600">
                            Price: ৳{price}
                        </p>
                        <p className="text-orange-500">
                            Discount: {discountPercentage}% off
                        </p>
                        <p className={`text-sm ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
                        </p>
                    </div>

                    <div className='card-actions justify-end mt-auto pt-4'>
                        <button className='btn btn-active btn-accent w-full'>
                            View Details
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;