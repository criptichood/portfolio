'use server';

/**
 * @fileOverview AI-powered website copy generator.
 *
 * - generateWebsiteCopy - A function that generates website copy.
 * - GenerateWebsiteCopyInput - The input type for the generateWebsiteCopy function.
 * - GenerateWebsiteCopyOutput - The return type for the generateWebsiteCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteCopyInputSchema = z.object({
  tone: z
    .string()
    .describe(
      'The tone of the website copy. Examples: professional, friendly, energetic, formal, casual.'
    ),
  audience: z.string().describe('The target audience for the website copy.'),
  keywords: z
    .string()
    .describe(
      'Relevant keywords to include in the website copy to improve SEO.'
    ),
  pageDescription: z
    .string()
    .describe(
      'A brief description of the page for which copy is being generated.'
    ),
  companyName: z.string().describe('The name of the company.'),
});
export type GenerateWebsiteCopyInput = z.infer<
  typeof GenerateWebsiteCopyInputSchema
>;

const GenerateWebsiteCopyOutputSchema = z.object({
  headline: z.string().describe('The main headline for the webpage.'),
  subheadline: z.string().describe('A supporting subheadline for the webpage.'),
  body: z.string().describe('The main body text for the webpage.'),
});
export type GenerateWebsiteCopyOutput = z.infer<
  typeof GenerateWebsiteCopyOutputSchema
>;

export async function generateWebsiteCopy(
  input: GenerateWebsiteCopyInput
): Promise<GenerateWebsiteCopyOutput> {
  return generateWebsiteCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteCopyPrompt',
  input: {schema: GenerateWebsiteCopyInputSchema},
  output: {schema: GenerateWebsiteCopyOutputSchema},
  prompt: `You are an expert copywriter specializing in website content.

  Generate compelling website copy for the following page:

  Company Name: {{{companyName}}}
  Page Description: {{{pageDescription}}}
  Target Audience: {{{audience}}}
  Keywords: {{{keywords}}}
  Tone: {{{tone}}}

  Headline: [Generate a concise and impactful headline]
  Subheadline: [Generate a short and engaging subheadline]
  Body: [Generate well-structured and informative body text]`,
});

const generateWebsiteCopyFlow = ai.defineFlow(
  {
    name: 'generateWebsiteCopyFlow',
    inputSchema: GenerateWebsiteCopyInputSchema,
    outputSchema: GenerateWebsiteCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
