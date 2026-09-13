import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    alternates: { canonical: blog.canonicalUrl || `https://yueinfotech.com/blog/${slug}` },
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
      <section className="bg-[#f7f8ff] pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-500"><Link href="/" className="hover:text-indigo-600">Home</Link> / <Link href="/blog" className="hover:text-indigo-600">Blog</Link> / {blog.title}</p>
            {blog.heroEyebrow && <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">{blog.heroEyebrow}</p>}
            <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 lg:text-6xl">{blog.title}</h1>
            <p className="mt-5 text-sm text-slate-500">By {blog.author ?? "Admin"}{date ? ` · ${date}` : ""}{blog.readTime ? ` · ${blog.readTime}` : ""}</p>
          </div>

          {heroImage && (
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl lg:h-[440px]">
              <Image
                src={heroImage}
                alt={blog.heroImageAlt || blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
          )}

          {blog.heroStats && blog.heroStats.length > 0 && (
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-[#0b1233] text-white sm:grid-cols-3">
              {blog.heroStats.map((stat) => <div key={`${stat.value}-${stat.label}`} className="border-b border-white/10 px-6 py-5 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><p className="text-2xl font-extrabold">{stat.value}</p><p className="mt-1 text-xs text-slate-300">{stat.label}</p></div>)}
            </div>
          )}

          {blog.quickAnswer && <aside className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Quick answer</p><p className="mt-2 leading-7 text-slate-700">{blog.quickAnswer}</p></aside>}

          {blog.showTableOfContents && blog.tableOfContents && blog.tableOfContents.length > 0 && (
            <nav aria-label="Table of contents" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="font-bold text-slate-950">Table of contents</p><ol className="mt-3 space-y-2 text-sm">{blog.tableOfContents.map((item) => <li key={item.id} className={item.level === 3 ? "ml-4" : ""}><a className="text-indigo-600 hover:text-indigo-800 hover:underline" href={`#${item.id}`}>{item.title}</a></li>)}</ol></nav>
          )}

          <article
            className="prose prose-lg max-w-none rounded-xl bg-white p-6 text-slate-800 shadow-sm prose-headings:scroll-mt-24 prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-table:block prose-table:w-full prose-table:overflow-x-auto prose-th:bg-slate-100 prose-th:p-3 prose-td:p-3 prose-th:text-left prose-td:border prose-th:border prose-td:border-slate-200 prose-th:border-slate-200 lg:p-10"
          >
            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <p className="text-slate-600">Content coming soon.</p>
            )}
          </article>

          {blog.keyTakeaways && blog.keyTakeaways.length > 0 && <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-6"><h2 className="text-2xl font-bold text-slate-950">Key takeaways</h2><ul className="mt-4 space-y-2 text-slate-700">{blog.keyTakeaways.map((item) => <li key={item} className="flex gap-2"><span className="text-indigo-600">✓</span>{item}</li>)}</ul></section>}

          {blog.faqs && blog.faqs.length > 0 && <section><h2 className="text-3xl font-bold text-slate-950">Frequently Asked Questions</h2><div className="mt-5 space-y-3">{blog.faqs.map((faq) => <article key={faq.question} className="rounded-xl bg-white p-5 shadow-sm"><h3 className="font-bold text-slate-950">{faq.question}</h3><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></article>)}</div></section>}

          {blog.ctaTitle && <section className="rounded-2xl bg-[#0b1233] px-6 py-10 text-center text-white lg:px-12"><h2 className="text-3xl font-bold">{blog.ctaTitle}</h2>{blog.ctaDescription && <p className="mx-auto mt-3 max-w-2xl text-slate-300">{blog.ctaDescription}</p>}{blog.ctaLabel && blog.ctaUrl && <Link href={blog.ctaUrl} className="mt-6 inline-flex rounded-lg bg-indigo-500 px-5 py-3 font-semibold hover:bg-indigo-400">{blog.ctaLabel}</Link>}</section>}
        </div>
      </section>
    </main>
  );
}
