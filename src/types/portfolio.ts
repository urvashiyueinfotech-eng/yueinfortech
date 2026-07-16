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
