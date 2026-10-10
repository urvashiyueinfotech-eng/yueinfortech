import type { LinkAction } from "@/types";

export type PortfolioStat = {
  value: string;
  label: string;
};

export type PortfolioFilter = {
  label: string;
  value: string;
};

export type PortfolioCaseStudy = {
  id: string;
  category: string;
  tag: string;
  tagTone?: "default" | "green";
  number: string;
  industry: string;
  title: string;
  description: string;
  services: string[];
  featured?: boolean;
  slug?: string;
  results: Array<{
    value: string;
    label: string;
    tone?: "default" | "green";
  }>;
};

export type PortfolioDeliveryItem = {
  id: string;
  icon: "search" | "globe" | "pen" | "megaphone" | "map-pin" | "bar-chart" | string;
  title: string;
  description: string;
};

export type PortfolioProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type PortfolioPageContent = {
  hero: {
    breadcrumb: string;
    badge: string;
    headingLines: string[];
    highlightedLine: string;
    description: string;
    stats: PortfolioStat[];
    actions: LinkAction[];
  };
  filters: PortfolioFilter[];
  caseStudies: PortfolioCaseStudy[];
  metrics: PortfolioStat[];
  deliver: {
    eyebrow: string;
    heading: string;
    highlightedText: string;
    description: string;
    items: PortfolioDeliveryItem[];
  };
  process: {
    eyebrow: string;
    heading: string;
    highlightedText: string;
    steps: PortfolioProcessStep[];
  };
  industries: {
    eyebrow: string;
    heading: string;
    description: string;
    items: string[];
  };
  finalCta: {
    kicker: string;
    heading: string;
    highlightedText: string;
    description: string;
    actions: LinkAction[];
  };
};

export type PortfolioProjectAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type PortfolioProjectStat = {
  value: string;
  label: string;
};

export type PortfolioProjectModule = {
  id: string;
  label: string;
  icon?: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  caption?: string;
};

export type PortfolioProjectOption = {
  icon?: string;
  badge?: string;
  title: string;
  description: string;
  features: string[];
  action: PortfolioProjectAction;
  featured?: boolean;
};

export type PortfolioProjectFaq = {
  question: string;
  answer: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  status?: string;
  isProduct?: boolean;
  card: Omit<PortfolioCaseStudy, "id" | "slug">;
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlightedTitle?: string;
    description: string;
    actions: PortfolioProjectAction[];
    proofItems?: string[];
    stats: PortfolioProjectStat[];
    image: string;
    imageAlt: string;
    browserLabel?: string;
  };
  overview: {
    eyebrow: string;
    title: string;
    highlightedTitle?: string;
    description: string;
    benefits: Array<{ icon?: string; title: string; description: string }>;
  };
  modules: {
    eyebrow: string;
    title: string;
    highlightedTitle?: string;
    description: string;
    items: PortfolioProjectModule[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ title: string; description: string }>;
  };
  details?: {
    eyebrow: string;
    title: string;
    highlightedTitle?: string;
    description?: string;
    items: Array<{ title: string; description: string; bullets?: string[] }>;
  };
  technology: {
    eyebrow: string;
    title: string;
    highlightedTitle?: string;
    description: string;
    items: Array<{ icon?: string; title: string; description: string }>;
    callout?: { description: string; action: PortfolioProjectAction };
  };
  options: {
    eyebrow: string;
    title: string;
    description: string;
    items: PortfolioProjectOption[];
    footnote?: string;
  };
  faqs: {
    eyebrow: string;
    title: string;
    description: string;
    items: PortfolioProjectFaq[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    actions: PortfolioProjectAction[];
  };
};
