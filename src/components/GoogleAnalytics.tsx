"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = "G-C7F2MF1Q0J";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() ?? "";

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!window.gtag) return;

    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: pagePath });
  }, [pathname, queryString]);

  return null;
}

