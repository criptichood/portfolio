"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Code, Menu, Globe, Mail } from "lucide-react";
import { NAV_LINKS, GithubIcon } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const locales = [
  { code: 'en', name: 'English' },
  { code: 'ha', name: 'Hausa' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
];

export function Header({ lang, dictionary }: { lang: string, dictionary: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "capabilities", "work", "github", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = NAV_LINKS(dictionary);

  function getRedirectedPath(locale: string) {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-lg font-headline">
          <Code className="h-6 w-6 text-primary" />
          CripticHood
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className={cn(
                  "relative rounded-full px-3.5 py-2 transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={`/${lang}#contact`}
            aria-label={dictionary.getInTouch}
            title={dictionary.getInTouch}
            className="hidden md:inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent/10 hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden lg:inline">{dictionary.getInTouch}</span>
          </Link>
          <a
            href="https://github.com/criptichood"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden md:inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent/10 hover:text-primary transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((locale) => (
                <DropdownMenuItem key={locale.code} asChild>
                  <Link href={getRedirectedPath(locale.code)}>{locale.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col p-6">
                  <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-lg font-headline mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                    <Code className="h-6 w-6 text-primary" />
                    CripticHood
                  </Link>
                  <nav className="flex flex-col gap-2 text-lg">
                    {navLinks.map((link) => {
                      const id = link.href.replace("#", "");
                      const isActive = activeSection === id;
                      return (
                        <Link
                          key={link.href}
                          href={`/${lang}${link.href}`}
                          className={cn(
                            "rounded-lg px-3 py-2.5 transition-colors",
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <Link
                    href={`/${lang}#contact`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-8 flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-2.5 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {dictionary.getInTouch}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}