
import {
  Link as LinkIcon,
} from "lucide-react";

import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/lib/brand-icons";

export { GithubIcon, LinkedinIcon, XTwitterIcon };

export const NAV_LINKS = (dictionary: any) => [
  { href: "#home", label: dictionary.home },
  { href: "#about", label: dictionary.about },
  { href: "#capabilities", label: dictionary.capabilities },
  { href: "#work", label: dictionary.work },
  { href: "#github", label: dictionary.github },
];

export const GITHUB_URL = "https://github.com/criptichood";

export const SOCIAL_LINKS = [
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
];
