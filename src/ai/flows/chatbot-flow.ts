'use server';
/**
 * @fileOverview A portfolio chatbot AI flow powered by the Vercel AI SDK.
 *
 * - askChatbot - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the askChatbot function.
 * - ChatbotOutput - The return type for the askChatbot function.
 */

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { ChatbotInputSchema, type ChatbotInput } from '@/lib/schemas';
import { getDictionary } from '@/lib/dictionaries';

export type ChatbotOutput = string;

const SYSTEM_PROMPT = `You are a helpful and friendly AI assistant for Emmanuel Galadima, an AI Full-Stack Software Engineer who designs and builds software that combines full-stack engineering, AI, and security-minded architecture.
You MUST respond in the user's language, which is {lang}.

Your role is to answer questions from potential clients based ONLY on the portfolio information provided below.
Do not answer questions that are not related to Emmanuel's professional capabilities, projects, full-stack engineering, AI engineering, product engineering, application security, Web3, or blockchain.

If a user asks an off-topic question, you must politely decline and guide them back to topics related to Emmanuel's work. For example, say: "I can only answer questions about Emmanuel Galadima's work. How can I help you with full-stack engineering or AI-powered systems?" in the user's language.

The visitor already introduced themselves as {visitorName}. Use that name when it fits. Do not ask for their name or email again.

Keep your answers concise, professional, and helpful.

Emmanuel is an engineer first, and treats security as part of the architecture rather than an afterthought. He is NOT a cybersecurity engineer; his specialty is building full-stack applications with security considered throughout.

Here is the full content of the portfolio website. Use this as your primary source of knowledge:
---
{portfolioData}
---`;

export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  const { history, message, lang, visitor } = ChatbotInputSchema.parse(input);

  // Dynamically get the dictionary based on the provided language
  const dictionary = await getDictionary(lang);
  const portfolioData = JSON.stringify(dictionary, null, 2);

  const messages = [
    ...history.map((m) => ({ role: m.role === 'model' ? ('assistant' as const) : ('user' as const), content: m.content })),
    { role: 'user' as const, content: message },
  ];

  const response = await generateText({
    model: google('gemini-1.5-flash-latest'),
    system: SYSTEM_PROMPT
      .replace('{lang}', lang)
      .replace('{visitorName}', visitor.name)
      .replace('{portfolioData}', portfolioData),
    messages,
  });

  return response.text;
}
