import Link from "next/link";
import { ArrowUpRight, FileText, Megaphone, Monitor, Search, Server } from "lucide-react";
import { type ReactElement } from "react";
import SectionHeader from "./SectionHeader";

type Service = {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactElement;
};

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Design & Development",
    subtitle: "Fast, responsive sites and PWAs built for performance.",
    icon: <Monitor className="h-6 w-6" aria-hidden />,
  },
  {
    id: "seo",
    title: "SEO & AI Search Optimization",
    subtitle: "Data-driven SEO + AI tooling to boost organic traffic.",
    icon: <Search className="h-6 w-6" aria-hidden />,
  },
  {
    id: "ads",
    title: "Digital Marketing & Ads",
    subtitle: "Performance ads, targeting, and conversion optimisation.",
    icon: <Megaphone className="h-6 w-6" aria-hidden />,
  },
  {
    id: "content",
    title: "Content & Copywriting",
    subtitle: "Conversion-first content, landing copy & blog funnels.",
    icon: <FileText className="h-6 w-6" aria-hidden />,
  },
  {
    id: "it",
    title: "IT & Infrastructure Services",
    subtitle: "Secure infrastructure, monitoring, backup & cloud ops.",
    icon: <Server className="h-6 w-6" aria-hidden />,
  },
];

const ServiceCard = ({ service, className }: { service: Service; className?: string }) => (
  <article
    className={`relative rounded-2xl border border-orange-100 bg-white/95 p-6 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${className ?? ""}`}
  >
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full bg-orange-100 ring-1 ring-orange-200">
        <span className="text-orange-500">{service.icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
    </div>

    <p className="mt-4 text-sm text-slate-700">{service.subtitle}</p>

    <div className="mt-6 flex items-center gap-3">
      <Link
        href={`/#${service.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Learn more
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
      <div className="ml-auto hidden items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700 sm:flex">
        <span className="text-orange-500 font-semibold">★</span>
        <span className="text-orange-700">Trusted</span>
      </div>
    </div>

    <div
      aria-hidden
      className="pointer-events-none absolute -right-8 -bottom-8 hidden h-24 w-24 rounded-full border border-orange-400/10 opacity-40 xl:block"
    />
  </article>
);

const ServicesGrid = () => (
  <div className="mt-12 hidden grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:grid">
    {SERVICES.map((service) => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </div>
);

const HorizontalScroller = () => (
  <div className="-mx-6 mt-6 overflow-x-auto px-6 md:hidden">
    <div className="flex w-max gap-4">
      {SERVICES.map((service) => (
        <article
          key={service.id}
          className="relative min-w-[240px] flex-shrink-0 rounded-2xl border border-orange-100 bg-white/95 p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 ring-1 ring-orange-200">
              <span className="text-orange-500">{service.icon}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">{service.title}</h3>
          </div>
          <p className="mt-3 text-sm text-slate-700">{service.subtitle}</p>
          <Link
            href={`/#${service.id}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Learn more
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </article>
      ))}
    </div>
  </div>
);

const WhatWeDo = () => {
  return (
    <section
      aria-labelledby="what-we-do-title"
      className="py-20 lg:py-32 bg-[linear-gradient(to_right,_#fbf0e6_0%,_#fbf0e6_100%)]"
    >
      <div className="container">
        <SectionHeader
          id="what-we-do-title"
          eyebrow="What We Do"
          title="End-to-End Digital, Creative & IT Services"
          subtitle="We combine design, data, and technology to build digital products that scale — from launch-ready websites to fully managed infrastructure."
          align="center"
        />

        <ServicesGrid />

        <div className="mt-8 md:hidden">
          <p className="text-center text-xs text-muted-foreground">Swipe to explore services</p>
          <HorizontalScroller />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
