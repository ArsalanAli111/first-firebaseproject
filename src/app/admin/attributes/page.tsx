
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { MoreVertical, PlusCircle, Trash2, Edit, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { attributes as initialAttributes } from '@/lib/data';
import type { Attribute } from '@/lib/firestore-types';

export default function AttributesPage() {
  const [attributes, setAttributes] = React.useState<Attribute[]>(initialAttributes);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingAttribute, setEditingAttribute] = React.useState<Attribute | null>(null);
  const [newAttributeValue, setNewAttributeValue] = React.useState('');

  const handleAddAttribute = () => {
    setEditingAttribute(null);
    setIsDialogOpen(true);
  };

  const handleEditAttribute = (attribute: Attribute) => {
    setEditingAttribute(attribute);
    setIsDialogOpen(true);
  };

  const handleDeleteAttribute = (attributeId: string) => {
    setAttributes(currentAttributes => currentAttributes.filter(a => a.id !== attributeId));
  }

  const handleSaveAttribute = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const type = formData.get('type') as string;
      const values = editingAttribute?.values || [];
      
      const newAttribute: Attribute = {
          id: editingAttribute ? editingAttribute.id : `attr${attributes.length + 1}`,
          type,
          values,
      };

      if (editingAttribute) {
          setAttributes(attributes.map(a => a.id === newAttribute.id ? newAttribute : a));
      } else {
          setAttributes([...attributes, newAttribute]);
      }
      setIsDialogOpen(false);
  }

  const handleAddValue = (attributeId: string) => {
    if (!newAttributeValue.trim()) return;
    setAttributes(attributes.map(attr => {
        if (attr.id === attributeId) {
            return {
                ...attr,
                values: [...attr.values, newAttributeValue.trim()]
            }
        }
        return attr;
    }));
    setNewAttributeValue('');
  };

  const handleRemoveValue = (attributeId: string, valueToRemove: string) => {
    setAttributes(attributes.map(attr => {
        if (attr.id === attributeId) {
            return {
                ...attr,
                values: attr.values.filter(v => v !== valueToRemove)
            }
        }
        return attr;
    }));
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Attributes</CardTitle>
          <CardDescription>
            Manage reusable attributes for your products.
          </CardDescription>
        </div>
        <Button size="sm" className="h-8 gap-1" onClick={handleAddAttribute}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Attribute</span>
        </Button>
      </div>

      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {attributes.map(attribute => (
            <Card key={attribute.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">{attribute.type}</CardTitle>
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditAttribute(attribute)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteAttribute(attribute.id)} className="text-destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex flex-wrap gap-2">
                        {attribute.values.map(value => (
                            <Badge key={value} variant="secondary" className="group">
                                {value}
                                <button onClick={() => handleRemoveValue(attribute.id, value)} className="ml-1 opacity-50 group-hover:opacity-100">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-center space-x-2">
                        <Input 
                            placeholder="Add new value" 
                            onChange={(e) => setNewAttributeValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddValue(attribute.id)}
                        />
                        <Button type="button" onClick={() => handleAddValue(attribute.id)}>Add</Button>
                    </div>
                </CardFooter>
            </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                 <form onSubmit={handleSaveAttribute}>
                    <DialogHeader>
                        <DialogTitle>{editingAttribute ? 'Edit Attribute' : 'Add Attribute'}</DialogTitle>
                        <DialogDescription>
                           {editingAttribute ? 'Update the details of this attribute type.' : 'Create a new attribute type to assign to products.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Name</Label>
                            <Input id="type" name="type" defaultValue={editingAttribute?.type} className="col-span-3" required placeholder="e.g. Color" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Attribute</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
  );
}
