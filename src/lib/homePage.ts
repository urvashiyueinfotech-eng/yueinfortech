import { type CardProps } from "@/components/ui/Card";
import { fetchBlogs, fetchFaqsForCategoryName } from "@/lib/firestoreServer";

const HOME_FAQ_REVALIDATE = 60;
const HOME_BLOG_REVALIDATE = 300;

type HomeFaq = {
  question: string;
  answer: string;
};

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

  const faqs = (await fetchFaqsForCategoryName("Home", {
    publishedOnly: true,
    revalidate: HOME_FAQ_REVALIDATE,
  })) as HomeFaq[];

  return { posts, faqs };
}
