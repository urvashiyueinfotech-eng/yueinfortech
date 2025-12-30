"use client";

import SectionHeader from "@/components/SectionHeader";
import Card, { type CardProps } from "@/components/ui/Card";
import Image from "next/image";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

type BlogHighlightsProps = {
  posts?: CardProps[] | unknown;
};

export default function BlogHighlights({ posts }: BlogHighlightsProps) {
  const normalized = Array.isArray(posts)
    ? (posts as CardProps[]).filter((p) => p?.title && p?.image)
    : [];

  const featured = normalized[0];
  const listPosts = normalized.slice(1, 4);

  return (
    <section className="relative py-24 lg:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Blog"
          title="Latest Trends in SEO and Digital Marketing"
          align="center"
          className="mx-auto max-w-3xl"
        />

        {/* MAIN LAYOUT */}
        <div className="mt-16 flex flex-col gap-12 lg:flex-row lg:items-stretch">
          {/* LEFT — FEATURED */}
          <div className="w-full lg:w-[58%]">
            {featured && (
              <Card
                {...featured}
                variant="featured"
                className="h-[420px]"
              />
            )}
          </div>

          {/* RIGHT — BLOG LIST */}
          <div className="flex w-full flex-col justify-start lg:w-[42%]">
            {listPosts.map((post, index) => (
              <div
                key={index}
                className="flex items-start gap-5 py-6 first:pt-0 last:pb-0 border-b border-slate-200 last:border-none"
              >
                {/* IMAGE */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={buildCloudinaryUrl(post.image, {
                      width: 240,
                      crop: "fill",
                      gravity: "auto",
                      quality: "auto:eco",
                    }) || post.image}
                    alt={post.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-center">
                  <div className="mb-1 flex items-center gap-3 text-xs text-slate-500">
                    <span className="uppercase tracking-wide">{post.author}</span>
                    <span>{post.date}</span>
                  </div>

                  <h4 className="text-base font-semibold leading-snug text-slate-900">
                    {post.title}
                  </h4>

                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                    Read More
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}