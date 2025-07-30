
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
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
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent className="p-2 flex flex-col">
              <div className="flex flex-col h-full">
              <SidebarMenu className="flex-1 mt-4">
                  {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={{
                          children: item.label,
                      }}
                      >
                      <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                      </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  ))}
              </SidebarMenu>
              <div className="mt-auto p-2">
                  <SidebarMenuItem>
                      <SidebarMenuButton
                      asChild
                      tooltip={{
                          children: "Back to Shop",
                      }}
                      >
                      <Link href="/">
                          <Home />
                          <span>Back to Shop</span>
                      </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </div>
              </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
