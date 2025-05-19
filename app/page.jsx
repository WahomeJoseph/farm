"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { Socials } from "@/components/hero/Socials";
import { FaPhone } from "react-icons/fa";
import { Newsletter } from "@/components/hero/Newsletter";
import { CircleCheckBig } from "lucide-react";

console.log('Welcome To Wahome Premium Pigs')

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
    title: "Premium Livestock Breeding",
    description: "Wahome Farm specializes in ethically raised, antibiotic-free pigs with superior genetics for quality meat production.",
    highlights: [
      "Best Breeding Rating",
      "Carefully selected stock ensuring robust health and performance.",
      "Raised on 100% organic, high-quality feed for optimal growth and sustainability"
    ],
    cta: "View Our Breeding Stock",
    ctaLink: "/gallery",
  },
  {
    image: "https://media.istockphoto.com/id/685883666/photo/kids-petting-piglets.jpg?s=612x612&w=0&k=20&c=NzYQ753CjFdBJyl7T_GxtMXWNpi3lf5VIzhqpl6ciMA=",
    title: "Educational Farm Experiences",
    description: "Book a guided tour of our certified organic facilities and breeding programs.",
    highlights: [
      "Available Monday to Saturday",
      "Farm Tours are free for all",
      "Learn about our breeding process"
    ],
    cta: "Schedule Your Visit",
    ctaLink: "/contact",
  },
  {
    image: "https://media.istockphoto.com/id/1280715716/photo/germany-stuttgart-magical-orange-sunset-sky-above-ripe-grain-field-nature-landscape-in-summer.jpg?s=612x612&w=0&k=20&c=TukToGq-LkmpxvEXEomC3d11prf_hDRSwA7pYsLYG50=",
    title: "Certified Sustainable Farming",
    description: "Our SDGs Organic certified practices ensure healthy animals and minimal environmental impact.",
    highlights: [
      "Organic Certified",
      "Zero-Waste Operations",
      "Water conservation systems"
    ],
    cta: "Tour Our Facilities",
    ctaLink: "/contact",
  },
  {
    image: "https://media.istockphoto.com/id/543212762/photo/tractor-cultivating-field-at-spring.jpg?s=612x612&w=0&k=20&c=uJDy7MECNZeHDKfUrLNeQuT7A1IqQe89lmLREhjIJYU=",
    title: "Our Commitment to Ethical Farming",
    description: "To revolutionize African pork production through sustainable practices that benefit farmers, consumers, and the land.",
    highlights: [
      "Environmental: 1 tree planted per pig raised",
      "Community: Training programs for local farmers",
      "Research: Partnered with KARI since 2012"
    ],
    cta: "Our Farming Philosophy",
    ctaLink: "/about",
  },
  {
    image: "https://media.istockphoto.com/id/594468710/photo/sow-with-piglets-nursing.jpg?s=612x612&w=0&k=20&c=1ExTaFoOYaZQ-OUyApXcoYzClrGbnAkMblWII-thOCo=",
    title: "Quality Livestock Available",
    description: "Healthy, vaccinated animals ready for your farm operation.",
    highlights: [
      "Piglets: 8-10 weeks, weaned",
      "Breeding gilts: 4-6 months",
      "Performance-tested boars",
      "Nationwide delivery options"
    ],
    cta: "Shop Now",
    ctaLink: "/shop",
  },
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

const featuredProducts = [
  {
    name: "Piglets",
    description: "Different breeds of healthy, vaccinated piglets ready for rearing",
    price: "From KES 5,000",
    image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
    link: "/shop?category=Piglets",
    category: "Piglets"
  },
  {
    name: "Gilts",
    description: "Different breeds of young healthy female pigs ready for first breeding",
    price: "From KES 15,000",
    image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
    link: "/shop?category=Gilts",
    category: "Gilts"
  },
  {
    name: "Boars",
    description: "Different breeds of proven quality breeding boars with strong genetics",
    price: "From KES 50,000",
    image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
    link: "/shop?category=Boars",
    category: "Boars"
  },
  {
    name: "Sows",
    description: "Different breeds of proven breeding sows with excellent mothering abilities",
    price: "From KES 40,000",
    image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
    link: "/shop?category=Sows",
    category: "Sows"
  },
  {
    name: "Manure",
    description: "Organic fertilizer for your crops",
    price: "KES 500/bag",
    image: "https://media.istockphoto.com/id/1488312382/photo/a-manure-pile-in-the-country.jpg?s=612x612&w=0&k=20&c=4mVqE1JvZHiFq6aRRm80Q-pqqM9HePyxWs7VKFhdDc4=",
    link: "/shop?category=Manure",
    category: "Manure"
  }
];
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

      {/* Hero Slider Section */}
      <section aria-label="Hero Slider" className="relative w-full h-screen overflow-hidden focus-in">
        <AnimatePresence initial={false} custom={direction}>
          {slides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex items-center md:pt-20 sm:pt-30 xs:pt-32 md:mt-0 sm:mt-30 xs:mt-40 justify-center transition-all"
                  custom={direction}
                  initial="initial"
                  animate="animate"
                  exit="exit">
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover opacity-95"
                      priority={index === 0}
                      quality={90} />
                  </div>
                  {/* overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                  {/* content */}
                  <div className="container flex justify-center items-center h-full mx-auto relative z-10 px-4">
                    <div
                      className="w-full max-w-4xl bg-white/50 p-6 md:p-10 rounded-2xl shadow-xl"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible">
                      <h1 className="text-[2rem] md:text-[2.5rem] font-bold capitalize mb-3 tracking-tight text-gray-900 focus-in">
                        {slide.title}
                      </h1>
                      <p className="text-md p-2 w-3/4 backdrop-blur-sm bg-[#ddd6cb]/30 montserrat md:text-lg leading-relaxed rounded-sm bg-text-gray-900 mb-6 focus-in">
                        {slide.description}
                      </p>
                      {/* highlights */}
                      <ul className="flex flex-col gap-2 mb-6 focus-in">
                        {slide.highlights.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2 focus-in">
                            <span>
                              <CircleCheckBig className="flex shrink-0 mt-1 text-amber-800" size={16} />
                            </span>
                            <span className="text-gray-950 font-semi-bold montserrat leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {/* cta btn */}
                      <div>
                        <Button
                          asChild
                          size="lg"
                          className="px-6 py-5 bg-amber-800 hover:amber-900 text-white">
                          <Link href={slide.ctaLink}>
                            {slide.cta}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white focus-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-green-700 mb-6 animate-marquee">
          𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚃𝚘 𝚆𝚊𝚑𝚘𝚖𝚎 𝙿𝚛𝚎𝚖𝚒𝚞𝚖 𝙿𝚒𝚐𝚜
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl font-light leading-relaxed text-center mx-auto mb-8">
            <ImQuotesLeft size={32} className="inline-block mb-5 mr-3 text-green-700" />
            At Wahome Premium Farm, we’re revolutionizing sustainable pig farming through ethical practices and premium quality. Our commitment extends beyond livestock to nourishing communities with farm-fresh goodness. Join our{" "}
            <Link href="#newsletter" className="text-md text-green-700 hover:underline">
              newsletter
            </Link>{" "}
            for seasonal recipes, farming tips, and exclusive offers!
            <ImQuotesRight size={32} className="inline-block mt-4 ml-3 text-green-700" />
          </p>
          <div data-aos="fade-up" data-aos-delay="300">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-100/20">
              <Link href="#newsletter">Join Our Newsletter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Heading and Subheading */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-green-700 mb-3 tracking-tight"
              data-aos="fade-right"
              data-aos-delay="100">
              Our Services
            </h2>
            <p
              className="text-base text-gray-600 font-light leading-relaxed"
              data-aos="fade-left"
              data-aos-delay="200">
              Discover what we offer at Wahome Farm
            </p>
          </div>
          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}>
                <CardContent className="flex flex-col items-start text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed mb-4">{service.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-300">
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

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Heading and Subheading */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-green-700 mb-3 tracking-tight"
              data-aos="fade-right"
              data-aos-delay="100">
              What Our Customers Say
            </h2>
            <p
              className="text-base font-light text-gray-600 leading-relaxed"
              data-aos="fade-left"
              data-aos-delay="200">
              Hear from those who love Wahome Farm
            </p>
          </div>
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}>
                <CardContent className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm font-light text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-semi-bold italic leading-relaxed">“{testimonial.quote}”</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Call to Action */}
          <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="500">
            <Button
              asChild
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold rounded-full px-8 py-2 transition-colors duration-300">
              <Link href="/about">Read More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sustainability Commitment Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl font-bold text-green-700 mb-6 tracking-tight"
            data-aos="fade-up"
            data-aos-delay="100">
            Our Commitment to Sustainability
          </h2>
          {/* Description */}
          <p
            className="text-lg text-gray-600 max-w-3xl font-light mx-auto mb-10 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200">
            At Wahome Farm, we prioritize the planet and climate. Our Organic certification, zero-waste operations, and water conservation systems ensure sustainable and ethical farming. By aligning with global sustainability goals and addressing local challenges, we support Kenya’s food security and environmental resilience. Join us in nurturing the Earth for future generations.
          </p>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "🌱",
                title: "Organic Certified",
                description: "No chemicals, only natural feed for healthier produce.",
              },
              {
                icon: "♻️",
                title: "Zero-Waste",
                description: "Recycling and composting at scale to minimize impact.",
              },
              {
                icon: "💧",
                title: "Water Conservation",
                description: "Efficient systems to preserve vital resources.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}
              >
                <CardContent className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Call to Action */}
          <div data-aos="fade-up" data-aos-delay="600">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-8 py-3 transition-colors duration-300"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl font-bold text-green-700 mb-10 text-center tracking-tight"
            data-aos="fade-up"
            data-aos-delay="100">
            Featured Products
          </h2>
          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:mx-auto sm:mx-10 lg:grid-cols-2 md:gap-14 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transform-all ease-in-out duration-300 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src={product.image}
                      alt={`${product.name} product image`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
                    />
                    {product.price && (
                      <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.price}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                      {product.description || "Experience the best of Wahome Farm with our premium products."}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        asChild
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-2">
                        <Link href='/shop'>Shop Now</Link>
                      </Button>
                      {product.rating && (
                        <div className="flex items-center">
                          {Array(product.rating)
                            .fill()
                            .map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Call to Action */}
          <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="500">
            <Button
              asChild
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold rounded-full px-8 py-3"
            >
              <Link href="/shop">Load More Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Farm Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl font-bold text-green-700 mb-10 text-center tracking-tight"
            data-aos="fade-up"
            data-aos-delay="100">
            Farm Gallery
          </h2>
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl group"
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}>
                <Image
                  src={image.src}
                  alt={image.alt || `Farm gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay with Caption */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-medium text-center px-4">
                    {image.caption || "Discover life at Wahome Farm"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Call to Action */}
          <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="600">
            <Button
              asChild
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold rounded-full px-8 py-3 transition-colors duration-300">
              <Link href="/gallery" target="_blank">
                Explore More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* CTA Banner */}
      <section className="py-8 bg-gradient-to-b from-green-700 to-green-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            data-aos="fade-up"
            data-aos-delay="100">
            Ready to Experience Wahome Premium Farm?
          </h2>
          <p
            className="text-[1rem] font-light text-green-100 max-w-2xl mx-auto mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200">
            Shop our organic products, book a farm tour, or join our workshops today!
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="300">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 hover:bg-green-100 font-semibold rounded-full px-8 py-3 transition-colors duration-300">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-green-100 hover:text-green-700 font-semibold rounded-full px-8 py-3 transition-colors duration-300">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-green-700 hover:bg-green-100 font-semibold rounded-full px-6 py-3 flex items-center gap-2 transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              <Link
                href="tel:+254711430249"
                className="flex items-center gap-2"
                aria-label="Call Wahome Farm at 0711430249">
                <FaPhone className="w-5 h-5 text-green-800" aria-hidden="true" />
                <span>0711430249</span>
              </Link>
            </Button>
          </div>
        </div>
        <div
          className="mt-10 mb-0">
          <p className="text-md mt-3 slide-in-left">Designed by <a href="https://joseph-wachira-portfolio.vercel.app/" target="blank"><span className="text-amber-800 text-md">Wahome Joseph</span></a> </p>
          <span className="text-sm slide-in-right">Coyright &copy; {new Date().getFullYear()} - All right reserved</span>
        </div>
      </section>
    </div>
  );
}