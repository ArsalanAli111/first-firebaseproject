
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Box,
  Tags,
  Warehouse,
  FileText,
  UserCog,
  FileBarChart,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar collapsible="icon">
          <SidebarContent className="p-2">
            <div className="flex flex-col h-full">
              <SidebarHeader>
                <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
                   <h2 className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">Admin</h2>
                   <SidebarTrigger />
                </div>
              </SidebarHeader>
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

        <SidebarInset className="flex-1 flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
                <div className="flex-1">
                    {/* Optionally add a search bar or page title here */}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                            <Avatar>
                                <AvatarImage src="https://placehold.co/100x100.png" alt="@admin" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
