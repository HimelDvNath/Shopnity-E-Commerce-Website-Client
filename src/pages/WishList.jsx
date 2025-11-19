import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import WishlistButton from "./WishlistButton";
import { IoMdHeart } from "react-icons/io";
import CartListButton from "./CartListButton";

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartProductId, setCartProductId] = useState(null);

    useEffect(() => {
        if (!user) {
            setWishlist([]);
            setLoading(false);
            navigate("/login");
            return;
        }

        fetchWishlistProducts();
    }, [user, navigate]);

    const fetchWishlistProducts = async () => {
        try {
            setLoading(true);

            // Fetch wishlist items
            const res = await fetch(
                `http://localhost:3000/users/wishlist/${user.uid}`
            );

            if (!res.ok) {
                setWishlist([]);
                return;
            }

            const data = await res.json();

            if (!data || data.length === 0) {
                setWishlist([]);
                return;
            }

            // Fetch full product details for each wishlist item
            const products = await Promise.all(
                data.map(async (item) => {
                    try {
                        const productRes = await fetch(
                            `http://localhost:3000/products/${item.productId}`
                        );
                        if (productRes.ok) {
                            const productData = await productRes.json();
                            return {
                                ...productData,
                                wishlistItemId: item._id, // Store wishlist item ID for removal
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error("Failed to fetch product:", error);
                        return null;
                    }
                })
            );

            // Filter out any failed product fetches
            const validProducts = products.filter(
                (product) => product !== null
            );
            setWishlist(validProducts);
        } catch (error) {
            console.error("Failed to fetch wishlist products:", error);
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        if (!user) return;

        try {
            const response = await fetch(
                `http://localhost:3000/users/wishlist/${user.uid}/${productId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to remove from wishlist");
            }

            // Remove the product from local state
            setWishlist((prev) =>
                prev.filter((product) => product._id !== productId)
            );

            console.log("Product removed from wishlist");
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            alert(error.message);
        }
    };

    const handleAddToCart = async (product) => {
        if (!user) {
            navigate("/login");
            return;
        }
        {
            product._id == cartProductId
                ? setCartProductId("")
                : setCartProductId(product._id);
        }
    };

    // Handle when a product is removed via WishlistButton
    const handleWishlistUpdate = (productId) => {
        setWishlist((prev) =>
            prev.filter((product) => product._id !== productId)
        );
    };

    if (loading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <div className='flex flex-col items-center'>
                    <div className='loading loading-spinner loading-lg text-primary'></div>
                    <p className='mt-4 text-gray-600'>
                        Loading your wishlist...
                    </p>
                </div>
            </div>
        );
    }

    if (!wishlist.length) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='text-6xl mb-1 flex justify-center'>
                        <IoMdHeart
                            size={50}
                            color={"red"}
                            className='transition-colors'
                        />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-700 mb-2'>
                        Your wishlist is empty
                    </h2>
                    <p className='text-gray-500 mb-6'>
                        Start adding products you love!
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className='btn btn-primary'>
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6 max-w-7xl mx-auto'>
            <div className='flex justify-between items-center mb-8'>
                <h2 className='text-3xl font-bold text-gray-800'>
                    Your Wishlist
                </h2>
                <span className='text-gray-600 bg-gray-100 px-3 py-1 rounded-full'>
                    {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
                </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {wishlist.map((product) => {
                    const discountPrice = Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                    );

                    return (
                        <div
                            key={product._id}
                            className='border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col'>
                            {/* Product Image with Wishlist Button */}
                            <div className='relative mb-4'>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className='w-full h-48 object-cover rounded-lg'
                                />
                                <div className='absolute top-2 right-2'>
                                    <WishlistButton
                                        productId={product._id}
                                        productData={product}
                                        onWishlistUpdate={handleWishlistUpdate}
                                    />
                                </div>
                                {product.discountPercentage > 0 && (
                                    <div className='absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold'>
                                        {product.discountPercentage}% OFF
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className='flex-1'>
                                <h3 className='font-semibold text-gray-800 text-lg mb-2 line-clamp-2'>
                                    {product.title}
                                </h3>
                                <p className='text-gray-600 text-sm mb-3'>
                                    {product.brand}
                                </p>

                                <div className='flex items-center gap-2 mb-3'>
                                    <p className='text-red-500 font-bold text-xl'>
                                        ৳{discountPrice}
                                    </p>
                                    {product.discountPercentage > 0 && (
                                        <p className='text-gray-400 text-sm line-through'>
                                            ৳{product.price}
                                        </p>
                                    )}
                                </div>

                                <p
                                    className={`text-sm font-medium mb-4 ${
                                        product.stock > 0
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }`}>
                                    {product.stock > 0
                                        ? `In Stock (${product.stock})`
                                        : "Out of Stock"}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-2 mt-auto'>
                                <CartListButton product={product} />
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/productDetails/${product._id}`
                                        )
                                    }
                                    className='btn btn-outline border-gray-300 hover:bg-gray-50'>
                                    View
                                </button>
                            </div>

                            <div></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Wishlist;
