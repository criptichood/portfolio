'use server';
/**
 * @fileOverview A portfolio chatbot AI flow.
 *
 * - askChatbot - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the askChatbot function.
 * - ChatbotOutput - The return type for the askChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import englishDictionary from '@/lib/dictionaries/en.json';
import { type ChatbotInput, ChatbotInputSchema } from '@/lib/schemas';

export type ChatbotOutput = string;
const ChatbotOutputSchema = z.string();

const portfolioData = JSON.stringify(englishDictionary, null, 2);

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { format: 'text' },
  prompt: `You are a helpful and friendly AI assistant for Emmanuel Galadima (Criptic Digital), a Blockchain Researcher and AI Web Developer.

Your role is to answer questions from potential clients based ONLY on the portfolio information provided below.
Do not answer questions that are not related to Emmanuel's professional services, skills, projects, web development, or AI.

If a user asks an off-topic question, you must politely decline and guide them back to topics related to Emmanuel's work. For example, say: "I can only answer questions about Emmanuel Galadima's services and work. How can I help you with web development or AI solutions?"

Keep your answers concise, professional, and helpful.

Here is the full content of the portfolio website. Use this as your primary source of knowledge:
---
${portfolioData}
---

Conversation History:
{{#each history}}
{{role}}: {{content}}
{{/each}}

New user message:
user: {{{message}}}
model:`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const response = await chatbotPrompt(input);
    return response.text;
  }
);

export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  const result = await chatbotFlow(input);
  return result;
}
