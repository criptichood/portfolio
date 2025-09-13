import Link from "next/link";
import { Code } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="#home" className="flex items-center gap-2 font-bold text-xl font-headline">
              <Code className="h-7 w-7 text-primary" />
              Criptic Digital
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Smarter Websites. Modern Systems. AI-Powered Solutions.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} Emmanuel Galadima (CripticHood). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
