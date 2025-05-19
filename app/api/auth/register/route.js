import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json();
        const { username, email, password } = body
        if (!username || !email || !password) {
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
        const existingUser = await User.findOne({ email }).lean()
        if (existingUser) {
            return NextResponse.json(
                { error: 'User email already exists!' },
                { status: 400 }
            )
        }
        const hashedPassword = await bcrypt.hash(password.trim(), 10)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return NextResponse.json(
            {
                message: 'User registered successfully!',
                user: userWithoutPassword
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('User registration failure!', error)
        return NextResponse.json(
            {
                error: 'Error occurred.Try again!',
                details: error.message
            },
            { status: 500 }
        )
    }
}