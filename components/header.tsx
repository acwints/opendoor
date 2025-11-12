"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/opendoor.jpeg"
            alt="Opendoor"
            width={200}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === "/" 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/andrew"
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === "/andrew" || pathname?.startsWith("/andrew")
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Andrew
          </Link>
        </nav>
      </div>
    </header>
  );
}

