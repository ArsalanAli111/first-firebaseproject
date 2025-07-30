
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold font-headline text-center">Refund Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-headline prose-headings:text-foreground">
          <p>
            We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
          </p>
          <p>
            To be eligible for a return, your item must be in the same condition that you received it, unused, and in its original packaging. You’ll also need the receipt or proof of purchase.
          </p>
          
          <h3>Damages and issues</h3>
          <p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>

          <h3>Exchanges</h3>
          <p>
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </p>

          <h3>Refunds</h3>
          <p>
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
