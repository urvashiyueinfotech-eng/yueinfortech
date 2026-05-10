import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Card, { type CardProps } from "@/components/ui/Card";
import { fetchBlogs } from "@/lib/firestoreServer";
import { getPageMetadata } from "@/lib/pageSeo.service";

export const revalidate = 2592000;
const BLOG_SEO_REVALIDATE = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("blog", undefined, {
    revalidate: BLOG_SEO_REVALIDATE,
  });
}

export default async function BlogListPage() {
  const posts =
    (await fetchBlogs({ limit: 30, revalidate }))?.map((post) => {
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
        badgeColorClass: "bg-indigo-600 text-white",
        variant: "overlay",
      } satisfies CardProps;
    }) ?? [];

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <PageHero
        title="All Blogs"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      {/* BLOG GRID */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-slate-500">
              No posts available right now.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Card
                  key={post.slug + index}
                  {...post}
                  variant="overlay"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
