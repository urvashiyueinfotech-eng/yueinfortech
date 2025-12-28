import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Image from "next/image";
import { fetchBlogBySlug } from "@/lib/firestoreServer";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

  const heroImage = buildCloudinaryUrl(blog.thumbnail ?? "", {
    width: 1600,
    crop: "fill",
    gravity: "auto",
    quality: "auto",
  }) || blog.thumbnail || "";

  return (
    <main className="min-h-screen">
      <PageHero
        title={blog.title}
        backgroundImage={heroImage || "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,w_1600/sample.jpg"}
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