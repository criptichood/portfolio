'use server';
/**
 * @fileOverview A server action for handling contact form submissions.
 *
 * - sendContactMessage - Stores a validated contact in the shared contacts table.
 * - ContactFormInput - The input type for the sendContactMessage function.
 */

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schemas';
import { allowContactSubmission } from '@/lib/security/rate-limit';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'invalid' | 'rate_limited' | 'unavailable' };

const PORTFOLIO_SOURCE = 'portfolio';

export async function sendContactMessage(input: ContactFormInput): Promise<ContactResult> {
  const parsed = ContactFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: 'invalid' };

  const allowed = await allowContactSubmission();
  if (!allowed) return { ok: false, reason: 'rate_limited' };

  const supabase = createSupabaseServerClient();
  if (!supabase) return { ok: false, reason: 'unavailable' };

  const { error } = await supabase.from('contacts').insert({
    source: PORTFOLIO_SOURCE,
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  if (error) {
    console.error('Contact insert failed');
    return { ok: false, reason: 'unavailable' };
  }

  return { ok: true };
}
