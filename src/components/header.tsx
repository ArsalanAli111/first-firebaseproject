
"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, LayoutDashboard, Edit, LogOut, UserCircle, ChevronDown } from 'lucide-react';
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Logo } from "./logo";
import { categories } from "@/lib/data";

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  }
  
  const handleProfileSave = (e: React.FormEvent<HTMLFormElement>) => {
    // In a real app, you would save this to the backend.
    setIsProfileDialogOpen(false);
  }

  const mainCategories = categories.filter(c => ['perfumes-for-men', 'perfumes-for-women', 'unisex-perfumes', 'gift-sets', 'tester-perfumes', 'luxury-collection', 'best-sellers', 'new-arrivals'].includes(c.slug));


  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold font-headline text-primary">
              <Logo className="h-10 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 transition-colors hover:text-accent px-0">
                    Shop <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                     <Link href="/shop">All Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {mainCategories.map(category => (
                     <DropdownMenuItem key={category.id} asChild>
                       <Link href={`/category/${category.slug}`}>{category.name}</Link>
                     </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              ))}
              {isAdmin && isAuthenticated && (
                <Link href="/admin/dashboard" className="transition-colors hover:text-accent font-semibold text-primary">
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/100x100.png" alt={user?.name || ''} />
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile"><UserCircle className="mr-2 h-4 w-4" />Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/login">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Login</span>
                    </Link>
                </Button>
              )}

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
                    <Logo className="h-10 w-auto" />
                  </Link>
                  <nav className="flex flex-col gap-4 text-lg">
                    <Link href="/shop" className="transition-colors hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
                        Shop
                    </Link>
                    {navLinks.map(link => (
                      <Link key={link.href} href={link.href} className="transition-colors hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
                        {link.label}
                      </Link>
                    ))}
                    {isAdmin && isAuthenticated && (
                      <Link href="/admin/dashboard" className="transition-colors hover:text-accent font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>
                        <LayoutDashboard className="mr-2 inline-block h-5 w-5" />
                        Admin
                      </Link>
                    )}
                  </nav>
                  <div className="mt-auto flex flex-col gap-4">
                    <Button variant="outline" asChild>
                      <Link href={isAuthenticated ? "/profile" : "/login"} onClick={() => setMobileMenuOpen(false)}>
                          <User className="mr-2 h-5 w-5" />
                          {isAuthenticated ? 'My Profile' : 'Login / Sign Up'}
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

      {/* Edit Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleProfileSave}>
                  <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                          Update your name and email address.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" name="name" defaultValue={user?.name} className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input id="email" name="email" type="email" defaultValue={user?.email} className="col-span-3" required />
                      </div>
                  </div>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button type="button" variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save Changes</Button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>
    </>
  );
}
