
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL, SOCIAL_LINKS, TELEGRAM_URL } from "@/lib/data";
import { sendContactMessage } from "@/ai/flows/contact-flow";
import { useState } from "react";
import { ContactFormSchema, INPUT_LIMITS } from "@/lib/schemas";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/types/dictionary";

export function Contact({ dictionary }: { dictionary: Dictionary["contact"] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");
    try {
      const result = await sendContactMessage(values);
      if (!result.ok) {
        setStatus("error");
        setErrorMessage(result.reason === "rate_limited" ? dictionary.form.rateLimited : dictionary.form.error);
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(dictionary.form.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-headline-xl text-headline-xl text-on-surface">{dictionary.title}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="contact-success"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-card/80 p-8 text-center shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30"
                >
                  <svg
                    viewBox="0 0 52 52"
                    className="h-11 w-11 text-emerald-500"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="22"
                      stroke="currentColor"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
                    />
                    <motion.path
                      d="M16 27l7 7 13-14"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
                    />
                  </svg>
                </motion.div>
                <h3 className="font-headline text-2xl font-semibold text-foreground">
                  {dictionary.toast.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {dictionary.toast.description}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => setStatus("idle")}
                >
                  {dictionary.form.button}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{dictionary.form.name.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={dictionary.form.name.placeholder} {...field} maxLength={INPUT_LIMITS.name} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{dictionary.form.email.label}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={dictionary.form.email.placeholder} {...field} maxLength={INPUT_LIMITS.email} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{dictionary.form.message.label}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={dictionary.form.message.placeholder} {...field} rows={5} maxLength={INPUT_LIMITS.message} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {dictionary.form.sending}
                        </>
                      ) : (
                        dictionary.form.button
                      )}
                    </Button>
                    <div aria-live="polite" className="min-h-6">
                      <AnimatePresence mode="wait">
                        {status === "error" && (
                          <motion.p
                            key="error"
                            role="alert"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm text-destructive"
                          >
                            {errorMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold font-headline mb-4">{dictionary.details.title}</h3>
              <p className="text-muted-foreground">Emmanuel Galadima</p>
              <div className="mt-4">
                <p className="text-sm font-medium text-on-surface">{dictionary.details.telegramLabel}</p>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  t.me/criptichood
                </a>
                <p className="mt-1 text-sm text-muted-foreground">{dictionary.details.telegramHint}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-on-surface">{dictionary.details.emailLabel}</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline mb-4">{dictionary.social.title}</h3>
              <div className="flex items-center gap-6">
                {SOCIAL_LINKS.map(({ name, url, Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-7 w-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
