import Link from "next/link";
import { Code } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, GithubIcon } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";

export async function Footer({ lang }: { lang: string }) {
  const dictionary = await getDictionary(lang);
  const currentYear = new Date().getFullYear();
  const githubUrl = SOCIAL_LINKS.find((l) => l.name === "GitHub")?.url;

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl font-headline">
              <Code className="h-7 w-7 text-primary" />
              Emmanuel Galadima
            </Link>
            <p className="text-muted-foreground max-w-sm">
              {dictionary.footer.tagline}
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">{dictionary.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {NAV_LINKS(dictionary.nav).map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">{dictionary.footer.connect}</h3>
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
            {githubUrl && (
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <GithubIcon className="h-5 w-5" />
                github.com/criptichood
              </Link>
            )}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} Emmanuel Galadima. {dictionary.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}