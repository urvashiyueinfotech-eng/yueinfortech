"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import CtaButton from "@/components/CtaButton";
import PageHero from "@/components/ui/PageHero";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Something Went Wrong"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Error" },
        ]}
      />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[30px] bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 sm:p-12 lg:p-16">
            <div className="mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-amber-50 text-amber-600 shadow-inner shadow-amber-100">
              <AlertTriangle className="h-10 w-10" />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
              Unexpected issue
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              We hit a problem loading this page.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Try again once. If the issue continues, return to the homepage or contact us directly.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
              <CtaButton
                href="/contact-us"
                className="w-full sm:w-auto"
                bgClassName="border border-slate-200 bg-white"
                textClassName="text-slate-700"
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
