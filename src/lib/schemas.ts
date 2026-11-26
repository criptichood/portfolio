import { z } from "zod";

const VISITOR_NAME = /^[\p{L}]+(?:\s+[\p{L}]+)*$/u;

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2).max(80).regex(VISITOR_NAME, "Enter your name using letters."),
  email: z.string().trim().email("Invalid email address.").max(120),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000),
});

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string().max(4000),
});

export function sanitizeVisitorName(value: string) {
  return value
    .replace(/[^\p{L}\s]/gu, '')
    .replace(/^\s+/, '')
    .replace(/\s{2,}/g, ' ')
    .slice(0, 80);
}

export const ChatVisitorSchema = z.object({
  name: z.string().trim().min(2).max(80).regex(VISITOR_NAME),
  email: z.string().trim().email().max(120),
});

export const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema).max(20),
  message: z.string().trim().min(1).max(2000),
  lang: z.string(),
  visitor: ChatVisitorSchema,
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;
