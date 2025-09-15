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
import path from 'path';
import fs from 'fs';

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// Function to safely initialize Firebase Admin SDK.
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return;
  }

  // In a deployed environment, GOOGLE_APPLICATION_CREDENTIALS will be set.
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp();
    return;
  }

  // For local development, look for the service account file in the project root.
  try {
    const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized locally.');
    } else {
      console.warn('service-account.json not found. Firebase Admin SDK not initialized for local development.');
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK locally:', error);
  }
}

// Function to save the contact message to Firestore.
async function saveMessageToDatabase(input: ContactFormInput): Promise<void> {
  initializeFirebaseAdmin();
  
  if (admin.apps.length === 0) {
    console.error('Firebase Admin not initialized. Skipping database write.');
    throw new Error('Firebase Admin SDK could not be initialized. Ensure service-account.json is in the project root for local development.');
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
