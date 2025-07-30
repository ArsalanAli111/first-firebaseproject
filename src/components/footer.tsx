
import Link from "next/link";
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';

const staticLinks = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/shipping-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Privacy Policy" },
  { href: "/shipping-policy", label: "Terms of Service" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold font-headline text-primary">Scent Sample</h3>
            <p className="mt-2 text-sm text-muted-foreground">Discover your signature scent with our curated collection of luxury perfumes.</p>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold font-headline">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/category/perfumes-for-men" className="hover:text-accent transition-colors">Men's</Link></li>
              <li><Link href="/category/perfumes-for-women" className="hover:text-accent transition-colors">Women's</Link></li>
              <li><Link href="/category/best-sellers" className="hover:text-accent transition-colors">Best Sellers</Link></li>
              <li><Link href="/category/gift-box" className="hover:text-accent transition-colors">Gift Sets</Link></li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold font-headline">Information</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {staticLinks.map(link => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold font-headline">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Scent Sample. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
