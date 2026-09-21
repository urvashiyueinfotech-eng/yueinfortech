"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Subtle fade-and-rise as a block scrolls into view.
 *  Content is always rendered (SEO-safe) and stays visible without JS or when
 *  it is already on screen; only off-screen blocks start hidden and reveal. */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only animate blocks that start below the fold — avoids a flash above it.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.classList.add("translate-y-4", "opacity-0");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("translate-y-4", "opacity-0");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        "translate-y-0 opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}
