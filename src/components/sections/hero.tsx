
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero({ dictionary, lang }: { dictionary: any, lang: string }) {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const headlines = dictionary.headlines;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 5000); // Change headline every 5 seconds
    return () => clearInterval(interval);
  }, [headlines.length]);

  const currentHeadline = headlines[currentHeadlineIndex];

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 106, 255, 0.15), transparent 80%)`
        }}
      ></div>
      <div className="absolute inset-0 -z-20 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <FadeIn className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-6 h-32 md:h-48">
          <motion.div
            key={currentHeadlineIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentHeadline.line1} <br />
            <span className="text-primary">{currentHeadline.line2}</span>
          </motion.div>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          {dictionary.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={`/${lang}#contact`}>{dictionary.cta1}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/${lang}#projects`}>{dictionary.cta2}</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
