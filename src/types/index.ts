export type LinkAction = {
    text: string;
    href: string;
    type: "primary" | "secondary" | "whatsapp" | "outline";
    icon?: string;
  };
  
  export type FeatureCard = {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    features?: string[];
    cta?: LinkAction;
  };
  
  export type ServiceDoc = {
    id: string;
    slug: string;
    displayOrder: number;
    seo: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
  hero: {
    heading: string;
    subheading: string;
    description: string;
    backgroundImage?: string;
    actions: LinkAction[];
  };
  intro_section: {
    heading: string;
    description: string;
    features: string[];
    cta: LinkAction;
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
