import { cache } from "react";
import { unstable_cache } from "next/cache";
import { CACHE_TAGS, CACHE_TTL, getPortfolioProjectTag } from "@/lib/cacheTags";
import { adminDb } from "@/lib/firebaseAdmin";
import type { PortfolioCaseStudy, PortfolioProject } from "@/types/portfolio";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const COLLECTION = "portfolioProjects";

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { timestampValue: string }
  | { nullValue: null }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

function decodeValue(value: FirestoreValue): unknown {
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) return (value.arrayValue.values ?? []).map(decodeValue);
  if ("mapValue" in value) {
    return Object.fromEntries(
      Object.entries(value.mapValue.fields ?? {}).map(([key, entry]) => [key, decodeValue(entry)])
    );
  }
  return null;
}

function decodeDocument(document: { fields?: Record<string, FirestoreValue> }) {
  return Object.fromEntries(
    Object.entries(document.fields ?? {}).map(([key, value]) => [key, decodeValue(value)])
  );
}

function isPublished(data: Partial<PortfolioProject>) {
  return typeof data.status !== "string" || data.status === "Published";
}

/** Reads one published project document from Firestore.
 *
 * Each portfolio page is a document in `portfolioProjects/{slug}`. Keep the
 * page template generic; all project copy, images, modules and CTAs live in
 * Firestore so future work needs no route-specific code. */
export const getPortfolioProjectBySlug = cache(async (slug: string): Promise<PortfolioProject | null> => {
  if (!projectId || !slug) return null;

  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${COLLECTION}/${encodeURIComponent(slug)}`,
    { next: { revalidate: CACHE_TTL.portfolioProject, tags: [getPortfolioProjectTag(slug)] } }
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    console.error(`Failed to load portfolio project "${slug}"`, await response.text());
    return null;
  }

  const document = (await response.json()) as { name?: string; fields?: Record<string, FirestoreValue> };
  const data = decodeDocument(document) as Partial<PortfolioProject>;
  if (!isPublished(data) || !data.card || !data.hero || !data.overview || !data.modules) return null;

  return {
    ...(data as PortfolioProject),
    id: document.name?.split("/").pop() ?? slug,
    slug: typeof data.slug === "string" ? data.slug : slug,
  };
});

/** Returns lightweight project cards for the portfolio landing page. */
export const getPortfolioProjectCards = cache(async (): Promise<PortfolioCaseStudy[]> => {
  if (!projectId) return [];
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${COLLECTION}?pageSize=100`,
    { next: { revalidate: CACHE_TTL.portfolioProject, tags: [CACHE_TAGS.portfolioProjectsList] } }
  );
  if (!response.ok) {
    console.error("Failed to load portfolio project cards", await response.text());
    return [];
  }
  const payload = (await response.json()) as { documents?: Array<{ name?: string; fields?: Record<string, FirestoreValue> }> };
  return (payload.documents ?? []).flatMap((document) => {
    const data = decodeDocument(document) as Partial<PortfolioProject>;
    if (!isPublished(data) || !data.card || typeof data.slug !== "string") return [];
    return [{ ...data.card, id: document.name?.split("/").pop() ?? data.slug, slug: data.slug }];
  });
});

async function fetchProductCards(): Promise<PortfolioCaseStudy[]> {
  if (!adminDb) return [];

  const snapshot = await adminDb.collection(COLLECTION).where("isProduct", "==", true).get();
  return snapshot.docs.flatMap((document) => {
    const data = document.data() as Partial<PortfolioProject>;
    if (!isPublished(data) || !data.card || typeof data.slug !== "string") return [];
    return [{ ...data.card, id: document.id, slug: data.slug }];
  });
}

/** Returns cards for products explicitly marked as products in Firestore. */
export const getProductCards = cache(async (): Promise<PortfolioCaseStudy[]> =>
  unstable_cache(fetchProductCards, ["products:cards:v2"], {
    revalidate: CACHE_TTL.portfolioProject,
    tags: [CACHE_TAGS.productsList],
  })()
);

/** Reads one published product through the server-only Admin SDK. */
export const getProductBySlug = cache(async (slug: string): Promise<PortfolioProject | null> => {
  const db = adminDb;
  if (!db || !slug) return null;

  return unstable_cache(
    async () => {
      const document = await db.collection(COLLECTION).doc(slug).get();
      if (!document.exists) return null;
      const data = document.data() as Partial<PortfolioProject>;
      if (!isPublished(data) || data.isProduct !== true || !data.card || !data.hero || !data.overview || !data.modules) return null;
      return { ...(data as PortfolioProject), id: document.id, slug: typeof data.slug === "string" ? data.slug : slug };
    },
    ["products:detail:v1", slug],
    { revalidate: CACHE_TTL.portfolioProject, tags: [getPortfolioProjectTag(slug)] }
  )();
});
