import { NextResponse } from 'next/server'
import Order from '@/models/Order';
import connectDB from '@/lib/db';

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json();
        const { userId, userEmail, items, shippingInfo, total, status = 'pending' } = body;

        if (!items || !total || (!userId && !userEmail)) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        for (const item of items) {
            if (!item.productId || !item.name || !item.price || !item.quantity) {
                return NextResponse.json(
                    { message: "Each item must have productId, name, price, and quantity" },
                    { status: 400 }
                );
            }
        }

        const validStatuses = ['pending', 'confirmed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json(
                { message: "Invalid status. Must be one of: pending, confirmed, cancelled" },
                { status: 400 }
            );
        }

        const newOrder = await Order.create({
            userId: userId || null,
            userEmail: userEmail || null,
            items,
            shippingInfo: shippingInfo || null,
            total,
            status: status || 'pending',
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: "Order placed successfully", order: newOrder },
            { status: 201 }
        );
    } catch (error) {
        console.error("Failed to place order:", error);
        return NextResponse.json(
            { message: "Failed to place order. Please try again." },
            { status: 500 }
        );
    }
}

// get orders
export async function GET(request, { params }) {
    try {
        await connectDB();
        if (!params?.id) {
            return NextResponse.json(
                { message: 'Order ID is required' },
                { status: 400 }
            );
        }
        const order = await Order.findById(params?.id).lean()
        if (!order) {
            return NextResponse.json(
                { message: 'Order not found!' },
                { status: 400 }
            )
        }
        return NextResponse.json(
            {
                message: 'Order fetched successfully!',
                _id: order._id.toString(),
                status: order.status,
                total: order.total,
                items: order.items,
                shippingInfo: order.shippingInfo,
                createdAt: order.createdAt
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Failed to fetch order", error);
        return NextResponse.json(
            { message: "Failed to fetch orders. Please try again." },
            { status: 500 }
        );
    }
}