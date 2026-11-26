
"use client";

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { askChatbot } from '@/ai/flows/chatbot-flow';
import { ChatVisitorSchema, sanitizeVisitorName } from '@/lib/schemas';
import { usePathname } from 'next/navigation';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const SESSION_STORAGE_KEY = 'chat_history';
const VISITOR_STORAGE_KEY = 'chat_visitor';
const COMPOSER_MAX_LINES = 6;

type Visitor = { name: string; email: string };

export function ChatInterface({ dictionary }: { dictionary: any }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [visitorReady, setVisitorReady] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();

  // Extract lang from pathname, default to 'en'
  const lang = pathname.split('/')[1] || 'en';

  useEffect(() => {
    try {
      const storedVisitor = sessionStorage.getItem(VISITOR_STORAGE_KEY);
      if (storedVisitor) {
        const parsed = ChatVisitorSchema.safeParse(JSON.parse(storedVisitor));
        if (parsed.success) setVisitor(parsed.data);
      }
    } catch {
      sessionStorage.removeItem(VISITOR_STORAGE_KEY);
    }
    setVisitorReady(true);
  }, []);

  useEffect(() => {
    if (!visitor) return;
    try {
      const storedMessages = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedMessages) {
        const stored = JSON.parse(storedMessages) as Message[];
        const conversation = stored[0]?.role === 'model' ? stored.slice(1) : stored;
        setMessages(conversation);
      }
    } catch {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [visitor]);

  // Save messages to session storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const scrollableView = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollableView) {
            scrollableView.scrollTo({ top: scrollableView.scrollHeight, behavior: 'smooth' });
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!visitor || window.innerWidth < 768) return;
    inputRef.current?.focus();
  }, [visitor]);

  const handleStart = (e: FormEvent) => {
    e.preventDefault();
    const parsed = ChatVisitorSchema.safeParse({ name, email });
    if (!parsed.success) {
      const field = parsed.error.issues[0]?.path[0];
      setFormError(field === 'name' ? dictionary.nameError : dictionary.emailError);
      return;
    }
    sessionStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(parsed.data));
    setVisitor(parsed.data);
    setFormError('');
  };

  const fitComposer = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "0px";
    const style = window.getComputedStyle(el);
    const lineHeight = Number.parseFloat(style.lineHeight) || 24;
    const padding = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
    const border = Number.parseFloat(style.borderTopWidth) + Number.parseFloat(style.borderBottomWidth);
    const maxHeight = lineHeight * COMPOSER_MAX_LINES + padding + border;
    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  useEffect(() => {
    fitComposer();
  }, [input, visitor]);

  const sendText = async (text: string) => {
    const message = text.trim();
    if (!visitor || !message || isLoading) return;

    const userMessage: Message = { role: 'user', content: message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    const started = Date.now();

    try {
      const history = newMessages.slice(0, -1);
      const response = await askChatbot({ history, message, lang, visitor });
      setMessages((prev) => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error("Error asking chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      const remaining = 700 - (Date.now() - started);
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendText(input);
  };

  const handleComposerKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendText(input);
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border bg-card shadow-xl",
        visitor ? "h-[min(32rem,calc(100dvh-7rem))]" : "max-h-[min(32rem,calc(100dvh-7rem))]"
      )}
    >
      <header className="p-4 border-b flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              <Bot />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold font-headline">{dictionary.title}</h3>
            <p className="text-sm text-muted-foreground">{dictionary.subtitle}</p>
          </div>
        </div>
      </header>
      {!visitorReady ? (
        <div className="flex-1" />
      ) : !visitor ? (
        <form noValidate onSubmit={handleStart} className="flex-1 p-4 flex flex-col justify-center gap-4">
          <div>
            <h4 className="font-headline text-base font-semibold">{dictionary.gateTitle}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{dictionary.gateBody}</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="chat-visitor-name" className="text-sm font-medium">{dictionary.nameLabel}</label>
            <Input
              id="chat-visitor-name"
              value={name}
              onChange={(e) => setName(sanitizeVisitorName(e.target.value))}
              placeholder={dictionary.namePlaceholder}
              autoComplete="name"
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="chat-visitor-email" className="text-sm font-medium">{dictionary.emailLabel}</label>
            <Input
              id="chat-visitor-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dictionary.emailPlaceholder}
              autoComplete="email"
              className="text-base"
            />
          </div>
          {formError && <p className="text-sm text-destructive">{formError}</p>}
          <Button type="submit" className="w-full">{dictionary.start}</Button>
        </form>
      ) : (
      <>
      <ScrollArea className="min-h-0 flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'model' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[16rem] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                  message.role === 'user'
                    ? 'rounded-br-sm bg-primary text-primary-foreground'
                    : 'rounded-bl-sm bg-surface-container-highest text-on-surface'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {showWelcome && (
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/15 text-primary">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[16rem] rounded-2xl rounded-bl-sm bg-surface-container-highest px-3 py-2 text-sm leading-relaxed text-on-surface">
                <p>{dictionary.greeting}</p>
              </div>
            </div>
          )}
          {showWelcome && Array.isArray(dictionary.suggestions) && (
            <div className="flex flex-col gap-2">
              {dictionary.suggestions.map((suggestion: string) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendText(suggestion)}
                  disabled={isLoading}
                  className="rounded-md border border-outline-variant px-3 py-2 text-start text-sm text-on-surface hover:bg-surface-container-highest disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="flex items-start gap-3" aria-live="polite">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/15 text-primary">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div
                className="flex h-10 items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface-container-highest px-4"
                aria-label={dictionary.thinking}
              >
                <span className="h-2 w-2 animate-bounce rounded-full bg-on-surface [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-on-surface [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-on-surface" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <footer className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleComposerKeyDown}
            placeholder={dictionary.placeholder}
            disabled={isLoading}
            className="min-h-10 w-full flex-1 resize-none overflow-y-hidden rounded-md border border-input bg-background px-3 py-2 text-base leading-6 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 shrink-0"
            disabled={isLoading || !input.trim()}
            aria-label={dictionary.send}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </footer>
      </>
      )}
    </motion.div>
  );
}
