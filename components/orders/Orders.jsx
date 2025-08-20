"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import { Calendar, Truck, ArrowLeft, AlertCircle, ShoppingBag, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Orders() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        } else if (status === "authenticated") {
            async function fetchOrders() {
                try {
                    setLoading(true);
                    setError("");
                    const response = await fetch(
                        `/api/orders?userId=${session.user.id}&userEmail=${session.user.email}`,
                        { cache: "no-store" }
                    );
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message || "Failed to fetch user orders");
                    }
                    setOrders(data.orders)
                } catch (error) {
                    console.error("Error fetching orders:", error);
                    setError(error.message || "Failed to fetch orders");
                    toast.error(error.message || "Failed to fetch orders");
                } finally {
                    setLoading(false);
                }
            }
            fetchOrders();
        }
    }, [status, session, router]);

    // Function to generate WhatsApp message for an order
    const generateWhatsAppMessage = (order) => {
        const itemsText = order.items.map(item =>
            `${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`
        ).join('%0A');

        return `Hello! I'd like to place an order:%0A%0AOrder ID: ${order._id}%0ATotal: KES ${order.total.toLocaleString()}%0A%0AItems:%0A${itemsText}%0A%0AShipping Info:%0AName: ${order.shippingInfo.name}%0AAddress: ${order.shippingInfo.address}${order.shippingInfo.phone ? `%0APhone: ${order.shippingInfo.phone}` : ''}`;
    };

    if (status === "loading" || loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Toaster />
                <Card className="max-w-md">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/shop">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6 md:mt-22 sm:mt-12">
                    <h1 className="text-3xl font-bold text-green-600">Your Orders</h1>
                    <div className="flex gap-4">
                        <Button asChild variant="link" className="text-green-600 hover:text-green-700">
                            <Link href="/shop">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                            </Link>
                        </Button>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <Card className="text-center">
                        <CardContent className="pt-6">
                            <Image
                                src="/empty-cart.svg"
                                width={120}
                                height={120}
                                alt="Order not found"
                                className="mx-auto mb-6"
                            />
                            <p className="text-gray-600 mb-4">No orders found</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                                    <Link href="/shop">Start Shopping</Link>
                                </Button>
                                <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                    <Link href="https://wa.me/254711430249" target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Order via WhatsApp
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <Card key={order._id || `fallback${index}`} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg font-semibold text-green-700">
                                            Order #No. {order.id ? order.id.slice(-6) : 'NA'}
                                        </CardTitle>
                                        <span
                                            className={`px-2 py-1 rounded text-white text-sm ${order.status === "confirmed"
                                                ? "bg-green-500"
                                                : order.status === "cancelled"
                                                    ? "bg-red-500"
                                                    : "bg-yellow-500"
                                                }`}
                                        >
                                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-green-600" />
                                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total</p>
                                            <p className="font-medium">KES {order.total?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase font-medium flex items-center gap-2 mb-2">
                                            <Truck className="h-5 w-5 text-green-600" />
                                            Shipping Address
                                        </p>
                                        <div className="bg-green-100/20 p-3 rounded-md">
                                            <p className="font-light text-md">
                                                <span className="text-sm text-green-600 font-medium">Name: </span>
                                                {order.shippingInfo?.name || "N/A"}
                                            </p>
                                            <p className="font-light text-muted-foreground">
                                                <span className="text-sm text-green-600 font-medium">Address: </span>
                                                {order.shippingInfo?.address || "N/A"}
                                            </p>
                                            {order.shippingInfo?.phone && (
                                                <p className="font-light text-muted-foreground">
                                                    <span className="text-sm text-green-600 font-medium">Phone: </span>
                                                    {order.shippingInfo.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase font-medium flex items-center gap-2 mb-2">
                                            <ShoppingBag className="h-5 w-5 text-green-600" />
                                            Items ({order.items?.length || 0})
                                        </p>
                                        <div className="space-y-4 mt-1 p-3 bg-green-100/20 rounded-md">
                                            {order.items?.map((item, index) => (
                                                <div key={item.productId || index}>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Quantity: {item.quantity} × KES {item.price?.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <p className="font-medium">
                                                            KES {(item.price * item.quantity)?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    {index < order.items.length - 1 && (
                                                        <Separator className="mt-4" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-start pt-4">
                                        {/* <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                                            <Link href={`/orders/${order._id}`}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Order Details
                                            </Link>
                                        </Button> */}

                                        <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                            <Link
                                                href={`https://wa.me/254711430249?text=${generateWhatsAppMessage(order)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                Order via WhatsApp
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
