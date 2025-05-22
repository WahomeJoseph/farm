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
  const closeNav = () => {
    setIsMobileMenuOpen(false);
  }
  return (
    <header className="absolute top-0 w-full h-20 md:h-28 z-50 bg:white/30 backdrop-blur-sm shadow-xs transition-all duration-300">
      <nav className="container mx-auto flex items-center justify-between px-2 sm:px-4 md:px-6 py-2 max-w-7xl">
        <Link href="/" className="flex items-center">
          <Image
            src='/logo-remove.png'
            alt="nav logo"
            priority
            width={100}
            height={100}
            className="w-16 scale-110 bg-white sm:w-20 md:w-24"
          />
        </Link>
        <ul className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-base font-semi-bold bg-white/60 border border-green-600/20 text-black hover:bg-green-100 cursor-pointer px-3 py-2 rounded-sm hover:text-green-600 transition-colors duration-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <UserButton />
        </div>
        {/* mobile menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle mobile menu">
              <Menu className="h-7 w-7 hover:text-amber-600 hover:bg-green-100 transition-all" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white/90 w-3/4 max-w-[300px] border-l border-amber-600/20">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href="/"
                onClick={(e) => closeNav()}
                className="flex items-center">
                <Image
                  src='/logo-remove.png'
                  alt="nav logo"
                  priority
                  width={100}
                  height={100}
                  className="w-20 h-auto"
                />
              </Link>
              <ul className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Navlink
                        href={link.href}
                        className="block text-sm font-medium text-gray-700 hover:text-green-600 py-2 px-3 transition-colors duration-300"
                        onClick={(e) => closeNav()}>
                        {link.label}
                      </Navlink>
                    </SheetClose>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center">
                <UserButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};