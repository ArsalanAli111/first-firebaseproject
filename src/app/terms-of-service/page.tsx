
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold font-headline text-center">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-headline prose-headings:text-foreground">
          <h3>1. Terms</h3>
          <p>By accessing the website at Scent Sample, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          
          <h3>2. Use License</h3>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Scent Sample's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          
          <h3>3. Disclaimer</h3>
          <p>The materials on Scent Sample's website are provided on an 'as is' basis. Scent Sample makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h3>4. Limitations</h3>
          <p>In no event shall Scent Sample or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Scent Sample's website.</p>
          
          <h3>5. Governing Law</h3>
          <p>These terms and conditions are governed by and construed in accordance with the laws of our state and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </CardContent>
      </Card>
    </div>
  );
}
