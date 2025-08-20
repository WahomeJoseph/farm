import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, CircleCheckBig, MapPin, PiggyBank, HeartHandshake } from "lucide-react";
import Chatbot from "@/components/chat/Chatbot";

export async function generateMetadata() {
  return {
    title: 'About Us | Wahome Premium Pigs - Learn more about profitable pig farming practices and commitment to quality',
    description: 'Learn about our sustainable farming practices and commitment to quality.',
  }
}

export default function About() {
  const teamMembers = [
    {
      name: "John Wahome",
      role: "Owner Founder & Lead Farmer",
      bio: "John's passion for farming started in childhood, and he now leads our team with over 5 years of experience. He drives our eco-friendly initiatives, from waste management to sustainable feed sourcing.",
      image: "/john.jpeg"
    },
    {
      name: "John",
      role: "Farm Manager & Farm Hand",
      bio: "John oversees daily operations, ensuring our pigs are raised with care and our farm runs smoothly. He ensures the pigs are fed and does basic veterinary work including pigs breeding and farrowing.",
      image: "/john.jpeg"
    }
  ];

  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description: "We implement eco-friendly practices that protect the environment while maintaining productivity."
    },
    {
      icon: <PiggyBank className="h-8 w-8 text-green-600" />,
      title: "Quality",
      description: "From genetics to feed, we maintain the highest standards to deliver premium pork products."
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-green-600" />,
      title: "Community",
      description: "We're committed to supporting local farmers and educating the next generation about responsible agriculture."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Chatbot />

      {/* Hero Section */}
      <section className="relative h-[30rem] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="https://media.istockphoto.com/id/1248963859/photo/pig-farms-in-confinement-mode.jpg?s=612x612&w=0&k=20&c=WvY9pkZW75vzmevYzXxTSKo9oe1I5KjL4v1djBXtbUg="
          alt="Wahome Premium Farm"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            About Wahome Premium Pigs
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto mb-8 drop-shadow-md">
            Discover our passion for sustainable, eco-friendly farming and premium pig rearing
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
            <Link href="/contact">Visit Our Farm</Link>
          </Button>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://media.istockphoto.com/id/1280715716/photo/germany-stuttgart-magical-orange-sunset-sky-above-ripe-grain-field-nature-landscape-in-summer.jpg?s=612x612&w=0&k=20&c=TukToGq-LkmpxvEXEomC3d11prf_hDRSwA7pYsLYG50="
              alt="Our farm"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center">
              <Leaf className="h-8 w-8 mr-3" />
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2023, Wahome Premium Pigs began as a small farm with a vision to provide high-quality,
              sustainably raised pigs to our local community. Over the years, we've grown into a trusted name in Kenyan
              agriculture, combining traditional farming wisdom with modern techniques.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to animal welfare, environmental stewardship, and customer satisfaction drives everything we do.
              We take pride in every step of our process, from breeding to raising to delivering the finest pork products.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white/90">
                <CardHeader className="items-center">
                  {value.icon}
                  <CardTitle className="text-xl text-green-700">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  {value.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center">
              <Leaf className="h-8 w-8 mr-3" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-green-100">
              At Wahome Premium Pigs, our mission is to revolutionize pig farming in Kenya through sustainable practices
              that benefit animals, consumers, and the environment.
            </p>
            <ul className="space-y-4">
              {[
                "Raise healthy, happy pigs using ethical and sustainable practices",
                "Promote environmental conservation through eco-friendly farming methods",
                "Empower our community by providing quality products and educational farm tours",
                "Inspire the next generation of farmers with innovation and passion"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CircleCheckBig className="h-5 w-5 mt-1 mr-3 text-green-300 flex-shrink-0" />
                  <span className="text-green-50">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg duration-300 transition-all"
            >
              <CardContent className="pt-6 flex flex-col items-center gap-6 focus-in">
                <div className="relative w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-green-100 shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="96px"
                    priority
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
