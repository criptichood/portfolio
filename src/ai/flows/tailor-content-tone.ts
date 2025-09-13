// tailor-content-tone.ts
'use server';
/**
 * @fileOverview A content tailoring AI agent. It allows adjusting the generated website copy to resonate with specific target groups or reflect a particular brand voice.
 *
 * - tailorContentTone - A function that handles the content tailoring process.
 * - TailorContentToneInput - The input type for the tailorContentTone function.
 * - TailorContentToneOutput - The return type for the tailorContentTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorContentToneInputSchema = z.object({
  content: z.string().describe('The content to be tailored.'),
  tone: z.string().describe('The desired tone for the content (e.g., professional, friendly, humorous).'),
  audience: z.string().describe('The target audience for the content (e.g., local businesses, tech enthusiasts).'),
});
export type TailorContentToneInput = z.infer<typeof TailorContentToneInputSchema>;

const TailorContentToneOutputSchema = z.object({
  tailoredContent: z.string().describe('The tailored content that matches the specified tone and audience.'),
});
export type TailorContentToneOutput = z.infer<typeof TailorContentToneOutputSchema>;

export async function tailorContentTone(input: TailorContentToneInput): Promise<TailorContentToneOutput> {
  return tailorContentToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorContentTonePrompt',
  input: {schema: TailorContentToneInputSchema},
  output: {schema: TailorContentToneOutputSchema},
  prompt: `You are an expert content tailor specializing in adjusting content to different tones and audiences.

You will use this information to tailor the content to match the specified tone and resonate with the target audience.

Content: {{{content}}}
Tone: {{{tone}}}
Audience: {{{audience}}}

Tailored Content:`,
});

const tailorContentToneFlow = ai.defineFlow(
  {
    name: 'tailorContentToneFlow',
    inputSchema: TailorContentToneInputSchema,
    outputSchema: TailorContentToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
