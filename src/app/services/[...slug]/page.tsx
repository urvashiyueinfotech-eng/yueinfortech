import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Layers3, Sparkles } from "lucide-react";

import IntroSection from "@/sections/ServicesPage/IntroSection";
import SubServicesGrid from "@/sections/ServicesPage/SubServicesGrid";
import { ProcessSection, FAQSection } from "@/sections/ServicesPage/ExtraSection";
import MainServiceCard from "@/components/ui/MainServiceCard";
import ServiceFinalCtaAction from "@/components/ServiceFinalCtaAction";
import HeroAction from "@/components/HeroAction";
import CustomSolutionPopup from "@/components/CustomSolutionPopup";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { LinkAction } from "@/types";
import type { ContactSubmissionContext, ContactSubmissionSource } from "@/lib/contactSubmission";

function ServiceAction({ action, className, context }: { action: LinkAction; className: string; context: ContactSubmissionContext }) {
  if (action.kind === "popup" && action.popupId === "custom-quote") {
    return (
      <CustomSolutionPopup
        source={context.section as ContactSubmissionSource}
        context={context}
        trigger={
          <button type="button" className={className}>
            {action.type === "whatsapp" ? <WhatsAppIcon className="h-4 w-4" /> : null}
            {action.text}
          </button>
        }
      />
    );
  }

  if (action.type === "whatsapp") {
    return (
      <a href="https://wa.me/918859366292" className={className} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="h-4 w-4" />
        {action.text}
      </a>
    );
  }

  return (
    <Link href={action.href ?? "/contact-us"} className={className}>
      {action.text}
    </Link>
  );
}
import {
  getRelatedMainServices,
  getServiceBySlug,
} from "@/lib/services.service";
import { getPageJsonLd, getPageMetadata, getServiceSeoPageId, type JsonLdItem } from "@/lib/pageSeo.service";
import { StructuredDataScripts } from "@/components/PageStructuredData";
import type { ServiceDoc } from "@/types";

export const revalidate = 2592000;
export const dynamicParams = true;

function joinSlug(segments?: string[]) {
  return (segments ?? []).join("/").trim();
}

function absoluteServiceUrl(slugPath: string) {
  return `https://www.yueinfotech.com/services/${slugPath}`;
}

function getPlainText(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function buildServiceJsonLd(data: ServiceDoc, slugPath: string) {
  const serviceTypes = [
    ...(data.sub_services_section?.cards?.map((card) => card.title) ?? []),
    ...(data.intro_section?.features ?? []),
  ].slice(0, 12);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteServiceUrl(slugPath)}#service`,
    name: getPlainText(data.navTitle || data.hero.heading),
    description: data.seo.metaDescription || getPlainText(data.hero.description),
    provider: {
      "@type": "Organization",
      "@id": "https://www.yueinfotech.com/#organization",
      name: "Yue Infotech",
      url: "https://www.yueinfotech.com",
      foundingDate: "2018",
    },
    areaServed: "Worldwide",
    serviceType: serviceTypes.length > 0 ? serviceTypes : undefined,
  };
}

function buildFaqJsonLd(data: ServiceDoc, slugPath: string) {
  if (!data.faq_section?.questions?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteServiceUrl(slugPath)}#faq`,
    mainEntity: data.faq_section.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildBreadcrumbJsonLd(data: ServiceDoc, slugPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.yueinfotech.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.yueinfotech.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: getPlainText(data.navTitle || data.hero.heading),
        item: absoluteServiceUrl(slugPath),
      },
    ],
  };
}

async function ServiceStructuredData({ data, slugPath }: { data: ServiceDoc; slugPath: string }) {
  const pageJsonLd = await getPageJsonLd(getServiceSeoPageId(slugPath), {
    fallbackPageIds: ["service-detail"],
  });
  const generatedGraphs = [
    buildServiceJsonLd(data, slugPath),
    buildFaqJsonLd(data, slugPath),
    buildBreadcrumbJsonLd(data, slugPath),
  ].filter(Boolean) as JsonLdItem[];
  const graphs = pageJsonLd.length ? pageJsonLd : generatedGraphs;

  return <StructuredDataScripts items={graphs} />;
}

function MainServiceTemplate({ data, slugPath }: { data: ServiceDoc; slugPath: string }) {
  const processEyebrow = slugPath === "content-writing-services" ? "How We Work" : "Why Choose Us";
  const isSubServicePage = Boolean(data.serviceType && data.serviceType !== "main");
  const heroInsightItems = [
    ...(data.intro_section?.features ?? []),
    ...(data.sub_services_section?.cards?.map((card) => card.title) ?? []),
    ...(data.process_section?.steps?.map((step) => step.title) ?? []),
  ].slice(0, 4);

  const highlightText = (text: string) => {
    if (!text) return '';
    // Use [\s\S]*? to safely match across newlines
    let result = text.replace(/\*\*([\s\S]*?)\*\*/g, '<span>$1</span>');
    result = result.replace(/\*([\s\S]*?)\*/g, '<span>$1</span>');
    
    if (!result.includes('<span>')) {
      const phrases = [
        "Outrank You",
        "Other Agencies",
        "Services",
        "Full-Funnel Marketing",
        "Delivers in Practice",
        "Yue Infotech",
        "Converts\\?"
      ];
      phrases.forEach(phrase => {
        // Convert literal spaces to \s+ so it matches across newlines too
        const flexiblePhrase = phrase.replace(/\s+/g, '\\s+');
        const regex = new RegExp(`(${flexiblePhrase})`, 'gi');
        result = result.replace(regex, '<span>$1</span>');
      });
    }
    
    result = result.replace(/<br\s*\/?>/g, '<br />');
    result = result.replace(/\n/g, '<br />');
    result = result.replace(/\|/g, '<br />');
    return result;
  };

  return (
    <main className="overflow-x-clip bg-[#F8F9FF] font-sans text-[#1E1B4B] selection:bg-[#5B4FE9]/20">
      <ServiceStructuredData data={data} slugPath={slugPath} />
      {/* ── HERO ── */}
      <section className={`${isSubServicePage ? "min-h-[92vh] lg:min-h-screen" : "min-h-screen"} bg-[linear-gradient(135deg,#0D1035_0%,#111437_40%,#1a1060_100%)] flex flex-col justify-center px-[5%] py-[120px] pb-[80px] relative overflow-hidden`}>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(91,79,233,0.15)_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="absolute top-[-100px] right-0 w-full max-w-[760px] h-[120%] z-0 bg-[linear-gradient(120deg,transparent_30%,rgba(91,79,233,0.12)_70%,rgba(91,79,233,0.05)_100%)]"></div>
        <div className={`relative z-10 w-full ${data.hero.bannerImage ? 'max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center' : 'max-w-[720px]'}`}>
          <div className={data.hero.bannerImage ? 'lg:col-span-7' : ''}>
            {isSubServicePage ? (
              <div className="mb-[20px] flex flex-wrap items-center gap-[8px] text-[0.78rem] font-[700] text-white/55">
                <Link href="/services/it-services" className="transition hover:text-white">
                  IT Services
                </Link>
                <span className="text-white/25">/</span>
                <span className="text-[#7B72EE]">{data.navTitle || getPlainText(data.hero.heading)}</span>
              </div>
            ) : null}
            {data.hero.badge && (
              <div className="inline-flex items-center gap-[8px] bg-[#5B4FE9]/20 border border-[#5B4FE9]/40 text-[#7B72EE] px-[16px] py-[8px] rounded-[50px] text-[0.78rem] font-[600] tracking-[0.04em] uppercase mb-[28px]">
                <span className="w-[6px] h-[6px] bg-[#7B72EE] rounded-full animate-pulse"></span>
                {data.hero.badge}
              </div>
            )}
            <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-[800] text-white leading-[1.1] tracking-[-0.03em] mb-[20px] [&>span]:text-[#7B72EE]" dangerouslySetInnerHTML={{ __html: highlightText(data.hero.heading) }}>
            </h1>
            
            {data.hero.description && (
              <div className="bg-white/5 border-l-[3px] border-[#7B72EE] px-[20px] py-[14px] rounded-[0_8px_8px_0] mb-[32px] text-[0.93rem] text-white/75 leading-[1.68] max-w-[580px] [&>strong]:text-white">
                <span dangerouslySetInnerHTML={{ __html: data.hero.description }} />
              </div>
            )}

            {data.hero.stats && data.hero.stats.length > 0 && (
              <div className="flex gap-[40px] flex-wrap mb-[40px]">
                {data.hero.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-[2rem] font-[800] text-[#7B72EE] leading-[1]">{stat.value}</div>
                    <div className="text-[0.78rem] text-white/55 mt-[2px]">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-[14px] flex-wrap">
              {data.hero.actions.map((action, idx) => {
                const baseClass = idx === 0 
                  ? "bg-[#5B4FE9] text-white px-[30px] py-[14px] rounded-[50px] text-[0.9rem] font-[700] no-underline inline-flex items-center gap-[8px] transition-all shadow-[0_4px_20px_rgba(91,79,233,0.4)] hover:bg-[#4A3FD4] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(91,79,233,0.5)]" 
                  : "bg-white/10 text-white border-[1.5px] border-white/25 px-[30px] py-[14px] rounded-[50px] text-[0.9rem] font-[600] no-underline inline-flex items-center gap-[8px] transition-all hover:bg-white/[0.18] hover:border-white/40";
                
                return (
                  <ServiceAction
                    key={`${action.text}-${idx}`}
                    action={action}
                    className={baseClass}
                    context={{ page: "service", route: `/services/${slugPath}`, section: "hero", trigger: action.popupId ?? action.type }}
                  />
                );
              })}
            </div>
          </div>
          {data.hero.bannerImage && (
            <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end animate-fade-up mt-10 lg:mt-0">
              {isSubServicePage ? (
                <div className="relative w-full max-w-[520px] rounded-[28px] border border-white/10 bg-white/[0.06] p-[10px] shadow-[0_32px_80px_rgba(0,0,0,0.48)] backdrop-blur">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-950">
                    <Image
                      src={data.hero.bannerImage}
                      alt={data.hero.bannerAlt || data.hero.heading}
                      fill
                      priority
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,16,53,0.82)_0%,rgba(13,16,53,0.08)_56%,transparent_100%)]" />
                    <div className="absolute right-[16px] top-[16px] flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#7B72EE] backdrop-blur">
                        <Sparkles className="h-4 w-4" />
                    </div>
                  </div>

                  {heroInsightItems.length > 0 ? (
                    <div className="relative mx-[10px] mt-[-54px] rounded-[22px] border border-white/10 bg-[#0D1035]/95 p-[18px] text-white shadow-[0_18px_44px_rgba(0,0,0,0.36)] backdrop-blur">
                      <div className="grid gap-[10px]">
                        {heroInsightItems.map((item, idx) => (
                          <div key={`${item}-${idx}`} className="flex items-start gap-[10px] text-[0.82rem] leading-[1.45] text-white/72">
                            <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0 text-[#00D4AA]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] bg-slate-950/40 backdrop-blur-sm">
                  <Image
                    src={data.hero.bannerImage}
                    alt={data.hero.bannerAlt || data.hero.heading}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── OVERVIEW (WHY US) ── */}
      {data.intro_section && (
        <section className={`px-[5%] py-[90px] ${isSubServicePage ? "bg-[#F8F9FF]" : "bg-white"}`}>
          <div className={isSubServicePage ? "mx-auto max-w-7xl" : ""}>
          <div className="text-[0.73rem] font-[700] tracking-[0.1em] uppercase text-[#5B4FE9] mb-[12px]">Overview</div>
          <div className={`grid grid-cols-1 md:grid-cols-2 items-start animate-fade-up ${isSubServicePage ? "gap-[34px] lg:gap-[56px]" : "gap-[48px]"}`}>
            <div className={data.intro_section.introImage ? "max-w-[560px]" : "max-w-[460px]"}>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-[800] text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-[14px] [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: highlightText(data.intro_section.heading) }} />
              <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[32px]">{data.intro_section.description}</p>
              
              <div className="flex gap-[12px] flex-wrap mb-[28px]">
                {data.intro_section.cta && (
                  <ServiceAction
                    action={data.intro_section.cta}
                    className="bg-[#5B4FE9] text-white px-[28px] py-[13px] rounded-[50px] text-[0.88rem] font-[700] no-underline inline-flex items-center gap-[7px] transition-all shadow-[0_4px_16px_rgba(91,79,233,0.3)] hover:bg-[#4A3FD4] hover:-translate-y-[2px]"
                    context={{ page: "service", route: `/services/${slugPath}`, section: "intro", trigger: data.intro_section.cta.popupId ?? data.intro_section.cta.type }}
                  />
                )}
                {data.intro_section.secondaryCta && (
                  <ServiceAction
                    action={data.intro_section.secondaryCta}
                    className="bg-white text-[#5B4FE9] border-[1.5px] border-[#E5E7EB] px-[28px] py-[13px] rounded-[50px] text-[0.88rem] font-[600] no-underline inline-flex items-center gap-[7px] transition-all hover:border-[#5B4FE9] hover:shadow-[0_4px_16px_rgba(91,79,233,0.12)]"
                    context={{ page: "service", route: `/services/${slugPath}`, section: "intro", trigger: data.intro_section.secondaryCta.popupId ?? data.intro_section.secondaryCta.type }}
                  />
                )}
              </div>

              {data.intro_section.introImage && data.intro_section.features?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  {data.intro_section.features.map((feature, idx) => (
                    <div key={idx} className="bg-white rounded-[14px] px-[20px] py-[18px] flex items-start gap-[12px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border border-[#5B4FE9]/[0.08]">
                      <div className="w-[10px] h-[10px] bg-[#5B4FE9] rounded-full shrink-0 mt-[6px]"></div>
                      <p className="text-[0.88rem] font-[600] text-[#1E1B4B] leading-[1.4]">{feature}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            
            {data.intro_section.introImage ? (
              <div className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-[#0D1035] shadow-[0_18px_60px_rgba(13,16,53,0.22)] md:min-h-[520px]">
                <Image
                  src={data.intro_section.introImage}
                  alt={data.intro_section.imageAlt || data.intro_section.heading}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,16,53,0.72)_0%,transparent_55%)]" />
                {(data.intro_section.imageBadgeTitle || data.intro_section.imageBadgeDescription) ? (
                  <div className="absolute bottom-[20px] left-[20px] right-[20px] flex items-start gap-[12px] rounded-[16px] border border-white/10 bg-[#0D1035]/90 p-[16px] text-white shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur">
                    <span className="mt-[4px] h-[8px] w-[8px] shrink-0 rounded-full bg-[#7B72EE] shadow-[0_0_8px_#7B72EE]" />
                    <span className="text-[0.78rem] leading-[1.45] text-white/75">
                      {data.intro_section.imageBadgeTitle ? (
                        <strong className="mb-[2px] block text-[0.86rem] text-white">{data.intro_section.imageBadgeTitle}</strong>
                      ) : null}
                      {data.intro_section.imageBadgeDescription}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : data.intro_section.features && data.intro_section.features.length > 0 ? (
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-[14px] ${isSubServicePage ? "content-start" : ""}`}>
                {data.intro_section.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-[12px] border px-[20px] py-[18px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] ${isSubServicePage ? "rounded-[18px] border-[#5B4FE9]/10 bg-[linear-gradient(135deg,#fff_0%,#F7F8FF_100%)]" : "rounded-[14px] border-[#5B4FE9]/[0.08] bg-white"}`}
                  >
                    <div className={`${isSubServicePage ? "flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#EEF0FF] text-[#5B4FE9]" : "w-[10px] h-[10px] bg-[#5B4FE9] rounded-full shrink-0 mt-[6px]"}`}>
                      {isSubServicePage ? <CheckCircle2 className="h-4 w-4" /> : null}
                    </div>
                    <p className="text-[0.88rem] font-[600] text-[#1E1B4B] leading-[1.4]">{feature}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {data.intro_section.additionalDescription ? (
            <div className="mt-[42px] max-w-[760px] rounded-[12px] border-l-[4px] border-[#5B4FE9] bg-[#EEF0FF] px-[28px] py-[24px] text-[0.95rem] font-[500] leading-[1.7] text-[#1E1B4B] md:ml-auto [&>strong]:font-[800] [&>strong]:text-[#5B4FE9]">
              <span dangerouslySetInnerHTML={{ __html: data.intro_section.additionalDescription }} />
            </div>
          ) : null}
          </div>
        </section>
      )}

      {/* ── SERVICES GRID ── */}
      {data.sub_services_section?.cards?.length ? (
        <section className={`px-[5%] py-[90px] ${isSubServicePage ? "bg-white" : "bg-[#F8F9FF]"}`} id="services">
          <div className="mx-auto max-w-7xl">
          <div className={isSubServicePage ? "max-w-[760px]" : ""}>
            <div className="text-[0.73rem] font-[700] tracking-[0.1em] uppercase text-[#5B4FE9] mb-[12px]">What We Do</div>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-[800] text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-[14px] [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: highlightText(data.sub_services_section.heading) }} />
            <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[52px]">{data.sub_services_section.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[24px] animate-fade-up">
            {data.sub_services_section.cards.map((card, idx) => {
              const isFeatured = card.featured ?? idx < 2;
              const isWide = card.wide ?? isFeatured;
              const titleSupportingText = card.snippet || card.subtitle;
              const calloutText = card.description && card.description !== card.snippet ? card.description : "";
              return (
                <div key={card.id || idx} className={`relative overflow-hidden bg-white rounded-[20px] px-[28px] py-[32px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border transition-all duration-[0.25s] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(91,79,233,0.16)] flex flex-col ${isWide ? 'md:col-span-2' : ''} ${isSubServicePage ? 'border-[#5B4FE9]/10 shadow-[0_18px_60px_rgba(91,79,233,0.08)]' : isFeatured ? 'border-2 border-[#5B4FE9] bg-[linear-gradient(135deg,#fff_0%,#EEF0FF_100%)]' : 'border-[#5B4FE9]/[0.06]'}`}>
                  {isSubServicePage ? <div className="absolute inset-x-0 top-0 h-[5px] bg-[linear-gradient(90deg,#5B4FE9,#00D4AA)]" /> : null}
                  <div className="mb-[16px] flex items-center justify-between gap-[16px]">
                    <div className="text-[0.72rem] font-[700] text-[#5B4FE9] tracking-[0.08em] uppercase">{String(idx + 1).padStart(2, '0')} — {card.category || card.subtitle || "Service"}</div>
                    {isSubServicePage ? (
                      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-[#5B4FE9]">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    ) : null}
                  </div>
                  <h3 className="text-[1.08rem] font-[800] text-[#1E1B4B] mb-[8px] tracking-[-0.01em]">{card.title}</h3>
                  {titleSupportingText && (
                    <div
                      className="text-[0.82rem] font-[600] text-[#5B4FE9] mb-[10px] leading-[1.55]"
                      dangerouslySetInnerHTML={{ __html: titleSupportingText }}
                    />
                  )}
                  
                  {calloutText && (
                    <div className={`text-[0.83rem] text-[#4B5563] leading-[1.65] mb-[16px] px-[14px] py-[10px] bg-[#EEF0FF] border-l-[3px] border-[#5B4FE9] ${isSubServicePage ? "rounded-[12px]" : "rounded-[8px]"}`}>
                      <span dangerouslySetInnerHTML={{ __html: calloutText }} />
                    </div>
                  )}
                  
                  {card.features && card.features.length > 0 && (
                    <ul className="list-none mb-[20px] flex-1">
                      {card.features.map((feature, fidx) => (
                        <li key={fidx} className="text-[0.83rem] text-[#4B5563] py-[5px] pl-[18px] relative before:content-[''] before:absolute before:left-0 before:top-[13px] before:w-[6px] before:h-[6px] before:bg-[#5B4FE9] before:rounded-full">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {card.cta && (
                    <Link href={card.cta.href} className="text-[0.82rem] font-[700] text-[#5B4FE9] no-underline inline-flex items-center gap-[5px] mt-auto transition-all hover:gap-[9px]">
                      {card.cta.text} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          </div>
        </section>
      ) : null}

      {data.process_section?.bannerImage ? (
        <section className="relative min-h-[420px] overflow-hidden bg-[#0D1035] px-[5%] py-[80px]">
          <Image
            src={data.process_section.bannerImage}
            alt={data.process_section.bannerAlt || data.process_section.bannerHeading || data.process_section.heading}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,16,53,0.9)_0%,rgba(26,16,96,0.65)_50%,rgba(13,16,53,0.3)_100%)]" />
          <div className="relative z-10 max-w-[760px] text-white">
            {data.process_section.bannerLabel ? (
              <div className="mb-[12px] text-[0.73rem] font-[800] uppercase tracking-[0.12em] text-[#7B72EE]">
                {data.process_section.bannerLabel}
              </div>
            ) : null}
            {data.process_section.bannerHeading ? (
              <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[800] leading-[1.08] tracking-[-0.035em]">
                {data.process_section.bannerHeading}
              </h2>
            ) : null}
            {data.process_section.bannerDescription ? (
              <p className="mt-[18px] max-w-[620px] text-[1rem] leading-[1.72] text-white/72">
                {data.process_section.bannerDescription}
              </p>
            ) : null}
            {data.process_section.bannerStats?.length ? (
              <div className="mt-[34px] flex flex-wrap gap-[18px]">
                {data.process_section.bannerStats.map((stat, idx) => (
                  <div key={`${stat.label}-${idx}`} className="rounded-[16px] border border-white/10 bg-white/10 px-[20px] py-[14px] backdrop-blur">
                    <div className="text-[1.4rem] font-[800] text-[#7B72EE]">{stat.value}</div>
                    <div className="text-[0.76rem] text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ── PROCESS FUNNEL ── */}
      {data.process_section && (
        <section className={`px-[5%] py-[90px] ${isSubServicePage ? "bg-[#F8F9FF]" : "bg-white"}`} id="approach">
          {isSubServicePage ? (
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(340px,0.82fr)_minmax(0,1.18fr)] lg:gap-[34px]">
              <div className="lg:sticky lg:top-[118px] lg:self-start">
                <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0D1035_0%,#15184A_54%,#25117B_100%)] p-[26px] text-white shadow-[0_28px_80px_rgba(13,16,53,0.24)] sm:p-[34px] lg:max-h-[calc(100vh-148px)] lg:overflow-y-auto">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(123,114,238,0.18)_1px,transparent_1px)] [background-size:26px_26px]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-[12px] inline-flex items-center gap-[8px] rounded-full border border-white/12 bg-white/10 px-[13px] py-[7px] text-[0.72rem] font-[800] uppercase text-[#7B72EE]">
                        <Layers3 className="h-4 w-4" />
                        {processEyebrow}
                      </div>
                      <h2
                        className="text-[clamp(2rem,3.8vw,3.1rem)] font-[800] leading-[1.12] text-white [&>span]:text-[#7B72EE]"
                        dangerouslySetInnerHTML={{ __html: highlightText(data.process_section.heading) }}
                      />
                      {data.process_section.description ? (
                        <p className="mt-[18px] text-[0.98rem] leading-[1.72] text-white/68">
                          {data.process_section.description}
                        </p>
                      ) : null}
                    </div>
                    {data.process_section.cta && (
                      <div className="mt-[28px]">
                        <ServiceAction
                          action={data.process_section.cta}
                          className="inline-flex items-center gap-[7px] rounded-[50px] bg-[#5B4FE9] px-[26px] py-[13px] text-[0.88rem] font-[800] text-white no-underline shadow-[0_12px_34px_rgba(91,79,233,0.35)] transition-all hover:-translate-y-[2px] hover:bg-[#4A3FD4]"
                          context={{ page: "service", route: `/services/${slugPath}`, section: "process", trigger: data.process_section.cta.popupId ?? data.process_section.cta.type }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-[18px] lg:pb-[40px]">
                {data.process_section.steps.map((step, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-[22px] border border-[#5B4FE9]/10 bg-white p-[22px] shadow-[0_14px_48px_rgba(91,79,233,0.08)] transition-all duration-[0.25s] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(91,79,233,0.14)] sm:p-[26px]">
                    <div className="absolute right-0 top-0 h-[82px] w-[82px] rounded-bl-full bg-[#EEF0FF] transition group-hover:bg-[#E3E6FF]" />
                    <div className="relative z-10 flex gap-[18px]">
                      <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] bg-[#0D1035] text-[0.82rem] font-[900] text-[#7B72EE] shadow-[0_12px_28px_rgba(13,16,53,0.16)]">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="mb-[5px] text-[0.72rem] font-[800] uppercase text-[#5B4FE9]">
                          {step.step_label || `Stage ${idx + 1}`}
                        </div>
                        <h3 className="text-[1.08rem] font-[800] text-[#1E1B4B]">{step.title}</h3>
                        <p className="mt-[8px] text-[0.9rem] leading-[1.68] text-[#4B5563]">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="text-[0.73rem] font-[700] tracking-[0.1em] uppercase text-[#5B4FE9] mb-[12px]">{processEyebrow}</div>
              <div className={`grid grid-cols-1 ${data.process_section.image ? "lg:grid-cols-2" : "md:grid-cols-2"} gap-[80px] items-start animate-fade-up`}>
                {data.process_section.image ? (
                  <div className="relative min-h-[420px] overflow-hidden rounded-[24px] bg-[#0D1035] shadow-[0_18px_60px_rgba(13,16,53,0.2)] lg:row-span-2 lg:min-h-[560px]">
                    <Image
                      src={data.process_section.image}
                      alt={data.process_section.imageAlt || data.process_section.heading}
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,16,53,0.78)_0%,rgba(13,16,53,0.1)_55%,transparent_100%)]" />
                    {(data.process_section.imageCardLabel || data.process_section.imageStats?.length) ? (
                      <div className="absolute bottom-[20px] left-[20px] right-[20px] rounded-[16px] border border-white/10 bg-[#0D1035]/92 p-[18px] text-white backdrop-blur">
                        {data.process_section.imageCardLabel ? (
                          <div className="mb-[8px] text-[0.62rem] font-[800] uppercase tracking-[0.08em] text-[#7B72EE]">
                            {data.process_section.imageCardLabel}
                          </div>
                        ) : null}
                        {data.process_section.imageStats?.map((stat, idx) => (
                          <div key={`${stat.label}-${idx}`} className="flex items-center justify-between border-b border-white/10 py-[6px] last:border-b-0">
                            <span className="text-[0.73rem] text-white/55">{stat.label}</span>
                            <span className="text-[0.73rem] font-[800] text-[#00D4AA]">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="pt-[16px]">
                  <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-[800] text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-[14px] [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: highlightText(data.process_section.heading) }} />
                  <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[36px]">{data.process_section.description}</p>
                  {data.process_section.cta && (
                    <ServiceAction
                      action={data.process_section.cta}
                      className="bg-[#5B4FE9] text-white px-[28px] py-[13px] rounded-[50px] text-[0.88rem] font-[700] no-underline inline-flex items-center gap-[7px] transition-all shadow-[0_4px_16px_rgba(91,79,233,0.3)] hover:bg-[#4A3FD4] hover:-translate-y-[2px]"
                      context={{ page: "service", route: `/services/${slugPath}`, section: "process", trigger: data.process_section.cta.popupId ?? data.process_section.cta.type }}
                    />
                  )}
                </div>

                <div className={`flex flex-col gap-0 ${data.process_section.image ? "lg:col-start-2" : ""}`}>
                  {data.process_section.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-[24px] relative pb-[32px] last:pb-0">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-[48px] h-[48px] rounded-full border-2 border-[#5B4FE9] bg-white flex items-center justify-center text-[0.82rem] font-[800] text-[#5B4FE9] shrink-0 z-10">{String(idx + 1).padStart(2, '0')}.</div>
                        {idx !== data.process_section!.steps.length - 1 && (
                          <div className="w-[2px] bg-[linear-gradient(to_bottom,#5B4FE9,rgba(91,79,233,0.1))] flex-1 my-[4px]"></div>
                        )}
                      </div>
                      <div className="bg-white rounded-[16px] px-[22px] py-[20px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border border-[#5B4FE9]/[0.08] flex-1">
                        <div className="text-[0.7rem] font-[700] text-[#5B4FE9] tracking-[0.08em] uppercase mb-[5px]">{step.step_label || `Stage ${idx + 1}`}</div>
                        <h3 className="text-[1rem] font-[800] text-[#1E1B4B] mb-[6px]">{step.title}</h3>
                        <p className="text-[0.84rem] text-[#4B5563] leading-[1.6]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* ── RESULTS ── */}
      {data.results_section?.cards?.length && data.results_section.cards.length > 0 ? (
        <section className="px-[5%] py-[90px] bg-[#F8F9FF]" id="results">
          <div className="text-[0.73rem] font-[700] tracking-[0.1em] uppercase text-[#5B4FE9] mb-[12px]">Documented Results</div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-[800] text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-[14px] [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: highlightText(data.results_section.heading) }} />
          <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[52px]">{data.results_section.description}</p>

          {data.results_section.images?.length ? (
            <div className="mb-[28px] grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#5B4FE9]/10 bg-white shadow-[0_18px_60px_rgba(91,79,233,0.08)] sm:grid-cols-3">
              {data.results_section.images.map((image, idx) => (
                <div key={`${image.tag}-${idx}`} className="relative min-h-[220px] overflow-hidden border-b border-white/10 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 33vw, 90vw" className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,27,75,0.92)_0%,transparent_60%)]" />
                  <div className="absolute bottom-[18px] left-[18px] right-[18px] flex items-center justify-between gap-[12px]">
                    <span className="rounded-[50px] bg-[#5B4FE9] px-[10px] py-[4px] text-[0.62rem] font-[800] uppercase tracking-[0.08em] text-white">
                      {image.tag}
                    </span>
                    <span className="text-[1.6rem] font-[800] leading-[1] text-white">{image.value}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] mb-[40px] animate-fade-up">
            {data.results_section.cards.map((card, idx) => (
              <div key={card.id || idx} className="bg-white rounded-[20px] px-[24px] py-[28px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border border-[#5B4FE9]/[0.06] transition-all duration-[0.25s] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(91,79,233,0.16)]">
                {card.tag && (
                  <div className="inline-block bg-[#EEF0FF] text-[#5B4FE9] text-[0.72rem] font-[700] tracking-[0.06em] uppercase px-[12px] py-[5px] rounded-[50px] mb-[18px]">
                    {card.tag}
                  </div>
                )}
                
                <div className="flex flex-col gap-[12px] mb-[18px]">
                  {card.metrics.map((metric, midx) => (
                    <div key={midx} className="flex justify-between items-center pb-[10px] border-b border-[#E5E7EB] last:border-b-0 last:pb-0">
                      <span className="text-[0.82rem] text-[#4B5563]">{metric.label}</span>
                      <span className={`text-[1.2rem] font-[800] ${metric.tone === 'positive' || String(metric.value).includes('+') || String(metric.value).includes('-') ? 'text-[#059669]' : 'text-[#5B4FE9]'}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="text-[0.78rem] text-[#9CA3AF] leading-[1.6] pt-[14px] border-t border-[#E5E7EB]">
                  {card.description}
                </div>
              </div>
            ))}
          </div>
          
          {data.results_section.cta && (
            <div className="text-center">
              <Link href={data.results_section.cta.href} className="bg-[#5B4FE9] text-white px-[28px] py-[13px] rounded-[50px] text-[0.88rem] font-[700] no-underline inline-flex items-center gap-[7px] transition-all shadow-[0_4px_16px_rgba(91,79,233,0.3)] hover:bg-[#4A3FD4] hover:-translate-y-[2px]">
                {data.results_section.cta.text} →
              </Link>
            </div>
          )}
        </section>
      ) : null}

      {/* ── TIERS ── */}
      {data.engagement_tiers_section && data.engagement_tiers_section.tiers.length > 0 && (
        <section className="px-[5%] py-[90px] bg-white">
          <div className="text-[0.73rem] font-[700] tracking-[0.1em] uppercase text-[#5B4FE9] mb-[12px]">Engagement Options</div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-[800] text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-[14px] [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: highlightText(data.engagement_tiers_section.heading) }} />
          <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[52px]">{data.engagement_tiers_section.description}</p>

          {data.engagement_tiers_section.image ? (
            <div className="relative mb-[34px] min-h-[320px] overflow-hidden rounded-[24px] bg-[#0D1035] shadow-[0_18px_60px_rgba(13,16,53,0.18)]">
              <Image
                src={data.engagement_tiers_section.image}
                alt={data.engagement_tiers_section.imageAlt || data.engagement_tiers_section.heading}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,16,53,0.97)_0%,rgba(13,16,53,0.6)_55%,transparent_100%)]" />
              <div className="relative z-10 max-w-[620px] px-[28px] py-[40px] text-white sm:px-[44px]">
                {data.engagement_tiers_section.imageLabel ? (
                  <div className="mb-[10px] text-[0.72rem] font-[800] uppercase tracking-[0.12em] text-[#7B72EE]">
                    {data.engagement_tiers_section.imageLabel}
                  </div>
                ) : null}
                {data.engagement_tiers_section.imageHeading ? (
                  <h3 className="text-[clamp(1.7rem,3vw,2.7rem)] font-[800] leading-[1.12] tracking-[-0.03em]">
                    {data.engagement_tiers_section.imageHeading}
                  </h3>
                ) : null}
                {data.engagement_tiers_section.imageDescription ? (
                  <p className="mt-[16px] max-w-[520px] text-[0.95rem] leading-[1.72] text-white/70">
                    {data.engagement_tiers_section.imageDescription}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] animate-fade-up">
            {data.engagement_tiers_section.tiers.map((tier, idx) => (
              <div key={tier.id || idx} className={`rounded-[20px] px-[28px] py-[36px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] flex flex-col transition-all duration-[0.25s] hover:-translate-y-1 ${tier.featured ? 'border-2 border-[#5B4FE9] bg-[#0D1035] text-white' : 'bg-white border border-[#5B4FE9]/[0.08]'}`}>
                {tier.badge && <div className="inline-block bg-[#5B4FE9] text-white text-[0.68rem] font-[700] tracking-[0.06em] uppercase px-[12px] py-[4px] rounded-[50px] mb-[14px] self-start">{tier.badge}</div>}
                <div className={`text-[1.6rem] font-[800] tracking-[-0.02em] mb-[4px] ${tier.featured ? 'text-white' : 'text-[#1E1B4B]'}`}>{tier.name}</div>
                <div className={`text-[0.83rem] mb-[24px] pb-[20px] border-b ${tier.featured ? 'text-white/65 border-white/12' : 'text-[#4B5563] border-[#E5E7EB]'}`}>{tier.for}</div>
                
                <ul className="list-none flex-1">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className={`text-[0.84rem] py-[8px] pl-[22px] relative border-b ${tier.featured ? 'text-white/80 border-white/10 before:bg-[#7B72EE]' : 'text-[#4B5563] border-[#E5E7EB] before:bg-[#5B4FE9]'} before:content-[''] before:absolute before:left-0 before:top-[17px] before:w-[8px] before:h-[8px] before:rounded-full`}>{feature}</li>
                  ))}
                </ul>
                
                {tier.cta && (
                  <div className="mt-[28px]">
                    <Link href={tier.cta.href} className={`w-full border-none px-[20px] py-[13px] rounded-[50px] text-[0.87rem] font-[700] no-underline flex items-center justify-center gap-[6px] transition-all cursor-pointer ${tier.featured ? 'bg-[#5B4FE9] text-white shadow-[0_4px_20px_rgba(91,79,233,0.4)] hover:bg-white hover:text-[#5B4FE9]' : 'bg-[#EEF0FF] text-[#5B4FE9] hover:bg-[#5B4FE9] hover:text-white'}`}>
                      {tier.cta.text} →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.direct_answer_section?.heading && data.direct_answer_section.content ? (
        <section className="bg-[#F8F9FF] px-[5%] py-[84px] sm:py-[96px]">
          <div className="max-w-[860px]">
            {data.direct_answer_section.eyebrow ? (
              <div className="mb-[18px] text-[0.73rem] font-[800] uppercase tracking-[0.12em] text-[#5B4FE9]">
                {data.direct_answer_section.eyebrow}
              </div>
            ) : null}
            <h2
              className="mb-[48px] text-[clamp(2rem,4vw,3.1rem)] font-[800] leading-[1.12] tracking-[-0.035em] text-[#1E1B4B] [&>span]:text-[#5B4FE9]"
              dangerouslySetInnerHTML={{ __html: highlightText(data.direct_answer_section.heading) }}
            />

            <div className="rounded-[22px] border border-[#5B4FE9]/20 bg-white/55 px-[28px] py-[30px] shadow-[0_18px_60px_rgba(91,79,233,0.06)] backdrop-blur sm:px-[44px] sm:py-[42px]">
              {data.direct_answer_section.cardLabel ? (
                <div className="mb-[22px] text-[0.78rem] font-[800] uppercase tracking-[0.1em] text-[#5B4FE9]">
                  {data.direct_answer_section.cardLabel}
                </div>
              ) : null}
              <p className="text-[1rem] font-[500] leading-[1.75] text-[#1E1B4B]">
                {data.direct_answer_section.content}
              </p>
            </div>

            {data.direct_answer_section.cta ? (
              <div className="mt-[34px]">
                <ServiceAction
                  action={data.direct_answer_section.cta}
                  className="inline-flex items-center gap-[8px] rounded-[50px] bg-[#5B4FE9] px-[28px] py-[14px] text-[0.9rem] font-[800] text-white no-underline shadow-[0_12px_32px_rgba(91,79,233,0.28)] transition-all hover:-translate-y-[2px] hover:bg-[#4A3FD4] hover:shadow-[0_16px_38px_rgba(91,79,233,0.34)]"
                  context={{
                    page: "service",
                    route: `/services/${slugPath}`,
                    section: "direct-answer",
                    trigger: data.direct_answer_section.cta.popupId ?? data.direct_answer_section.cta.type,
                  }}
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ── INDUSTRIES ── */}
      {data.industries_section?.items?.length ? (
        <section className="px-[5%] py-[60px] bg-[#F8F9FF]">
          <div className="text-[0.73rem] font-[700] tracking-[0.1em] uppercase text-[#5B4FE9] mb-[12px]">Industries We Serve</div>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-[800] text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-0">{data.industries_section.heading}</h2>
          <div className="flex flex-wrap gap-[10px] mt-[28px]">
            {data.industries_section.items.map((industry, idx) => (
              <span key={idx} className="bg-white border-[1.5px] border-[#E5E7EB] text-[#4B5563] text-[0.84rem] font-[600] px-[20px] py-[10px] rounded-[50px] transition-all cursor-default shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#5B4FE9] hover:text-[#5B4FE9] hover:shadow-[0_4px_16px_rgba(91,79,233,0.12)]">{industry}</span>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── FAQ ── */}
      {data.faq_section?.questions?.length ? (
        <div className="bg-white w-full">
          <FAQSection data={data.faq_section} />
        </div>
      ) : null}

      {/* ── FINAL CTA ── */}
      {data.final_cta_section && (
        <section className="bg-[linear-gradient(135deg,#0D1035_0%,#111437_50%,#1a1060_100%)] px-[5%] py-[100px] text-center relative overflow-hidden">
          <div className="absolute top-[-100px] left-1/2 h-[400px] w-full max-w-[600px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(91,79,233,0.2)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="text-[0.73rem] font-[700] tracking-[0.1em] uppercase text-[#7B72EE] mb-[16px] relative z-10">Start Today</div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-[800] text-white tracking-[-0.03em] leading-[1.1] m-[0_auto_16px] max-w-[700px] relative z-10 [&>span]:text-[#7B72EE]" dangerouslySetInnerHTML={{ __html: highlightText(data.final_cta_section.heading) }} />
          {data.final_cta_section.subheading && <p className="text-white/65 max-w-[500px] m-[0_auto_40px] text-[0.95rem] relative z-10">{data.final_cta_section.subheading}</p>}
          
          <div className="flex justify-center gap-[14px] flex-wrap relative z-10">
            {data.final_cta_section.actions.map((action, idx) => {
              const baseClass = idx === 0 
                ? "bg-[#5B4FE9] text-white px-[30px] py-[14px] rounded-[50px] text-[0.9rem] font-[700] no-underline inline-flex items-center gap-[8px] transition-all shadow-[0_4px_20px_rgba(91,79,233,0.4)] hover:bg-[#4A3FD4] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(91,79,233,0.5)]" 
                : idx === 1 
                  ? "bg-white/10 text-white border-[1.5px] border-white/25 px-[30px] py-[14px] rounded-[50px] text-[0.9rem] font-[600] no-underline inline-flex items-center gap-[8px] transition-all hover:bg-white/[0.18] hover:border-white/40" 
                  : "bg-[#25D366]/[0.12] text-[#25D366] border-[1.5px] border-[#25D366]/[0.35] px-[24px] py-[14px] rounded-[50px] text-[0.88rem] font-[700] no-underline inline-flex items-center gap-[8px] transition-all hover:bg-[#25D366]/20";
              
              if (idx === 2) {
                return (
                  <a key={idx} href="https://wa.me/918859366292" className={baseClass} target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {action.text}
                  </a>
                );
              }

              return (
                <ServiceAction
                  key={idx}
                  action={action}
                  className={baseClass}
                  context={{ page: "service", route: `/services/${slugPath}`, section: "final-cta", trigger: action.popupId ?? action.type }}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = joinSlug(slug);
  const data = await getServiceBySlug(slugPath);
  if (!data) return { title: "Service Not Found" };

  const fallback: Metadata = {
    title: data.seo.metaTitle,
    description: data.seo.metaDescription,
    keywords: data.seo.keywords,
    alternates: {
      canonical: absoluteServiceUrl(slugPath),
    },
    openGraph: {
      type: "website",
      title: data.seo.metaTitle,
      description: data.seo.metaDescription,
      url: absoluteServiceUrl(slugPath),
      siteName: "Yue Infotech",
      images: data.hero.backgroundImage ? [{ url: data.hero.backgroundImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.metaTitle,
      description: data.seo.metaDescription,
      images: data.hero.backgroundImage ? [data.hero.backgroundImage] : undefined,
    },
  };

  return getPageMetadata(getServiceSeoPageId(slugPath), fallback, {
    revalidate,
    fallbackPageIds: ["service-detail"],
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = joinSlug(slug);
  const data = await getServiceBySlug(slugPath);

  if (!data) return notFound();

  const related = await getRelatedMainServices(data.slug);
  const isMainService = !data.serviceType || data.serviceType === "main";
  const hasEnhancedServiceContent =
    Boolean(data.hero?.stats?.length) ||
    Boolean(data.results_section?.cards?.length) ||
    Boolean(data.engagement_tiers_section?.tiers?.length);
  const isITServicePage = slugPath === "it-services" || slugPath.startsWith("it-services/");

  if (isMainService || hasEnhancedServiceContent || isITServicePage) {
    return <MainServiceTemplate data={data} slugPath={slugPath} />;
  }

  return (
    <main>
      <ServiceStructuredData data={data} slugPath={slugPath} />
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className={`mx-auto max-w-6xl px-6 ${data.hero.bannerImage ? 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-center' : ''}`}>
          <div className={data.hero.bannerImage ? 'lg:col-span-7' : ''}>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-indigo-600">{data.hero.subheading}</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{data.hero.heading}</h1>
            <p className="mt-4 max-w-3xl text-slate-600">{data.hero.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {data.hero.actions.map((action, idx) => (
                <HeroAction
                  key={`${action.text}-${idx}`}
                  action={action}
                  context={{
                    page: "service",
                    route: `/services/${slugPath}`,
                    section: "hero",
                    trigger: action.popupId ?? action.type,
                  }}
                />
              ))}
            </div>
          </div>
          {data.hero.bannerImage && (
            <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end mt-10 lg:mt-0">
              <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-[24px] overflow-hidden border border-slate-200 shadow-xl bg-slate-50">
                <Image
                  src={data.hero.bannerImage}
                  alt={data.hero.bannerAlt || data.hero.heading}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {data.intro_section && <IntroSection data={data.intro_section} />}
      {data.sub_services_section?.cards?.length ? (
        <SubServicesGrid data={data.sub_services_section} />
      ) : null}

      {data.process_section && <ProcessSection data={data.process_section} />}

      {data.industries_section?.items?.length ? (
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-3xl font-extrabold text-slate-900">
              {data.industries_section.heading}
            </h2>
            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {data.industries_section.items.map((industry) => (
                <div
                  key={industry}
                  className="group relative flex items-center justify-center rounded-2xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-sm font-semibold text-slate-900 sm:text-base">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 && (
        <section className="bg-white py-20">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">Explore Other Services</h2>
          <div className="container mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {related.map((svc, i) => (
              <MainServiceCard key={svc.slug} service={svc} index={i} />
            ))}
          </div>
        </section>
      )}

      {data.faq_section?.questions?.length ? (
        <div className="bg-white w-full">
          <FAQSection data={data.faq_section} />
        </div>
      ) : null}

      {data.final_cta_section ? (
        <section className="py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-indigo-600 px-8 py-14 text-center text-white shadow-2xl shadow-indigo-500/30">
            <h2 className="text-3xl font-bold">{data.final_cta_section.heading}</h2>
            {data.final_cta_section.subheading ? (
              <p className="mt-3 text-indigo-200">{data.final_cta_section.subheading}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {data.final_cta_section.actions.map((action, idx) => (
                <ServiceFinalCtaAction
                  key={`${action.text}-${idx}`}
                  action={action}
                  context={{
                    page: "service",
                    route: `/services/${slugPath}`,
                    section: "final-cta",
                    trigger: action.popupId ?? action.type,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
