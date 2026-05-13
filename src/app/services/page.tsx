import Link from "next/link";
import type { Metadata } from "next";
import { getAllMainServices } from "@/lib/services.service";
import { fetchFaqsForPage, PublicFaq } from "@/lib/firestoreServer";
import { getPageMetadata } from "@/lib/pageSeo.service";
import CtaButton from "@/components/CtaButton";
import CustomSolutionPopup from "@/components/CustomSolutionPopup";
import SectionHeader from "@/components/SectionHeader";
import ServicesPageCard from "./_components/ServicesPageCard";
import IntegratedSystemItem from "./_components/IntegratedSystemItem";
import WhyChooseUsStep from "./_components/WhyChooseUsStep";
import IndustryPill from "./_components/IndustryPill";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import FaqSection from "@/components/FaqSection";

export const revalidate = 2592000;
const SERVICES_FAQ_REVALIDATE = 2592000;
const SERVICES_SEO_REVALIDATE = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("services", undefined, {
    revalidate: SERVICES_SEO_REVALIDATE,
  });
}

function buildFaqJsonLd(faqs: PublicFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}



export default async function ServicesPage() {
  const [services, faqs] = await Promise.all([
    getAllMainServices(),
    fetchFaqsForPage("services", {
      publishedOnly: true,
      revalidate: SERVICES_FAQ_REVALIDATE,
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#F8F9FF] text-[#1E1B4B] font-sans">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0D1035] via-[#111437] to-[#1a1060] pt-[140px] px-[5%] pb-[80px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(91,79,233,0.15)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-[-60px] right-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(91,79,233,0.12)_0%,transparent_65%)]"></div>
        <div className="relative z-10 max-w-[800px] mx-auto xl:mx-0">
          <div className="text-[0.8rem] text-[rgba(255,255,255,0.45)] mb-[20px]">
            <Link href="/" className="text-[rgba(255,255,255,0.5)] no-underline hover:text-[#7B72EE]">Home</Link> / Services
          </div>
          <div className="inline-flex items-center gap-[8px] bg-[rgba(91,79,233,0.2)] border border-[rgba(91,79,233,0.4)] text-[#7B72EE] py-[7px] px-[16px] rounded-full text-[0.75rem] font-semibold tracking-[0.04em] uppercase mb-[22px]">
            <span className="w-[6px] h-[6px] bg-[#7B72EE] rounded-full animate-pulse"></span>
            Est. 2018 · Full-Service Digital Agency
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-[16px]">
            Digital, Creative &amp;<br />
            <em className="not-italic text-[#7B72EE]">IT Solutions</em> for Growth
          </h1>
          <p className="text-[1rem] text-[rgba(255,255,255,0.65)] max-w-[620px] leading-[1.7] mb-[32px]">
            Yue Infotech delivers integrated digital systems — web engineering, search visibility, performance marketing, strategic content, and secure IT infrastructure — designed to strengthen authority, improve visibility, and generate measurable business growth.
          </p>
          <div className="flex gap-[12px] flex-wrap">
            <CtaButton
              href="/contact-us"
              bgClassName="bg-[#5B4FE9] hover:bg-[#4A3FD4]"
              textClassName="text-white text-[0.88rem] font-bold"
              className="gap-[7px] py-[13px] px-[28px] shadow-[0_4px_20px_rgba(91,79,233,0.4)]"
            >
              Book Free Consultation →
            </CtaButton>
            <CustomSolutionPopup
              source="services-page-quote-cta"
              context={{
                page: "services",
                route: "/services",
                section: "hero",
                trigger: "get-a-quote",
              }}
              trigger={
                <button
                  type="button"
                  className="group inline-flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] px-[28px] py-[13px] text-[0.88rem] font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.18)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-[1.5px] border-[rgba(255,255,255,0.25)]"
                >
                  Get a Quote
                </button>
              }
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-white border-b border-[#E5E7EB] grid grid-cols-2 md:grid-cols-4">
        {[
          { num: "8+", label: "Years · Est. 2018" },
          { num: "50+", label: "Projects Delivered" },
          { num: "15+", label: "Industries Served" },
          { num: "9+", label: "Service Areas" }
        ].map((stat, i) => (
          <div key={i} className={`p-[28px_24px] text-center ${i < 3 ? 'md:border-r border-[#E5E7EB]' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''}`}>
            <div className="text-[2rem] font-extrabold text-[#5B4FE9] tracking-[-0.02em] leading-none">{stat.num}</div>
            <div className="text-[0.78rem] text-[#9CA3AF] mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <section className="py-[80px] px-[5%] bg-[#F8F9FF]" id="services">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            align="left"
            className="max-w-[560px] ml-0 mb-[48px]"
            eyebrow="What We Do"
            eyebrowClassName="bg-transparent ring-0 px-0 py-0 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9]"
            title={
              <>Everything Your Business Needs<br />to <span className="text-[#5B4FE9]">Grow Digitally</span></>
            }
            titleClassName="text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15]"
            subtitle="Five core service areas — each available as a standalone engagement or as part of a connected integrated growth system."
            subtitleClassName="text-[#4B5563] text-[0.95rem] leading-[1.72]"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {services.map((service, index) => (
              <ServicesPageCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATED SYSTEM ── */}
      <section className="py-[80px] px-[5%] bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[60px] items-center">
          <div>
            <SectionHeader
              align="left"
              className="ml-0 mb-[28px]"
              eyebrow="Integrated Approach"
              eyebrowClassName="bg-transparent ring-0 px-0 py-0 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9]"
              title={
                <>All Services Work Better<br /><span className="text-[#5B4FE9]">Together</span></>
              }
              titleClassName="text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15]"
              subtitle="Most agencies run isolated campaigns. Yue Infotech builds connected digital systems — where your website, SEO, marketing, content, and IT infrastructure are aligned around a single growth objective."
              subtitleClassName="text-[#4B5563] text-[0.95rem] leading-[1.72]"
            />
            <div className="flex gap-[12px] flex-wrap">
              <CtaButton
                href="/contact-us"
                bgClassName="bg-[#5B4FE9] hover:bg-[#4A3FD4]"
                textClassName="text-white text-[0.86rem] font-bold"
                className="gap-[6px] py-[12px] px-[26px] shadow-[0_4px_16px_rgba(91,79,233,0.3)]"
              >
                Get a Personalised Strategy →
              </CtaButton>
              <CtaButton
                href="/case-studies"
                bgClassName="bg-white border-[1.5px] border-[#E5E7EB] hover:border-[#5B4FE9]"
                textClassName="text-[#5B4FE9] text-[0.86rem] font-semibold"
                className="gap-[6px] py-[12px] px-[26px] hover:shadow-[0_4px_16px_rgba(91,79,233,0.12)] shadow-none"
              >
                View Our Work
              </CtaButton>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#E5E7EB] border border-[#E5E7EB] rounded-[16px] overflow-hidden">
            <IntegratedSystemItem icon="🌐" title="Web as the Foundation" description="Every digital campaign sends traffic somewhere. A fast, conversion-optimized website multiplies the ROI of every other service." />
            <IntegratedSystemItem icon="🔍" title="SEO Amplifies Content" description="SEO without content has nothing to rank. Content without SEO never gets found. Together they compound in authority over time." />
            <IntegratedSystemItem icon="🎯" title="Paid Captures Intent" description="SEO builds long-term visibility. Paid ads capture immediate buyer intent. Running both is significantly more efficient than either alone." />
            <IntegratedSystemItem icon="📣" title="Content Feeds Every Channel" description="Great content improves SEO rankings, reduces ad costs through better landing pages, and builds the brand trust that converts visitors." />
            <IntegratedSystemItem icon="🔒" title="IT Protects the System" description="Hosting performance affects SEO. Security affects brand trust. IT infrastructure is the foundation everything else depends on." />
            <IntegratedSystemItem icon="📊" title="Data Connects Everything" description="GA4, Search Console, and Looker Studio reporting unifies performance data across all channels — so decisions are based on evidence." />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-[80px] px-[5%] bg-[#F8F9FF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-start">
            <div>
              <SectionHeader
                align="left"
                className="ml-0 mb-[32px] max-w-[560px]"
                eyebrow="Why Choose Us"
                eyebrowClassName="bg-transparent ring-0 px-0 py-0 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9]"
                title={
                  <>Your All-in-One Partner<br />for <span className="text-[#5B4FE9]">Digital Growth</span></>
                }
                titleClassName="text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15]"
                subtitle="We combine marketing strategy, technical engineering, and infrastructure expertise to build digital systems that support sustainable business growth — not one-off campaigns."
                subtitleClassName="text-[#4B5563] text-[0.95rem] leading-[1.72]"
              />
              <CtaButton
                href="/contact-us"
                bgClassName="bg-[#5B4FE9] hover:bg-[#4A3FD4]"
                textClassName="text-white text-[0.86rem] font-bold"
                className="gap-[6px] py-[12px] px-[26px] shadow-[0_4px_16px_rgba(91,79,233,0.3)]"
              >
                Get Personalised Recommendations →
              </CtaButton>
            </div>
            <div className="flex flex-col">
              <WhyChooseUsStep number="01" label="Data-Driven Strategies" title="Every Decision Backed by Real Data" description="We use Ahrefs, SEMrush, Screaming Frog, Google Search Console, and GA4 — not guesswork. Strategy is built on your actual performance data, not industry averages." />
              <WhyChooseUsStep number="02" label="AI + Human Strategy" title="Advanced AI Tools With Expert Execution" description="We combine AI optimization — AEO, GEO, SXO, HEO — with human strategic oversight. Technology handles scale; experts handle judgment." />
              <WhyChooseUsStep number="03" label="Authority & Trust" title="E-E-A-T Optimized at Every Level" description="All content, strategy, and delivery satisfies Google's Experience, Expertise, Authoritativeness, and Trustworthiness framework — building sustainable authority, not short-term ranking spikes." />
              <WhyChooseUsStep number="04" label="Full Transparency" title="Clear Reporting — No Vanity Metrics" description="Monthly Looker Studio dashboards tied to your actual business KPIs — traffic, leads, conversions, and revenue — not just rankings and impressions." />
              <WhyChooseUsStep number="05" label="Long-Term Partnership" title="8+ Years of Continuous Expertise" description="Established in 2018, Yue Infotech has navigated every major search, AI, and marketing platform change since — so your strategy reflects how digital works today, not 3 years ago." isLast={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-[56px] px-[5%] bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            align="left"
            className="ml-0"
            eyebrow="Who We Serve"
            eyebrowClassName="bg-transparent ring-0 px-0 py-0 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9]"
            title="Industries We Work With"
            titleClassName="text-[clamp(1.7rem,2.8vw,2.2rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15]"
          />
          <div className="flex flex-wrap gap-[10px] mt-[24px]">
            {["E-commerce & Retail", "B2B & SaaS", "Real Estate", "Healthcare & Wellness", "Education & EdTech", "Finance & Fintech", "Hospitality & Travel", "Local Businesses", "Startups", "Professional Services", "Technology", "Manufacturing"].map(ind => (
              <IndustryPill key={ind} name={ind} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs && faqs.length > 0 && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
          />
          <FaqSection faqs={faqs} />
        </>
      )}

      {/* ── HELP CHOOSE ── */}
      <section className="py-[60px] px-[5%] bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[48px] items-center">
          <div>
            <SectionHeader
              align="left"
              className="ml-0 mb-[24px]"
              eyebrow="Not Sure Where to Start?"
              eyebrowClassName="bg-transparent ring-0 px-0 py-0 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9]"
              title={
                <>We&apos;ll Help You <span className="text-[#5B4FE9]">Choose the Right Service</span></>
              }
              titleClassName="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15]"
              subtitle="We understand your goals, evaluate your digital position, and guide you to the most effective solution — without pushing you toward the most expensive one."
              subtitleClassName="text-[#4B5563] text-[0.93rem] leading-[1.72]"
            />
            <div className="flex gap-[12px] flex-wrap">
              <CtaButton
                href="/contact-us"
                bgClassName="bg-[#5B4FE9] hover:bg-[#4A3FD4]"
                textClassName="text-white text-[0.86rem] font-bold"
                className="gap-[6px] py-[12px] px-[26px] shadow-[0_4px_16px_rgba(91,79,233,0.3)]"
              >
                Book Free Consultation →
              </CtaButton>
              <CtaButton
                href="https://wa.me/918859366292"
                target="_blank"
                rel="noopener noreferrer"
                bgClassName="bg-white border-[1.5px] border-[#E5E7EB] hover:border-[#5B4FE9]"
                textClassName="text-[#5B4FE9] text-[0.86rem] font-semibold"
                className="gap-[6px] py-[12px] px-[26px] hover:shadow-[0_4px_16px_rgba(91,79,233,0.12)] shadow-none"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </CtaButton>
            </div>
          </div>
          <div className="bg-[#EEF0FF] rounded-[20px] p-[32px] border border-[rgba(91,79,233,0.1)]">
            <div className="text-[0.8rem] font-bold text-[#5B4FE9] tracking-[0.06em] uppercase mb-[16px]">What Happens in the Free Consultation</div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-start gap-[12px]">
                <div className="w-[28px] h-[28px] bg-[#5B4FE9] rounded-full flex items-center justify-center shrink-0 text-[0.72rem] font-extrabold text-white">1</div>
                <div className="text-[0.85rem] text-[#1E1B4B] pt-[4px]">We review your current website, search visibility, and digital marketing position</div>
              </div>
              <div className="flex items-start gap-[12px]">
                <div className="w-[28px] h-[28px] bg-[#5B4FE9] rounded-full flex items-center justify-center shrink-0 text-[0.72rem] font-extrabold text-white">2</div>
                <div className="text-[0.85rem] text-[#1E1B4B] pt-[4px]">We identify the 3 highest-impact opportunities for your specific business and market</div>
              </div>
              <div className="flex items-start gap-[12px]">
                <div className="w-[28px] h-[28px] bg-[#5B4FE9] rounded-full flex items-center justify-center shrink-0 text-[0.72rem] font-extrabold text-white">3</div>
                <div className="text-[0.85rem] text-[#1E1B4B] pt-[4px]">We recommend the right service and scope aligned with your goals — no hard sell</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-gradient-to-br from-[#0D1035] via-[#111437] to-[#1a1060] py-[90px] px-[5%] text-center relative overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(91,79,233,0.18)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#7B72EE] mb-[14px] relative z-10">Start Today</div>
        <h2 className="text-[clamp(2rem,4.5vw,3.8rem)] font-extrabold text-white tracking-[-0.03em] leading-[1.1] max-w-[700px] mx-auto mb-[14px] relative z-10">
          Ready to Start Your Project<br />With <em className="not-italic text-[#7B72EE]">Yue Infotech?</em>
        </h2>
        <p className="text-[rgba(255,255,255,0.6)] max-w-[500px] mx-auto mb-[36px] text-[0.93rem] relative z-10">
          Let&apos;s build digital systems designed for visibility, performance, and measurable business growth.
        </p>
        <div className="flex justify-center gap-[12px] flex-wrap relative z-10">
          <CtaButton
            href="/contact-us"
            bgClassName="bg-[#5B4FE9] hover:bg-[#4A3FD4]"
            textClassName="text-white text-[0.88rem] font-bold"
            className="gap-[7px] py-[13px] px-[28px] shadow-[0_4px_20px_rgba(91,79,233,0.4)]"
          >
            Book a Strategy Call →
          </CtaButton>
          <CustomSolutionPopup
            source="services-page-quote-cta"
            context={{
              page: "services",
              route: "/services",
              section: "final-cta",
              trigger: "request-a-quote",
            }}
            trigger={
              <button
                type="button"
                className="group inline-flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] px-[28px] py-[13px] text-[0.88rem] font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.18)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-[1.5px] border-[rgba(255,255,255,0.25)]"
              >
                Request a Quote
              </button>
            }
          />
          <CtaButton
            href="https://wa.me/918859366292"
            target="_blank"
            rel="noopener noreferrer"
            bgClassName="bg-[rgba(37,211,102,0.1)] border-[1.5px] border-[rgba(37,211,102,0.3)] hover:bg-[rgba(37,211,102,0.18)]"
            textClassName="text-[#25D366] text-[0.85rem] font-bold"
            className="gap-[7px] py-[13px] px-[22px] shadow-none"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </CtaButton>
        </div>
      </section>
    </main>
  );
}
