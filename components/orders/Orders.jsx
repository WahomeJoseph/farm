"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Package, Calendar, Truck, ArrowLeft, AlertCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import { useParams } from "next/navigation";

export default function Orders() {
    // const params = useParams();
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

    if (status === "loading" || loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
                    <Button asChild variant="link" className="text-green-600 hover:text-green-700">
                        <Link href="/shop">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                        </Link>
                    </Button>
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
                            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                                <Link href="/shop">Start Shopping</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <Card key={order._id || `fallback${index}`} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg font-semibold text-green-700">
                                            Order #{order.id ? order.id.slice(-6) : 'NA'}
                                        </CardTitle>
                                        <span
                                            className={`px-2 py-1 rounded text-white text-sm ${order.status === "Confirmed"
                                                ? "bg-green-500"
                                                : order.status === "Cancelled"
                                                    ? "bg-red-500"
                                                    : "bg-yellow-500"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-green-600" />
                                        Placed on {new Date(order.createdAt).toLocaleDateString()} at
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total</p>
                                            <p className="font-medium">KES {order.total.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Order ID</p>
                                            {order.id}
                                            {/* <p className="font-medium">{order._id ? order._id.slice(-6) : 'NA'}</p> */}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase font-medium flex items-center gap-2 mb-2">
                                            <Truck className="h-5 w-5 text-green-600" />
                                            Shipping Address
                                        </p>
                                        <div className="bg-green-100/20 p-2 shadow-xs">
                                            <p className="font-light text-md">
                                                <span className="text-sm text-green-600">Name:</span>
                                                {order.shippingInfo.name || "N/A"}
                                            </p>
                                            <p className="font-light text-muted-foreground">
                                                <span className="text-sm text-green-600">Addres:</span>
                                                {order.shippingInfo.address || "N/A"}
                                            </p>
                                            {order.shippingInfo.phone && (
                                                <p className="font-light text-muted-foreground">
                                                    <span className="text-sm text-green-600">Phone: </span>{order.shippingInfo.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase font-medium flex items-center gap-2 mb-2">
                                            <ShoppingBag className="h-5 w-5 text-green-600" /> Items
                                        </p>
                                        <div className="space-y-4 mt-1 p-2 bg-green-100/20 shadow-xs rounded">
                                            {order.items.map((item, index) => (
                                                <div key={item.productId}>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                        </div>
                                                        <p className="font-medium">
                                                            KES {(item.price * item.quantity).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    {index < order.items.length - 1 && (
                                                        <Separator className="mt-4" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* <div className="flex justify-start mt-4">
                                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                                            <Link href={`/orders/${params?.id}`}>
                                                View Order Details
                                            </Link>
                                        </Button>
                                    </div> */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}