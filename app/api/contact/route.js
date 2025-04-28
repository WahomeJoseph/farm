import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { type, name, email, phone, message, tourDate, visitors } = await request.json();

    if (!type || !name || !email ||!phone || !message) {
      return NextResponse.json({ error: "Type, name, email, phone, and message are required!" }, { status: 400 });
    }

    if (!["inquiry", "tour"].includes(type)) {
      return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
        return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
      }

    // Tour-specific validation
    if (type === "tour") {
      if (!tourDate) {
        return NextResponse.json({ error: "Preferred tour date is required" }, { status: 400 });
      }
      const date = new Date(tourDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(date.getTime()) || date < today) {
        return NextResponse.json({ error: "Tour date must be a valid future date" }, { status: 400 });
      }
      if (!visitors || visitors < 1 || visitors > 10) {
        return NextResponse.json({ error: "Number of visitors must be between 1 and 10" }, { status: 400 });
      }
    }

    const newContact = await Contact.create({
      type,
      name,
      email,
      phone: phone,
      message,
      tourDate: type === "tour" ? new Date(tourDate) : null,
      visitors: type === "tour" ? visitors : null,
    });
    console.log("Contact submission success:", newContact);
    return NextResponse.json(
      { message: type === "tour" ? "Tour booking submitted successfully!" : "Message sent successfully!", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission failure:", error.message);
    return NextResponse.json(
      { error: "Error occurred. Try again!", details: error.message },
      { status: 500 }
    );
  }
}