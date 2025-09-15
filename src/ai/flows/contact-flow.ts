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

// Initialize Firebase Admin SDK only if it hasn't been already and credentials are provided.
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0 && process.env.NODE_ENV === 'production') {
    admin.initializeApp();
  }
}

// Function to save the contact message to Firestore.
async function saveMessageToDatabase(input: ContactFormInput): Promise<void> {
  // Only attempt to save if in a production environment where services are available.
  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping database write in local development environment.');
    console.log('Received data:', input);
    return;
  }
  
  initializeFirebaseAdmin();
  const db = admin.firestore();

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
