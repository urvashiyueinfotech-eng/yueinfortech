import { ArrowUpRight, Code2, Search, MessageSquare, MapPin, Shield } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

const FEATURED_SERVICES = [
  {
    id: "geo",
    icon: <Search className="h-5 w-5" />,
    title: "Generative Engine Optimization (GEO)",
    desc: "Optimize pages for AI Overviews & generative search to improve entity recognition and authority.",
  },
  {
    id: "sxo",
    icon: <Code2 className="h-5 w-5" />,
    title: "Search Experience Optimization (SXO)",
    desc: "SEO + UX combined for better engagement, speed, design, and conversions.",
  },
  {
    id: "aeo",
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Answer Engine Optimization (AEO)",
    desc: "Snippet-ready short answers, FAQs, and structured content for zero-click rankings.",
  },
  {
    id: "local",
    icon: <MapPin className="h-5 w-5" />,
    title: "Local Business Optimization",
    desc: "Local SEO, Google Maps ranking, business consistency, and review management.",
  },
  {
    id: "cloud",
    icon: <Shield className="h-5 w-5" />,
    title: "Cloud Hosting & Cybersecurity",
    desc: "Secure servers, uptime monitoring, backups, firewall protection, and threat prevention.",
  },
];

export default function FeaturedServices() {
  return (
    <section className="relative w-full py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Featured Services"
          title="Empowering Your Digital Growth"
          subtitle="Cutting-edge services designed for modern search, AI optimization, and secure cloud delivery — tailored to scale your presence online."
          align="center"
          className="max-w-3xl"
        />

        {/* Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative rounded-2xl bg-white/95 p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl border border-orange-100"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                {service.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-slate-700">{service.desc}</p>

              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-700 hover:text-orange-600"
              >
                View details
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              {/* Subtle background glow */}
              <div className="pointer-events-none absolute -z-10 -bottom-4 -right-4 h-24 w-24 rounded-full bg-orange-200/25 blur-2xl" />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-orange-500"
          >
            👉 View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
