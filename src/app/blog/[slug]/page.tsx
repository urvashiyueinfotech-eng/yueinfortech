import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { fetchBlogBySlug } from "@/lib/firestoreServer";
import { getPageMetadata } from "@/lib/pageSeo.service";
import BlogFaqAccordion from "@/components/blog/BlogFaqAccordion";
import BlogReadingBar from "@/components/blog/BlogReadingBar";
import FadeInImage from "@/components/blog/FadeInImage";
import HeadingAnchors from "@/components/blog/HeadingAnchors";
import Reveal from "@/components/blog/Reveal";
import { BlogTocSidebar, BlogTocInline } from "@/components/blog/BlogToc";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Prepares author-authored HTML for display without changing the stored data:
 *  - drops blank headings/paragraphs (e.g. `<h2><br></h2>`) the editor leaves
 *    behind, which would otherwise render stray spacing and accent bars;
 *  - wraps tables in a horizontal scroll container. */
function prepareBlogContent(content: string) {
  return content
    .replace(
      /<(h[1-6]|p)\b[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi,
      ""
    )
    .replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi, (_table, attributes, body) => {
      return `<div class="blog-table-wrap" tabindex="0" role="region" aria-label="Scrollable table"><table${attributes}>${body}</table></div>`;
    });
}

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
  const toc = blog.tableOfContents ?? [];
  const hasToc = Boolean(blog.showTableOfContents && toc.length > 0);

  /* ── Main reading column (shared between layouts) ── */
  const mainContent = (
    <div className="min-w-0">
      {/* Quick Answer */}
      {blog.quickAnswer && (
        <aside className="mb-10 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-7">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-[0_4px_12px_rgba(88,101,242,0.35)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </span>
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-indigo-600">Quick Answer</p>
              <p className="mt-2 text-[0.975rem] leading-7 text-slate-700">{blog.quickAnswer}</p>
            </div>
          </div>
        </aside>
      )}

      {/* Table of contents — collapsible, mobile / narrow only */}
      {hasToc && (
        <div className="lg:hidden">
          <BlogTocInline items={toc} />
        </div>
      )}

      {/* Article */}
      {blog.content ? (
        <article
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: prepareBlogContent(blog.content) }}
        />
      ) : (
        <article className="blog-prose">
          <p className="text-slate-500">Content coming soon.</p>
        </article>
      )}
      <HeadingAnchors />

      {/* Key Takeaways */}
      {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
        <Reveal>
          <section className="mt-14 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-[0_4px_12px_rgba(5,150,105,0.3)]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
              </span>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">Key Takeaways</h2>
            </div>
            <ul className="mt-5 space-y-3.5">
              {blog.keyTakeaways.map((item) => (
                <li key={item} className="flex gap-3 text-[0.975rem] leading-relaxed text-slate-700">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}

      {/* FAQs */}
      {blog.faqs && blog.faqs.length > 0 && (
        <Reveal>
          <section className="mt-14">
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></svg>
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Frequently Asked Questions</h2>
            </div>
            <BlogFaqAccordion faqs={blog.faqs} />
          </section>
        </Reveal>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <BlogReadingBar title={blog.title} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#06080F] pt-24 sm:pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_15%,rgba(88,101,242,0.14)_0%,transparent_62%),radial-gradient(ellipse_40%_40%_at_85%_30%,rgba(6,182,212,0.08)_0%,transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_0%,black,transparent_80%)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 sm:mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.78rem] text-slate-400">
              <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link href="/blog" className="transition-colors hover:text-white">Blog</Link></li>
              <li className="text-slate-600">/</li>
              <li className="line-clamp-1 max-w-[60vw] text-slate-500">{blog.title}</li>
            </ol>
          </nav>

          {/* Eyebrow */}
          {blog.heroEyebrow && (
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-indigo-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                {blog.heroEyebrow}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="max-w-4xl text-balance text-[clamp(1.9rem,4.4vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-xs font-bold text-white shadow-[0_4px_12px_rgba(88,101,242,0.35)]">
                {(blog.author ?? "Admin").charAt(0).toUpperCase()}
              </span>
              <span className="font-medium text-slate-200">{blog.author ?? "Admin"}</span>
            </span>
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                {date}
              </span>
            )}
            {blog.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                {blog.readTime}
              </span>
            )}
          </div>

          {/* Hero image — a clean white card sized to the graphic; its white
              background merges with the infographic so there are no side gaps */}
          {heroImage && (
            <figure className="relative mx-auto mt-9 max-w-2xl sm:mt-11">
              <div className="pointer-events-none absolute -inset-5 z-0 rounded-[2.5rem] bg-indigo-500/15 blur-3xl" />
              <div className="relative z-10 overflow-hidden rounded-2xl bg-white p-2.5 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:p-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                  <FadeInImage
                    src={heroImage}
                    alt={blog.heroImageAlt || blog.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-contain"
                  />
                </div>
              </div>
            </figure>
          )}
        </div>

        {/* Fade into content */}
        <div className="h-14 sm:h-20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ── CONTENT ── */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {/* Stats bar — overlaps hero/content seam */}
          {blog.heroStats && blog.heroStats.length > 0 && (
            <div className="relative z-20 -mt-24 mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-slate-200/80 shadow-[0_20px_50px_-20px_rgba(16,24,40,0.25)] ring-1 ring-slate-200 sm:-mt-28 sm:grid-cols-3">
              {blog.heroStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="group relative bg-white px-6 py-7 text-center transition-colors hover:bg-slate-50">
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-[1.75rem]">{stat.value}</p>
                  <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className={blog.heroStats && blog.heroStats.length > 0 ? "pb-16 sm:pb-20 lg:pb-24" : "pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pb-24"}>
            {hasToc ? (
              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_248px] lg:gap-14">
                {mainContent}
                <aside className="hidden lg:block">
                  <BlogTocSidebar items={toc} />
                </aside>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl">{mainContent}</div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {blog.ctaTitle && (
        <section className="relative overflow-hidden bg-[#06080F] py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(88,101,242,0.18)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:34px_34px] opacity-60" />
          <Reveal className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-white">{blog.ctaTitle}</h2>
            {blog.ctaDescription && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">{blog.ctaDescription}</p>}
            {blog.ctaLabel && blog.ctaUrl && (
              <Link
                href={blog.ctaUrl}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(88,101,242,0.4)] transition-all hover:scale-[1.03] hover:bg-indigo-500 hover:shadow-[0_0_32px_rgba(88,101,242,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080F] active:scale-95"
              >
                {blog.ctaLabel}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            )}
          </Reveal>
        </section>
      )}
    </main>
  );
}
