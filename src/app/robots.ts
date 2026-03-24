import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/publicRoutes";

const DISABLE_INDEXING = process.env.DISABLE_INDEXING === "true";

const LEGACY_DISALLOWS: string[] = [
  "/products/",
  "/product/",
  "/class/",
  "/*.htm$",
  "/*.html$",
  "/home",
  "/api/",          // trailing slash is more explicit
  "/petpooja_captain/", // 👈 add this too
];

export default function robots(): MetadataRoute.Robots {
  if (DISABLE_INDEXING) {
    // Staging/preview — block everything
    return {
      rules: {
        userAgent: "*",
        disallow: "/",  // 👈 block entire site
      },
    };
  }

  // Production
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: LEGACY_DISALLOWS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}