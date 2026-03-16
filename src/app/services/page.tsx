import { Suspense } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import CtaButton from "@/components/CtaButton";
import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import MainServiceCard from "@/components/ui/MainServiceCard";
import { getAllMainServices } from "@/lib/services.service";

export const revalidate = 3600;

function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-slate-100"
        >
          <div className="h-[240px] animate-pulse bg-slate-200" />
          <div className="space-y-5 p-8">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-indigo-100" />
            <div className="h-7 w-3/4 animate-pulse rounded-xl bg-slate-200" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="h-11 w-36 animate-pulse rounded-full bg-indigo-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function ServicesGrid() {
  const services = await getAllMainServices();

  if (services.length === 0) {
    return (
      <div className="rounded-[30px] bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
        <p className="text-lg font-medium text-slate-900">No services are available right now.</p>
        <p className="mt-2 text-slate-600">Please check back shortly or contact us for a custom solution.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <MainServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}

export default async function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Our Services"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 lg:mb-24">
            <SectionHeader
              eyebrow="What We Offer"
              title="Digital, Creative & IT Solutions Designed to Grow Your Business"
              subtitle="Yue Infotech delivers integrated digital systems combining web engineering, search visibility, performance marketing, strategic content, and secure infrastructure — designed to strengthen authority, improve visibility, and generate measurable business growth."
              align="center"
              className="mx-auto max-w-4xl"
              subtitleClassName="text-lg leading-relaxed text-slate-600"
            />

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CtaButton href="/contact-us" className="w-full gap-2 sm:w-auto" bgClassName="bg-gradient-to-r from-violet-600 to-indigo-600" textClassName="text-white font-bold tracking-wide">
                <span>Book Free Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </CtaButton>
              <CtaButton
                href="/contact-us"
                bgClassName="border border-slate-200 bg-white"
                textClassName="text-slate-700"
                className="w-full shadow-sm hover:bg-slate-50 sm:w-auto"
              >
                Get Quote
              </CtaButton>
            </div>
          </div>

          <Suspense fallback={<ServicesGridSkeleton />}>
            <ServicesGrid />
          </Suspense>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-100 bg-slate-50 p-8 shadow-sm sm:p-10 lg:p-14">
            <SectionHeader
              eyebrow="Why Choose Yue Infotech"
              title="Why Choose Yue Infotech"
              subtitle="We combine marketing strategy, technical engineering, and infrastructure expertise to build digital systems that support sustainable business growth."
              align="center"
              className="mx-auto max-w-4xl"
              titleClassName="text-slate-900"
              subtitleClassName="text-lg leading-relaxed text-slate-600"
            />

            <div className="mx-auto mt-8 max-w-3xl text-center">
              <h3 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                Your All-in-One Partner for Digital Growth &amp; Security
              </h3>
            </div>

            <div className="mt-10 flex justify-center">
              <CtaButton
                href="/contact-us"
                className="w-full gap-2 sm:w-auto"
                bgClassName="bg-gradient-to-r from-violet-600 to-indigo-600"
                textClassName="text-white font-bold tracking-wide"
              >
                <span>Get Personalized Recommendations</span>
                <ArrowRight className="h-4 w-4" />
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900 p-8 text-white shadow-2xl shadow-indigo-900/20 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Need Help Choosing the Right Service?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-indigo-100 sm:text-lg">
                We’ll understand your goals, evaluate your digital position, and guide you to the most effective solution.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CtaButton
                href="/contact-us"
                className="w-full gap-2 sm:w-auto"
                bgClassName="bg-white"
                textClassName="font-bold text-indigo-700"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </CtaButton>

              <a
                href="https://wa.me/918859366292"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
