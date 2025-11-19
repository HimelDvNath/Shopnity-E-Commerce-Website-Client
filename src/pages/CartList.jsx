import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const CartList = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        fetchCartItems();
    }, [user]);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            // Get cart list
            const resCart = await fetch(`http://localhost:3000/users/cartlist/${user.uid}`);
            const cartData = await resCart.json();

            // Fetch product details for each productId
            const productPromises = cartData.map(async (item) => {
                const resProduct = await fetch(`http://localhost:3000/products/${item.productId}`);
                const product = await resProduct.json();
                return { ...product, quantity: item.quantity || 1 };
            });

            const fullCartItems = await Promise.all(productPromises);
            setCartItems(fullCartItems);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/users/cartlist/${user.uid}/${productId}`,
                { method: "DELETE" }
            );
            if (res.ok) setCartItems((prev) => prev.filter((item) => item._id !== productId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) => (item._id === productId ? { ...item, quantity } : item))
        );
    };

    const totalPrice = cartItems.reduce((sum, item) => {
        const discountedPrice =
            Math.round(item.price - (item.price * (item.discountPercentage || 0)) / 100);
        return sum + discountedPrice * (item.quantity || 1);
    }, 0);

    if (loading) return <div>Loading Cart...</div>;
    if (!cartItems.length) return <div className='p-6'>Your cart is empty.</div>;

    return (
        <div className='flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto'>
            {/* Cart Items */}
            <div className='flex-1'>
                {cartItems.map((item) => {
                    const discountedPrice =
                         Math.round(
                        item.price * (1 - item.discountPercentage / 100)
                    );
                    return (
                        <div
                            key={item._id}
                            className='flex items-center justify-between border-b py-4'>
                            <img
                                src={item.image}
                                alt={item.title}
                                className='w-20 h-20 object-cover rounded'
                            />
                            <div className='flex-1 ml-4'>
                                <h3 className='font-semibold'>{item.title}</h3>
                                <p className='text-red-500 font-bold'>
                                    ৳{discountedPrice}
                                </p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    min={1}
                                    value={item.quantity || 1}
                                    onChange={(e) =>
                                        handleQuantityChange(item._id, Number(e.target.value))
                                    }
                                    className='w-16 border rounded px-2 py-1'
                                />
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className='px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600'>
                                    Remove
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
 
            {/* Cart Summary */}
            <div className='w-full lg:w-1/3 border p-4 rounded shadow-md h-fit'>
                <h2 className='text-xl font-bold mb-4'>Estimate</h2>
                <div className='flex justify-between mb-2'>
                    <span>Total:</span>
                    <span className='font-bold'>৳{totalPrice}</span>
                </div>
                <button className='w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default CartList;
