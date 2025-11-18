import React, { useState, useEffect, useContext } from "react";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const WishlistButton = ({ productId, productData, onWishlistUpdate, size = 30 }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
        if (!user) {
            setFavorite(false);
            navigate('/');
            return;
        }

        const checkWishlistStatus = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/users/wishlist/${user.uid}/${productId}`
                );

                if (!res.ok) {
                    setFavorite(false);
                    return;
                }

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    setFavorite(false);
                    return;
                }

                const data = await res.json();
                
                if (data && (data.productId === productId || data._id)) {
                    setFavorite(true);
                } else {
                    setFavorite(false);
                }
            } catch (error) {
                console.error("Failed to fetch wishlist status:", error);
                setFavorite(false);
            }
        };

        checkWishlistStatus();
    }, [user, productId]);

    const addToWishlist = async () => {
        const wishlistData = {
            productId: productId,
            productData: productData
        };
        
        const response = await fetch(
            `http://localhost:3000/users/wishlist/${user.uid}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(wishlistData),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to add to wishlist");
        }

        return await response.json();
    };

    const removeFromWishlist = async () => {
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

        return await response.json();
    };

    const handleWishlistToggle = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (isLoading) return;

        const newFavoriteState = !favorite;
        setFavorite(newFavoriteState);
        setIsLoading(true);

        try {
            if (newFavoriteState) {
                await addToWishlist();
                console.log("Added to wishlist");
            } else {
                await removeFromWishlist();
                console.log("Removed from wishlist");
                
                // Notify parent component about the removal
                if (onWishlistUpdate) {
                    onWishlistUpdate(productId);
                }
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            // Revert the UI state if the request failed
            setFavorite(!newFavoriteState);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={handleWishlistToggle}
            disabled={isLoading}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-105"
            aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
            {isLoading ? (
                <div className={`w-6 h-6 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin`}></div>
            ) : (
                <IoMdHeart
                    size={size}
                    color={favorite ? "red" : "gray"}
                    className='transition-colors'
                />
            )}
        </button>
    );
};

export default WishlistButton;