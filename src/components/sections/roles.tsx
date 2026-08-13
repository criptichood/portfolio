"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Roles({ dictionary }: { dictionary: any }) {
  const items = dictionary.items;

  return (
    <section id="roles" className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-4 lg:pb-8">
      <motion.header
        className="text-center mb-10 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">{dictionary.title}</h2>
      </motion.header>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {items.map((item: any, index: number) => (
          <a
            key={item.company}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-surface-container/40 backdrop-blur-xl border border-outline-variant/40 p-6 flex items-center justify-between gap-4 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-headline-md font-bold text-primary shrink-0">
                {item.initial}
              </span>
              <div>
                <p className="text-[13px] uppercase tracking-wide text-on-surface-variant mb-0.5">{item.role}</p>
                <p className="font-headline-md text-lg font-semibold text-on-surface">{item.company}</p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-on-surface-variant transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </a>
        ))}
      </motion.div>
    </section>
  );
}