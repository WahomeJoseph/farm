import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, CircleCheckBig } from "lucide-react";

export async function generateMetadata() {
  return {
    title: 'About Us | Wahome Premium Pigs',
    description: 'Learn about our sustainable farming practices and commitment to quality.',
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative h-96 md:h-[28rem] flex items-center justify-center overflow-hidden">
        <Image
          src="https://media.istockphoto.com/id/1280715716/photo/germany-stuttgart-magical-orange-sunset-sky-above-ripe-grain-field-nature-landscape-in-summer.jpg?s=612x612&w=0&k=20&c=TukToGq-LkmpxvEXEomC3d11prf_hDRSwA7pYsLYG50="
          alt="Wahome Premium Farm"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white rounded backdrop-blur-xs p-4">
            <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">About Wahome Premium Pigs</h1>
            <p className="text-lg text-white md:text-xl max-w-2xl mx-auto">
              Discover our passion for sustainable, eco-friendly farming and premium pig rearing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-700 flex slide-in-right items-center">
                <Leaf className="h-6 w-6 mr-2 text-green-600" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed focus-in">
                Founded in 2021, Wahome Premium Pigs began as a small farm with a vision to provide high-quality,
                sustainably raised pigs to our local community. Over the years, we’ve grown into a trusted name in Kenyan
                agriculture, combining traditional farming wisdom with modern techniques. Our commitment to animal welfare,
                environmental stewardship, and customer satisfaction drives everything we do.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-700 slide-in-right flex items-center">
                <Leaf className="h-6 w-6 mr-2 text-green-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="focus-in">
              <p className="text-gray-600 leading-relaxed mb-4">
                At Wahome Premium Pigs, our mission is to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {[
                  "Raise healthy, happy pigs using ethical and sustainable practices.",
                  "Promote environmental conservation through eco-friendly farming methods.",
                  "Empower our community by providing quality products and educational farm tours.",
                  "Inspire the next generation of farmers with innovation and passion.",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm font-medium">
                    <CircleCheckBig className="text-amber-800"/>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 text-center slide-in-right mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <Card className="bg-white/95 shadow-lg border-none">
              <CardContent className="pt-6 text-center focus-in">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/john.jpeg"
                    alt="John Wahome"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">John Wahome</h3>
                <p className="text-sm text-gray-600">Owner Founder & Lead Farmer</p>
                <p className="text-sm text-gray-500 mt-2">
                  John’s passion for farming started in childhood, and he now leads our team with over 10 years of
                  experience.
                </p>
              </CardContent>
            </Card>
            {/* <Card className="bg-white/95 shadow-lg border-none">
              <CardContent className="pt-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/john.jpeg"
                    alt="Mary Njeri"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Mary Njeri</h3>
                <p className="text-sm text-gray-600">Farm Manager</p>
                <p className="text-sm text-gray-500 mt-2">
                  Mary oversees daily operations, ensuring our pigs are raised with care and our farm runs smoothly.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/95 shadow-lg border-none">
              <CardContent className="pt-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/john.jpeg"
                    alt="Peter Kamau"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Peter Kamau</h3>
                <p className="text-sm text-gray-600">Sustainability Lead</p>
                <p className="text-sm text-gray-500 mt-2">
                  Peter drives our eco-friendly initiatives, from waste management to sustainable feed sourcing.
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-green-100">
        <div className="max-w-4xl mx-auto text-center slide-in-left">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Join Our Farm</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Want to learn more about our farm or experience it firsthand? Contact us or book a farm tour today!
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/contact">Book a Farm Tour</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}