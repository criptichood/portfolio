import {
  Cpu,
  ArrowUpToLine,
  Server,
  Briefcase,
  Cube,
  BadgeDollarSign,
  Bot,
  Medal,
  TrendingUp,
  Github,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
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
    name: "WhatsApp",
    url: "https://wa.me/+2348100000000",
    Icon: MessageSquare,
  },
];

export const SERVICES_DATA = [
  {
    title: "AI-Powered Website Development",
    description: "Fast, responsive, and intelligent websites tailored to your business needs.",
    Icon: Cpu,
  },
  {
    title: "Website & WebApp Upgrades",
    description: "Modernize your outdated systems with the latest technologies for better performance.",
    Icon: ArrowUpToLine,
  },
  {
    title: "System & Server Maintenance",
    description: "Reliable software upgrades, server support, and performance monitoring.",
    Icon: Server,
  },
  {
    title: "Independent Technical Consulting",
    description: "Tailored technical recommendations and strategies to help your business grow.",
    Icon: Briefcase,
  },
  {
    title: "Blockchain & Web3 Consulting",
    description: "Expert guidance for forward-looking companies stepping into the Web3 space.",
    Icon: Cube,
  },
];

export const PROJECTS_DATA = [
  {
    title: "CryptoDaHausa",
    description: "A platform for localized blockchain education content, making complex topics accessible.",
    image: "project-cryptodahausa",
    liveUrl: "#",
    githubUrl: "https://github.com/criptichood",
  },
  {
    title: "AI Productivity Tools",
    description: "A suite of AI-powered applications hosted on GitHub to boost productivity and workflow.",
    image: "project-ai-tools",
    liveUrl: "#",
    githubUrl: "https://github.com/criptichood",
  },
  {
    title: "Company Website Deployment",
    description: "Modern and professional website for a corporate client, delivered as a freelance project.",
    image: "project-company-website",
    liveUrl: "#",
    githubUrl: "https://github.com/criptichood",
  },
  {
    title: "Open-source Projects",
    description: "Contributions to various open-source projects, showcasing collaborative development skills.",
    image: "project-open-source",
    liveUrl: "#",
    githubUrl: "https://github.com/criptichood",
  },
];

export const WHY_CHOOSE_ME_DATA: { title: string; Icon: LucideIcon }[] = [
  { title: "Affordable Solutions", Icon: BadgeDollarSign },
  { title: "AI-Integrated Websites", Icon: Bot },
  { title: "5+ Years Experience", Icon: Medal },
  { title: "Proven Track Record", Icon: TrendingUp },
];

export const BLOG_POSTS_DATA = [
    {
        title: "The Rise of AI in Web Development",
        excerpt: "Discover how Artificial Intelligence is revolutionizing the way we build and interact with websites.",
        image: "blog-post-1"
    },
    {
        title: "Digital Transformation for Local Businesses",
        excerpt: "A guide for small and medium-sized businesses on leveraging technology for growth.",
        image: "blog-post-2"
    },
    {
        title: "Understanding Blockchain Beyond Cryptocurrency",
        excerpt: "Exploring the potential of blockchain technology in various industries beyond finance.",
        image: "blog-post-3"
    }
]
