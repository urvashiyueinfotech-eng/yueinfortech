import { FileText, Megaphone, Monitor, Search, Server } from "lucide-react";
import { type Service } from "@/types";
import React from "react";

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Design & Development",
    subtitle: "Fast, responsive sites and PWAs built for performance.",
    icon: React.createElement(Monitor, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "seo",
    title: "SEO & AI Search Optimization",
    subtitle: "Data-driven SEO + AI tooling to boost organic traffic.",
    icon: React.createElement(Search, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "ads",
    title: "Digital Marketing & Ads",
    subtitle: "Performance ads, targeting, and conversion optimisation.",
    icon: React.createElement(Megaphone, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "content",
    title: "Content & Copywriting",
    subtitle: "Conversion-first content, landing copy & blog funnels.",
    icon: React.createElement(FileText, { className: "h-6 w-6", "aria-hidden": true }),
  },
  {
    id: "it",
    title: "IT & Infrastructure Services",
    subtitle: "Secure infrastructure, monitoring, backup & cloud ops.",
    icon: React.createElement(Server, { className: "h-6 w-6", "aria-hidden": true }),
  },
];
