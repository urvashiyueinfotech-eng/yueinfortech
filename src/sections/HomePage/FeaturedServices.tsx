import { Code2, Search, MessageSquare, MapPin, Shield, type LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";

type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
};

const FEATURED_SERVICES: Feature[] = [
  { id: "geo", icon: Search, title: "Generative Engine Optimization" },
  { id: "sxo", icon: Code2, title: "Search Experience Optimization" },
  { id: "aeo", icon: MessageSquare, title: "Answer Engine Optimization" },
  { id: "local", icon: MapPin, title: "Local Business Optimization" },
  { id: "cloud", icon: Shield, title: "Cloud Hosting & Cybersecurity" },
];

const col1 = [FEATURED_SERVICES[0], FEATURED_SERVICES[1]];
const col2 = [FEATURED_SERVICES[2], FEATURED_SERVICES[3]];
const col3 = [FEATURED_SERVICES[4]];
const highlightedIds = new Set([col1[0].id, col2[0].id]);

export default function FeaturedServices() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-br from-[#1e140f] to-[#2a1c14]">
      <div className="container mx-auto flex flex-col md:flex-row gap-16">

        {/* LEFT SIDE */}
        <div className="md:w-1/2 lg:w-[40%]">
          <SectionHeader
            eyebrow="Featured Services"
            title="Empowering Your Digital Growth"
            subtitle="Modern services purpose-built for AI search, UX optimization, and secure infrastructure — designed to help your business scale with confidence."
            align="left"
            titleClassName="text-white"
            subtitleClassName="text-white/80"
          />

          <div className="mt-8">
            <CtaButton
              href="/services"
              bgClassName="bg-gradient-to-r from-primary to-orange-400 hover:brightness-110"
              textClassName="text-white"
              className="gap-2"
            >
              <span>View All Services</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </CtaButton>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 lg:w-[60%]">

          {/* MOBILE + TABLET */}
          <div className="flex flex-wrap gap-4 justify-center lg:hidden">
            {FEATURED_SERVICES.map((svc) => (
              <div key={svc.id} className="w-[47%] min-w-[150px]">
                <ServiceCard service={svc} highlight={highlightedIds.has(svc.id)} />
              </div>
            ))}
          </div>

          {/* DESKTOP — STAIRCASE */}
          <div className="hidden lg:flex flex-row gap-5 justify-end">

            <div className="flex flex-col gap-5 w-[190px] pt-[100px]">
              {col1.map((svc) => <ServiceCard key={svc.id} service={svc} highlight={highlightedIds.has(svc.id)} />)}
            </div>

            <div className="flex flex-col gap-5 w-[190px] pt-[50px]">
              {col2.map((svc) => <ServiceCard key={svc.id} service={svc} highlight={highlightedIds.has(svc.id)} />)}
            </div>

            <div className="flex flex-col gap-5 w-[190px]">
              {col3.map((svc) => <ServiceCard key={svc.id} service={svc} highlight={highlightedIds.has(svc.id)} />)}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, highlight = false }: { service: Feature; highlight?: boolean }) {
  const Icon = service.icon;
  return (
    <div
      className={`w-full h-[160px] rounded-2xl px-2 shadow-lg border flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-xl ${
        highlight
          ? "bg-primary text-white border-secondary"
          : "bg-[linear-gradient(135deg,#fff8f2_0%,#fef3e7_100%)] text-slate-900 border-primary/15"
      }`}
    >
      <div className="mb-2">
        <Icon className={`h-9 w-9 ${highlight ? "text-white" : "text-primary"}`} />
      </div>

      <h3 className={`text-sm font-semibold leading-tight ${highlight ? "text-white" : "text-slate-900"}`}>
        {service.title}
      </h3>
    </div>
  );
}
