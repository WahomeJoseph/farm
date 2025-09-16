"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { FaFacebookF, FaWhatsapp } from "react-icons/fa"
import { BsTwitterX } from "react-icons/bs"
import { SiTiktok } from "react-icons/si"
import { Share } from "lucide-react"
import { X } from "lucide-react"

export async function generateMetadata() {
  return {
    title: 'Keep in touch on our socials | Wahome Premium Pigs Products',
    description: 'Your leading source for premium pig breeds in Kenya and quality pork suppliers. Reach out to get scalable pig farming tips make profits with our expert advice and resources.',
  }
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/joseph.steve.397501/",
    icon: FaFacebookF,
    color: "hover:text-blue-600",
  },
  {
    name: "TikTok",
    href: "https://instagram.com/wahomepremium",
    icon: SiTiktok,
    color: "hover:text-pink-600",
  },
  {
    name: "Twitter",
    href: "https://x.com/WachiraJoseph17",
    icon: BsTwitterX,
    color: "hover:text-gray-900",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/254711430249?text=Hello%20Wahome%20Premium%20Pigs%2C%20I%20would%20like%20to%20inquire%20about...",
    icon: FaWhatsapp,
    color: "hover:text-green-600",
  },
]

export function Socials() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block fixed top-28 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2">
          <div className="flex items-center gap-2">
            {/* Social Links */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full text-gray-600 ${social.color} transition-colors duration-200 hover:bg-gray-100`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300" />

            {/* Contact Links */}
            <div className="flex items-center gap-1">
              <Link
                href="tel:+254711430249"
                className="p-2 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </Link>
              <Link
                href="mailto:info@wahomepremium.com"
                className="p-2 rounded-full text-amber-800 hover:text-amber-900 hover:bg-amber-50 transition-colors duration-200"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <div className="relative">
          {/* Main Floating Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white/90 hover:bg-green-600 hover:text-white backdrop-blur-sm rounded-full shadow-lg p-3 flex items-center justify-center"
            aria-label={isExpanded ? "Close social links" : "Open social links"}
          >
            {isExpanded ? (
              <X className="h-5 w-5 text-gray-700 hover:text-white" />
            ) : (
              <Share className="h-5 w-5 text-gray-700 hover:text-white" />
            )}
          </button>

          {/* Expanded Menu */}
          {isExpanded && (
            <div className="absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-2 flex flex-col gap-2 w-[180px]">
              {/* Social Links */}
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg text-gray-600 ${social.color} transition-colors duration-200 hover:bg-gray-100 flex items-center gap-3 text-sm`}
                  aria-label={`Follow us on ${social.name}`}
                  onClick={() => setIsExpanded(false)}
                >
                  <social.icon className="h-4 w-4 flex-shrink-0" />
                  <span>{social.name}</span>
                </Link>
              ))}

              {/* Divider */}
              <div className="w-full h-px bg-gray-300 my-1" />

              {/* Contact Links */}
              <Link
                href="tel:+254711430249"
                className="p-3 rounded-lg text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors duration-200 flex items-center gap-3 text-sm"
                aria-label="Call us"
                onClick={() => setIsExpanded(false)}
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>Call Us</span>
              </Link>
              <Link
                href="mailto:josephwachira589@gmail.com"
                className="p-3 rounded-lg text-amber-800 hover:text-amber-900 hover:bg-amber-50 transition-colors duration-200 flex items-center gap-3 text-sm"
                aria-label="Email us"
                onClick={() => setIsExpanded(false)}
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>Email Us</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
