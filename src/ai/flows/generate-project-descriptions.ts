'use server';

/**
 * @fileOverview An AI agent for generating project descriptions.
 *
 * - generateProjectDescriptions - A function that generates project descriptions.
 * - GenerateProjectDescriptionsInput - The input type for the generateProjectDescriptions function.
 * - GenerateProjectDescriptionsOutput - The return type for the generateProjectDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionsInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectType: z.string().describe('The type of the project (e.g., website, mobile app, etc.).'),
  projectTechnologies: z
    .string()
    .describe('The technologies used in the project (e.g., React, Next.js, Firebase).'),
  projectGoal: z.string().describe('The main goal or purpose of the project.'),
  targetAudience: z.string().describe('The target audience for the project.'),
});
export type GenerateProjectDescriptionsInput = z.infer<typeof GenerateProjectDescriptionsInputSchema>;

const GenerateProjectDescriptionsOutputSchema = z.object({
  description: z.string().describe('A compelling project description.'),
});
export type GenerateProjectDescriptionsOutput = z.infer<typeof GenerateProjectDescriptionsOutputSchema>;

export async function generateProjectDescriptions(input: GenerateProjectDescriptionsInput): Promise<GenerateProjectDescriptionsOutput> {
  return generateProjectDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionsPrompt',
  input: {schema: GenerateProjectDescriptionsInputSchema},
  output: {schema: GenerateProjectDescriptionsOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling project descriptions for portfolios.

  Based on the information provided, generate a concise and engaging description of the project.
  The description should highlight the project's purpose, target audience, and key technologies used.

  Project Name: {{{projectName}}}
  Project Type: {{{projectType}}}
  Technologies Used: {{{projectTechnologies}}}
  Project Goal: {{{projectGoal}}}
  Target Audience: {{{targetAudience}}}

  Write a description:
  `,
});

const generateProjectDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionsFlow',
    inputSchema: GenerateProjectDescriptionsInputSchema,
    outputSchema: GenerateProjectDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
