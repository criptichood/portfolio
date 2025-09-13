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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
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
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How can I help you?" {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full">Send Message</Button>
            </form>
          </Form>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold font-headline mb-4">Contact Details</h3>
              <p className="text-muted-foreground">Emmanuel Galadima</p>
              <a href="mailto:hello@criptic.digital" className="text-primary hover:underline">
                hello@criptic.digital
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline mb-4">Connect on Social</h3>
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
                        Chat on WhatsApp
                    </a>
                </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
