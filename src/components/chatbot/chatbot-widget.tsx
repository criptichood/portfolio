
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatInterface } from './chat-interface';

export function ChatbotWidget({ dictionary }: { dictionary: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isOpen && <ChatInterface dictionary={dictionary} closeChat={() => setIsOpen(false)} />}
        </AnimatePresence>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg bg-accent hover:bg-accent/90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle chatbot"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={isOpen ? 'x' : 'bot'}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
