import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const BuyNow = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { products, totalAmount, shippingAddress } = location.state || {};

    const [selectedPayment, setSelectedPayment] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const calculateTotal = () => {
        if (!products) return 0;
        const subtotal = products.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const shipping = 60; // Fixed shipping cost
        return subtotal + shipping;
    };

    const calculateSubtotal = () => {
        if (!products) return 0;
        return products.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    const getPaymentMethods = () => {
        const totalAmount = calculateTotal();
        return [
            {
                id: "bkash",
                name: "bKash",
                icon: "📱",
                description: "Pay with your bKash account",
                sendMoneyNumber: "01711-234567",
                merchantNumber: true,
                instructions: [
                    "Dial *247# from your mobile",
                    "Select 'Send Money'",
                    "Enter this number: 01711234567",
                    `Enter amount: ৳${totalAmount.toFixed(2)}`,
                    "Enter reference: 1 (or any number)",
                    "Enter your bKash PIN",
                    "Copy Transaction ID from confirmation message",
                ],
            },
            {
                id: "nagad",
                name: "Nagad",
                icon: "💰",
                description: "Pay with your Nagad account",
                sendMoneyNumber: "01711-345678",
                merchantNumber: true,
                instructions: [
                    "Open Nagad app or dial *167#",
                    "Select 'Send Money'",
                    "Enter this number: 01711345678",
                    `Enter amount: ৳${totalAmount.toFixed(2)}`,
                    "Add a reference (your name)",
                    "Enter your Nagad PIN",
                    "Save Transaction ID from confirmation",
                ],
            },
            {
                id: "rocket",
                name: "Rocket",
                icon: "🚀",
                description: "Pay with DBBL Rocket",
                sendMoneyNumber: "01711-456789",
                merchantNumber: true,
                instructions: [
                    "Dial *322# from your mobile",
                    "Select 'Payment' then 'Merchant Payment'",
                    "Enter this number: 01711456789",
                    `Enter amount: ৳${totalAmount.toFixed(2)}`,
                    "Enter your Rocket PIN",
                    "Note down the Transaction ID",
                ],
            },
            {
                id: "cod",
                name: "Cash on Delivery",
                icon: "📦",
                description: "Pay when you receive the product",
            },
        ];
    };

    const validateForm = () => {
        if (!selectedPayment) {
            alert("Please select a payment method");
            return false;
        }

        if (
            (selectedPayment === "bkash" ||
                selectedPayment === "nagad" ||
                selectedPayment === "rocket") &&
            !transactionId
        ) {
            alert(`Please enter your ${selectedPayment} transaction ID`);
            return false;
        }

        return true;
    };

    const processPayment = async () => {
        if (!validateForm()) return;

        setIsProcessing(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const orderData = {
                products: products.map((item) => item._id),
                totalAmount:
                    calculateTotal() + (selectedPayment === "cod" ? 25 : 0),
                paymentMethod: selectedPayment,
                orderId: `ORD-${Date.now()}`,
                paymentStatus: "success",
                transactionId: transactionId || `TXN-${Date.now()}`,
                user: user.uid,
            };

            // Send order to server
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json();

            // Update product stock for each product - ONLY send necessary fields
            await Promise.all(
                products.map(async (product) => {
                    // Only send the stock field that needs to be updated
                    const stockUpdate = {
                        stock: parseInt(product.stock) - product.quantity,
                    };

                    const productsResponse = await fetch(
                        `http://localhost:3000/products/${product._id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(stockUpdate), // Send only stock update
                        }
                    );

                    if (!productsResponse.ok) {
                        throw new Error(
                            `Failed to update product stock. Status: ${productsResponse.status}`
                        );
                    }

                    return await productsResponse.json();
                })
            );

            // Show success message
            await Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Order successful!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                width: 300,
                padding: "0.5em 1em",
                background: "#fff",
                iconColor: "#4ade80",
            });

            navigate("/");
        } catch (error) {
            console.error("Payment failed:", error);

            // Show error message to user
            await Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Payment failed. Please try again.",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                width: 300,
                padding: "0.5em 1em",
                background: "#fff",
                iconColor: "#ef4444",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const getCurrentPaymentMethod = () => {
        return getPaymentMethods().find(
            (method) => method.id === selectedPayment
        );
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='max-w-4xl mx-auto px-4'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Payment Method
                    </h1>
                    <p className='text-gray-600 mt-2'>
                        Choose your preferred payment option
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Left Column - Payment Methods */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h2 className='text-xl font-semibold mb-6'>
                                Select Payment Method
                            </h2>

                            {/* Payment Method Options */}
                            <div className='space-y-4'>
                                {getPaymentMethods().map((method) => (
                                    <div
                                        key={method.id} // Unique key for each payment method
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                            selectedPayment === method.id
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        onClick={() =>
                                            setSelectedPayment(method.id)
                                        }>
                                        <div className='flex items-center space-x-4'>
                                            <span className='text-2xl'>
                                                {method.icon}
                                            </span>
                                            <div className='flex-1'>
                                                <h3 className='font-semibold'>
                                                    {method.name}
                                                </h3>
                                                <p className='text-sm text-gray-600'>
                                                    {method.description}
                                                </p>
                                            </div>
                                            <div
                                                className={`w-5 h-5 rounded-full border-2 ${
                                                    selectedPayment ===
                                                    method.id
                                                        ? "bg-blue-500 border-blue-500"
                                                        : "border-gray-300"
                                                }`}>
                                                {selectedPayment ===
                                                    method.id && (
                                                    <div className='w-2 h-2 bg-white rounded-full m-auto mt-1'></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* bKash/Nagad/Rocket Payment Instructions */}
                            {(selectedPayment === "bkash" ||
                                selectedPayment === "nagad" ||
                                selectedPayment === "rocket") && (
                                <div className='mt-6 p-4 border border-gray-200 rounded-lg'>
                                    <h3 className='font-semibold mb-4'>
                                        {selectedPayment
                                            .charAt(0)
                                            .toUpperCase() +
                                            selectedPayment.slice(1)}{" "}
                                        Payment Instructions
                                    </h3>

                                    <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-4'>
                                        <h4 className='font-semibold text-green-800 mb-2'>
                                            Send Money to Our Merchant Number:
                                        </h4>
                                        <p className='text-xl font-bold text-green-700 text-center py-2'>
                                            {
                                                getCurrentPaymentMethod()
                                                    ?.sendMoneyNumber
                                            }
                                        </p>
                                        <p className='text-lg font-semibold text-green-600 text-center'>
                                            Amount: ৳
                                            {calculateTotal().toFixed(2)}
                                        </p>
                                        <p className='text-sm text-green-600 text-center mt-2'>
                                            📞 This is our official{" "}
                                            {selectedPayment} merchant account
                                        </p>
                                    </div>

                                    <div className='space-y-3 text-sm text-gray-700 mb-4'>
                                        <p className='font-semibold'>
                                            Step-by-Step Instructions:
                                        </p>
                                        <ol className='list-decimal list-inside space-y-2 bg-gray-50 p-4 rounded-lg'>
                                            {getCurrentPaymentMethod()?.instructions.map(
                                                (step, index) => (
                                                    <li
                                                        key={index}
                                                        className='pb-1'>
                                                        {step}
                                                    </li> // Added key here
                                                )
                                            )}
                                        </ol>
                                    </div>

                                    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4'>
                                        <p className='text-sm text-yellow-700 flex items-start'>
                                            <span className='mr-2'>⚠️</span>
                                            <span>
                                                <strong>Important:</strong>{" "}
                                                After completing payment, you
                                                will receive a confirmation
                                                message with a Transaction ID.
                                                Copy that ID and enter it below
                                                to verify your payment.
                                            </span>
                                        </p>
                                    </div>

                                    <div className='mt-4'>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Transaction ID *
                                        </label>
                                        <input
                                            type='text'
                                            value={transactionId}
                                            onChange={(e) =>
                                                setTransactionId(e.target.value)
                                            }
                                            placeholder={`Enter your ${selectedPayment} transaction ID (e.g., TX8A9B2C1D)`}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                        <p className='text-xs text-gray-500 mt-1'>
                                            You will find the Transaction ID in
                                            your {selectedPayment} confirmation
                                            message
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Cash on Delivery Note */}
                            {selectedPayment === "cod" && (
                                <div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                                    <h3 className='font-semibold text-yellow-800 mb-2'>
                                        Cash on Delivery
                                    </h3>
                                    <p className='text-sm text-yellow-700'>
                                        You'll pay with cash when your order is
                                        delivered. An additional ৳25 cash on
                                        delivery charge will be applied.
                                    </p>
                                    <div className='mt-3 p-3 bg-white rounded border'>
                                        <p className='text-sm font-semibold'>
                                            Payment Details:
                                        </p>
                                        <p className='text-sm'>
                                            Product Total: ৳
                                            {calculateSubtotal().toFixed(2)}
                                        </p>
                                        <p className='text-sm'>
                                            Shipping: ৳60.00
                                        </p>
                                        <p className='text-sm'>
                                            COD Charge: ৳25.00
                                        </p>
                                        <p className='text-sm font-bold mt-1'>
                                            Total to pay: ৳
                                            {(calculateTotal() + 25).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-lg shadow-md p-6 sticky top-4'>
                            <h2 className='text-xl font-semibold mb-4'>
                                Order Summary
                            </h2>

                            {products &&
                                products.map((item) => (
                                    <div
                                        key={item._id}
                                        className='flex justify-between items-center py-3 border-b'>
                                        {" "}
                                        {/* Added key here */}
                                        <div>
                                            <p className='font-medium'>
                                                {item.title}
                                            </p>
                                            <p className='text-sm text-gray-600'>
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className='font-semibold'>
                                            ৳
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ))}

                            <div className='space-y-2 mt-4'>
                                <div className='flex justify-between'>
                                    <span>Subtotal</span>
                                    <span>
                                        ৳{calculateSubtotal().toFixed(2)}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Shipping</span>
                                    <span>৳60.00</span>
                                </div>
                                {selectedPayment === "cod" && (
                                    <div className='flex justify-between text-red-600'>
                                        <span>COD Charge</span>
                                        <span>৳25.00</span>
                                    </div>
                                )}
                                <div className='border-t pt-2 mt-2'>
                                    <div className='flex justify-between font-bold text-lg'>
                                        <span>Total</span>
                                        <span>
                                            ৳
                                            {(
                                                calculateTotal() +
                                                (selectedPayment === "cod"
                                                    ? 25
                                                    : 0)
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={processPayment}
                                disabled={isProcessing}
                                className={`w-full mt-6 py-3 px-4 rounded-md font-semibold text-white ${
                                    isProcessing
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                } transition-colors`}>
                                {isProcessing ? (
                                    <div className='flex items-center justify-center'>
                                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                                        Processing...
                                    </div>
                                ) : selectedPayment === "cod" ? (
                                    `Place Order (Pay on Delivery)`
                                ) : (
                                    `Verify Payment`
                                )}
                            </button>

                            {(selectedPayment === "bkash" ||
                                selectedPayment === "nagad" ||
                                selectedPayment === "rocket") && (
                                <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
                                    <div className='flex items-start text-sm text-blue-700'>
                                        <span className='mr-2'>💡</span>
                                        <span>
                                            <strong>Remember:</strong> Complete
                                            the payment in your{" "}
                                            {selectedPayment} app first, then
                                            enter the Transaction ID above.
                                        </span>
                                    </div>
                                </div>
                            )}

                            <p className='text-xs text-gray-500 text-center mt-4'>
                                Your personal data will be used to process your
                                order and for other purposes described in our
                                privacy policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;
