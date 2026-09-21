"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export default function BlogFaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-xl border transition-colors ${isOpen ? "border-indigo-200 bg-white shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1"
            >
              <span className="text-[0.95rem] font-semibold leading-snug text-slate-900 sm:text-base">{faq.question}</span>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${isOpen ? "rotate-45 bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[0.95rem] leading-7 text-slate-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
