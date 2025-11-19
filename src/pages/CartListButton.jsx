// CartListButton.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const CartListButton = ({ product }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inCart, setInCart] = useState(false);

    // Check if product is already in the cart on mount
    useEffect(() => {
        if (!user) return;

        const checkCart = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/users/cartlist/${user.uid}`
                );
                if (res.ok) {
                    const cartItems = await res.json();
                    const exists = cartItems.some(
                        (item) => item.productId === product._id
                    );
                    setInCart(exists);
                }
            } catch (err) {
                console.error("Failed to check cart:", err);
            }
        };

        checkCart();
    }, [user, product._id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            if (!inCart) {
                // Add to cart
                const response = await fetch(
                    `http://localhost:3000/users/cartlist/${user.uid}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ productId: product._id }),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.error || "Failed to add to cart");
                    return;
                }

                alert("Added to cart!");
                setInCart(true);
            } else {
                // Remove from cart
                const response = await fetch(
                    `http://localhost:3000/users/cartlist/${user.uid}/${product._id}`,
                    { method: "DELETE" }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.error || "Failed to remove from cart");
                    return;
                }

                alert("Removed from cart!");
                setInCart(false);
            }
        } catch (err) {
            alert("Server error");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className={`btn flex-1 ${
                inCart ? "btn-outline" : "btn-primary"
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
            {loading
                ? inCart
                    ? "Removing..."
                    : "Adding..."
                : inCart
                ? "Remove from Cart"
                : "Add to Cart"}
        </button>
    );
};

export default CartListButton;
