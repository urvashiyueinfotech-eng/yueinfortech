import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";
import { ArrowUpRight } from "lucide-react";

const PORTFOLIO_ITEMS = [
  {
    title: "SaaS Marketing Website",
    description:
      "SEO-first, conversion-optimized website built for scale and performance.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1400",
    slug: "/portfolio#saas",
  },
  {
    title: "E-commerce SEO Revamp",
    description:
      "Information architecture and on-page SEO for long-term organic growth.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400",
    slug: "/portfolio#ecommerce",
  },
  {
    title: "B2B Lead Generation Funnel",
    description:
      "High-converting landing pages designed to increase demo bookings.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400",
    slug: "/portfolio#b2b",
  }
];

export default function PortfolioHighlights() {
  return (
    <section className="relative py-16 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}
        <SectionHeader
          eyebrow="Portfolio Highlights"
          title="Work That Drives Real Business Results"
          subtitle="A selection of projects where strategy, design, and performance come together to create measurable impact."
          align="center"
          className="max-w-3xl mx-auto"
        />

        {/* PORTFOLIO CARDS */}
        <div className="mt-20 flex flex-wrap justify-center gap-10">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <Link
              key={index}
              href={item.slug}
              className="
                group
                w-full
                sm:w-[48%]
                lg:w-[30%]
                flex
                flex-col
                overflow-hidden
                rounded-3xl
                bg-slate-50
                border border-slate-200
                shadow-sm
                transition-all
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col gap-3 px-6 py-6">
                <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                  View Project →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <CtaButton
            href="/portfolio"
            bgClassName="bg-indigo-600 hover:bg-indigo-700"
            textClassName="text-white"
            className="px-8 py-4 text-base"
          >
            <span>View Full Portfolio</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </CtaButton>
        </div>

      </div>
    </section>
  );
}