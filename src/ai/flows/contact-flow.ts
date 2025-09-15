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
import fs from 'fs';
import path from 'path';

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// Initialize Firebase Admin SDK only if it hasn't been already.
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return;
  }

  // In a deployed environment (like App Hosting), credentials are automatically discovered.
  if (process.env.NODE_ENV === 'production') {
    admin.initializeApp();
    return;
  }

  // For local development, use the service account key.
  try {
    const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      console.warn("Service account key not found. Skipping Firebase Admin initialization for local development. Form submissions will not be saved to Firestore.");
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK locally:', error);
  }
}

// Function to save the contact message to Firestore.
async function saveMessageToDatabase(input: ContactFormInput): Promise<void> {
  initializeFirebaseAdmin();
  
  // Exit if the SDK could not be initialized (e.g., in local dev without a service account key).
  if (admin.apps.length === 0) {
    console.log('Firebase Admin not initialized. Skipping database write.');
    return;
  }

  const db = admin.firestore();

  try {
    const submissionsCollection = db.collection('contactSubmissions');
    await submissionsCollection.add({
      ...input,
      submittedAt: new Date(),
    });
  } catch (error) {
    console.error('Error saving to Firestore:', error);
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
    await saveMessageToDatabase(input);
  }
);
