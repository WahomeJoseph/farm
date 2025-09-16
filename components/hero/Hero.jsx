"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Star, Award, Headset } from "lucide-react"

const slides = [
    {
        image: "https://media.istockphoto.com/id/515449339/photo/pig-farm-in-highland-scotland.jpg?s=612x612&w=0&k=20&c=C4Bc0IItIYvlxs2I7HjwikikaifmavtdxGxArgRFgLo=",
        title: "Premium Pigs Breeding",
        subtitle: "Antibiotic-Free • Certified Organic",
        description: "Kenya's best pig breeding farm raising antibiotic-free pigs with superior genetics for high-quality pork production since 2023",
        cta: "Shop Piglets",
        ctaLink: "/shop",
        badge: "Best in Kenya",
        stats: { experience: "2+ Years", delivery: "All Counties", certification: "Organic Certified" },
    },
    {
        image: "https://media.istockphoto.com/id/685883666/photo/kids-petting-piglets.jpg?s=612x612&w=0&k=20&c=NzYQ753CjFdBJyl7T_GxtMXWNpi3lf5VIzhqpl6ciMA=",
        title: "Pig Farm Tours",
        subtitle: "Educational • Free for Farmers",
        description: "Learn sustainable pig farming techniques. Ideal for farmers, schools & agricultural students",
        cta: "Book Tour",
        ctaLink: "/contact",
        badge: "Free Farm Tours",
        stats: { location: "Nyeri, Central", schedule: "Mon-Sat", groups: "Welcome" },
    },
    {
        image: "https://media.istockphoto.com/id/1280715716/photo/germany-stuttgart-magical-orange-sunset-sky-above-ripe-grain-field-nature-landscape-in-summer.jpg?s=612x612&w=0&k=20&c=TukToGq-LkmpxvEXEomC3d11prf_hDRSwA7pYsLYG50=",
        title: "100% Organic Pig Farming",
        subtitle: "Sustainable • Eco-Friendly",
        description: "Kenya's first SDGs-certified pig farm. Eco-friendly operations and policies with minimal environmental impact.",
        cta: "Learn More",
        ctaLink: "/our-farm-gallery",
        badge: "SDGs Certified",
        stats: { waste: "Zero Waste", energy: "60% Biogas", trees: "1000+ Planted" },
    },
]

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        if (!isPlaying) return
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [isPlaying])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <section className="relative h-screen overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[currentSlide].image || "/placeholder.svg"}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto sm:mx-0">
                        <motion.div
                            key={`content-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Badge className="mb-3 sm:mb-4 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
                                {slides[currentSlide].badge}
                            </Badge>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                                {slides[currentSlide].title}
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-200 mb-2 sm:mb-3 font-medium">
                                {slides[currentSlide].subtitle}
                            </p>

                            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 max-w-lg">
                                {slides[currentSlide].description}
                            </p>

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                                {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
                                    <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2">
                                        <span className="text-white text-xs sm:text-sm font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <Button
                                    size="lg"
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 text-sm sm:text-base"
                                >
                                    <Link href={slides[currentSlide].ctaLink}>{slides[currentSlide].cta}</Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-black bg-transparent text-sm sm:text-base"
                                >
                                    <Link href="tel:+254711430249" className="flex items-center gap-2">
                                        <Headset className="h-4 w-4 sm:h-5 sm:w-5" /> Call Now
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevSlide}
                        className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                    >
                        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>

                    <div className="flex gap-1 sm:gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? "bg-green-600 w-6 sm:w-8" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextSlide}
                        className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                    >
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                    >
                        <Play className={`h-3 w-3 sm:h-4 sm:w-4 ${isPlaying ? "opacity-50" : "opacity-100"}`} />
                    </Button>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="absolute md:bottom-10  sm:bottom-8 right-4 sm:right-8 z-20">
                <div className="flex flex-row sm:flex-row items-center gap-2 sm:gap-4 text-white">
                    <div className="flex items-center gap-1 p-1 rounded hover:bg-green-50/20">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-green-400 text-green-400" />
                        <span className="text-xs sm:text-sm">4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center gap-1 p-1 rounded hover:bg-green-50/20">
                        <Award className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                        <span className="text-xs sm:text-sm">Certified</span>
                    </div>
                    <div className="flex items-center gap-1 p-1 rounded hover:bg-green-50/20">
                        <Headset className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                        <span className="text-xs sm:text-sm">24/7 Consultation</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
