import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
    try {
        await client.connect();
        const db = client.db("test");
        const subscribers = db.collection("subscribers");

        const body = await request.json();
        const { email } = body;
        console.log('New Sub:', email);

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
        }

        const existingSub = await subscribers.findOne({ email });
        if (existingSub) {
            return NextResponse.json({ message: "Email already subscribed" }, { status: 400 });
        }

        await subscribers.insertOne({
            email,
            subscribedAt: new Date()
        });

        // Send notification to the user
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "Wahome Farm <onboarding@resend.dev>",
            to: email,
            subject: "Welcome to Wahome Premium Farm!",
            html: `
                <h1>Thank You for Subscribing!</h1>
                <p>You'll receive farm updates, exclusive farm products, farm events, and special discounts.</p>
                <p>It is a great chance to learn more about affordable farming and farming tips.</p>
                <p><a href="onboarding@resend.dev/unsubscribe?email=${email}">Unsubscribe</a></p>
            `,
        });
        return NextResponse.json({ message: "Subscription successful" }, { status: 200 });
    } catch (error) {
        console.error("Error subscribing:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await client.close();
    }
}