"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; title: string; level: 2 | 3 };

function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return active;
}

function TocLinks({ items, active }: { items: TocItem[]; active: string }) {
  return (
    <ul className="relative space-y-0.5 border-l border-slate-200">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-[0.8rem] leading-snug transition-colors focus-visible:rounded-r focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
                item.level === 3 ? "pl-7" : "pl-4",
                isActive
                  ? "border-indigo-600 font-semibold text-indigo-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
              )}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Sticky sidebar version — desktop only. */
export function BlogTocSidebar({ items }: { items: TocItem[] }) {
  const active = useActiveHeading(items);
  return (
    <div className="sticky top-28">
      <p className="mb-4 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-slate-400">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path d="M4 6h16M4 12h10M4 18h14" />
        </svg>
        On this page
      </p>
      <nav aria-label="Table of contents">
        <TocLinks items={items} active={active} />
      </nav>
    </div>
  );
}

/** Collapsible card version — mobile / small screens. */
export function BlogTocInline({ items }: { items: TocItem[] }) {
  const active = useActiveHeading(items);
  return (
    <details className="group mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <span className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M4 6h16M4 12h10M4 18h14" />
            </svg>
          </span>
          <span className="text-sm font-bold uppercase tracking-wider text-slate-900">Table of Contents</span>
        </span>
        <svg
          className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <nav aria-label="Table of contents" className="mt-4">
        <TocLinks items={items} active={active} />
      </nav>
    </details>
  );
}
