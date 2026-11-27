"use client";

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, MessageSquare, RotateCcw, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { askChatbot } from '@/ai/flows/chatbot-flow';
import { ChatbotLocaleSchema, ChatVisitorSchema, INPUT_LIMITS, sanitizeVisitorName } from '@/lib/schemas';
import { TELEGRAM_URL } from '@/lib/data';
import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/types/dictionary';

type Message = {
  role: 'user' | 'model';
  content: string;
  showContactCta?: boolean;
};

type PanelView = 'home' | 'messages';

const SESSION_STORAGE_KEY = 'chat_history';
const VISITOR_STORAGE_KEY = 'chat_visitor';
const VIEW_STORAGE_KEY = 'chat_view';
const CHAT_TTL_MS = 2 * 60 * 60 * 1000;
const COMPOSER_MAX_LINES = 6;

type Visitor = { name: string; email: string };

export function ChatInterface({
  dictionary,
  onClose,
}: {
  dictionary: Dictionary['chatbot'];
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [visitorReady, setVisitorReady] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [view, setView] = useState<PanelView>('home');
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();

  const parsedLang = ChatbotLocaleSchema.safeParse(pathname.split('/')[1]);
  const lang = parsedLang.success ? parsedLang.data : 'en';
  const hasUnread = view === 'home' && messages.at(-1)?.role === 'model';

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
      const storedRaw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      const storedView = sessionStorage.getItem(VIEW_STORAGE_KEY);
      if (storedRaw) {
        const parsed = JSON.parse(storedRaw) as Message[] | { updatedAt?: number; messages?: Message[] };
        const isExpired =
          !Array.isArray(parsed) &&
          typeof parsed.updatedAt === 'number' &&
          Date.now() - parsed.updatedAt > CHAT_TTL_MS;

        if (isExpired) {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
          setMessages([]);
        } else {
          const stored = Array.isArray(parsed) ? parsed : (parsed.messages ?? []);
          const conversation = stored[0]?.role === 'model' ? stored.slice(1) : stored;
          setMessages(conversation);
          if (storedView === 'home' || storedView === 'messages') {
            setView(storedView);
          } else if (conversation.length > 0) {
            setView('messages');
          }
        }
      } else if (storedView === 'home' || storedView === 'messages') {
        setView(storedView);
      }
    } catch {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [visitor]);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({ updatedAt: Date.now(), messages })
      );
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  };

  const changeView = (nextView: PanelView) => {
    setView(nextView);
    try {
      sessionStorage.setItem(VIEW_STORAGE_KEY, nextView);
    } catch {
      // ignore storage errors
    }
  };

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
  }, [messages, isLoading, view]);

  useEffect(() => {
    if (view !== 'messages' || !visitor || window.innerWidth < 768) return;
    inputRef.current?.focus();
  }, [view, visitor]);

  const sendText = async (text: string, activeVisitor: Visitor | null = visitor) => {
    const message = text.trim();
    if (!activeVisitor || !message || isLoading) return;

    const userMessage: Message = { role: 'user', content: message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    changeView('messages');
    setIsLoading(true);
    const started = Date.now();

    try {
      const history = newMessages.slice(-21, -1).map(({ role, content }) => ({ role, content }));
      const response = await askChatbot({ history, message, lang, visitor: activeVisitor });
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: response.text,
          showContactCta: !response.ok,
        },
      ]);
    } catch (error) {
      console.error("Error asking chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: "Sorry, I'm having trouble connecting right now. You can reach Emmanuel directly using the options below.",
          showContactCta: true,
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

  const openMessages = (question?: string) => {
    changeView('messages');
    if (!question) return;
    if (visitor) {
      void sendText(question);
      return;
    }
    setPendingQuestion(question);
  };

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
    if (pendingQuestion) {
      const question = pendingQuestion;
      setPendingQuestion(null);
      void sendText(question, parsed.data);
    }
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
  }, [input, visitor, view]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-hidden overscroll-none bg-surface-container-low md:static md:z-auto md:h-[min(36rem,calc(100dvh-7rem))] md:w-[min(24rem,calc(100vw-2rem))] md:rounded-2xl md:border md:shadow-2xl"
    >
      <div className="flex items-center justify-end gap-1 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:pt-3">
        {messages.length > 0 && view === 'messages' && (
          <button
            type="button"
            onClick={clearChat}
            aria-label="Clear chat"
            title="Clear chat"
            className="rounded-full p-2 text-muted-foreground hover:bg-card hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={dictionary.close}
          className="rounded-full p-2 text-muted-foreground hover:bg-card hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1">
        {view === 'home' ? (
          <div className="h-full overflow-y-auto overscroll-contain px-5 pb-4">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{dictionary.homeGreeting}</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{dictionary.homeTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{dictionary.homeBody}</p>

            <button
              type="button"
              onClick={() => openMessages()}
              className="mt-5 flex w-full items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 text-start shadow-sm hover:bg-surface-container-highest dark:bg-surface-container-highest"
            >
              <span>
                <span className="block text-sm font-medium text-foreground">{dictionary.sendCardTitle}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{dictionary.sendCardBody}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground rtl:rotate-180" />
            </button>

            <p className="mb-2 mt-6 text-sm font-medium text-foreground">{dictionary.questionsLabel}</p>
            <div className="flex flex-col gap-2">
              {Array.isArray(dictionary.suggestions) && dictionary.suggestions.map((suggestion: string) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => openMessages(suggestion)}
                  className="rounded-xl border bg-card px-4 py-3 text-start text-sm text-foreground shadow-sm hover:bg-surface-container-highest dark:bg-surface-container-highest"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : !visitorReady ? (
          <div className="h-full" />
        ) : !visitor ? (
          <form noValidate onSubmit={handleStart} className="flex h-full flex-col justify-center gap-4 px-5 pb-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">{dictionary.gateTitle}</h3>
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
                maxLength={INPUT_LIMITS.name}
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
                maxLength={INPUT_LIMITS.email}
                className="text-base"
              />
            </div>
            {formError && <p className="text-sm text-destructive">{formError}</p>}
            <Button type="submit" className="w-full">{dictionary.start}</Button>
          </form>
        ) : (
          <div className="flex h-full flex-col">
            <ScrollArea className="min-h-0 flex-1 overflow-hidden" ref={scrollAreaRef}>
              <div className="space-y-3 px-4 py-2">
                {messages.length === 0 && (
                  <p className="px-1 text-sm text-muted-foreground">{dictionary.sendCardBody}</p>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[16rem] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                        message.role === 'user'
                          ? 'rounded-br-sm bg-primary text-primary-foreground'
                          : 'rounded-bl-sm bg-card text-card-foreground dark:bg-surface-container-highest dark:text-foreground'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.showContactCta && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="h-8 text-xs"
                            onClick={() => {
                              onClose();
                              const contactEl = document.getElementById('contact');
                              if (contactEl) {
                                contactEl.scrollIntoView({ behavior: 'smooth' });
                              } else {
                                window.location.assign(`/${lang}#contact`);
                              }
                            }}
                          >
                            Contact form
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                              Telegram
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start" aria-live="polite">
                    <div
                      className="flex h-10 items-center gap-1.5 rounded-2xl rounded-bl-sm bg-card px-4 dark:bg-surface-container-highest"
                      aria-label={dictionary.thinking}
                    >
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-border/40 bg-surface-container-low px-3 pb-3 pt-2.5">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder={dictionary.placeholder}
                maxLength={INPUT_LIMITS.message}
                disabled={isLoading}
                className="min-h-10 w-full flex-1 resize-none overflow-y-hidden rounded-xl border border-input bg-card px-3 py-2 text-base leading-6 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-surface-container-highest"
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
          </div>
        )}
      </div>

      <nav className="grid grid-cols-2 gap-2 border-t bg-card px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => changeView('home')}
          aria-current={view === 'home' ? 'page' : undefined}
          className={cn(
            'flex flex-col items-center gap-1 rounded-xl py-2 text-xs',
            view === 'home' ? 'bg-primary font-medium text-primary-foreground' : 'text-muted-foreground'
          )}
        >
          <Home className="h-5 w-5" />
          {dictionary.home}
        </button>
        <button
          type="button"
          onClick={() => changeView('messages')}
          aria-current={view === 'messages' ? 'page' : undefined}
          className={cn(
            'relative flex flex-col items-center gap-1 rounded-xl py-2 text-xs',
            view === 'messages' ? 'bg-primary font-medium text-primary-foreground' : 'text-muted-foreground'
          )}
        >
          <span className="relative">
            <MessageSquare className="h-5 w-5" />
            {hasUnread && (
              <span className="absolute -end-1.5 -top-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </span>
          {dictionary.messages}
        </button>
      </nav>
    </motion.div>
  );
}
