
import {
  Cpu,
  ArrowUpToLine,
  Server,
  Briefcase,
  Blocks,
  BadgeDollarSign,
  Bot,
  Medal,
  TrendingUp,
  Link as LinkIcon,
  MessageSquare,
  Send,
  Lightbulb,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/lib/brand-icons";

export { GithubIcon, LinkedinIcon, XTwitterIcon };

export const NAV_LINKS = (dictionary: any) => [
  { href: "#home", label: dictionary.home },
  { href: "#about", label: dictionary.about },
  { href: "#capabilities", label: dictionary.capabilities },
  { href: "#work", label: dictionary.work },
  { href: "#github", label: dictionary.github },
  { href: "#contact", label: dictionary.contact },
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/criptichood",
    Icon: GithubIcon,
  },
  {
    name: "X/Twitter",
    url: "https://twitter.com/CripticHood",
    Icon: XTwitterIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/emmanuel-galadima/",
    Icon: LinkedinIcon,
  },
  {
    name: "Linktree",
    url: "https://linktr.ee/CripticHood",
    Icon: LinkIcon,
  },
  {
    name: "Telegram",
    url: "https://t.me/criptichood",
    Icon: Send,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/+2348100000000",
    Icon: MessageSquare,
  },
];

export const SERVICES_ICONS: { [key: string]: LucideIcon } = {
  Cpu,
  ArrowUpToLine,
  Server,
  Briefcase,
  Blocks,
  Bot,
  Lightbulb,
  ShieldCheck,
};

export const WHY_CHOOSE_ME_ICONS: { [key: string]: LucideIcon } = {
  BadgeDollarSign,
  Bot,
  Medal,
  TrendingUp,
  Cpu,
  ShieldCheck,
};
