import React from 'react';

const OrderViewModal = ({ order, onClose, onStatusUpdate }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            processing: 'bg-blue-100 text-blue-800 border border-blue-200',
            shipped: 'bg-purple-100 text-purple-800 border border-purple-200',
            delivered: 'bg-green-100 text-green-800 border border-green-200',
            cancelled: 'bg-red-100 text-red-800 border border-red-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
    };

    const statusOptions = [
        { value: 'pending', label: '⏳ Pending' },
        { value: 'processing', label: '🔄 Processing' },
        { value: 'shipped', label: '🚚 Shipped' },
        { value: 'delivered', label: '✅ Delivered' },
        { value: 'cancelled', label: '❌ Cancelled' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Order Information</h3>
                            <div className="space-y-2">
                                <p><strong>Order ID:</strong> {order.orderId}</p>
                                <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod?.toUpperCase()}</p>
                                <p><strong>Transaction ID:</strong> {order.transactionId || 'N/A'}</p>
                                <p><strong>Total Amount:</strong> ৳{order.totalAmount?.toLocaleString()}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Status Management</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span>Current Status:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                    </span>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Update Status:
                                    </label>
                                    <select
                                        value={order.status}
                                        onChange={(e) => onStatusUpdate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Products ({order.products?.length || 0})</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            {order.products && order.products.length > 0 ? (
                                <div className="space-y-2">
                                    {order.products.map((productId, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                            <div>
                                                <p className="font-medium">Product ID: {productId}</p>
                                                <p className="text-sm text-gray-500">Quantity information would be here</p>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No products information available</p>
                            )}
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p><strong>User ID:</strong> {order.user || 'N/A'}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Customer details would be fetched from user service
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-black transition-colors"
                    >
                        Close
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default OrderViewModal;