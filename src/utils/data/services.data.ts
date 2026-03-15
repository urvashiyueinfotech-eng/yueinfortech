import { FileText, Megaphone, Monitor, Search, Server } from "lucide-react";
import { type Service } from "@/types";
import React from "react";

export const SERVICES: Service[] = [
  {
    id: "web",
    
    title: "Web Design & Development",
    subtitle: "High-performance websites and digital platforms engineered for speed, SEO readiness, and conversion.",
    icon: React.createElement(Monitor, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "seo",
    title: "SEO & AI Search Optimization",
    subtitle: "Advanced SEO integrated with AI-era strategies to improve organic visibility, authority, and high-intent traffic.",
    icon: React.createElement(Search, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "ads",
    title: "Digital Marketing & Ads",
    subtitle: "Performance campaigns and audience targeting systems designed to reduce acquisition costs and increase ROI.",
    icon: React.createElement(Megaphone, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "content",
    title: "Content & Copywriting",
    subtitle: "Authority-driven content, landing copy, and structured messaging built for engagement and conversion.",
    icon: React.createElement(FileText, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "it",
    title: "IT & Infrastructure Services",
    subtitle: "Secure cloud hosting, monitoring, cybersecurity, and scalable infrastructure solutions for growing businesses.",
    icon: React.createElement(Server, { className: "h-6 w-6", "aria-hidden": true }),
  },
];
