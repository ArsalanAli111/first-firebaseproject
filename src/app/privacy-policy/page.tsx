
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold font-headline text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-headline prose-headings:text-foreground">
            <p>Your privacy is important to us. It is Oud Mystique's policy to respect your privacy regarding any information we may collect from you across our website.</p>

            <h3>1. Information we collect</h3>
            <p>Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</p>
            <p>Personal information: We may ask for personal information, such as your name, email, shipping address, and payment information. We collect this information by fair and lawful means, with your knowledge and consent.</p>

            <h3>2. Use of information</h3>
            <p>We may use the information we collect to process transactions, fulfill orders, and provide you with a personalized shopping experience. We may also use it to communicate with you about our products, services, and promotions.</p>

            <h3>3. Security</h3>
            <p>We take security seriously and take reasonable precautions to protect your personal information from loss, theft, and misuse, as well as unauthorized access, disclosure, alteration, and destruction.</p>

            <h3>4. Third-party services</h3>
            <p>We may employ third-party companies and individuals on our websites - for example, analytics providers and content partners. These third parties have access to your personal information only to perform specific tasks on our behalf, and are obligated not to disclose or use it for any other purpose.</p>
        </CardContent>
      </Card>
    </div>
  );
}
