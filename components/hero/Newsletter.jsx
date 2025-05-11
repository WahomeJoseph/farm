import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

export const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch('/api/subs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Subscription failed");

            setStatus("success");
            setMessage("Subscribed successfully! Check your email for confirmation.");
            setEmail(" ");

            setTimeout(() => {
                setMessage(''),
                    setStatus(null)
            }, 5000)
        } catch (error) {
            setStatus("error");
            setMessage(error.message || "Something went wrong. Please try again.");

            setTimeout(() => {
                setMessage("");
                setStatus("");
            }, 5000);
        }
    };

    return (
        <section id="newsletter" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Newsletter Signup */}
                    <Card
                        className="lg:w-1/2 w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8"
                        data-aos="fade-up"
                        data-aos-delay="100">
                        <CardContent className="text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 tracking-tight">
                                Stay Connected
                            </h2>
                            <p className="text-base text-gray-600 mb-6 leading-relaxed">
                                Subscribe for farm updates, exclusive farm products, farm events, and farm tours. Visit us in our farm in Nyeri Kenya!
                            </p>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === "loading"}
                                    className="flex-1 rounded-full border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                                    required
                                    aria-label="Email address for newsletter" />
                                <Button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-2">
                                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                                </Button> <br />
                            </form>
                            {message && (
                                <p className={`mt-4 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                                    {message}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Embedded Google Map */}
                    <div itemScope itemType="http://schema.org/LocalBusiness" className="lg:w-1/2 w-full">
                        <h2 className="sr-only">Wahome Farm Location</h2>
                        <meta itemProp="name" content="Wahome Farm" />
                        <meta itemProp="address" content="Your physical address" />
                        {/* Your existing Card component */}
                        <Card
                            className="h-64 sm:h-80 rounded-xl shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay="200">
                            <CardContent className="p-0 h-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.123456789012!2d37.061667!3d-0.292222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTcnMzIuMCJTIDM3wrAwMyc0Mi4wIkU!5e0!3m2!1sen!2ske!4v1713456789012!5m2!1sen!2ske"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Wahome Farm Location"
                                    className="rounded-xl"></iframe>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}