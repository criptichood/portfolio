"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./chat-interface";

export function ChatbotWidget({ dictionary }: { dictionary: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 end-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && <ChatInterface dictionary={dictionary} />}
      </AnimatePresence>
      <Button
        className="h-12 rounded-full px-4 shadow-lg gap-2 bg-accent hover:bg-accent/90"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={dictionary.launcher}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        {!isOpen && <span className="text-sm font-medium">{dictionary.launcher}</span>}
      </Button>
    </div>
  );
}
