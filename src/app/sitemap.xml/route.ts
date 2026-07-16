import { buildSitemapIndex } from "@/lib/sitemapXml";

export const revalidate = 21600;

export function GET() {
  return buildSitemapIndex([
    "/pages-sitemap.xml",
    "/blogs-sitemap.xml",
    "/services-sitemap.xml",
  ]);
}
