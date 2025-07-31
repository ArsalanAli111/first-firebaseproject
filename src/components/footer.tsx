
import Link from "next/link";
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from "./logo";
import { categories } from "@/lib/data";

const staticLinks = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const categoryLinks = categories.map(category => ({
    href: `/category/${category.slug}`,
    label: category.name
  }));

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">Discover your signature scent with our curated collection of luxury perfumes.</p>
             <div className="mt-6 flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground" /></a>
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="font-semibold font-headline">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm columns-2">
              {categoryLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-semibold font-headline">Information</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {staticLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Scent Sample. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
