
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageSquare } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SOCIAL_LINKS } from "@/lib/data";
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
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">
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
                      <Input placeholder={dictionary.form.name.placeholder} {...field} />
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
                      <Input placeholder={dictionary.form.email.placeholder} {...field} />
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
                      <Textarea placeholder={dictionary.form.message.placeholder} {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : dictionary.form.button}
              </Button>
            </form>
          </Form>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold font-headline mb-4">{dictionary.details.title}</h3>
              <p className="text-muted-foreground">Emmanuel Galadima</p>
              <a href="mailto:hello@criptic.digital" className="text-primary hover:underline">
                hello@criptic.digital
              </a>
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
            <div>
                <Button asChild size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                    <a href={SOCIAL_LINKS.find(l => l.name === 'WhatsApp')?.url} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        {dictionary.whatsapp}
                    </a>
                </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
