import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import OrderViewModal from './OrderViewModal';


const OrderListAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const navigate = useNavigate();

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update order status with confirmation
    const updateOrderStatus = async (orderId, newStatus, orderDetails) => {
        // Show confirmation for critical status changes
        if (newStatus === 'cancelled' || newStatus === 'delivered') {
            const action = newStatus === 'cancelled' ? 'cancel' : 'mark as delivered';
            const isConfirmed = window.confirm(
                `Are you sure you want to ${action} order ${orderDetails.orderId}?`
            );
            if (!isConfirmed) return;
        }

        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Update local state
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
                
                // Show success message
                alert(`Order status updated to ${newStatus}`);
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
        }
    };

    // Open view modal
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    // Close view modal
    const handleCloseModal = () => {
        setShowViewModal(false);
        setSelectedOrder(null);
    };

    // Filter orders based on status
    const filteredOrders = selectedStatus === 'all' 
        ? orders 
        : orders.filter(order => order.status === selectedStatus);

    // Calculate statistics
    const stats = {
        total: orders.length,
        pending: orders.filter(order => order.status === 'pending').length,
        processing: orders.filter(order => order.status === 'processing').length,
        shipped: orders.filter(order => order.status === 'shipped').length,
        delivered: orders.filter(order => order.status === 'delivered').length,
        cancelled: orders.filter(order => order.status === 'cancelled').length,
        totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get status badge color
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            processing: 'bg-blue-100 text-blue-800 border border-blue-200',
            shipped: 'bg-purple-100 text-purple-800 border border-purple-200',
            delivered: 'bg-green-100 text-green-800 border border-green-200',
            cancelled: 'bg-red-100 text-red-800 border border-red-200',
            success: 'bg-green-100 text-green-800 border border-green-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
    };

    // Get payment method badge color
    const getPaymentMethodColor = (method) => {
        const colors = {
            cod: 'bg-orange-100 text-orange-800 border border-orange-200',
            bkash: 'bg-pink-100 text-pink-800 border border-pink-200',
            nagad: 'bg-green-100 text-green-800 border border-green-200',
            rocket: 'bg-purple-100 text-purple-800 border border-purple-200',
            sslcommerz: 'bg-blue-100 text-blue-800 border border-blue-200'
        };
        return colors[method] || 'bg-gray-100 text-gray-800 border border-gray-200';
    };

    // Status options with icons and descriptions
    const statusOptions = [
        { value: 'pending', label: '⏳ Pending', color: 'text-yellow-600' },
        { value: 'processing', label: '🔄 Processing', color: 'text-blue-600' },
        { value: 'shipped', label: '🚚 Shipped', color: 'text-purple-600' },
        { value: 'delivered', label: '✅ Delivered', color: 'text-green-600' },
        { value: 'cancelled', label: '❌ Cancelled', color: 'text-red-600' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <span className="text-blue-600 text-2xl">📦</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <span className="text-green-600 text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <span className="text-yellow-600 text-2xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Delivered</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <span className="text-red-600 text-2xl">❌</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white rounded-lg shadow mb-6 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex flex-wrap gap-4">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Orders</option>
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={fetchOrders}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <span>🔄</span>
                                Refresh
                            </button>
                        </div>

                        <div className="text-sm text-gray-600">
                            Showing {filteredOrders.length} of {orders.length} orders
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {order.orderId}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatDate(order.orderDate)}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Products: {order.products?.length || 0}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {order.user ? (
                                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded border">
                                                        {order.user.substring(0, 8)}...
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">N/A</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(order.paymentMethod)}`}>
                                                {order.paymentMethod?.toUpperCase()}
                                            </span>
                                            {order.transactionId && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    TXN: {order.transactionId.substring(0, 8)}...
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-semibold text-gray-900">
                                                ৳{order.totalAmount?.toLocaleString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {/* Status Update Dropdown */}
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value, order)}
                                                    className="text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                >
                                                    {statusOptions.map(option => (
                                                        <option 
                                                            key={option.value} 
                                                            value={option.value}
                                                            className={option.color}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                
                                                {/* View Button */}
                                                <button
                                                    onClick={() => handleViewOrder(order)}
                                                    className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                                                >
                                                    <span>👁️</span>
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📦</div>
                            <p className="text-gray-500 text-lg">No orders found</p>
                            <p className="text-gray-400 text-sm mt-2">
                                {selectedStatus !== 'all' ? `No orders with status "${selectedStatus}"` : 'No orders available'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order View Modal */}
            {showViewModal && selectedOrder && (
                <OrderViewModal 
                    order={selectedOrder} 
                    onClose={handleCloseModal}
                    onStatusUpdate={(newStatus) => {
                        updateOrderStatus(selectedOrder._id, newStatus, selectedOrder);
                        handleCloseModal();
                    }}
                />
            )}
        </div>
    );
};

export default OrderListAdmin;