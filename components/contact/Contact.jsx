"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";

export default function Contact() {
  const [form, setForm] = useState({
    type: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    tourDate: "",
    visitors: "",
  });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.message) newErrors.message = "Message is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone) newErrors.phone = "Phone number is required";
    else if (!/^\+?\d{10,15}$/.test(form.phone) || form.phone.length < 10) {
      newErrors.phone = "Invalid phone number format (e.g., +254712345678 or 0712345678)";
      newErrors.phone = "Phone number must be at least 10 digits long";
    }

    if (form.type === "tour") {
      if (!form.tourDate) newErrors.tourDate = "Preferred tour date is required";
      else {
        const date = new Date(form.tourDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(date.getTime()) || date < today) {
          newErrors.tourDate = "Tour date must be a valid future date";
        }
      }
      if (!form.visitors) newErrors.visitors = "Number of visitors is required";
      else if (isNaN(form.visitors) || form.visitors < 1 || form.visitors > 10) {
        newErrors.visitors = "Number of visitors must be between 1 and 10";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form", { id: "contact", duration: 5000 });
      return;
    }

    setPending(true);
    toast.info(form.type === "tour" ? "Submitting tour booking..." : "Sending message...", {
      id: "contact",
      duration: 10000,
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(
          form.type === "tour" ? "Tour booking submitted successfully!" : "Message sent successfully!",
          { id: "contact", duration: 5000 }
        );
        setForm({ type: "inquiry", name: "", email: "", phone: "", message: "", tourDate: "", visitors: "" });
        setErrors({});
        setSubmitted(`${form.type === "tour" ? "Tour booking" : "Message"} submitted successfully!`);
        setTimeout(() => {
          setSubmitted("");
        }, 5000);
        redirect("/");
      } else {
        toast.error(data.error || "Failed to submit form", { id: "contact", duration: 4000 });
      }
    } catch (err) {
      toast.error("An unexpected error occurred.", { id: "contact", duration: 4000 });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white shadow-xl pt-20 rounded-xl overflow-hidden flex flex-col md:flex-row">
          {/* image */}
          <div className="w-full md:w-1/2 relative h-auto bg-green-100/30 flex flex-col items-center justify-center p-8">
            <span className="text-[2rem] mt-12 p-0 text-green-600">𝑭𝒐𝒓 𝒂𝒏𝒚 𝑰𝒏𝒒𝒖𝒊𝒓𝒊𝒆𝒔, 𝑹𝒆𝒂𝒄𝒉 𝑶𝒖𝒕 𝑻𝒐 𝑾𝒂𝒉𝒐𝒎𝒆 𝑷𝒓𝒆𝒎𝒊𝒖𝒎 𝑷𝒊𝒈𝒔</span>
            <Image
              src="/contact-us.svg"
              alt="Wahome Premium Pigs Farm Illustration"
              width={400}
              height={400}
              className="object-contain object-center w-full h-full"
              priority
            />
          </div>

          <Card className="md:w-1/2 bg-white/95 p-6 sm:p-8 border-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-700">
                Contact Us
              </CardTitle>
              <CardDescription className="text-sm font-light text-gray-600">
                Have any inquiries or want to book a farm tour? We'd love to hear from you.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">What would you like to do?</Label>
                  <RadioGroup
                    value={form.type}
                    onValueChange={(value) => setForm({ ...form, type: value })}
                    className="flex space-x-4"
                    disabled={pending}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inquiry" id="inquiry" />
                      <Label htmlFor="inquiry" className="text-sm text-gray-700">
                        Make inquiries
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tour" id="tour" />
                      <Label htmlFor="tour" className="text-sm text-gray-700">
                        Book a Farm Tour
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={pending}
                    required
                    aria-required="true"
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-x-1 text-sm text-red-600" role="alert">
                      <TriangleAlert className="h-4 w-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={pending}
                    required
                    aria-required="true"
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-x-1 text-sm text-red-600" role="alert">
                      <TriangleAlert className="h-4 w-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0712345678"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    disabled={pending}
                    required
                    aria-required="true"
                    pattern="^\+?\d{10,15}$"
                    title="Phone number should be in the format +254712345678 or 0712345678"
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-x-1 text-sm text-red-600" role="alert">
                      <TriangleAlert className="h-4 w-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={
                      form.type === "tour"
                        ? "Tell us about your group or any special requests"
                        : "Your message or inquiry"
                    }
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    disabled={pending}
                    required
                    aria-required="true"
                    rows={5}
                    className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                  {errors.message && (
                    <div className="flex items-center gap-x-1 text-sm text-red-600" role="alert">
                      <TriangleAlert className="h-4 w-4" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {form.type === "tour" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tourDate" className="text-sm font-medium text-gray-700">
                        Preferred Tour Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tourDate"
                        type="date"
                        value={form.tourDate}
                        onChange={(e) => setForm({ ...form, tourDate: e.target.value })}
                        disabled={pending}
                        required
                        aria-required="true"
                        min={new Date().toISOString().split("T")[0]}
                        className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                      />
                      {errors.tourDate && (
                        <div className="flex items-center gap-x-1 text-sm text-red-600" role="alert">
                          <TriangleAlert className="h-4 w-4" />
                          <span>{errors.tourDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitors" className="text-sm font-medium text-gray-700">
                        Number of Visitors <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="visitors"
                        type="number"
                        placeholder="e.g., 5"
                        value={form.visitors}
                        onChange={(e) => setForm({ ...form, visitors: e.target.value })}
                        disabled={pending}
                        required
                        aria-required="true"
                        min="1"
                        max="10"
                        className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                      />
                      {errors.visitors && (
                        <div className="flex items-center gap-x-1 text-sm text-red-600" role="alert">
                          <TriangleAlert className="h-4 w-4" />
                          <span>{errors.visitors}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                  disabled={pending}>
                  {pending
                    ? form.type === "tour"
                      ? "Submitting Booking..."
                      : "Sending..."
                    : form.type === "tour"
                      ? "Book Farm Tour"
                      : "Send Message"}
                </Button>
              </form>

              {submitted && (
                <div className="mt-4 text-sm text-green-600">
                  {submitted}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
  );
}