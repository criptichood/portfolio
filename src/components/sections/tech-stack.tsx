"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

const GROUP_ICONS: Record<string, typeof Layers> = {
  Layers,
};

export function TechStack({ dictionary }: { dictionary: any }) {
  const groups = dictionary.groups;

  return (
    <section id="tech-stack" className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32">
      <motion.header
        className="text-center mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">{dictionary.title}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          {dictionary.description}
        </p>
      </motion.header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
        {groups.map((group: any, index: number) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
          >
            <div className="card-lattice group rounded-xl h-full p-6 flex flex-col relative overflow-hidden">
              <div className="lattice-grid">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="shard rounded-sm" />
                ))}
              </div>
              <div className="lattice-content h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Layers className="text-outline group-hover:text-primary transition-colors" />
                </div>
                <div className="mt-auto pt-8 space-y-4">
                  <h3 className="font-headline-md text-2xl font-semibold text-on-surface">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item: string) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-surface-container/70 border border-outline-variant/40 rounded-full text-xs font-label-mono text-on-surface-variant"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}