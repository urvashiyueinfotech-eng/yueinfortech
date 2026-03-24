import type { MetadataRoute } from "next";

export type PublicStaticRoute = {
  url: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  lastModified?: Date | string;
};

export const SITE_URL = "https://yueinfotech.com";

export const PUBLIC_STATIC_ROUTES: PublicStaticRoute[] = [
  {
    url: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: "/about-us",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "/services",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: "/blog",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "/contact-us",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];
