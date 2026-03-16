"use client";

import { useEffect } from "react";
import CtaButton from "@/components/CtaButton";
import PageHero from "@/components/ui/PageHero";

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Services page error", error);
  }, [error]);

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

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-[30px] bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 sm:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
              Services unavailable
            </p>
            <h2 className="text-3xl font-bold text-slate-900">We could not load the services right now.</h2>
            <p className="mt-4 text-slate-600">
              Try again once, or contact us directly if the issue persists.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Retry
              </button>
              <CtaButton
                href="/contact-us"
                bgClassName="border border-slate-200 bg-white"
                textClassName="text-slate-700"
                className="shadow-sm hover:bg-slate-50"
              >
                Contact Us
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

