'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 * 
 * - sendContactMessage - A function that handles the contact form submission process.
 * - ContactFormInput - The input type for the sendContactMessage function.
 */

import { z } from 'zod';
import { ai } from '@/ai/genkit';

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// This is a placeholder function for saving data to a database like Firestore.
// In a real application, you would replace this with your actual database logic.
async function saveMessageToDatabase(input: ContactFormInput): Promise<void> {
  console.log('--- Database Simulation ---');
  console.log('Saving message to the database:');
  console.log('Name:', input.name);
  console.log('Email:', input.email);
  console.log('Message:', input.message);
  console.log('---------------------------');
  // Example Firestore logic (requires setup):
  //
  // import { getFirestore } from 'firebase-admin/firestore';
  // const db = getFirestore();
  // await db.collection('contactSubmissions').add({
  //   ...input,
  //   submittedAt: new Date(),
  // });
  
  // For now, we'll just simulate a successful save.
  return Promise.resolve();
}


export async function sendContactMessage(input: ContactFormInput): Promise<void> {
  await contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // Here we call the function to save the message.
    // Replace the placeholder with your actual database service.
    await saveMessageToDatabase(input);
  }
);
