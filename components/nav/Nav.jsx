"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import UserButton from "../sign/UsersBtn";
import Navlink from "./Navlink";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full md:h-30 z-50 backdrop-blur-xl shadow-xs transition-all duration-300">
      <nav className="container mx-auto flex items-center justify-between px-4 py-2 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src='/logo-remove.png'
            alt="nav logo"
            priority
            width={120}
            height={120}
          />
        </Link>

        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-md font-medium text-black hover:bg-green-100 cursor-pointer p-2 rounded-full hover:text-green-600 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <UserButton />
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle mobile menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-lg font-bold text-green-700">
                  𝒲𝒶𝒽𝑜𝓂𝑒 𝒫𝓇𝑒𝓂𝒾𝓊𝓂 𝒫𝒾𝑔𝓈
                </span>
              </Link>

              <ul className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Navlink
                        href={link.href}
                        className="block text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {link.label}
                      </Navlink>
                    </SheetClose>
                  </li>
                ))}
              </ul>

              <div className="py-2">
                <UserButton />
              </div>

            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};