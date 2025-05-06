import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const { email, password } = body
        if (!email || !password) {
            return NextResponse.json(
                { error: 'All fields are required!' },
                { status: 400 }
            )
        }
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ message: "Password must be at least 8 characters long" }, { status: 400 });
        }
        const user = await User.findOne({ email })

        if (!user) {
            console.log('User not found with this email!');
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }

        const isMatch = bcrypt.compare(
            user.password?.trim(),
            user.password
        );
        if (!isMatch) {
            console.log('Invalid credentials!');
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }
        console.log('Login successful');
        return NextResponse.json(
            {
                message: "Login succesful",
                id: user._id.toString(),
                name: user.username,
                email: user.email,
            },
            {status: 200}
        )
    } catch (error) {
        console.error('User login failure!', error)
        return NextResponse.json(
            {
                error: 'Error occurred.Try again!',
                details: error.message
            },
            { status: 500 }
        )
    }
}