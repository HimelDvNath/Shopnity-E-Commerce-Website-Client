import React from "react";
import { useLoaderData } from "react-router";
import WishlistButton from "./WishlistButton";
import CartListButton from "./CartListButton";


const ProductDetails = () => {
    const product = useLoaderData();

    const {
        brand,
        category,
        discountPercentage,
        description,
        image,
        price,
        returnPolicy,
        stock,
        tags,
        title,
        warrantyInformation,
        _id,
    } = product;

    const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2);

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image Section */}
            <div className="relative group">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full rounded-xl shadow-lg object-cover h-[450px]"
                />

                {/* Wishlist Button */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <WishlistButton
                        productId={_id} 
                        productData={product}
                    />
                </div>
            </div>

            {/* Info Section */}
            <div className="p-5">
                <h1 className="text-4xl font-bold mb-3 text-gray-800">{title}</h1>
                <p className="text-lg text-gray-500 mb-1">Brand: {brand}</p>
                <p className="text-md text-gray-500 mb-3">Category: {category}</p>

                {/* Price */}
                <div className="mt-4">
                    <p className="text-3xl font-extrabold text-green-600">
                        ৳{discountedPrice}
                    </p>
                    <p className="line-through text-gray-400 text-md">
                        ৳{price} <span className="text-red-500">({discountPercentage}% Off)</span>
                    </p>
                </div>

                {/* Stock */}
                <p className={`mt-2 font-semibold ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags?.map((t, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                            #{t}
                        </span>
                    ))}
                </div>

                {/* Description */}
                {description && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Product Description</h2>
                        <p className="text-gray-700 text-sm">{description}</p>
                    </div>
                )}

                {/* Policies */}
                <div className="mt-6 space-y-2">
                    <p><span className="font-semibold">Warranty:</span> {warrantyInformation}</p>
                    <p><span className="font-semibold">Return Policy:</span> {returnPolicy}</p>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex gap-4">
                    <CartListButton product={product}/>
                    <button className="btn px-6 py-3 rounded-xl border border-gray-400 hover:bg-gray-100 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;