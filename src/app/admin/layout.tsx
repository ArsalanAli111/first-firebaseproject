
'use client';

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Box,
  Tags,
  Warehouse,
  UserCog,
  FileBarChart,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Customer Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Box },
  { href: '/admin/attributes', label: 'Attributes', icon: Tags },
  { href: '/admin/inventory', label: 'Inventory', icon: Warehouse },
  { href: '/admin/users', label: 'User Management', icon: UserCog },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/reports', label: 'Reports', icon: FileBarChart },
];


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto flex min-h-screen flex-1">
        <aside className="w-64 shrink-0 border-r bg-background hidden md:block">
            <div className="sticky top-16 flex h-full flex-col">
                <nav className="flex flex-grow flex-col gap-2 p-4">
                    {adminNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === item.href ? 'bg-muted text-primary' : ''}`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto p-4 border-t">
                    <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Home className="h-4 w-4" />
                        Back to Shop
                    </Link>
                </div>
            </div>
        </aside>
        <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
