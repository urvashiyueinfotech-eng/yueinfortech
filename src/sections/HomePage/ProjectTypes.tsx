import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";
import { ArrowUpRight } from "lucide-react";

const PROJECT_TYPES = [
  "Startup Websites",
  "B2B Websites",
  "Corporate Websites",
  "E-commerce Stores",
  "SEO Programs",
  "Funnel Builds",
  "Performance Campaigns",
  "Brand Revamps",
  "Cloud Deployments",
  "Cybersecurity Setups",
];

// split into rails
const rail1 = PROJECT_TYPES.slice(0, 4);
const rail2 = PROJECT_TYPES.slice(4, 8);
const rail3 = PROJECT_TYPES.slice(8);

export default function ProjectTypes() {
  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">
      <div className="container mx-auto">

        {/* HEADER */}
        <SectionHeader
          eyebrow="Types of Projects"
          title="Built for Every Stage of Digital Growth"
          subtitle="From early-stage startups to enterprise infrastructure, we design, optimize, and scale projects that perform."
          align="center"
          className="max-w-3xl mx-auto"
        />

        {/* FLOATING RAILS */}
        <div className="mt-14 flex flex-col gap-6">

          {/* RAIL 1 */}
          <Rail items={rail1} />

          {/* RAIL 2 */}
          <Rail items={rail2} />

          {/* RAIL 3 */}
          <Rail items={rail3} />

        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <CtaButton
            href="/contact"
            bgClassName="bg-indigo-600 hover:bg-indigo-700"
            textClassName="text-white"
            className="gap-2"
          >
            <span>Tell Us About Your Project</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </CtaButton>
        </div>

      </div>
    </section>
  );
}

/* ---------- RAIL COMPONENT ---------- */

function Rail({ items }: { items: string[] }) {
  return (
    <div
      className="
        flex gap-4
        overflow-x-auto
        pb-2

        /* hide scrollbar */
        scrollbar-hide

        /* desktop behavior */
        lg:overflow-visible lg:flex-wrap lg:justify-center
      "
    >
      {items.map((item) => (
        <span
          key={item}
          className="
            flex-shrink-0
            rounded-full
            bg-white
            px-6 py-3
            text-sm font-medium
            text-slate-700
            shadow-md
            border border-slate-200
            transition-all
            hover:-translate-y-1 hover:shadow-lg hover:bg-slate-50
            cursor-default
          "
        >
          {item}
        </span>
      ))}
    </div>
  );
}