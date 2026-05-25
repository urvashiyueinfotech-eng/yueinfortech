import Link from "next/link";
import { ArrowRight, Search, Target, MapPin, Monitor, FileText, Share2, Server, Shield, Phone } from "lucide-react";

const CategoryHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-6 mt-12 first:mt-0">
    <div className="flex-1 h-px bg-slate-200" />
    <div className="text-[0.68rem] font-[800] tracking-[0.1em] uppercase text-slate-500 whitespace-nowrap bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
      {label}
    </div>
    <div className="flex-1 h-px bg-slate-200" />
  </div>
);

type ServiceItemProps = {
  num: string;
  numColor: string;
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  title: string;
  desc: string;
  pills: string[];
  linkText: string;
  linkHref: string;
  linkColor: string;
  hoverBorder: string;
  hoverGlow: string;
};

const ServiceCard = ({ num, numColor, icon, iconBg, iconBorder, title, desc, pills, linkText, linkHref, linkColor, hoverBorder, hoverGlow }: ServiceItemProps) => (
  <div className={`group relative bg-white border border-slate-200 rounded-[20px] p-7 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${hoverBorder}`}>
    <div className={`absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,${hoverGlow},transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`} />
    
    <div className="relative z-10">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 ${iconBg} ${iconBorder}`}>
        {icon}
      </div>
      <div className={`text-[0.65rem] font-bold tracking-[0.1em] uppercase mb-1 ${numColor}`}>{num}</div>
      <h3 className="font-['Syne',sans-serif] text-[1.05rem] font-[700] text-slate-900 mb-2 tracking-[-0.01em]">{title}</h3>
      <p className="text-[0.85rem] text-slate-600 leading-[1.7] flex-1 mb-5">{desc}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-5">
        {pills.map((pill, i) => (
          <span key={i} className="text-[0.65rem] font-bold tracking-[0.03em] bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">
            {pill}
          </span>
        ))}
      </div>
      
      <Link href={linkHref} className={`text-[0.8rem] font-[700] inline-flex items-center gap-1.5 transition-all mt-auto ${linkColor} hover:gap-2.5`}>
        {linkText} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  </div>
);

export default function WhatWeDo() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28 border-y border-slate-200" id="services">
      <div className="container max-w-7xl mx-auto px-[5%]">
        
        <div className="mb-14 text-center max-w-2xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20 mb-4">
            <span className="text-[0.7rem] font-bold tracking-[0.12em] text-[#5865F2] uppercase">What We Do</span>
          </div>
          <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-[800] leading-[1.05] tracking-[-0.03em] text-slate-900 font-['Syne',sans-serif]">
            All Digital Services,<br />
            <span className="text-[#5865F2]">One Trusted Partner</span>
          </h2>
        </div>

        {/* CATEGORY 1: Search & Marketing */}
        <CategoryHeader label="Search & Marketing" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServiceCard
            num="01 — Search"
            numColor="text-[#5865F2]"
            icon={<Search className="w-5 h-5 text-[#5865F2]" />}
            iconBg="bg-[#5865F2]/10"
            iconBorder="border border-[#5865F2]/20"
            title="SEO & AI Search"
            desc="Technical SEO, content authority, and Answer Engine Optimisation (AEO) designed to capture standard organic clicks and AI Overview citations."
            pills={["Technical SEO", "AEO", "Link Building", "AI Citations"]}
            linkText="Explore SEO Services"
            linkHref="/services/seo-services"
            linkColor="text-[#5865F2]"
            hoverBorder="hover:border-[#5865F2]/40"
            hoverGlow="rgba(88,101,242,0.15)"
          />
          <ServiceCard
            num="02 — Paid"
            numColor="text-[#8B5CF6]"
            icon={<Target className="w-5 h-5 text-[#8B5CF6]" />}
            iconBg="bg-[#8B5CF6]/10"
            iconBorder="border border-[#8B5CF6]/20"
            title="Digital Marketing & Ads"
            desc="Google Ads, Meta Ads, LinkedIn Ads, and retargeting — built as one connected system, not separate campaigns."
            pills={["Google Ads", "Meta Ads", "LinkedIn", "Retargeting"]}
            linkText="Explore Digital Marketing"
            linkHref="/services/digital-marketing-services"
            linkColor="text-[#8B5CF6]"
            hoverBorder="hover:border-[#8B5CF6]/40"
            hoverGlow="rgba(139,92,246,0.15)"
          />
          <ServiceCard
            num="03 — Local"
            numColor="text-[#10B981]"
            icon={<MapPin className="w-5 h-5 text-[#10B981]" />}
            iconBg="bg-[#10B981]/10"
            iconBorder="border border-[#10B981]/20"
            title="Local Business Services"
            desc="Google Maps ranking, GBP optimisation, local citations, and hyperlocal campaigns for clinics, retail, and service businesses."
            pills={["GBP Optimisation", "Map Pack", "Reviews"]}
            linkText="Explore Local Services"
            linkHref="/services/local-business-services"
            linkColor="text-[#10B981]"
            hoverBorder="hover:border-[#10B981]/40"
            hoverGlow="rgba(16,185,129,0.15)"
          />
        </div>

        {/* CATEGORY 2: Design, Content & Social */}
        <CategoryHeader label="Web Design, Content & Social Media" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServiceCard
            num="04 — Web"
            numColor="text-[#06B6D4]"
            icon={<Monitor className="w-5 h-5 text-[#06B6D4]" />}
            iconBg="bg-[#06B6D4]/10"
            iconBorder="border border-[#06B6D4]/20"
            title="Web Design & Development"
            desc="High-performance websites engineered for speed, SEO, and conversion — WordPress, WooCommerce, Shopify, or custom development."
            pills={["WordPress", "WooCommerce", "Shopify", "Core Web Vitals", "CRO"]}
            linkText="Explore Web Design"
            linkHref="/services/web-design-and-development-services"
            linkColor="text-[#06B6D4]"
            hoverBorder="hover:border-[#06B6D4]/40"
            hoverGlow="rgba(6,182,212,0.15)"
          />
          <ServiceCard
            num="05 — Content"
            numColor="text-[#F59E0B]"
            icon={<FileText className="w-5 h-5 text-[#F59E0B]" />}
            iconBg="bg-[#F59E0B]/10"
            iconBorder="border border-[#F59E0B]/20"
            title="Content Writing & Copywriting"
            desc="SEO-optimised, AEO-ready, human-first content — website copy, landing pages, SEO blogs, thought leadership, and ad copy."
            pills={["Website Copy", "SEO Blogs", "Landing Pages", "Ad Copy"]}
            linkText="Explore Content Writing"
            linkHref="/services/content-writing-services"
            linkColor="text-[#F59E0B]"
            hoverBorder="hover:border-[#F59E0B]/40"
            hoverGlow="rgba(245,158,11,0.15)"
          />
          <ServiceCard
            num="06 — Social"
            numColor="text-[#8B5CF6]"
            icon={<Share2 className="w-5 h-5 text-[#8B5CF6]" />}
            iconBg="bg-[#8B5CF6]/10"
            iconBorder="border border-[#8B5CF6]/20"
            title="Social Media Marketing"
            desc="Content calendars, Reels production, community management, and audience growth across Instagram, Facebook, LinkedIn, and YouTube."
            pills={["Instagram", "Facebook", "LinkedIn", "YouTube", "Reels", "ORM"]}
            linkText="Explore Social Media"
            linkHref="/services/social-media-marketing"
            linkColor="text-[#8B5CF6]"
            hoverBorder="hover:border-[#8B5CF6]/40"
            hoverGlow="rgba(139,92,246,0.15)"
          />
        </div>

        {/* CATEGORY 3: IT Infrastructure & Security */}
        <CategoryHeader label="IT Infrastructure & Security" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServiceCard
            num="07 — IT"
            numColor="text-[#06B6D4]"
            icon={<Server className="w-5 h-5 text-[#06B6D4]" />}
            iconBg="bg-[#06B6D4]/10"
            iconBorder="border border-[#06B6D4]/20"
            title="Cloud Hosting & Infrastructure"
            desc="Managed cloud hosting with guaranteed uptime, auto-scaling, daily backups, and 24/7 monitoring — built for businesses that cannot afford downtime."
            pills={["Managed Hosting", "Auto-Scaling", "99.9% Uptime", "Backups", "Monitoring"]}
            linkText="Explore Cloud Hosting"
            linkHref="/services/it-services/cloud-hosting"
            linkColor="text-[#06B6D4]"
            hoverBorder="hover:border-[#06B6D4]/40"
            hoverGlow="rgba(6,182,212,0.15)"
          />
          <ServiceCard
            num="08 — IT"
            numColor="text-[#F43F5E]"
            icon={<Shield className="w-5 h-5 text-[#F43F5E]" />}
            iconBg="bg-[#F43F5E]/10"
            iconBorder="border border-[#F43F5E]/20"
            title="Cybersecurity Solutions"
            desc="Comprehensive cybersecurity — threat detection, vulnerability assessments, firewall configuration, SSL management, and incident response."
            pills={["Threat Detection", "Vulnerability Audit", "Firewall Config", "SSL"]}
            linkText="Explore Cybersecurity"
            linkHref="/services/it-services/cyber-security"
            linkColor="text-[#F43F5E]"
            hoverBorder="hover:border-[#F43F5E]/40"
            hoverGlow="rgba(244,63,94,0.15)"
          />
          <ServiceCard
            num="09 — IT"
            numColor="text-[#06B6D4]"
            icon={<Phone className="w-5 h-5 text-[#06B6D4]" />}
            iconBg="bg-[#06B6D4]/10"
            iconBorder="border border-[#06B6D4]/20"
            title="VoIP Solutions"
            desc="Cloud-based VoIP phone systems that replace traditional landlines — scalable, cost-effective, and fully managed with HD call quality."
            pills={["Cloud PBX", "HD Call Quality", "Remote Teams", "Fully Managed"]}
            linkText="Explore VoIP"
            linkHref="/services/it-services/voip-solution"
            linkColor="text-[#06B6D4]"
            hoverBorder="hover:border-[#06B6D4]/40"
            hoverGlow="rgba(6,182,212,0.15)"
          />
        </div>

        <div className="mt-16 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md text-slate-900 font-bold rounded-full transition-all hover:bg-slate-50 text-[0.9rem]">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
