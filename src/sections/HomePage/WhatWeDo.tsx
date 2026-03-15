import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import { type Service } from "@/types";
import { SERVICES } from "@/utils/data/services.data";

const ServiceCard = ({ service, className }: { service: Service; className?: string }) => (
  <article
    className={`relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${className ?? ""}`}
  >
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full bg-indigo-100 ring-1 ring-indigo-200">
        <span className="text-indigo-600">{service.icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
    </div>

    <p className="mt-4 text-sm text-slate-600">{service.subtitle}</p>

    <div className="mt-auto flex items-center gap-3 pt-6">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Explore services
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>

    <div
      aria-hidden
      className="pointer-events-none absolute -right-8 -bottom-8 hidden h-24 w-24 rounded-full border border-indigo-400/10 opacity-40 xl:block"
    />
  </article>
);

const ServicesGrid = () => (
  <div className="mt-12 hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
    {SERVICES.map((service) => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </div>
);

const HorizontalScroller = () => (
  <div className="-mx-6 mt-3 overflow-x-auto px-6 md:hidden">
    <div className="flex w-max gap-4">
      {SERVICES.map((service) => (
        <article
          key={service.id}
          className="relative flex min-w-[240px] flex-shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 ring-1 ring-indigo-200">
              <span className="text-indigo-600">{service.icon}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">{service.title}</h3>
          </div>
          <p className="mt-3 text-sm text-slate-600">{service.subtitle}</p>
          <Link
            href="/services"
            className="mt-5 inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Explore services
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
      className="py-12 md:py-20 lg:py-32"
    >
      <div className="container">
        <SectionHeader
          id="what-we-do-title"
          eyebrow="What We Do"
          as="h2"
          title="End-to-End Digital, Marketing & IT Solutions"
          subtitle="We combine strategy, design, AI-driven optimization, performance marketing, and secure infrastructure into scalable systems that help businesses grow globally."
          align="center"
        />

        <ServicesGrid />

        <div className="mt-4 md:hidden">
          <p className="text-center text-xs text-slate-500">Swipe to explore services</p>
          <HorizontalScroller />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
