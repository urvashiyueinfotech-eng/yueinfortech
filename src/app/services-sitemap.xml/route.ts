import { getAllServiceSlugs } from "@/lib/services.service";
import { buildUrlSet, normalizeUrl } from "@/lib/sitemapXml";

export const revalidate = 21600;

export async function GET() {
  const serviceSlugs = await getAllServiceSlugs();

  return buildUrlSet(
    serviceSlugs.map((slug) => ({
      url: normalizeUrl(`/services/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );
}
