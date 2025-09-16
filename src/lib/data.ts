
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
  Github,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  MessageSquare,
  Send,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = (dictionary: any) => [
  { href: "#home", label: dictionary.home },
  { href: "#about", label: dictionary.about },
  { href: "#services", label: dictionary.services },
  { href: "#projects", label: dictionary.projects },
  { href: "#blog", label: dictionary.blog },
  { href: "#contact", label: dictionary.contact },
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/criptichood",
    Icon: Github,
  },
  {
    name: "X/Twitter",
    url: "https://twitter.com/CripticHood",
    Icon: Twitter,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/emmanuel-galadima/",
    Icon: Linkedin,
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
};

export const WHY_CHOOSE_ME_ICONS: { [key: string]: LucideIcon } = {
  BadgeDollarSign,
  Bot,
  Medal,
  TrendingUp,
};
