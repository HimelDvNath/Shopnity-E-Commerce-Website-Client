import { useState, useEffect } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router";
import Swal from "sweetalert2";

export default function UpdateProductForm() {
    const {
        _id,
        title,
        brand,
        category,
        price,
        discountPercentage,
        stock,
        tags,
        returnPolicy,
        warrantyInformation,
        description,
        image,
    } = useLoaderData();
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const updateData = {};

        if (form.brand.value !== brand) updateData.brand = form.brand.value;
        if (form.category.value !== category)
            updateData.category = form.category.value;
        if (parseFloat(form.price.value) !== price)
            updateData.price = parseFloat(form.price.value);
        if (parseFloat(form.discountPercentage.value) !== discountPercentage)
            updateData.discountPercentage = parseFloat(
                form.discountPercentage.value
            );
        if (parseInt(form.stock.value) !== stock)
            updateData.stock = parseInt(form.stock.value);
        if (form.title.value !== title) updateData.title = form.title.value;
        if (form.warrantyInformation.value !== warrantyInformation)
            updateData.warrantyInformation = form.warrantyInformation.value;
        if (form.returnPolicy.value !== returnPolicy)
            updateData.returnPolicy = form.returnPolicy.value;
        if (form.description.value !== description)
            updateData.description = form.description.value;

        // Handle tags
        const newTags = form.tags.value
            ? form.tags.value.split(",").map((tag) => tag.trim())
            : [];
        const currentTags = Array.isArray(tags) ? tags : [tags].filter(Boolean);
        if (JSON.stringify(newTags) !== JSON.stringify(currentTags)) {
            updateData.tags = newTags;
        }
        if (form.image.value) {
            const file = formData.get("image");
            if (file && file instanceof File) {
                const base64Image = await convertToBase64(file);
                updateData.image = base64Image;
            }
        } else {
            updateData.image = image;
        }

        //send to the server
        // axios use kora jay...it's simple and easy
        try {
            // Use PATCH for partial updates
            const response = await fetch(
                `http://localhost:3000/products/${_id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                }
            );

            const data = await response.json();

            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Product Updated successfully!",
                    icon: "success",
                    draggable: true,
                });
            } else if (data.matchedCount > 0) {
                Swal.fire({
                    title: "No changes made!",
                    icon: "info",
                    draggable: true,
                });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            Swal.fire({
                title: "Error updating product!",
                icon: "error",
                draggable: true,
            });
        }
    };

    return (
        <div>
            <h1 className='text-lg md:text-2xl lg:text-5xl font-bold text-center pb-10'>
                Update Product
            </h1>

            <form
                onSubmit={handleUpdateProduct}
                className='w-11/12 mx-auto space-y-3'>
                <div className='grid md:grid-cols-2 md:gap-6'>
                    {/* Brand */}
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='brand'
                            id='brand'
                            defaultValue={brand}
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='brand'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Brand name
                        </label>
                    </div>

                    {/* Category */}
                    <div className='relative z-0 w-full mb-5 group'>
                        <select
                            name='category'
                            defaultValue={category}
                            className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                            required>
                            <option value=''>Select Category</option>
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

                {/* Price & Discount */}
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='number'
                            name='price'
                            defaultValue={price}
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='price'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Product Price per item
                        </label>
                    </div>

                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='number'
                            name='discountPercentage'
                            defaultValue={discountPercentage}
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='discountPercentage'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Discount Percentage
                        </label>
                    </div>
                </div>

                {/* Stock & Title */}
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='number'
                            name='stock'
                            defaultValue={stock}
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='stock'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Stock
                        </label>
                    </div>

                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='title'
                            defaultValue={title}
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='title'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Title
                        </label>
                    </div>
                </div>

                {/* Warranty & Return */}
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='warrantyInformation'
                            defaultValue={warrantyInformation}
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='warrantyInformation'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Warranty Information
                        </label>
                    </div>

                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='returnPolicy'
                            defaultValue={returnPolicy}
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                            placeholder=' '
                            required
                        />
                        <label
                            htmlFor='returnPolicy'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Return Policy
                        </label>
                    </div>
                </div>

                {/* Image & Tags */}
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='file'
                            name='image'
                            accept='image/*'
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                        />
                        <label
                            htmlFor='image'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Image
                        </label>
                        {image && (
                            <div className='mt-2'>
                                <p className='text-sm text-body'>
                                    Current Image:
                                </p>
                                <img
                                    src={image}
                                    alt='Current product'
                                    className='h-20 w-20 object-cover mt-1'
                                />
                            </div>
                        )}
                    </div>

                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='tags'
                            defaultValue={
                                Array.isArray(tags) ? tags.join(", ") : tags
                            }
                            className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
                        />
                        <label
                            htmlFor='tags'
                            className='absolute text-sm text-body duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'>
                            Tags (Separated by comma)
                        </label>
                    </div>
                </div>

                {/* Description */}
                <div className='relative z-0 w-full mb-5 group'>
                    <label
                        htmlFor='description'
                        className='block mb-2.5 text-sm font-medium text-heading'>
                        Product Description
                    </label>
                    <textarea
                        name='description'
                        id='description'
                        defaultValue={description}
                        rows='4'
                        className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body'
                    />
                </div>

                {/* Submit Button */}
                <div className='flex justify-center items-center'>
                    <button
                        type='submit'
                        className='relative rounded-full inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200'>
                        <span className='relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent leading-5'>
                            Update Product
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}
