"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import CtaButton from "@/components/CtaButton";

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
    <main className="min-h-screen bg-[#F8F9FF] text-[#1E1B4B]">
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0D1035] via-[#111437] to-[#1a1060] px-[5%] pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(91,79,233,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[130%] w-[55%] bg-gradient-to-l from-[rgba(91,79,233,0.12)] via-[rgba(91,79,233,0.05)] to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#5B4FE9]/20 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-3xl rounded-[30px] border border-white/10 bg-white/[0.08] p-7 text-center shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10 lg:p-14">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-[#7B72EE]/30 bg-[#7B72EE]/15 text-[#A9A3FF] shadow-[0_0_40px_rgba(123,114,238,0.25)]">
            <AlertTriangle className="h-9 w-9" />
          </div>

          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(91,79,233,0.4)] bg-[rgba(91,79,233,0.2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#A9A3FF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B72EE]" />
            Services unavailable
          </div>

          <h1 className="text-balance text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[3.2rem]">
            We could not load this services page.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl border-l-[3px] border-[#7B72EE] bg-white/10 px-5 py-4 text-left text-sm leading-7 text-slate-200 sm:text-center">
            Try once more, or contact us directly if the issue persists. We will help you find the right service without making you fight the website first.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5B4FE9] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(91,79,233,0.4)] transition hover:-translate-y-0.5 hover:bg-[#4A3FD4] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9A3FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111437] sm:w-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <CtaButton
              href="/contact-us"
              className="w-full border-[1.5px] border-white/25 px-7 py-3 shadow-none sm:w-auto"
              bgClassName="bg-white/10 hover:bg-white/18"
              textClassName="text-white text-sm font-semibold"
            >
              Contact Us
            </CtaButton>
          </div>
        </div>
      </section>
    </main>
  );
}
