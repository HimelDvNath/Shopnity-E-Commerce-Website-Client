import React from "react";
import { Link, useNavigate } from "react-router";
import UpdateProductForm from "./UpdateProductForm";
import Swal from "sweetalert2";

const ProductItemAdmin = ({ product }) => {
    const navigate = useNavigate()
    const discountPrice = Math.round(
        product.price - (product.price * product.discountPercentage) / 100
    );
    const handleDelete = (id) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:3000/products/${id}`, {
                        method: "DELETE",
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.deletedCount) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your Product has been deleted.",
                                    icon: "success",
                                });
                            }
                        });
                }
            });
        };

    return (
        <div className='w-full mb-5 grid grid-cols-12 p-3 border rounded-lg shadow-sm hover:bg-gray-50 transition'>
            {/* Left Section */}
            <div className='col-span-4'>
                <div className='flex items-start gap-3'>
                    {/* image */}
                    <img
                        src={product.image}
                        alt={product.title}
                        className='w-12 h-12 rounded-md object-cover'
                    />

                    <div>
                        <p className='font-semibold text-gray-900'>
                            {product.title}
                        </p>
                        <p className='text-sm text-gray-500'>
                            Stock: {product.stock}
                        </p>
                    </div>
                </div>
            </div>

            {/* Middle Section: Price */}
            <div className='col-span-4'>
                <div className='text-left'>
                    <p className='font-semibold text-red-600'>
                        ৳ {discountPrice}
                    </p>
                    <p className='text-sm line-through text-gray-400'>
                        ৳ {product.price}
                    </p>
                </div>
            </div>

            {/* Buttons */}
            <div className='col-span-4 flex justify-end items-center'>
                <div className='flex gap-2'>
                    <button
                        onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                        className='px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700'>
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(product._id)}
                        className='px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItemAdmin;
