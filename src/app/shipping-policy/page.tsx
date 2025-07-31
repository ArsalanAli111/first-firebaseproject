import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold font-headline text-center">Shipping Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-headline prose-headings:text-foreground">
          <p>
            At Oud Mystique, we are committed to delivering your new fragrances promptly and securely. Please review our shipping policy below for details on how we handle and dispatch your orders.
          </p>
          
          <h3>Order Processing</h3>
          <ul>
            <li>All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email.</li>
            <li>You will receive another notification when your order has shipped.</li>
          </ul>

          <h3>Domestic Shipping Rates and Estimates</h3>
          <ul>
            <li><strong>Standard Shipping:</strong> 5-7 business days. $5.00 flat rate.</li>
            <li><strong>Expedited Shipping:</strong> 2-3 business days. $15.00 flat rate.</li>
            <li>We offer free standard shipping for orders over $50.</li>
          </ul>

          <h3>International Shipping</h3>
          <p>
            We offer international shipping to most countries. Shipping charges for your order will be calculated and displayed at checkout. Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. Oud Mystique is not responsible for these charges if they are applied.
          </p>

          <h3>How do I check the status of my order?</h3>
          <p>
            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
          </p>

          <p>
            If you have any further questions, please don't hesitate to contact us at support@oudmystique.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
