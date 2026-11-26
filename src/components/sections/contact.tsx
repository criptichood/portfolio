
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_EMAIL, SOCIAL_LINKS, TELEGRAM_URL } from "@/lib/data";
import { sendContactMessage } from "@/ai/flows/contact-flow";
import { useState } from "react";
import { ContactFormSchema } from "@/lib/schemas";

export function Contact({ dictionary }: { dictionary: any }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      await sendContactMessage(values);
      toast({
        title: dictionary.toast.title,
        description: dictionary.toast.description,
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your request.",
      });
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.form.name.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={dictionary.form.name.placeholder} {...field} disabled />
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
                      <Input placeholder={dictionary.form.email.placeholder} {...field} disabled />
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
                      <Textarea placeholder={dictionary.form.message.placeholder} {...field} rows={5} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full" disabled>
                {dictionary.form.button}
              </Button>
            </form>
          </Form>
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
