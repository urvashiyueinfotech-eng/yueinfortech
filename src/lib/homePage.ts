import { type CardProps } from "@/components/ui/Card";
import { CACHE_TTL } from "@/lib/cacheTags";
import { fetchBlogs } from "@/lib/firestoreServer";

const HOME_BLOG_REVALIDATE = CACHE_TTL.blogs;

export async function getHomePageData() {
  const blogData = await fetchBlogs({ limit: 4, revalidate: HOME_BLOG_REVALIDATE });

  const posts: CardProps[] | undefined =
    Array.isArray(blogData) && blogData.length
      ? blogData
          .map((post) => {
            const date = post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            return {
              title: post.title,
              image: post.thumbnail ?? "",
              slug: post.slug,
              author: post.author ?? "Admin",
              date,
              description: post.excerpt ?? "",
            } satisfies CardProps;
          })
          .filter((post) => post.title && post.image)
      : undefined;

  return { posts };
}
