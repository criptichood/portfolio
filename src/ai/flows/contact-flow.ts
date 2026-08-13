'use server';
/**
 * @fileOverview A server action for handling contact form submissions.
 *
 * - sendContactMessage - A function that handles the contact form submission process.
 * - ContactFormInput - The input type for the sendContactMessage function.
 */

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schemas';

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export async function sendContactMessage(input: ContactFormInput): Promise<void> {
  // Validate the input against the schema
  ContactFormSchema.parse(input);

  // Validated contact submission received. Delivery can be wired to email or
  // a message service here.
}
