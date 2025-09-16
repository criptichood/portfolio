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

export const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
  lang: z.string(),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;
