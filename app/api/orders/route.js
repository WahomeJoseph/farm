import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import Order from '@/models/Order';

export async function POST(request) {
    try {
        await connectDB();
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

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const userEmail = searchParams.get("userEmail");

        // Validate at least one identifier is provided
        if (!userId && !userEmail) {
            return NextResponse.json(
                { message: "Either userId or userEmail must be provided" },
                { status: 400 }
            );
        }

        // Build query to find orders by either userId OR userEmail
        const query = {
            $or: []
        };

        if (userId) query.$or.push({ userId });
        if (userEmail) query.$or.push({ userEmail });

        // Find matching orders
        const orders = await Order.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .lean();

        return NextResponse.json(
            { 
                success: true,
                orders: orders.map(order => ({
                    id: order._id.toString(),
                    status: order.status,
                    total: order.total,
                    items: order.items,
                    shippingInfo: order.shippingInfo,
                    createdAt: order.createdAt
                }))
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json(
            { 
                success: false,
                message: "Failed to fetch orders",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}