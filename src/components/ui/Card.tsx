"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

export type CardProps = {
  title: string;
  image: string;
  slug: string;
  date?: string;
  author?: string;
  description?: string;
  descriptionHTML?: string;
  badgeColorClass?: string;
  backgroundClass?: string;
  contentBgClass?: string;
  variant?: "featured" | "compact" | "overlay";
  tag?: string;
  className?: string;
};

const Card = ({
  title,
  image,
  slug,
  date,
  author,
  description,
  descriptionHTML,
  badgeColorClass,
  backgroundClass,
  contentBgClass,
  variant = "compact",
  tag,
  className,
}: CardProps) => {
  const dateBadgeClass =
    badgeColorClass ??
    (variant === "featured" ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600");

  // Consistent Cloudinary transforms per variant
  const featuredSrc = buildCloudinaryUrl(image, { width: 1600, crop: "fill", gravity: "auto", quality: "auto" });
  const overlaySrc = buildCloudinaryUrl(image, { width: 1400, crop: "fill", gravity: "auto", quality: "auto" });
  const compactSrc = buildCloudinaryUrl(image, { width: 900, crop: "fill", gravity: "auto", quality: "auto" });
  /* -------------------------------------------------------------------------- */
  /*                               FEATURED CARD                                */
  /* -------------------------------------------------------------------------- */
  if (variant === "featured") {
    return (
      <Link
        href={slug}
        className={cn(
          "group relative block h-[420px] w-full overflow-hidden rounded-3xl shadow-lg",
          className
        )}
      >
        <Image
          src={featuredSrc || image}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1000px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent",
            backgroundClass
          )}
        />

        <div className="absolute inset-x-6 bottom-6 text-white">
          {(author || date) && (
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide">
              {author && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold">
                  <User className="h-3.5 w-3.5" />
                  {author}
                </span>
              )}
              {date && (
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold",
                    dateBadgeClass
                  )}
                >
                  {date}
                </span>
              )}
            </div>
          )}

          <h3 className="text-2xl font-semibold leading-snug">{title}</h3>

          {description && (
            <p className="mt-2 text-sm text-white/80">{description}</p>
          )}

          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
            Read More <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               OVERLAY CARD                                 */
  /*                     (ALL BLOGS GRID – IMAGE + TEXT)                         */
  /* -------------------------------------------------------------------------- */
  if (variant === "overlay") {
    return (
      <Link
        href={slug}
        className={cn(
          "group relative block h-[420px] w-full overflow-hidden rounded-3xl",
          className
        )}
      >
        <Image
          src={overlaySrc || image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />

        <div className="absolute inset-x-6 bottom-6">
          {(author || date) && (
            <div className="mb-2 flex items-center gap-3 text-xs text-white/80">
              {author && <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />{author}</span>}
              {date && (
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-white",
                    dateBadgeClass
                  )}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {date}
                </span>
              )}
            </div>
          )}

          <h3 className="text-xl font-semibold leading-snug text-white">
            {title}
          </h3>

          {descriptionHTML && (
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {descriptionHTML}
            </p>
          )}
        </div>
      </Link>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               COMPACT CARD                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Link
      href={slug}
      className={cn(
        "group overflow-hidden rounded-2xl transition hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-56 w-full overflow-hidden rounded-2xl">
        <Image
          src={compactSrc || image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {tag && (
          <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-semibold text-white">
            {tag}
          </span>
        )}
      </div>

      <div
        className={cn(
          "px-5 pb-6 pt-5",
          contentBgClass ?? "bg-white"
        )}
      >
        {(author || date) && (
          <div className="mb-2 flex items-center gap-3 text-xs text-slate-500">
            {author && (
              <span className="inline-flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {author}
              </span>
            )}
            {date && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold",
                  dateBadgeClass
                )}
              >
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
            )}
          </div>
        )}

        <h4 className="text-base font-semibold leading-snug text-slate-900 group-hover:underline underline-offset-4">
          {title}
        </h4>

        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-700">
            {description}
          </p>
        )}

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
          Read More <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

export default Card;