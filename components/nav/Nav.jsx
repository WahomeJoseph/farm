"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import UserButton from "../sign/UsersBtn";
import Navlink from "./Navlink";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop" },
  { href: "/blogs", label: "Blogs" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const closeNav = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "h-16 md:h-20 bg-white shadow-md" : "h-16 md:h-24 bg-white/90 backdrop-blur-sm"
    }`}>
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src='/logo-remove.png'
            alt="Company Logo"
            priority
            width={120}
            height={120}
            className={`transition-all duration-300 ${
              scrolled ? "w-12 h-12 md:w-16 scale-150 md:h-16" : "w-14 h-14 md:w-18 md:h-18"
            } group-hover:scale-150`}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Navlink href={link.href}>
                {link.label}
              </Navlink>
            </li>
          ))}
        </ul>

        {/* Desktop User Button */}
        <div className="hidden md:block">
          <UserButton />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "default"}
              className="md:hidden p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </SheetTrigger>

          {/* Mobile Menu Content */}
          <SheetContent
            side="right"
            className={`bg-white/95 w-full ${isMobile ? "max-w-[280px]" : "max-w-xs"} border-l border-gray-200 p-0`}
            onInteractOutside={closeNav}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link href="/" onClick={closeNav}>
                  <Image
                    src='/logo-remove.png'
                    alt="Company Logo"
                    width={80}
                    height={80}
                    className="w-14 h-14"
                  />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="p-2">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Navlink
                          href={link.href}
                          onClick={closeNav}
                          className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                          mobile
                        >
                          {link.label}
                        </Navlink>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-center">
                  <UserButton mobile />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
