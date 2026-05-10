import { type ReactNode } from "react";

export type Service = {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
};

export type PopupId = "custom-quote";

export type LinkAction = {
    text: string;
    href: string;
    type: "primary" | "secondary" | "whatsapp" | "outline";
    kind?: "link" | "popup";
    popupId?: PopupId;
    icon?: string;
  };
  
  export type FeatureCard = {
    id: string;
    title: string;
    category?: string;
    subtitle?: string;
    description: string;
    snippet?: string;
    features?: string[];
    cta?: LinkAction;
  };
  
export type ServiceDoc = {
    docId?: string;
    id: string;
    navTitle?: string;
    slug: string;
    slugPath?: string;
    serviceType?: "main" | "sub" | "sub-sub" | string;
    parentDocId?: string | null;
    ancestorDocIds?: string[];
    childrenDocIds?: string[];
    level?: number;
    isLeaf?: boolean;
    displayOrder: number;
    seo: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
  hero: {
    badge?: string;
    heading: string;
    subheading: string;
    description: string;
    backgroundImage?: string;
    stats?: Array<{ value: string; label: string }>;
    actions: LinkAction[];
  };
  intro_section: {
    heading: string;
    description: string;
    features: string[];
    cta: LinkAction;
    secondaryCta?: LinkAction;
    introImage?: string;
  };
    sub_services_section: {
      heading: string;
      description: string;
      cards: FeatureCard[];
    };
    process_section?: {
      heading: string;
      description: string;
      steps: Array<{ step_label: string; title: string; description: string }>;
      cta?: LinkAction;
    };
    results_section?: {
      heading: string;
      description: string;
      cta?: LinkAction;
      cards: Array<{
        id: string;
        tag: string;
        description: string;
        metrics: Array<{ label: string; value: string; tone?: "default" | "positive" }>;
      }>;
    };
    engagement_tiers_section?: {
      heading: string;
      description: string;
      tiers: Array<{
        id: string;
        name: string;
        for: string;
        featured?: boolean;
        badge?: string;
        features: string[];
        cta?: LinkAction;
      }>;
    };
    industries_section: {
      heading: string;
      items: string[];
      cta?: LinkAction;
    };
    aeo_section?: {
      heading: string;
      content: string;
      cta?: LinkAction;
    };
    faq_section: {
      heading: string;
      questions: Array<{ question: string; answer: string }>;
      cta?: LinkAction;
    };
    final_cta_section: {
      heading: string;
      subheading?: string;
      actions: LinkAction[];
    };
  };
