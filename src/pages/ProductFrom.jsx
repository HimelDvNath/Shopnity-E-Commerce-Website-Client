import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductFrom = () => {
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleForm = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.tags = data.tags.split(",");

        const file = formData.get("image");
        if (file && file instanceof File) {
            const base64Image = await convertToBase64(file);
            data.image = base64Image;
        }

        //send to the server
        fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Product added successfully!",
                        icon: "success",
                        draggable: true,
                    });
                    form.reset();
                }
            });
    };
    return (
        <div>
            <h1 className='text-lg md:text-2xl lg:text-5xl font-bold text-center pb-10'>
                Product Information
            </h1>
            <form onSubmit={handleForm} className='w-11/12 mx-auto space-y-3'>
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='brand'
                            id='brand'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='brand'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Brand name
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <select
                            name='category'
                            className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                            required>
                            <option option value=''>
                                Categories
                            </option>
                            <option value='beauty'>beauty</option>
                            <option value='fragrances'>fragrances</option>
                            <option value='furniture'>furniture</option>
                            <option value='groceries'>groceries</option>
                        </select>
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                            <svg
                                className='fill-current h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'>
                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='number'
                            name='price'
                            id='price'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='price'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Product Price per item
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='number'
                            name='discountPercentage'
                            id='discountPercentage'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='discountPercentage'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Discount Percentage
                        </label>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='number'
                            name='stock'
                            id='stock'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='stock'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Stock
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='title'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Title
                        </label>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='warrantyInformation'
                            id='warrantyInformation'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='warrantyInformation'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Warranty Information
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='returnPolicy'
                            id='returnPolicy'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='returnPolicy'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Return Policy
                        </label>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='file'
                            accept='image/*'
                            name='image'
                            id='image'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='image'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Image URL
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='tags'
                            id='tags'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='tags'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'>
                            Tags(Separated by Comma ',')
                        </label>
                    </div>
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <label
                        htmlFor='description'
                        className='block mb-2.5 text-sm font-medium text-heading'>
                        Product description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        rows='4'
                        required
                        className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body'
                        placeholder='Write your product description here...'></textarea>
                </div>

                <div className='flex justify-center items-center'>
                    <button
                        type='submit'
                        className='relative rounded-full inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
                        <span className=' relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5'>
                            Add Product
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFrom;
