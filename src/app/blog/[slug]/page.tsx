import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Image from "next/image";
import { fetchBlogBySlug } from "@/lib/firestoreServer";
import { getPageMetadata } from "@/lib/pageSeo.service";

export const revalidate = 2592000;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug, { revalidate });

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const fallback: Metadata = {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt || "",
    keywords: blog.keywords,
  };

  return getPageMetadata("blog-detail", fallback, {
    revalidate,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug, { revalidate });
  if (!blog) return notFound();

  const date = blog.date
    ? new Date(blog.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const heroImage = blog.thumbnail || "";

  return (
    <main className="min-h-screen">
      <PageHero
        title={blog.title}
        backgroundImage={heroImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.title },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 lg:px-8">
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900">{blog.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{date ? `${blog.author ?? "Admin"} • ${date}` : blog.author ?? ""}</p>
          </div>

          {heroImage && (
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl lg:h-[440px]">
              <Image
                src={heroImage}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
          )}

          <article
            className="prose prose-lg max-w-none text-slate-800 prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-700"
          >
            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <p className="text-slate-600">Content coming soon.</p>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
