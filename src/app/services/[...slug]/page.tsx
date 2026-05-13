import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

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
  getAllServiceSlugs,
  getRelatedMainServices,
  getServiceBySlug,
} from "@/lib/services.service";
import { getPageMetadata } from "@/lib/pageSeo.service";
import type { ServiceDoc } from "@/types";

export const revalidate = 2592000;
export const dynamicParams = true;

function joinSlug(segments?: string[]) {
  return (segments ?? []).join("/").trim();
}

function renderHeroTitle(heading: string) {
  const normalized = heading.trim();
  if (normalized.toLowerCase().includes("leads & sales")) {
    return (
      <>
        Drive More Traffic,
        <br />
        Leads & <em className="not-italic text-[#7B72EE]">Sales</em>
      </>
    );
  }

  return normalized;
}



function MainServiceTemplate({ data, slugPath }: { data: ServiceDoc; slugPath: string }) {
  return (
    <main className="bg-[#F8F9FF] text-[#1E1B4B] font-sans selection:bg-[#5B4FE9]/20">
      {/* ── HERO ── */}
      <section className="min-h-screen bg-gradient-to-br from-[#0D1035] via-[#111437] to-[#1a1060] flex flex-col justify-center px-[5%] py-[120px] pb-[80px] relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(91,79,233,0.15)_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="absolute top-[-100px] right-0 w-[55%] h-[120%] z-0 bg-[linear-gradient(120deg,transparent_30%,rgba(91,79,233,0.12)_70%,rgba(91,79,233,0.05)_100%)]"></div>
        <div className="relative z-10 max-w-[720px]">
          <div className="inline-flex items-center gap-2 bg-[#5B4FE9]/20 border border-[#5B4FE9]/40 text-[#7B72EE] px-4 py-2 rounded-full text-[0.78rem] font-semibold tracking-wider uppercase mb-7">
            <span className="w-1.5 h-1.5 bg-[#7B72EE] rounded-full animate-pulse"></span>
            {data.hero.badge || data.hero.subheading}
          </div>
          <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-5 [&>em]:not-italic [&>em]:text-[#7B72EE]">
            {renderHeroTitle(data.hero.heading)}
          </h1>
          
          {data.hero.description && (
            <div className="bg-white/5 border-l-[3px] border-[#7B72EE] px-5 py-3.5 rounded-r-lg mb-8 text-[0.93rem] text-white/75 leading-[1.68] max-w-[580px] [&>strong]:text-white">
              {data.hero.description}
            </div>
          )}

          {Array.isArray(data.hero.stats) && data.hero.stats.length > 0 && (
            <div className="flex gap-10 flex-wrap mb-10">
              {data.hero.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-[2rem] font-extrabold text-[#7B72EE] leading-none">{stat.value}</div>
                  <div className="text-[0.78rem] text-white/55 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3.5 flex-wrap">
            {data.hero.actions.map((action, idx) => {
              const baseClass = idx === 0 
                ? "bg-[#5B4FE9] text-white px-[30px] py-[14px] rounded-full text-[0.9rem] font-bold no-underline inline-flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(91,79,233,0.4)] hover:bg-[#4A3FD4] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(91,79,233,0.5)]" 
                : "bg-white/10 text-white border-[1.5px] border-white/25 px-[30px] py-[14px] rounded-full text-[0.9rem] font-semibold no-underline inline-flex items-center gap-2 transition-all hover:bg-white/20 hover:border-white/40";
              return (
                <ServiceAction
                  key={idx}
                  action={action}
                  className={baseClass}
                  context={{
                    page: "service",
                    route: `/services/${slugPath}`,
                    section: "hero",
                    trigger: action.popupId ?? action.type,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY US (Overview) ── */}
      {data.intro_section && (
        <section className="px-[5%] py-[90px] bg-white">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">Overview</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] items-start animate-fade-up">
            <div className="max-w-[460px]">
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-3.5 [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: data.intro_section.heading.replace('Other Agencies', '<span>Other Agencies</span>') }} />
              <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[32px]">{data.intro_section.description}</p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {data.intro_section.cta && (
                  <ServiceAction
                    action={data.intro_section.cta}
                    className="bg-[#5B4FE9] text-white px-[28px] py-[13px] rounded-full text-[0.88rem] font-bold no-underline inline-flex items-center gap-[7px] transition-all shadow-[0_4px_16px_rgba(91,79,233,0.3)] hover:bg-[#4A3FD4] hover:-translate-y-0.5"
                    context={{ page: "service", route: `/services/${slugPath}`, section: "overview", trigger: data.intro_section.cta.popupId ?? data.intro_section.cta.type }}
                  />
                )}
                {data.intro_section.secondaryCta && (
                  <ServiceAction
                    action={data.intro_section.secondaryCta}
                    className="bg-white text-[#5B4FE9] border-[1.5px] border-[#E5E7EB] px-[28px] py-[13px] rounded-full text-[0.88rem] font-semibold no-underline inline-flex items-center gap-[7px] transition-all hover:border-[#5B4FE9] hover:shadow-[0_4px_16px_rgba(91,79,233,0.12)]"
                    context={{ page: "service", route: `/services/${slugPath}`, section: "overview", trigger: data.intro_section.secondaryCta.popupId ?? data.intro_section.secondaryCta.type }}
                  />
                )}
              </div>
            </div>
            
            {data.intro_section.features && data.intro_section.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                {data.intro_section.features.map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-[14px] p-[18px_20px] flex items-start gap-[12px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border border-[#5B4FE9]/5">
                    <div className="w-2.5 h-2.5 bg-[#5B4FE9] rounded-full shrink-0 mt-1.5"></div>
                    <p className="text-[0.88rem] font-semibold text-[#1E1B4B] leading-[1.4]">{feature}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── SERVICES GRID ── */}
      {data.sub_services_section?.cards?.length ? (
        <section className="px-[5%] py-[90px] bg-[#F8F9FF]" id="services">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">What We Do</div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-3.5 [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: data.sub_services_section.heading.replace('Services', '<span>Services</span>') }} />
          <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[52px]">{data.sub_services_section.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[24px] animate-fade-up">
            {data.sub_services_section.cards.map((card, idx) => {
              const isFeatured = idx < 2;
              return (
                <div key={card.id || idx} className={`bg-white rounded-[20px] p-[32px_28px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(91,79,233,0.16)] flex flex-col ${isFeatured ? 'border-2 border-[#5B4FE9] bg-[linear-gradient(135deg,#fff_0%,#EEF0FF_100%)]' : 'border-[#5B4FE9]/5'}`} style={idx === 0 ? { gridColumn: 'span 2' } : {}}>
                  <div className="w-12 h-12 bg-[#EEF0FF] rounded-xl flex items-center justify-center mb-[18px]">
                    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-[#5B4FE9]">
                      <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-7.5-3.75L12 9.5l7.5-3.75L12 9.5zm0 12.5l-10-5v-6l10 5 10-5v6l-10 5z"/>
                    </svg>
                  </div>
                  <div className="text-[0.72rem] font-bold text-[#5B4FE9] tracking-[0.08em] uppercase mb-2">{String(idx + 1).padStart(2, '0')} — {card.category || card.subtitle || "Service"}</div>
                  <h3 className="text-[1.08rem] font-extrabold text-[#1E1B4B] mb-2 tracking-[-0.01em]">{card.title}</h3>
                  {card.subtitle && <div className="text-[0.82rem] font-semibold text-[#5B4FE9] mb-2.5">{card.subtitle}</div>}
                  {(card.snippet || card.description) && (
                    <div className="text-[0.83rem] text-[#4B5563] leading-[1.65] mb-4 p-[10px_14px] bg-[#EEF0FF] rounded-lg border-l-[3px] border-[#5B4FE9]">{card.snippet || card.description}</div>
                  )}
                  
                  {card.features && card.features.length > 0 && (
                    <ul className="list-none mb-5 flex-1 [&>li]:text-[0.83rem] [&>li]:text-[#4B5563] [&>li]:py-1 [&>li]:pl-[18px] [&>li]:relative [&>li::before]:content-[''] [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:top-[11px] [&>li::before]:w-1.5 [&>li::before]:h-1.5 [&>li::before]:bg-[#5B4FE9] [&>li::before]:rounded-full">
                      {card.features.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {card.cta && (
                    <Link href={card.cta.href} className="text-[0.82rem] font-bold text-[#5B4FE9] no-underline inline-flex items-center gap-[5px] mt-auto transition-all hover:gap-[9px]">
                      {card.cta.text} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* ── PROCESS FUNNEL ── */}
      {data.process_section && (
        <section className="px-[5%] py-[90px] bg-white" id="approach">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">Why Choose Us</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-start animate-fade-up">
            <div className="pt-4">
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-3.5 [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: data.process_section.heading.replace('Full-Funnel Marketing', '<span>Full-Funnel Marketing</span>') }} />
              <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[36px]">{data.process_section.description}</p>
              {data.process_section.cta && (
                <ServiceAction
                  action={data.process_section.cta}
                  className="bg-[#5B4FE9] text-white px-[28px] py-[13px] rounded-full text-[0.88rem] font-bold no-underline inline-flex items-center gap-[7px] transition-all shadow-[0_4px_16px_rgba(91,79,233,0.3)] hover:bg-[#4A3FD4] hover:-translate-y-0.5"
                  context={{ page: "service", route: `/services/${slugPath}`, section: "process", trigger: data.process_section.cta.popupId ?? data.process_section.cta.type }}
                />
              )}
            </div>
            
            <div className="flex flex-col gap-0">
              {data.process_section.steps.map((step, idx) => (
                <div key={idx} className="flex gap-[24px] relative pb-[32px] last:pb-0">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-full border-2 border-[#5B4FE9] bg-white flex items-center justify-center text-[0.82rem] font-extrabold text-[#5B4FE9] shrink-0 z-10">{String(idx + 1).padStart(2, '0')}.</div>
                    {idx !== data.process_section!.steps.length - 1 && (
                      <div className="w-[2px] bg-gradient-to-b from-[#5B4FE9] to-[#5B4FE9]/10 flex-1 my-1"></div>
                    )}
                  </div>
                  <div className="bg-white rounded-[16px] p-[20px_22px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border border-[#5B4FE9]/5 flex-1">
                    <div className="text-[0.7rem] font-bold text-[#5B4FE9] tracking-[0.08em] uppercase mb-1">{step.step_label || `Stage ${idx + 1}`}</div>
                    <h3 className="text-[1rem] font-extrabold text-[#1E1B4B] mb-1.5">{step.title}</h3>
                    <p className="text-[0.84rem] text-[#4B5563] leading-[1.6]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {data.results_section && data.results_section.cards.length > 0 && (
        <section className="px-[5%] py-[90px] bg-[#F8F9FF]" id="results">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">Documented Results</div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-3.5 [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: data.results_section.heading.replace('Delivers in Practice', '<span>Delivers in Practice</span>') }} />
          <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[52px]">{data.results_section.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-10 animate-fade-up">
            {data.results_section.cards.map((card, idx) => (
              <div key={card.id || idx} className="bg-white rounded-[20px] p-[28px_24px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border border-[#5B4FE9]/5 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(91,79,233,0.16)]">
                <div className="inline-block bg-[#EEF0FF] text-[#5B4FE9] text-[0.72rem] font-bold tracking-[0.06em] uppercase px-3 py-1.5 rounded-full mb-4.5">{card.tag}</div>
                <div className="flex flex-col gap-3 mb-4.5">
                  {card.metrics.map((metric, midx) => (
                    <div key={midx} className="flex justify-between items-center pb-2.5 border-b border-[#E5E7EB] last:border-b-0 last:pb-0">
                      <span className="text-[0.82rem] text-[#4B5563]">{metric.label}</span>
                      <span className={`text-[1.2rem] font-extrabold ${metric.tone === 'positive' ? 'text-[#059669]' : 'text-[#5B4FE9]'}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
                {card.description && <div className="text-[0.78rem] text-[#9CA3AF] leading-[1.6] pt-3.5 border-t border-[#E5E7EB]">{card.description}</div>}
              </div>
            ))}
          </div>
          
          {data.results_section.cta && (
            <div className="text-center">
              <Link href={data.results_section.cta.href} className="bg-[#5B4FE9] text-white px-[28px] py-[13px] rounded-full text-[0.88rem] font-bold no-underline inline-flex items-center gap-[7px] transition-all shadow-[0_4px_16px_rgba(91,79,233,0.3)] hover:bg-[#4A3FD4] hover:-translate-y-0.5">
                {data.results_section.cta.text} →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── TIERS ── */}
      {data.engagement_tiers_section && data.engagement_tiers_section.tiers.length > 0 && (
        <section className="px-[5%] py-[90px] bg-white">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">Engagement Options</div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-3.5 [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: data.engagement_tiers_section.heading.replace('Yue Infotech', '<span>Yue Infotech</span>') }} />
          <p className="text-[#4B5563] text-[0.97rem] max-w-[560px] leading-[1.7] mb-[52px]">{data.engagement_tiers_section.description}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] animate-fade-up">
            {data.engagement_tiers_section.tiers.map((tier, idx) => (
              <div key={tier.id || idx} className={`rounded-[20px] p-[36px_28px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] flex flex-col transition-all duration-250 hover:-translate-y-1 ${tier.featured ? 'border-2 border-[#5B4FE9] bg-[#0D1035] text-white' : 'bg-white border border-[#5B4FE9]/5'}`}>
                {tier.badge && <div className="inline-block bg-[#5B4FE9] text-white text-[0.68rem] font-bold tracking-[0.06em] uppercase px-3 py-1 rounded-full mb-3.5 self-start">{tier.badge}</div>}
                <div className={`text-[1.6rem] font-extrabold tracking-[-0.02em] mb-1 ${tier.featured ? 'text-white' : 'text-[#1E1B4B]'}`}>{tier.name}</div>
                <div className={`text-[0.83rem] mb-6 pb-5 border-b ${tier.featured ? 'text-white/65 border-white/12' : 'text-[#4B5563] border-[#E5E7EB]'}`}>{tier.for}</div>
                
                <ul className="list-none flex-1">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className={`text-[0.84rem] py-2 pl-[22px] relative border-b ${tier.featured ? 'text-white/80 border-white/10' : 'text-[#4B5563] border-[#E5E7EB]'} [&::before]:content-[''] [&::before]:absolute [&::before]:left-0 [&::before]:top-[17px] [&::before]:w-2 [&::before]:h-2 [&::before]:bg-${tier.featured ? '[#7B72EE]' : '[#5B4FE9]'} [&::before]:rounded-full`}>{feature}</li>
                  ))}
                </ul>
                
                {tier.cta && (
                  <div className="mt-7">
                    <Link href={tier.cta.href} className={`w-full border-none px-5 py-3.5 rounded-full text-[0.87rem] font-bold no-underline flex items-center justify-center gap-[6px] transition-all cursor-pointer ${tier.featured ? 'bg-[#5B4FE9] text-white shadow-[0_4px_20px_rgba(91,79,233,0.4)] hover:bg-white hover:text-[#5B4FE9]' : 'bg-[#EEF0FF] text-[#5B4FE9] hover:bg-[#5B4FE9] hover:text-white'}`}>
                      {tier.cta.text} →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── INDUSTRIES ── */}
      {data.industries_section?.items?.length ? (
        <section className="px-[5%] py-[60px] bg-[#F8F9FF]">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">Industries We Serve</div>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-0">{data.industries_section.heading}</h2>
          <div className="flex flex-wrap gap-[10px] mt-7">
            {data.industries_section.items.map((industry, idx) => (
              <span key={idx} className="bg-white border-[1.5px] border-[#E5E7EB] text-[#4B5563] text-[0.84rem] font-semibold px-5 py-2.5 rounded-full transition-all cursor-default shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#5B4FE9] hover:text-[#5B4FE9] hover:shadow-[0_4px_16px_rgba(91,79,233,0.12)]">{industry}</span>
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
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(91,79,233,0.2)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#7B72EE] mb-4 relative z-10">Start Today</div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold text-white tracking-[-0.03em] leading-[1.1] m-[0_auto_16px] max-w-[700px] relative z-10 [&>em]:not-italic [&>em]:text-[#7B72EE]" dangerouslySetInnerHTML={{ __html: data.final_cta_section.heading.replace('Converts?', '<em>Converts?</em>') }} />
          {data.final_cta_section.subheading && <p className="text-white/65 max-w-[500px] m-[0_auto_40px] text-[0.95rem] relative z-10">{data.final_cta_section.subheading}</p>}
          
          <div className="flex justify-center gap-3.5 flex-wrap relative z-10">
            {data.final_cta_section.actions.map((action, idx) => {
              const baseClass = idx === 0 
                ? "bg-[#5B4FE9] text-white px-[30px] py-[14px] rounded-full text-[0.9rem] font-bold no-underline inline-flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(91,79,233,0.4)] hover:bg-[#4A3FD4] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(91,79,233,0.5)]" 
                : idx === 1 
                  ? "bg-white/10 text-white border-[1.5px] border-white/25 px-[30px] py-[14px] rounded-full text-[0.9rem] font-semibold no-underline inline-flex items-center gap-2 transition-all hover:bg-white/20 hover:border-white/40" 
                  : "bg-[#25D366]/10 text-[#25D366] border-[1.5px] border-[#25D366]/30 px-[24px] py-[14px] rounded-full text-[0.88rem] font-bold no-underline inline-flex items-center gap-2 transition-all hover:bg-[#25D366]/20";
              
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
                  context={{
                    page: "service",
                    route: `/services/${slugPath}`,
                    section: "final-cta",
                    trigger: action.popupId ?? action.type,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}


export async function generateStaticParams() {
  const paths = await getAllServiceSlugs();
  return paths
    .filter(Boolean)
    .map((path) => ({ slug: path.split("/").filter(Boolean) }));
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
  };

  return getPageMetadata("service-detail", fallback, {
    revalidate,
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

  if (isMainService || hasEnhancedServiceContent) {
    return <MainServiceTemplate data={data} slugPath={slugPath} />;
  }

  return (
    <main>
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
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
