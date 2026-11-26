"use client";

import { Mail } from "lucide-react";
import { SOCIAL_LINKS, GITHUB_URL, GithubIcon, CONTACT_EMAIL } from "@/lib/data";

export function SocialRail({ lang }: { lang: string }) {
  const items = [
    ...SOCIAL_LINKS.map(({ name, url, Icon }) => ({ name, url, Icon })),
    { name: "GitHub", url: GITHUB_URL, Icon: GithubIcon },
  ];

  return (
    <div className="hidden lg:flex fixed start-6 bottom-0 z-40 flex-col items-center gap-5">
      <ul className="flex flex-col items-center gap-5">
        {items.map(({ name, url, Icon }) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </li>
      </ul>
      <div className="w-px h-24 bg-outline-variant" />
    </div>
  );
}