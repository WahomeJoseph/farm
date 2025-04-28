'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader } from '@/components/loader/Loader';
import { Truck, Package, Calendar, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderConfirmation() {
    const params = useParams();
    const { data: session, status } = useSession();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!params?.id || status === 'loading') return;
        async function fetchOrder() {
            try {
                setLoading(true);
                console.log('Fetching order with ID:', params.id);
                const response = await fetch(`/api/orders/${params?.id}`, {
                  next: {revalidate: 60}
                });
                    // headers: {
                    //     ...(session?.user?.email && {
                    //         'x-user-email': session.user.email,
                    //     }),
                    // },
                
                const data = await response.json();
                console.log('API response:', data);
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch order');
                }
                setOrder({
                    id: data._id,
                    status: data.status || 'pending',
                    total: data.total || 0,
                    items: data.items || [],
                    shippingInfo: data.shippingInfo || {},
                    createdAt: data.createdAt || new Date().toISOString(),
                });
            } catch (error) {
                console.error('Error fetching the order:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [params?.id, status]);

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader />
            </div>
        );
    }
    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-md shadow-lg">
                    <CardContent className="pt-6 text-center">
                        <p className="text-red-500 mb-4">
                            Please sign in to view your order.
                        </p>
                        <Button asChild variant="default">
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-md shadow-lg">
                    <CardContent className="pt-6 text-center">
                        <p className="text-red-500 mb-4">Error: {error}</p>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full">
                            <Link href="/shop">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-md shadow-lg">
                    <CardContent className="pt-6 text-center">
                        <p className="text-gray-500 mb-4">Order not found.</p>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full">
                            <Link href="/shop">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getStatusStyles = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return {
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-800',
                    icon: <Clock className="h-5 w-5 text-yellow-600" />,
                };
            case 'confirmed':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-800',
                    icon: <CheckCircle className="h-5 w-5 text-green-600" />,
                };
            case 'cancelled':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-800',
                    icon: <XCircle className="h-5 w-5 text-red-600" />,
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-800',
                    icon: null,
                };
        }
    };

    return (
        <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-green-700">
                        Order Confirmation
                    </h1>
                    <Button
                        asChild
                        variant="link"
                        className="text-green-600 hover:text-green-700">
                        <Link href="/shop">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                        </Link>
                    </Button>
                </motion.div>

                {/* Order Details Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-700 flex items-center gap-2">
                                <Package className="h-5 w-5 text-green-600" />
                                Order #{order.id ? order.id.slice(-6) : 'Pending'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID</p>
                                    <p className="font-medium text-gray-900">
                                        {order.id}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusStyles(order.status).bg} ${getStatusStyles(order.status).text}`}
                                    >
                                        {getStatusStyles(order.status).icon}
                                        {order.status}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="font-medium text-gray-900">
                                        KES {order.total.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-medium text-gray-900 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-green-600" />
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Shipping Information Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-700 flex items-center gap-2">
                                <Truck className="h-5 w-5 text-green-600" />
                                Shipping Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="font-medium text-gray-900">
                                Name: {order.shippingInfo.name || 'N/A'}
                            </p>
                            <p className="text-gray-600">
                                Address: {order.shippingInfo.address || 'N/A'}
                            </p>
                            {order.shippingInfo.phone && (
                                <p className="text-gray-600">
                                    Phone: {order.shippingInfo.phone}
                                </p>
                            )}
                            {order.shippingInfo.email && (
                                <p className="text-gray-600">
                                    Email: {order.shippingInfo.email}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Items Ordered Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-700">
                                Items Ordered
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AnimatePresence>
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <motion.div
                                            key={item.productId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-medium text-gray-900">
                                                KES{' '}
                                                {(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatePresence>
                            <Separator className="my-4" />
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-gray-900">
                                    Total
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    KES {order.total.toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 flex justify-center gap-4">
                    <Button
                        asChild
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-105">
                        <Link href="/orders">View My Orders</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-105">
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}