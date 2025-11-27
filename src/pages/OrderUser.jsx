import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router";

const OrderUser = () => {
    const user = useParams();
    const data = useLoaderData();
    const orders = data.filter((item) => item.user === user.id);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch products for all orders
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProductIds = [...new Set(orders.flatMap(order => order.products))];
                
                const productPromises = allProductIds.map(productId =>
                    fetch(`http://localhost:3000/products/${productId}`)
                        .then(res => res.json())
                        .then(productData => ({ id: productId, data: productData }))
                        .catch(error => {
                            console.error(`Error fetching product ${productId}:`, error);
                            return { id: productId, data: null };
                        })
                );

                const productResults = await Promise.all(productPromises);
                const productsMap = productResults.reduce((acc, { id, data }) => {
                    acc[id] = data;
                    return acc;
                }, {});

                setProducts(productsMap);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orders.length > 0) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [orders]);

    // Status color mapping
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'shipping':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Calculate product price with discount
    const getProductPriceInfo = (product) => {
        if (!product) return { finalPrice: 0, hasDiscount: false };

        const price = Number(product.price) || 0;
        const discount = Number(product.discountPercentage) || 0;
        const finalPrice = discount > 0 ? price - (price * discount / 100) : price;

        return {
            price,
            discount,
            finalPrice,
            hasDiscount: discount > 0
        };
    };

    // Format price
    const formatPrice = (price) => {
        return `৳${Number(price).toFixed(0)}`;
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Your Orders</h1>
                    <p className='text-gray-600 mt-2'>View all your order details</p>
                </div>

                {/* Orders Grid */}
                <div className='space-y-6'>
                    {orders && orders.length > 0 ? (
                        orders.map((order) => (
                            <div
                                key={order._id}
                                className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300'
                            >
                                {/* Order Header */}
                                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4'>
                                    <div>
                                        <h3 className='text-xl font-bold text-gray-900'>
                                            Order #{order.orderId}
                                        </h3>
                                        <p className='text-gray-500 text-sm mt-1'>
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className='mt-2 sm:mt-0'>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                    <div className='space-y-2'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Transaction ID:</span>
                                            <span className='font-medium'>{order.transactionId}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Payment Method:</span>
                                            <span className='font-medium'>{order.paymentMethod?.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Payment Status:</span>
                                            <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Total Amount:</span>
                                            <span className='font-bold text-lg text-green-600'>
                                                ৳{order.totalAmount}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className='border-t border-gray-200 pt-4'>
                                    <h4 className='font-semibold text-gray-900 mb-3'>Products</h4>
                                    <div className='space-y-3'>
                                        {loading ? (
                                            order.products.map((_, index) => (
                                                <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 animate-pulse">
                                                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            order.products.map((productId, index) => {
                                                const product = products[productId];
                                                
                                                if (!product) {
                                                    return (
                                                        <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                                                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                                                <span className="text-gray-400">❌</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-700">Product not found</p>
                                                                <p className="text-gray-500 text-sm">ID: {productId}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                const { price, discount, finalPrice, hasDiscount } = getProductPriceInfo(product);

                                                return (
                                                    <div key={index} className="flex items-center space-x-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                        {/* Product Image */}
                                                        <div className="flex-shrink-0">
                                                            <img 
                                                                src={product.image} 
                                                                alt={product.title}
                                                                className="w-16 h-16 object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        
                                                        {/* Product Details */}
                                                        <div className="flex-1 min-w-0">
                                                            <h5 className="font-medium text-gray-900 truncate">
                                                                {product.title}
                                                            </h5>
                                                            <p className="text-sm text-gray-500 truncate">
                                                                {product.brand}
                                                            </p>
                                                            <div className="flex items-center space-x-2 mt-1">
                                                                {hasDiscount ? (
                                                                    <>
                                                                        <span className="text-lg font-semibold text-green-600">
                                                                            {formatPrice(finalPrice)}
                                                                        </span>
                                                                        <span className="text-sm text-gray-500 line-through">
                                                                            {formatPrice(price)}
                                                                        </span>
                                                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                                                            {discount}% OFF
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-lg font-semibold text-gray-900">
                                                                        {formatPrice(price)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-12'>
                            <div className='bg-white rounded-xl p-8 shadow-lg'>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <span className='text-2xl'>📦</span>
                                </div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                                    No Orders Found
                                </h3>
                                <p className='text-gray-600'>
                                    You haven't placed any orders yet.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderUser;