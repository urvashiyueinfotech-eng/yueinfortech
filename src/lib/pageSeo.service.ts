import type { Metadata } from "next";
import { CACHE_TTL, getSeoTag } from "@/lib/cacheTags";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { timestampValue: string }
  | { nullValue: null }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type PageSeoDocument = {
  pageId: string;
  pageName: string;
  pagePath: string;
  title: string;
  description: string;
  author: string;
  themeColor: string;
  robots: string;
  canonicalUrl: string;
  openGraphType: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphUrl: string;
  openGraphImage: string;
  openGraphImageWidth: number | null;
  openGraphImageHeight: number | null;
  openGraphImageAlt: string;
  openGraphLocale: string;
  openGraphSiteName: string;
  twitterCard: string;
  twitterSite: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterImageAlt: string;
  jsonLd: JsonLdItem[];
};

type PageSeoOptions = {
  revalidate?: number;
  fallbackPageIds?: string[];
};

type TwitterCard = "summary" | "summary_large_image" | "player" | "app";
export type JsonLdItem = Record<string, unknown>;

const decodeValue = (val: FirestoreValue): unknown => {
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return parseInt(val.integerValue, 10);
  if ("doubleValue" in val) return val.doubleValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("timestampValue" in val) return val.timestampValue;
  if ("nullValue" in val) return null;
  if ("arrayValue" in val) return (val.arrayValue.values ?? []).map(decodeValue);
  if ("mapValue" in val) {
    const out: Record<string, unknown> = {};
    Object.entries(val.mapValue.fields ?? {}).forEach(([key, value]) => {
      out[key] = decodeValue(value as FirestoreValue);
    });
    return out;
  }
  return null;
};

const decodeDocument = (document: unknown) => {
  const fields =
    typeof document === "object" && document !== null && "fields" in document
      ? (document as { fields?: Record<string, FirestoreValue> }).fields
      : null;
  if (!fields) return null;

  const out: Record<string, unknown> = {};
  Object.entries(fields).forEach(([key, value]) => {
    out[key] = decodeValue(value as FirestoreValue);
  });
  return out;
};

const toNumberOrNull = (value: unknown) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const normalizeJsonLd = (value: unknown): JsonLdItem[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is JsonLdItem =>
      Boolean(item) && typeof item === "object" && !Array.isArray(item)
  );
};

const parseRobots = (directives?: string): Metadata["robots"] | undefined => {
  if (!directives) return undefined;

  const robots: Record<string, string | number | boolean> = {};
  directives.split(",").map((part) => part.trim().toLowerCase()).forEach((directive) => {
    if (!directive) return;

    if (directive === "index") robots.index = true;
    else if (directive === "noindex") robots.index = false;
    else if (directive === "follow") robots.follow = true;
    else if (directive === "nofollow") robots.follow = false;
    else if (directive === "noarchive") robots.noarchive = true;
    else if (directive === "nosnippet") robots.nosnippet = true;
    else if (directive === "noimageindex") robots.noimageindex = true;
    else if (directive === "nocache") robots.nocache = true;
    else if (directive === "notranslate") robots.notranslate = true;
    else if (directive.startsWith("max-image-preview:")) {
      robots.maxImagePreview = directive.split(":")[1] ?? "large";
    } else if (directive.startsWith("max-snippet:")) {
      robots.maxSnippet = Number(directive.split(":")[1] ?? "-1");
    } else if (directive.startsWith("max-video-preview:")) {
      robots.maxVideoPreview = Number(directive.split(":")[1] ?? "-1");
    }
  });

  return Object.keys(robots).length > 0 ? (robots as Metadata["robots"]) : undefined;
};

async function getPageSeoDocument(
  pageId: string,
  revalidate = CACHE_TTL.seo
): Promise<PageSeoDocument | null> {
  if (!projectId || !pageId) return null;

  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/metaTags/${pageId}`,
    {
      headers: { "Content-Type": "application/json" },
      next: { revalidate, tags: [getSeoTag(pageId)] },
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    console.error("Failed to fetch page SEO", pageId, await response.text());
    return null;
  }

  const data = decodeDocument(await response.json());
  if (!data) return null;

  return {
    pageId: String(data.pageId ?? pageId),
    pageName: String(data.pageName ?? ""),
    pagePath: String(data.pagePath ?? ""),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    author: String(data.author ?? ""),
    themeColor: String(data.themeColor ?? ""),
    robots: String(data.robots ?? ""),
    canonicalUrl: String(data.canonicalUrl ?? ""),
    openGraphType: String(data.openGraphType ?? "website"),
    openGraphTitle: String(data.openGraphTitle ?? ""),
    openGraphDescription: String(data.openGraphDescription ?? ""),
    openGraphUrl: String(data.openGraphUrl ?? ""),
    openGraphImage: String(data.openGraphImage ?? ""),
    openGraphImageWidth: toNumberOrNull(data.openGraphImageWidth),
    openGraphImageHeight: toNumberOrNull(data.openGraphImageHeight),
    openGraphImageAlt: String(data.openGraphImageAlt ?? ""),
    openGraphLocale: String(data.openGraphLocale ?? ""),
    openGraphSiteName: String(data.openGraphSiteName ?? "Yue Infotech"),
    twitterCard: String(data.twitterCard ?? "summary_large_image"),
    twitterSite: String(data.twitterSite ?? ""),
    twitterTitle: String(data.twitterTitle ?? ""),
    twitterDescription: String(data.twitterDescription ?? ""),
    twitterImage: String(data.twitterImage ?? ""),
    twitterImageAlt: String(data.twitterImageAlt ?? ""),
    jsonLd: normalizeJsonLd(data.jsonLd),
  };
}

export async function getPageSeo(
  pageId: string,
  { revalidate = CACHE_TTL.seo, fallbackPageIds = [] }: PageSeoOptions = {}
) {
  for (const candidatePageId of [pageId, ...fallbackPageIds]) {
    const seo = await getPageSeoDocument(candidatePageId, revalidate);
    if (seo) return seo;
  }

  return null;
}

export async function getPageJsonLd(
  pageId: string,
  { revalidate = CACHE_TTL.seo, fallbackPageIds = [] }: PageSeoOptions = {}
) {
  const seo = await getPageSeo(pageId, { revalidate, fallbackPageIds });
  return seo?.jsonLd ?? [];
}

export function getServiceSeoPageId(slugPath: string) {
  return `service-${slugPath.replace(/\//g, "__")}`;
}

export async function getPageMetadata(
  pageId: string,
  fallback: Metadata = {},
  { revalidate = CACHE_TTL.seo }: PageSeoOptions = {}
): Promise<Metadata> {
  const seo = await getPageSeo(pageId, { revalidate });

  if (!seo) {
    return fallback;
  }

  const openGraph: Metadata["openGraph"] = {
    ...(fallback.openGraph ?? {}),
    ...(seo.openGraphType ? { type: seo.openGraphType as Metadata["openGraph"] extends { type?: infer T } ? T : never } : {}),
    ...(seo.openGraphTitle || seo.title
      ? { title: seo.openGraphTitle || seo.title }
      : {}),
    ...(seo.openGraphDescription || seo.description
      ? { description: seo.openGraphDescription || seo.description }
      : {}),
    ...(seo.openGraphUrl || seo.canonicalUrl
      ? { url: seo.openGraphUrl || seo.canonicalUrl }
      : {}),
    ...(seo.openGraphSiteName ? { siteName: seo.openGraphSiteName } : {}),
    ...(seo.openGraphLocale ? { locale: seo.openGraphLocale } : {}),
    ...(seo.openGraphImage
      ? {
          images: [
            {
              url: seo.openGraphImage,
              ...(seo.openGraphImageWidth ? { width: seo.openGraphImageWidth } : {}),
              ...(seo.openGraphImageHeight ? { height: seo.openGraphImageHeight } : {}),
              ...(seo.openGraphImageAlt ? { alt: seo.openGraphImageAlt } : {}),
            },
          ],
        }
      : {}),
  };

  const twitter: Metadata["twitter"] = {
    ...(fallback.twitter ?? {}),
    ...(seo.twitterCard ? { card: seo.twitterCard as TwitterCard } : {}),
    ...(seo.twitterSite ? { site: seo.twitterSite } : {}),
    ...(seo.twitterTitle || seo.title ? { title: seo.twitterTitle || seo.title } : {}),
    ...(seo.twitterDescription || seo.description
      ? { description: seo.twitterDescription || seo.description }
      : {}),
    ...(seo.twitterImage
      ? {
          images: seo.twitterImageAlt
            ? [{ url: seo.twitterImage, alt: seo.twitterImageAlt }]
            : [seo.twitterImage],
        }
      : {}),
  };

  return {
    ...fallback,
    title: seo.title || fallback.title,
    description: seo.description || fallback.description,
    authors: seo.author ? [{ name: seo.author }] : fallback.authors,
    robots: parseRobots(seo.robots) ?? fallback.robots,
    alternates: seo.canonicalUrl
      ? {
          ...(fallback.alternates ?? {}),
          canonical: seo.canonicalUrl,
        }
      : fallback.alternates,
    openGraph,
    twitter,
    ...(seo.themeColor
      ? {
          other: {
            "theme-color": seo.themeColor,
          },
        }
      : fallback.other
      ? { other: fallback.other }
      : {}),
  };
}
