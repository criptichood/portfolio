"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero({ dictionary, lang }: { dictionary: any, lang: string }) {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-20 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[120px]"></div>
      </div>

      <FadeIn className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-medium font-headline mb-4">{dictionary.eyebrow}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-6">
            {dictionary.titleLine1} <br />
            <span className="text-primary">{dictionary.titleLine2}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            {dictionary.description}
          </p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">{dictionary.badgesTitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {dictionary.badges.map((badge: string) => (
              <Badge key={badge} variant="outline" className="px-4 py-2 text-sm">
                {badge}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#work">{dictionary.cta1}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">{dictionary.cta2}</Link>
            </Button>
          </div>
        </motion.div>
      </FadeIn>
    </section>
  );
}