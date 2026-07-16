import { fetchBlogs } from "@/lib/firestoreServer";
import { buildUrlSet, normalizeUrl, SITEMAP_REVALIDATE } from "@/lib/sitemapXml";

export const revalidate = 21600;

export async function GET() {
  const blogs = await fetchBlogs({ limit: 1000, revalidate: SITEMAP_REVALIDATE });

  return buildUrlSet(
    blogs
      .filter((blog) => blog.slug)
      .map((blog) => ({
        url: normalizeUrl(blog.slug),
        lastModified: blog.date,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );
}
