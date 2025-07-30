
"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, LayoutDashboard } from 'lucide-react';
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/category/perfumes-for-men", label: "Men" },
  { href: "/category/perfumes-for-women", label: "Women" },
  { href: "/category/best-sellers", label: "Best Sellers" },
];

export function Header() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // This is a placeholder for auth state. In a real app, you'd use a proper auth hook.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Placeholder for admin role

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold font-headline text-primary">
            Scent Sample
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
            {isAdmin && (
               <Link href="/admin/dashboard" className="transition-colors hover:text-accent font-semibold text-primary">
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
             <Button variant="ghost" size="icon" asChild>
                <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                    <User className="h-5 w-5" />
                    <span className="sr-only">{isAuthenticated ? 'Dashboard' : 'Login'}</span>
                </Link>
             </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background">
              <div className="flex flex-col h-full">
                <Link href="/" className="text-2xl font-bold font-headline text-primary mb-8" onClick={() => setMobileMenuOpen(false)}>
                  Scent Sample
                </Link>
                <nav className="flex flex-col gap-4 text-lg">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="transition-colors hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                   {isAdmin && (
                    <Link href="/admin/dashboard" className="transition-colors hover:text-accent font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <LayoutDashboard className="mr-2 inline-block h-5 w-5" />
                      Admin
                    </Link>
                  )}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  <Button variant="outline" asChild>
                    <Link href={isAuthenticated ? "/dashboard" : "/login"} onClick={() => setMobileMenuOpen(false)}>
                        <User className="mr-2 h-5 w-5" />
                        {isAuthenticated ? 'My Dashboard' : 'Login / Sign Up'}
                    </Link>
                 </Button>

                  <Button variant="default" asChild>
                    <Link href="/cart" className="relative" onClick={() => setMobileMenuOpen(false)}>
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      View Cart
                      {cartCount > 0 && (
                        <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
