"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navlink({ href, children, className }) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href) && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "text-gray-700 hover:text-green-800 hover:bg-green-50",
        isActive ? "text-green-700 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:mb-[-4px] after:transition-all after:duration-300 after:origin-center after:scale-x-0 after:group-[.active]:scale-x-100": "",
        "px-4 py-2 text-base font-medium transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:outline-none",
        className
      )}
      aria-current={isActive ? "page" : undefined}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}