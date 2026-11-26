import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const VISITOR_NAME = /^[\p{L}]+(?:\s+[\p{L}]+)*$/u;

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
  history: z.array(MessageSchema),
  message: z.string().trim().min(1).max(2000),
  lang: z.string(),
  visitor: ChatVisitorSchema,
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;
