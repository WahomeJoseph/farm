"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { Socials } from "@/components/hero/Socials";
import { Badge } from "@/components/ui/badge";
import { Newsletter } from "@/components/hero/Newsletter";
import FeaturedProducts from "@/components/hero/Featured-Products";
import { TrendingUp, Award, Users, Star } from "lucide-react";
import Hero from "@/components/hero/Hero";

// AOS Initializer
export const AosInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);
  return null;
};

const slides = [
  {
    image: "https://media.istockphoto.com/id/515449339/photo/pig-farm-in-highland-scotland.jpg?s=612x612&w=0&k=20&c=C4Bc0IItIYvlxs2I7HjwikikaifmavtdxGxArgRFgLo=",
    title: "Premium Pig Breeding in Kenya | Antibiotic-Free Pigs",
    description: "Wahome Farm: Top-rated piglet breeders in Kenya raising antibiotic-free pigs with superior genetics for high-quality pork production. Certified organic breeding stock available nationwide.",
    highlights: [
      "Best Pig Breeding Farm in Kenya since 2023",
      "Genetically superior piglets for disease resistance",
      "100% organic feed for optimal growth & meat quality",
      "Supply accross all Kenyan counties"
    ],
    cta: "Browse Available Piglets",
    ctaLink: "/gallery",
  },
  {
    image: "https://media.istockphoto.com/id/685883666/photo/kids-petting-piglets.jpg?s=612x612&w=0&k=20&c=NzYQ753CjFdBJyl7T_GxtMXWNpi3lf5VIzhqpl6ciMA=",
    title: "Pig Farm Tours in Kenya | Educational Visits",
    description: "Experience Kenya's leading organic pig farm! Free educational tours showcasing sustainable pig rearing techniques near Nairobi. Ideal for farmers, schools & agricultural students.",
    highlights: [
      "Open Monday-Saturday (Book online) via our website",
      "Free for Kenyan farming groups and individuals",
      "Learn breeding best practices for Kenyan climate",
      "Convenient location, Nyeri, Central Kenya"
    ],
    cta: "Call +254 711 430 249 to Book",
    ctaLink: "/contact",
  },
  {
    image: "https://media.istockphoto.com/id/1280715716/photo/germany-stuttgart-magical-orange-sunset-sky-above-ripe-grain-field-nature-landscape-in-summer.jpg?s=612x612&w=0&k=20&c=TukToGq-LkmpxvEXEomC3d11prf_hDRSwA7pYsLYG50=",
    title: "Certified Organic Pig Farming Kenya | Sustainable Practices",
    description: "Kenya's first SDGs-certified organic pig farm. Eco-friendly operations with water recycling, biogas systems, and zero-waste policies for minimal environmental impact.",
    highlights: [
      "Certified organic by Kenya Bureau of Standards",
      "Biogas from waste powers 60% of farm operations",
      "Smart water conservation systems",
      "1000+ trees planted through our program"
    ],
    cta: "See Our Sustainability Methods →",
    ctaLink: "/contact",
  },
  {
    image: "https://media.istockphoto.com/id/594468710/photo/sow-with-piglets-nursing.jpg?s=612x612&w=0&k=20&c=1ExTaFoOYaZQ-OUyApXcoYzClrGbnAkMblWII-thOCo=",
    title: "Buy Healthy Piglets in Kenya | Vaccinated & Weaned",
    description: "Kenya's trusted source for disease-free piglets and breeding stock. All animals vaccinated, dewormed, and ready for your farm. Nationwide delivery available.",
    highlights: [
      "Piglets: 8-10 weeks (fully weaned)",
      "Breeding gilts: 4-6 months (DOC certified)",
      "High-performance boars available",
      "Delivery to all Kenyan counties"
    ],
    cta: "Get Your Piglets Today!",
    ctaLink: "/shop",
  }
];

const testimonials = [
  {
    name: "John Doe",
    role: "Local Farmer",
    quote: "Wahome's breeding stock transformed our farm's yield. Their pigs are healthy and robust!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
  },
  {
    name: "John Smith",
    role: "Restaurant Owner",
    quote: "The pork cuts from Wahome are unmatched in quality. Our customers love the flavor!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
  },
  {
    name: "John Smith",
    role: "Restaurant Owner",
    quote: "The pork cuts from Wahome are unmatched in quality. Our customers love the flavor!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
  },
];

const stats = [
  {
    icon: Users,
    label: "Happy Customers",
    value: "500+",
    description: "Satisfied farmers across Kenya",
  },
  {
    icon: Award,
    label: "Years Experience",
    value: "2+",
    description: "Proven track record",
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "98%",
    description: "Healthy livestock delivery",
  },
  {
    icon: Star,
    label: "Average Rating",
    value: "4.9",
    description: "Customer satisfaction",
  },
]

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103", alt: "Farm livestock", caption: "Healthy pigs at Wahome Farm" },
  { src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Farm landscape", caption: "Our sustainable fields" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", alt: "Farm produce", caption: "Fresh organic products" },
];

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      },
      opacity: { duration: 0.6 },
      scale: { duration: 0.6 }
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      x: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      },
      opacity: { duration: 0.3 },
      scale: { duration: 0.6 }
    }
  })
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 },
  },
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AosInitializer />

      <Socials />

      <Hero />
      
      {/* Welcome Section */}
      <section className="py-12 md:py-16 bg-white focus-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-bold text-green-700 mb-4 md:mb-6 animate-marquee">
            𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚃𝚘 𝚆𝚊𝚑𝚘𝚖𝚎 𝙿𝚛𝚎𝚖𝚒𝚞𝚖 𝙿𝚒𝚐𝚜
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl font-light leading-relaxed text-center mx-auto mb-6 md:mb-8 px-2 sm:px-0">
            <ImQuotesLeft className="inline-block mb-3 sm:mb-5 mr-2 sm:mr-3 text-green-700 w-6 h-6 sm:w-8 sm:h-8" />
            At Wahome Premium Farm, we're revolutionizing sustainable pig farming through ethical practices and premium quality. Our commitment extends beyond livestock to nourishing communities with farm-fresh goodness. Join our{" "}
            <Link href="#newsletter" className="text-base text-green-700 font-bold hover:underline">
              newsletter
            </Link>{" "}
            for seasonal recipes, farming tips, and exclusive offers!
            <ImQuotesRight className="inline-block mt-2 sm:mt-4 ml-2 sm:ml-3 text-green-700 w-6 h-6 sm:w-8 sm:h-8" />
          </p>
          <div data-aos="fade-up" data-aos-delay="300">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-100/20 text-sm sm:text-base">
              <Link href="#newsletter">Join Our Newsletter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <Badge className="mb-3 md:mb-4 bg-green-100 text-green-800 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm"
            data-aos="fade-right"
            data-aos-delay="100">Trusted by Farmers</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
            data-aos="fade-right"
            data-aos-delay="100">Why 500+ Farmers Choose Wahome</h2>
          <p className="text-sm sm:text-base font-light text-gray-600 leading-relaxed max-w-2xl mx-auto"
            data-aos="fade-right"
            data-aos-delay="100">
            Join hundreds of successful farmers who trust us for quality livestock and expert guidance.
          </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-4 sm:p-6 border-0 shadow-lg bg-white hover:shadow-xl hover:scale-105 ease-in-out transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}>
                <CardContent className="p-0">
                  <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <stat.icon className="h-5 w-5 sm:h-8 sm:w-8 text-green-700" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-1">{stat.value}</div>
                  <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Heading and Subheading */}
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-xl sm:text-2xl md:text-2xl font-bold text-green-700 mb-2 sm:mb-3 tracking-tight"
              data-aos="fade-right"
              data-aos-delay="100">
              Real Farmers, Real Stories
            </h2>
            <p
              className="text-sm sm:text-base font-light text-gray-600 leading-relaxed max-w-2xl mx-auto"
              data-aos="fade-left"
              data-aos-delay="200">
              Hear from those who love Wahome Farm
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}>
                <CardContent className="flex flex-col">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-3 sm:mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-xs sm:text-sm font-light text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-semi-bold italic leading-relaxed">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-10" data-aos="fade-up" data-aos-delay="500">
            <Button
              asChild
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold rounded-full px-6 sm:px-8 py-1 sm:py-2 text-sm sm:text-base transition-colors duration-300">
              <Link href="/about">Read More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading and Subheading */}
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-2 sm:mb-3 tracking-tight"
              data-aos="fade-right"
              data-aos-delay="100">
              Our Services
            </h2>
            <p
              className="text-sm sm:text-base text-gray-600 font-light leading-relaxed max-w-2xl mx-auto"
              data-aos="fade-left"
              data-aos-delay="200">
              Discover what we offer at Wahome Farm
            </p>
          </div>
          
          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Livestock Sales",
                description: "High-quality pigs bred with care for your farm or business.",
                link: "/shop",
              },
              {
                title: "Farm Products",
                description: "Fresh pork, sausages, and artisanal goods straight from our farm.",
                link: "/shop",
              },
              {
                title: "Farm Tours",
                description: "Experience life on our farm with guided tours and events.",
                link: "/contact",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}>
                <CardContent className="flex flex-col items-start text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-gray-600 font-light text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{service.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-300 text-xs sm:text-sm">
                    <Link href={service.link}>
                      {service.title === "Farm Tours" ? "Book a Tour" : `View ${service.title}`}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Commitment Section */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-4 sm:mb-6 tracking-tight"
            data-aos="fade-right"
            data-aos-delay="100">
            Our Commitment to Sustainability
          </h2>
          
          {/* Description */}
          <p
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl font-light mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0"
            data-aos="fade-left"
            data-aos-delay="200">
            At Wahome Farm, we prioritize environmental stewardship. Our organic certification, zero-waste operations, and water conservation systems ensure sustainable farming that supports Kenya's food security and environmental resilience.
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10"
            data-aos="fade-up"
            data-aos-delay="300">
            {[
              {
                icon: "🌱",
                title: "Organic Certified",
                description: "No chemicals, only natural feed for healthier produce and safer environment.",
              },
              {
                icon: "♻️",
                title: "Zero-Waste",
                description: "Complete recycling and composting systems minimize environmental impact.",
              },
              {
                icon: "💧",
                title: "Water Conservation",
                description: "Advanced water recycling systems preserve this vital resource for future generations.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}
              >
                <CardContent className="flex flex-col items-center text-center">
                  <span className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</span>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Call to Action */}
          <div data-aos="fade-up" data-aos-delay="600">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 sm:px-8 py-2 sm:py-3 transition-colors duration-300 text-sm sm:text-base">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Farm Gallery Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-3 sm:mb-4 text-center tracking-tight"
            data-aos="fade-up"
            data-aos-delay="100">
            Farm Gallery
          </h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base"
            data-aos="fade-up"
            data-aos-delay="100">
            Take a visual tour of our facilities, livestock, and sustainable farming practices.
          </p>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl group"
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}>
                <Image
                  src={image.src}
                  alt={image.alt || `Farm gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay with Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-xs sm:text-sm font-medium p-2 sm:p-4 w-full">
                    {image.caption || "Discover life at Wahome Farm"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-6 sm:mt-10" data-aos="fade-up" data-aos-delay="600">
            <Button
              asChild
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold rounded-full px-6 sm:px-8 py-2 sm:py-3 transition-colors duration-300 text-sm sm:text-base">
              <Link href="/gallery" target="_blank">
                Explore More
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
}
