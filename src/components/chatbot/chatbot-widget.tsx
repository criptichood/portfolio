"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatInterface } from "@/components/chatbot/chat-interface";
import type { Dictionary } from "@/types/dictionary";

const MOBILE_QUERY = "(max-width: 767px)";

export function ChatbotWidget({ dictionary }: { dictionary: Dictionary["chatbot"] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const mobile = window.matchMedia(MOBILE_QUERY).matches;
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const scrollY = window.scrollY;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const meta = document.querySelector('meta[name="viewport"]');
    const previousMeta = meta?.getAttribute("content") ?? "";
    if (mobile) {
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      meta?.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      );
    }

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      if (mobile) {
        window.scrollTo(0, scrollY);
        if (previousMeta) meta?.setAttribute("content", previousMeta);
      }
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 end-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <ChatInterface dictionary={dictionary} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
      <Button
        className={cn(
          "h-12 w-12 rounded-full bg-accent px-0 shadow-lg hover:bg-accent/90 md:w-auto md:gap-2 md:px-4",
          isOpen && "max-md:hidden"
        )}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={dictionary.launcher}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        {!isOpen && <span className="hidden text-sm font-medium md:inline">{dictionary.launcher}</span>}
      </Button>
    </div>
  );
}
