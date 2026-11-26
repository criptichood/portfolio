"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Terminal, LayoutGrid, Shield, Layers } from "lucide-react";
import type { Dictionary } from "@/types/dictionary";

const CARD_ICONS: Record<string, typeof Terminal> = {
  Terminal,
  LayoutGrid,
  Shield,
  Layers,
};

export function Capabilities({ dictionary }: { dictionary: Dictionary["capabilities"] }) {
  const items = dictionary.items;

  return (
    <section id="capabilities" className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {items.map((item, index: number) => {
          const Icon = CARD_ICONS[item.icon] ?? Terminal;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
            >
              <TiltCard index={index}>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center mb-8 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110">
                  <Icon className="text-primary h-7 w-7" />
                </div>
                <h3 className="font-headline-md text-2xl font-semibold text-on-surface mb-6">{item.title}</h3>
                <ul className="space-y-4 font-body-md text-[15px] text-on-surface-variant flex-grow">
                  {item.points.map((point: string) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-[8px]">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function TiltCard({ index: _index, children }: { index: number; children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 14;
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(183,196,255,0.18), transparent 60%)`;
    }
  };

  const onMouseLeave = () => {
    const el = innerRef.current;
    if (el) el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div className="card-3d h-full group">
      <div
        ref={innerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative w-full h-full rounded-[1.5rem] bg-surface-container/40 backdrop-blur-xl border border-outline-variant/40 p-8 flex flex-col overflow-hidden"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.2s ease-out" }}
      >
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" style={{ transform: "translateZ(30px)" }} />
        <div className="relative flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}