import { PUBLIC_STATIC_ROUTES } from "@/lib/publicRoutes";
import { buildUrlSet, normalizeUrl } from "@/lib/sitemapXml";

export const revalidate = 21600;

export function GET() {
  return buildUrlSet(
    PUBLIC_STATIC_ROUTES.map((route) => ({
      url: normalizeUrl(route.url),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );
}
