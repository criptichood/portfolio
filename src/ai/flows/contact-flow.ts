'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 * 
 * - sendContactMessage - A function that handles the contact form submission process.
 * - ContactFormInput - The input type for the sendContactMessage function.
 */

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import * as admin from 'firebase-admin';
import { ContactFormSchema } from '@/lib/schemas';

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// Initialize Firebase Admin SDK if it hasn't been already.
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

// Function to save the contact message to Firestore.
async function saveMessageToDatabase(input: ContactFormInput): Promise<void> {
  try {
    const submissionsCollection = db.collection('contactSubmissions');
    await submissionsCollection.add({
      ...input,
      submittedAt: new Date(),
    });
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    // Re-throw the error to be caught by the calling function
    throw new Error('Could not save message to the database.');
  }
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
    // Call the function to save the message to Firestore.
    await saveMessageToDatabase(input);
  }
);
