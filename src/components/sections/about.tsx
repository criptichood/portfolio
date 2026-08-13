"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Rocket, Code, MemoryStick } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const STAT_ICONS: Record<string, typeof Briefcase> = {
  Briefcase,
  Rocket,
  Code,
  MemoryStick,
};

export function About({ dictionary }: { dictionary: any }) {
  const profileImage = PlaceHolderImages.find((img) => img.id === "profile-picture");

  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-16 items-center">
        {/* Left Column: Visual */}
        <div className="w-full lg:w-[40%] relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 hover-scale-desktop bg-surface-container aspect-[3/4]">
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                data-ai-hint={profileImage.imageHint}
              />
            )}
          </div>
          {/* Floating Chip */}
          <div className="absolute -bottom-4 -right-4 md:-right-8 bg-surface-container-high border border-outline-variant rounded-full px-4 py-2 flex items-center gap-2 shadow-lg float-animation z-10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-mono text-label-mono text-on-surface-variant">{dictionary.chip}</span>
          </div>
        </div>

        {/* Right Column: Text & Stats */}
        <div className="w-full lg:w-[60%] flex flex-col gap-8 mt-12 lg:mt-0">
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-xl text-headline-xl text-on-surface">{dictionary.title}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[60ch]">
              {dictionary.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {dictionary.stats.map((stat: any, index: number) => {
              const Icon = STAT_ICONS[stat.icon] ?? Briefcase;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
                  className="bg-surface-dim border border-outline-variant/30 rounded-xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-headline-md text-headline-md text-on-surface">{stat.value}</div>
                    <div className="font-label-mono text-label-mono text-on-surface-variant mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}