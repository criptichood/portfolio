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

// Initialize Firebase Admin SDK only if it hasn't been already.
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return;
  }

  try {
    // For local development, try to load the service account key.
    // The service-account.json file is not checked in, so this will fail in deployed environments.
    // That is okay, because the automatic credentials will be used instead.
    const serviceAccount = require('../../../service-account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    // If the service account file is not found, we assume we are in a deployed environment
    // where credentials will be automatically discovered.
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('Service account key not found, attempting to initialize with default credentials for deployed environment.');
      admin.initializeApp();
    } else {
      console.error('Error initializing Firebase Admin SDK:', error);
    }
  }
}

// Function to save the contact message to Firestore.
async function saveMessageToDatabase(input: ContactFormInput): Promise<void> {
  initializeFirebaseAdmin();
  
  // Exit if the SDK could not be initialized.
  if (admin.apps.length === 0) {
    console.error('Firebase Admin not initialized. Skipping database write.');
    throw new Error('Firebase Admin SDK could not be initialized.');
  }

  const db = admin.firestore();

  try {
    const submissionsCollection = db.collection('contactSubmissions');
    await submissionsCollection.add({
      ...input,
      submittedAt: new Date(),
    });
    console.log('Message saved to Firestore successfully.');
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
