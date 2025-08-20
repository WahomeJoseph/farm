"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { Send, ShoppingBag } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0a3d2a] text-white">
            {/* Map and Contact Section */}
            <section className="py-8 md:py-12 lg:py-16 bg-green-700">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        {/* Map */}
                        <div itemScope itemType="http://schema.org/LocalBusiness" className="lg:w-1/2 w-full">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-white">
                                <FaMapMarkerAlt className="text-white" />
                                Visit Our Farm
                            </h2>
                            <Card className="h-64 sm:h-80 md:h-96 rounded-lg sm:rounded-xl shadow-lg overflow-hidden border-2 border-[#1a5c3a]">
                                <CardContent className="p-0 h-full">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.123456789012!2d37.061667!3d-0.292222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTczMi4wIlMgMzfCsDAzNDIuMCJF!5e0!3m2!1sen!2ske!4v1713456789012!5m2!1sen!2ske"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Wahome Farm Location"
                                        className="min-h-[250px]"
                                    />
                                </CardContent>
                            </Card>
                            <meta itemProp="name" content="Wahome Farm" />
                            <meta itemProp="address" content="Nyeri, Kenya" />
                        </div>

                        {/* Contact Info */}
                        <div className="lg:w-1/2 w-full space-y-4 sm:space-y-6">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Contact Information</h2>

                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-green-950/50 p-3 sm:p-4 rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-300">
                                    <h3 className="font-semibold text-[#5cb385] mb-1 sm:mb-2 text-sm sm:text-base">Farm Address</h3>
                                    <p className="text-sm sm:text-base">Narumoru, Nyeri County, Kenya</p>
                                </div>

                                <div className="bg-green-950/50 p-3 sm:p-4 rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-300">
                                    <h3 className="font-semibold text-[#5cb385] mb-1 sm:mb-2 text-sm sm:text-base">Business Hours</h3>
                                    <p className="text-sm sm:text-base">Monday - Saturday: 8:00 AM - 5:00 PM</p>
                                    <p className="text-sm sm:text-base">Sunday: Closed</p>
                                </div>

                                <div className="bg-green-950/50 p-3 sm:p-4 rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-300">
                                    <h3 className="font-semibold text-[#5cb385] mb-1 sm:mb-2 text-sm sm:text-base">Contact Details</h3>
                                    <div className="space-y-1 sm:space-y-2">
                                        <p className="flex items-center gap-2 text-sm sm:text-base">
                                            <FaPhone className="text-[#5cb385] flex-shrink-0" />
                                            <Link href="tel:+254711430249" className="hover:text-[#a3e9bb] break-all">+254 711 430 249</Link>
                                        </p>
                                        <p className="flex items-center gap-2 text-sm sm:text-base">
                                            <FaWhatsapp className="text-[#5cb385] flex-shrink-0" />
                                            <Link href="https://wa.me/254711430249" className="hover:text-[#a3e9bb] break-all">WhatsApp: +254 711 430 249</Link>
                                        </p>
                                        <p className="flex items-center gap-2 text-sm sm:text-base">
                                            <FaEnvelope className="text-[#5cb385] flex-shrink-0" />
                                            <Link href="mailto:info@wahomefarm.com" className="hover:text-[#a3e9bb] break-all">info@wahomefarm.com</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                                <Button
                                    asChild
                                    size="sm"
                                    className="mt-4 sm:mt-6 bg-white flex justify-center items-center gap-2 hover:animate-bounce transition-all duration-300 shadow-lg text-green-600 hover:bg-white/90 w-full sm:w-auto text-sm sm:text-base">
                                    <Link href="/contact">
                                        <Send size={16} className="flex-shrink-0" />
                                        Send Message
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="sm"
                                    className="mt-4 sm:mt-6 bg-white flex justify-center items-center gap-2 hover:animate-bounce transition-all duration-300 shadow-lg text-green-600 hover:bg-white/90 w-full sm:w-auto text-sm sm:text-base">
                                    <Link href="/shop">
                                        <ShoppingBag size={16} className="flex-shrink-0" />
                                        Shop Products
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Copyright Section */}
            <section className="py-6 sm:py-8 bg-[#072c1d] border-t border-[#1a5c3a]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-[#a3e9bb] text-center sm:text-left">
                            © {new Date().getFullYear()} Wahome Premium Pigs. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 sm:gap-6">
                            <Link href="/privacy-policy" target="blank" className="text-xs sm:text-sm text-[#a3e9bb] hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" target="_blank" className="text-xs sm:text-sm text-[#a3e9bb] hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/blog" className="text-xs sm:text-sm text-[#a3e9bb] hover:text-white transition-colors">
                                Blogs
                            </Link>
                            <Link href="/faqs" className="text-xs sm:text-sm text-[#a3e9bb] hover:text-white transition-colors">
                                FAQs
                            </Link>
                        </div>

                        <p className="text-xs sm:text-sm text-center text-[#a3e9bb]">
                            Designed with ❤️ by{" "}
                            <Link
                                href="https://joseph-wachira-portfolio.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f0c14b] hover:text-[#ffd700] transition-colors"
                            >
                                Wahome Joseph
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </footer>
    );
}
