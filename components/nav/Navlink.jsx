"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navlink({ href, children, className, ...props }) {
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
        "text-gray-700 hover:bg-green-50 hover:text-green-800",
        isActive && "bg-green-50 text-green-700 font-semibold",
        "px-4 py-2 text-base font-medium transition-colors duration-200",
      )}
      aria-current={isActive ? "page" : undefined}
      {...props}>
      <Link href={href}>
        <span className="relative">
          {children}
          {isActive && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600" />
          )}
        </span>
      </Link>
    </Button>
  );
}