"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function BlogReadingBar({ title }: { title: string }) {
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.min(100, (scrolled / height) * 100) : 0);
      setShowBar(scrolled > 640);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[70]" aria-hidden={!showBar}>
      {/* Progress line */}
      <div className="h-[3px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(88,101,242,0.5)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Reading bar — slides in past the hero */}
      <div
        className={cn(
          "border-b border-slate-200/70 bg-white/85 backdrop-blur-md transition-all duration-300 ease-out",
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-2.5 sm:px-6 lg:px-8">
          <p className="line-clamp-1 text-sm font-semibold text-slate-800">{title}</p>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Top
          </button>
        </div>
      </div>
    </div>
  );
}
