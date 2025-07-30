// Product Recommendations Flow
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized product recommendations.
 *
 * The flow takes a user's viewing history as input and uses current trends to provide relevant product recommendations.
 *
 * @exports {generateProductRecommendations} - The main function to trigger the product recommendation flow.
 * @exports {ProductRecommendationInput} - The input type for the generateProductRecommendations function.
 * @exports {ProductRecommendationOutput} - The output type for the generateProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for product recommendations
const ProductRecommendationInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of product IDs representing the user\'s viewing history.'),
  currentTrends: z.string().describe('A string describing current product trends.'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

// Output schema for product recommendations
const ProductRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of product IDs representing the personalized product recommendations.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

// Tool to get current product trends
const getCurrentTrends = ai.defineTool({
  name: 'getCurrentTrends',
  description: 'Retrieves the current trends in products to provide context for recommendations.',
  inputSchema: z.object({}),
  outputSchema: z.string(),
}, async () => {
  // In a real application, this would fetch trends from a database or external API.
  // For this example, we'll return a placeholder.
  return 'Current trends include perfumes for men, gift boxes, and best sellers.';
});

// Define the prompt for generating product recommendations
const productRecommendationPrompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  tools: [getCurrentTrends],
  prompt: `You are an AI assistant specializing in providing personalized product recommendations for online store users.

  Based on the user's viewing history and current trends, provide a list of product IDs that the user might be interested in.
  Use the getCurrentTrends tool to understand current product trends.

  Viewing History: {{viewingHistory}}
  Current Trends: {{tool_results.getCurrentTrends}}

  Recommendations (product IDs only, comma-separated):`,
});

// Define the Genkit flow for generating product recommendations
const productRecommendationFlow = ai.defineFlow(
  {
    name: 'productRecommendationFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    // If currentTrends is not provided in the input, use the tool to get it.
    const {output} = await productRecommendationPrompt(input);
    return output!;
  }
);

/**
 * Generates personalized product recommendations based on viewing history and current trends.
 * @param input - The input containing viewing history and current trends.
 * @returns A promise that resolves to the product recommendations.
 */
export async function generateProductRecommendations(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}
