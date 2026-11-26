import { z } from "zod";

const VISITOR_NAME = /^[\p{L}]+(?:\s+[\p{L}]+)*$/u;

export const INPUT_LIMITS = {
  name: 80,
  email: 120,
  message: 2000,
  historyMessage: 4000,
  historyTurns: 20,
} as const;

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2).max(INPUT_LIMITS.name).regex(VISITOR_NAME, "Enter your name using letters."),
  email: z.string().trim().email("Invalid email address.").max(INPUT_LIMITS.email),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(INPUT_LIMITS.message),
});

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string().max(INPUT_LIMITS.historyMessage),
});

export function sanitizeVisitorName(value: string) {
  return value
    .replace(/[^\p{L}\s]/gu, '')
    .replace(/^\s+/, '')
    .replace(/\s{2,}/g, ' ')
    .slice(0, INPUT_LIMITS.name);
}

export const ChatVisitorSchema = z.object({
  name: z.string().trim().min(2).max(INPUT_LIMITS.name).regex(VISITOR_NAME),
  email: z.string().trim().email().max(INPUT_LIMITS.email),
});

export const ChatbotLocaleSchema = z.enum(["en", "ha", "fr", "zh", "es", "ar"]);

export const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema).max(INPUT_LIMITS.historyTurns),
  message: z.string().trim().min(1).max(INPUT_LIMITS.message),
  lang: ChatbotLocaleSchema,
  visitor: ChatVisitorSchema,
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;
