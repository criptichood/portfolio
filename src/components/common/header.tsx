
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Code, Menu, Globe } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "../theme-toggle";
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
];

export function Header({ lang }: { lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const DUMMY_DICTIONARY = {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
  };
  const navLinks = NAV_LINKS(DUMMY_DICTIONARY);

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
        <Link href={`/${lang}#home`} className="flex items-center gap-2 font-bold text-lg font-headline">
          <Code className="h-6 w-6 text-primary" />
          Criptic Digital
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${lang}${link.href}`}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
                  <Link href={`/${lang}#home`} className="flex items-center gap-2 font-bold text-lg font-headline mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                    <Code className="h-6 w-6 text-primary" />
                    Criptic Digital
                  </Link>
                  <nav className="flex flex-col gap-6 text-lg">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${lang}${link.href}`}
                        className="hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
