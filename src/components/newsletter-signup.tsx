
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function NewsletterSignup() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    
    // In a real application, you would make an API call to your backend here
    // to handle the newsletter subscription logic, e.g., storing the email in Firestore.
    // For this demo, we'll simulate an API call.
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Subscribed with email:', email);

    setLoading(false);
    setEmail('');
    toast({
      title: 'Subscribed!',
      description: "Thanks for joining! You'll receive updates from us soon.",
    });
  };

  return (
    <section className="w-full py-16 bg-secondary/50 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-headline">Stay Updated with Our Latest Offers</h2>
          <p className="mt-2 text-muted-foreground">
            Subscribe to get exclusive deals, new arrivals, and special discounts delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-grow bg-background"
              required
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
