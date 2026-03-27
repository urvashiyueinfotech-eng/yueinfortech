import { notFound } from "next/navigation";
import { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import HeroSection from "@/sections/ServicesPage/HeroSection";
import IntroSection from "@/sections/ServicesPage/IntroSection";
import SubServicesGrid from "@/sections/ServicesPage/SubServicesGrid";
import { ProcessSection, FAQSection } from "@/sections/ServicesPage/ExtraSection";
import SectionHeader from "@/components/SectionHeader";
import MainServiceCard from "@/components/ui/MainServiceCard";
import CtaButton from "@/components/CtaButton";
import {
  getAllServiceSlugs,
  getRelatedMainServices,
  getServiceBySlug,
} from "@/lib/services.service";

export const revalidate = 2592000;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  if (!data) return { title: "Service Not Found" };

  return {
    title: data.seo.metaTitle,
    description: data.seo.metaDescription,
    keywords: data.seo.keywords,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  const related = await getRelatedMainServices(slug);
  if (!data) return notFound();

  return (
    <main>
      <PageHero
        title={data.hero.heading}
        backgroundImage={data.hero.backgroundImage || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: data.hero.heading },
        ]}
      />

      <HeroSection data={data.hero} />
      <IntroSection data={data.intro_section} />
      <SubServicesGrid data={data.sub_services_section} />

      {data.process_section && <ProcessSection data={data.process_section} />}


      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Industries"
            title="Industries We Serve"
            subtitle="We help businesses across industries grow, scale, and stay competitive in a digital-first world."
            align="center"
            className="mx-auto max-w-3xl"
          />

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {data?.industries_section?.items.map((industry) => (
              <div
                key={industry}
                className="
                  group
                  relative
                  flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  px-6
                  py-10
                  text-center
                  shadow-sm
                  ring-1
                  ring-slate-100
                  transition
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-xl bg-indigo-100 p-2 text-indigo-600 opacity-0 transition group-hover:opacity-100">
                  <span className="text-xs font-semibold">●</span>
                </div>

                <span className="text-sm sm:text-base font-semibold text-slate-900">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {related.length > 0 && (
        <section className="py-20 bg-white">
          <SectionHeader eyebrow="Related" title="Explore Other Services" align="center" />
          <div className="container mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {related.map((svc, i) => (
              <MainServiceCard key={svc.slug} service={svc} index={i} />
            ))}
          </div>
        </section>
      )}

      {data.faq_section && <FAQSection data={data.faq_section} />}

      <section className="py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-indigo-600 px-8 py-14 text-center text-white shadow-2xl shadow-indigo-500/30">
          <h2 className="text-3xl font-bold">{data.final_cta_section.heading}</h2>
          <p className="mt-3 text-indigo-200">{data.final_cta_section.subheading}</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {data.final_cta_section.actions.map((a) => (
              <CtaButton key={a.text} href={a.href} className="px-6 py-3 bg-white text-indigo-600 rounded-full">
                {a.text}
              </CtaButton>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
