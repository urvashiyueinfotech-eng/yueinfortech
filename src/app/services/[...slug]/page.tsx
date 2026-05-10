import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import IntroSection from "@/sections/ServicesPage/IntroSection";
import SubServicesGrid from "@/sections/ServicesPage/SubServicesGrid";
import { ProcessSection, FAQSection } from "@/sections/ServicesPage/ExtraSection";
import ServiceFaqList from "@/sections/ServicesPage/ServiceFaqList";
import MainServiceCard from "@/components/ui/MainServiceCard";
import ServiceFinalCtaAction from "@/components/ServiceFinalCtaAction";
import HeroAction from "@/components/HeroAction";
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

function renderMetricTone(tone?: "default" | "positive") {
  if (tone === "positive") return "text-emerald-600";
  return "text-indigo-600";
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
    <main className="bg-[#F8F9FF] text-[#1E1B4B]">
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0D1035] via-[#111437] to-[#1a1060] px-[5%] pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(91,79,233,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[130%] w-[55%] bg-gradient-to-l from-[rgba(91,79,233,0.12)] via-[rgba(91,79,233,0.05)] to-transparent" />

        <div className="relative max-w-[720px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,79,233,0.4)] bg-[rgba(91,79,233,0.2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B72EE]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B72EE]" />
            {data.hero.badge || data.hero.subheading}
          </div>

          <h1 className="mt-7 text-balance text-[2.8rem] font-extrabold leading-[1.1] text-white sm:text-[3.6rem] lg:text-[4.5rem]">
            {renderHeroTitle(data.hero.heading)}
          </h1>

          <p className="mt-5 max-w-[580px] rounded-r-lg border-l-[3px] border-[#7B72EE] bg-white/10 px-5 py-3.5 text-sm leading-7 text-slate-200">
            {data.hero.description}
          </p>

          {Array.isArray(data.hero.stats) && data.hero.stats.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-10">
              {data.hero.stats.map((stat, idx) => (
                <div key={`${stat.label}-${idx}`}>
                  <p className="text-[2rem] font-extrabold leading-none text-[#7B72EE]">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
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

      <section className="bg-white px-[5%] py-[90px]">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="max-w-[460px]">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5B4FE9]">Overview</p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.15] md:text-[3rem]">
              {data.intro_section.heading}
            </h2>
            <p className="mt-4 text-[0.97rem] leading-7 text-slate-600">
              {data.intro_section.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <HeroAction
                action={data.intro_section.cta}
                context={{ page: "service", route: `/services/${slugPath}`, section: "overview", trigger: data.intro_section.cta.popupId ?? data.intro_section.cta.type }}
              />
              {data.intro_section.secondaryCta ? (
                <HeroAction
                  action={data.intro_section.secondaryCta}
                  context={{ page: "service", route: `/services/${slugPath}`, section: "overview", trigger: data.intro_section.secondaryCta.popupId ?? data.intro_section.secondaryCta.type }}
                />
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {data.intro_section.features.map((feature, idx) => (
              <div key={`${feature}-${idx}`} className="rounded-[14px] border border-[rgba(91,79,233,0.08)] bg-white px-5 py-[18px] shadow-[0_4px_24px_rgba(91,79,233,0.08)]">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#5B4FE9]" />
                  <p className="text-sm font-semibold leading-6 text-[#1E1B4B]">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FF] px-[5%] py-[90px]" id="services">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5B4FE9]">What We Do</p>
          <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.15] md:text-[3rem]">{data.sub_services_section.heading}</h2>
          <p className="mt-4 mb-[52px] max-w-[560px] text-[0.97rem] leading-7 text-slate-600">{data.sub_services_section.description}</p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.sub_services_section.cards.map((card, idx) => (
              <div key={card.id} className={`flex flex-col rounded-[20px] border bg-white px-7 py-8 shadow-[0_4px_24px_rgba(91,79,233,0.08)] transition hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(91,79,233,0.16)] ${idx === 0 ? "border-2 border-[#5B4FE9] xl:col-span-2" : idx === 1 ? "border-2 border-[#5B4FE9]" : "border-[rgba(91,79,233,0.06)]"}`}>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#5B4FE9]">
                  {String(idx + 1).padStart(2, "0")} - {card.category || card.subtitle || "Service"}
                </p>
                <h3 className="mt-2 text-[1.08rem] font-extrabold text-[#1E1B4B]">{card.title}</h3>
                {card.subtitle ? (
                  <p className="mt-2 text-[0.82rem] font-semibold text-[#5B4FE9]">{card.subtitle}</p>
                ) : null}
                {card.snippet || card.description ? (
                  <p className="mt-3 rounded-lg border-l-[3px] border-[#5B4FE9] bg-[#EEF0FF] px-3.5 py-2.5 text-[0.83rem] leading-[1.65] text-slate-600">
                    {card.snippet || card.description}
                  </p>
                ) : null}

                {card.features && card.features.length > 0 ? (
                  <ul className="mt-4 flex-1 space-y-1">
                    {card.features.map((item, itemIdx) => (
                      <li key={`${item}-${itemIdx}`} className="flex items-start gap-2 py-1 text-[0.83rem] leading-6 text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5B4FE9]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {card.cta ? (
                  <div className="mt-5">
                    <Link href={card.cta.href} className="text-[0.82rem] font-bold text-[#5B4FE9] transition hover:tracking-wide">
                      {card.cta.text} →
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.process_section ? (
        <section className="bg-white px-[5%] py-[90px]" id="approach">
          <div className="grid gap-20 lg:grid-cols-2">
            <div className="pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5B4FE9]">Why Choose Us</p>
              <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.15] md:text-[3rem]">{data.process_section.heading}</h2>
              <p className="mt-4 mb-9 max-w-[560px] text-[0.97rem] leading-7 text-slate-600">{data.process_section.description}</p>
              {data.process_section.cta ? (
                <HeroAction
                  action={data.process_section.cta}
                  context={{ page: "service", route: `/services/${slugPath}`, section: "process", trigger: data.process_section.cta.popupId ?? data.process_section.cta.type }}
                />
              ) : null}
            </div>

            <div>
              {data.process_section.steps.map((step, idx) => (
                <div key={`${step.title}-${idx}`} className={`flex gap-6 ${idx !== data.process_section!.steps.length - 1 ? "pb-8" : ""}`}>
                  <div className="flex flex-col items-center">
                    <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#5B4FE9] bg-white text-xs font-extrabold text-[#5B4FE9]">
                      {String(idx + 1).padStart(2, "0")}.
                    </div>
                    {idx !== data.process_section!.steps.length - 1 ? (
                      <div className="my-1 h-full w-0.5 bg-gradient-to-b from-[#5B4FE9] to-[rgba(91,79,233,0.08)]" />
                    ) : null}
                  </div>
                  <div className="flex-1 rounded-2xl border border-[rgba(91,79,233,0.08)] bg-white px-5 py-5 shadow-[0_4px_24px_rgba(91,79,233,0.08)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#5B4FE9]">{step.step_label}</p>
                    <h3 className="mt-1 text-base font-extrabold text-[#1E1B4B]">{step.title}</h3>
                    <p className="mt-2 text-[0.84rem] leading-6 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {data.results_section && data.results_section.cards.length > 0 ? (
        <section className="bg-[#F8F9FF] px-[5%] py-[90px]" id="results">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5B4FE9]">Documented Results</p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.15] md:text-[3rem]">{data.results_section.heading}</h2>
            <p className="mt-4 mb-[52px] max-w-[560px] text-[0.97rem] leading-7 text-slate-600">{data.results_section.description}</p>

            <div className="grid gap-6 lg:grid-cols-3">
              {data.results_section.cards.map((card) => (
                <div key={card.id} className="rounded-[20px] border border-[rgba(91,79,233,0.06)] bg-white px-6 py-7 shadow-[0_4px_24px_rgba(91,79,233,0.08)]">
                  <p className="inline-block rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.06em] text-[#5B4FE9]">{card.tag}</p>
                  <div className="mt-5 space-y-3">
                    {card.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-b-0">
                        <span className="text-[0.82rem] text-slate-600">{metric.label}</span>
                        <span className={`text-[1.2rem] font-extrabold ${renderMetricTone(metric.tone)}`}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-[0.78rem] leading-6 text-slate-500">{card.description}</p>
                </div>
              ))}
            </div>

            {data.results_section.cta ? (
              <div className="mt-10 text-center">
                <Link href={data.results_section.cta.href} className="inline-flex items-center rounded-full bg-[#5B4FE9] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(91,79,233,0.3)] hover:bg-[#4A3FD4]">
                  {data.results_section.cta.text} →
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {data.engagement_tiers_section && data.engagement_tiers_section.tiers.length > 0 ? (
        <section className="bg-white px-[5%] py-[90px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5B4FE9]">Engagement Options</p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.15] md:text-[3rem]">{data.engagement_tiers_section.heading}</h2>
            <p className="mt-4 mb-[52px] max-w-[560px] text-[0.97rem] leading-7 text-slate-600">{data.engagement_tiers_section.description}</p>

            <div className="grid gap-6 lg:grid-cols-3">
              {data.engagement_tiers_section.tiers.map((tier) => (
                <div key={tier.id} className={`flex flex-col rounded-[20px] border px-7 py-9 shadow-[0_4px_24px_rgba(91,79,233,0.08)] transition hover:-translate-y-1 ${tier.featured ? "border-2 border-[#5B4FE9] bg-[#0D1035] text-white" : "border-[rgba(91,79,233,0.08)] bg-white"}`}>
                  {tier.badge ? <p className="inline-block w-fit rounded-full bg-[#5B4FE9] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.06em] text-white">{tier.badge}</p> : null}
                  <h3 className="mt-3 text-[1.6rem] font-extrabold">{tier.name}</h3>
                  <p className={`mt-2 border-b pb-5 text-sm leading-6 ${tier.featured ? "border-white/15 text-slate-300" : "border-slate-200 text-slate-600"}`}>{tier.for}</p>
                  <ul className="mt-5 flex-1 space-y-0">
                    {tier.features.map((feature, idx) => (
                      <li key={`${feature}-${idx}`} className={`flex items-start gap-2 border-b py-2 text-[0.84rem] ${tier.featured ? "border-white/10 text-slate-200" : "border-slate-100 text-slate-600"}`}>
                        <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${tier.featured ? "bg-[#7B72EE]" : "bg-[#5B4FE9]"}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {tier.cta ? (
                    <div className="mt-7">
                      <Link href={tier.cta.href} className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold ${tier.featured ? "bg-[#5B4FE9] text-white hover:bg-white hover:text-[#5B4FE9]" : "bg-[#EEF0FF] text-[#5B4FE9] hover:bg-[#5B4FE9] hover:text-white"}`}>
                        {tier.cta.text} →
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {data.industries_section?.items?.length ? (
        <section className="bg-[#F8F9FF] px-[5%] py-[60px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5B4FE9]">Industries We Serve</p>
            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.15] md:text-[2.2rem]">{data.industries_section.heading}</h2>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {data.industries_section.items.map((industry) => (
                <span key={industry} className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-[#5B4FE9] hover:text-[#5B4FE9]">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {data.faq_section?.questions?.length ? (
        <section className="bg-white px-[5%] py-[90px]">
          <div className="max-w-[760px]">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5B4FE9]">Common Questions</p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.15] md:text-[3rem]">{data.faq_section.heading}</h2>
            <div className="mt-8">
              <ServiceFaqList questions={data.faq_section.questions} />
            </div>
          </div>
        </section>
      ) : null}

      {data.final_cta_section ? (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0D1035] via-[#111437] to-[#1a1060] px-[5%] py-[100px] text-center">
          <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,79,233,0.2)_0%,transparent_70%)]" />
          <div className="relative mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#7B72EE]">Start Today</p>
            <h2 className="mx-auto mt-4 max-w-[700px] text-balance text-[2.2rem] font-extrabold leading-[1.1] text-white sm:text-[4rem]">{data.final_cta_section.heading}</h2>
            {data.final_cta_section.subheading ? (
              <p className="mx-auto mt-4 max-w-[500px] text-[0.95rem] leading-7 text-white/65">{data.final_cta_section.subheading}</p>
            ) : null}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
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

      {data.faq_section && <FAQSection data={data.faq_section} />}

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
