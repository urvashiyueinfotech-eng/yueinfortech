import type { MetadataRoute } from "next";
import { fetchBlogs } from "@/lib/firestoreServer";
import { getAllServiceSlugs } from "@/lib/services.service";
import { PUBLIC_STATIC_ROUTES, SITE_URL } from "@/lib/publicRoutes";

export const revalidate = 21600;

const DEFAULT_LAST_MODIFIED = new Date();

const normalizeLastModified = (value?: Date | string) => {
  if (!value) return DEFAULT_LAST_MODIFIED;
  return value instanceof Date ? value : new Date(value);
};

const normalizeUrl = (path: string) =>
  path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, blogs] = await Promise.all([
    getAllServiceSlugs(),
    fetchBlogs({ limit: 1000, revalidate }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_STATIC_ROUTES.map((route) => ({
    url: normalizeUrl(route.url),
    lastModified: normalizeLastModified(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: normalizeUrl(`/services/${slug}`),
    lastModified: DEFAULT_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((blog) => blog.slug)
    .map((blog) => ({
      url: normalizeUrl(blog.slug),
      lastModified: normalizeLastModified(blog.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
