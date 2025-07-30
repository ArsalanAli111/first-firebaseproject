
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal } from 'lucide-react';
import { users as initialUsers } from '@/lib/data';
import type { User } from '@/lib/firestore-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function CustomersPage() {
  const [customers, setCustomers] = React.useState<User[]>(
    initialUsers.filter(u => u.role === 'customer')
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      const updatedUser: User = {
          id: editingUser!.id,
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          role: 'customer',
          password: formData.get('password') as string,
          phone: formData.get('phone') as string,
          address: formData.get('address') as string,
          city: formData.get('city') as string,
          state: formData.get('state') as string,
          postalCode: formData.get('postalCode') as string,
          country: formData.get('country') as string,
      };

      setCustomers(customers.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser, password: updatedUser.password || u.password } : u));
      
      // In a real app, you might want to update the master user list as well.
      
      setIsDialogOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            View all customers and their details.
          </CardDescription>
        </div>
      </div>
      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Postal Code</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(customer => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={`https://placehold.co/100x100.png`} alt={customer.name} />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{customer.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone || 'N/A'}</TableCell>
                  <TableCell>{customer.country || 'N/A'}</TableCell>
                  <TableCell>{customer.postalCode || 'N/A'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(customer)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href="/admin/orders">View Orders</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
                 <form onSubmit={handleSaveUser}>
                    <DialogHeader>
                        <DialogTitle>Edit Customer Details</DialogTitle>
                        <DialogDescription>
                           Update the details for this customer.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="name" defaultValue={editingUser?.name} className="col-span-3" required />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue={editingUser?.email} className="col-span-3" required />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">Password</Label>
                            <Input id="password" name="password" type="password" className="col-span-3" placeholder='Leave blank to keep unchanged' />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Phone</Label>
                            <Input id="phone" name="phone" defaultValue={editingUser?.phone} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">Address</Label>
                            <Input id="address" name="address" defaultValue={editingUser?.address} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">City</Label>
                            <Input id="city" name="city" defaultValue={editingUser?.city} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">State</Label>
                            <Input id="state" name="state" defaultValue={editingUser?.state} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="postalCode" className="text-right">Postal Code</Label>
                            <Input id="postalCode" name="postalCode" defaultValue={editingUser?.postalCode} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="country" className="text-right">Country</Label>
                            <Input id="country" name="country" defaultValue={editingUser?.country} className="col-span-3" />
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
