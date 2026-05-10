import { unstable_cache } from "next/cache";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { CACHE_TAGS, CACHE_TTL, getServiceDetailTag } from "@/lib/cacheTags";
import type { MainService } from "@/data/main-services.data";
import { db } from "@/lib/firebase";
import type { ServiceDoc } from "@/types";

const SERVICES_COLLECTION = "services";
const DEFAULT_SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920";

function normalizeServicePath(pathLike?: string | null) {
  const raw = (pathLike ?? "").trim();
  if (!raw) return "";
  return raw
    .replace(/^\/+/, "")
    .replace(/^services\/+/i, "")
    .replace(/\/+$/, "");
}

function toServiceRoutePath(data: ServiceDoc, docId: string) {
  const normalized = normalizeServicePath(data.slugPath ?? data.slug ?? docId);
  return normalized;
}

export type NavServiceItem = {
  id: string;
  title: string;
  slug: string;
  href: string;
  children: Array<{
    id: string;
    title: string;
    slug: string;
    href: string;
  }>;
};

function formatSlugAsTitle(value: string) {
  return value
    .split("/")
    .pop()
    ?.split("-")
    .filter(Boolean)
    .map((part) => {
      const token = part.toLowerCase();
      if (token === "seo") return "SEO";
      if (token === "aeo") return "AEO";
      if (token === "sxo") return "SXO";
      if (token === "geo") return "GEO";
      if (token === "orm") return "ORM";
      if (token === "ppc") return "PPC";
      if (token === "ui") return "UI";
      if (token === "ux") return "UX";
      if (token === "and") return "&";
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(" ") ?? value;
}

function mapServiceDocToMainService(docId: string, data: ServiceDoc): MainService {
  const slug = toServiceRoutePath(data, docId) || data.slug || docId;

  return {
    id: data.id || slug,
    slug,
    title: data.hero.heading,
    description: data.hero.description,
    image: data.hero.backgroundImage || DEFAULT_SERVICE_IMAGE,
    eyebrow: data.hero.subheading,
    services: data.intro_section.features || [],
    primaryHref: `/services/${slug}`,
  };
}

function mapServiceDocFromSnapshot(
  docId: string,
  data: ServiceDoc
): { id: string; data: ServiceDoc } {
  return {
    id: docId,
    data,
  };
}

async function fetchAllServiceDocs(): Promise<Array<{ id: string; data: ServiceDoc }>> {
  const servicesRef = collection(db, SERVICES_COLLECTION);
  const servicesQuery = query(servicesRef, orderBy("displayOrder", "asc"));
  const snapshot = await getDocs(servicesQuery);

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((snapshotDoc) =>
    mapServiceDocFromSnapshot(snapshotDoc.id, snapshotDoc.data() as ServiceDoc)
  );
}

async function getAllServiceDocs() {
  return unstable_cache(fetchAllServiceDocs, ["services:all"], {
    revalidate: CACHE_TTL.servicesList,
    tags: [CACHE_TAGS.servicesList],
  })();
}

export async function getAllMainServices(): Promise<MainService[]> {
  try {
    const services = await getAllServiceDocs();
    return services
      .filter(({ data }) => !data.serviceType || data.serviceType === "main")
      .map(({ id, data }) => mapServiceDocToMainService(id, data));
  } catch (error) {
    console.error("Failed to fetch services", error);
    throw new Error("Unable to load services");
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const services = await getAllServiceDocs();

    return Array.from(
      new Set(
        services
          .map(({ id, data }) => toServiceRoutePath(data, id))
          .filter((slug) => slug.length > 0)
      )
    );
  } catch (error) {
    console.error("Failed to fetch service slugs", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  if (!slug) return null;
  const normalizedSlug = normalizeServicePath(slug);

  return unstable_cache(
    async () => {
      try {
        if (!normalizedSlug.includes("/")) {
          const directSnapshot = await getDoc(doc(db, SERVICES_COLLECTION, normalizedSlug));
          if (directSnapshot.exists()) {
            return directSnapshot.data() as ServiceDoc;
          }
        }

        // Backward/forward-compatible fallback: locate by slug field.
        const bySlugQuery = query(
          collection(db, SERVICES_COLLECTION),
          where("slug", "==", normalizedSlug),
          limit(1)
        );
        const bySlugSnapshot = await getDocs(bySlugQuery);

        if (!bySlugSnapshot.empty) {
          return bySlugSnapshot.docs[0].data() as ServiceDoc;
        }

        const bySlugPathQuery = query(
          collection(db, SERVICES_COLLECTION),
          where("slugPath", "==", `services/${normalizedSlug}`),
          limit(1)
        );
        const bySlugPathSnapshot = await getDocs(bySlugPathQuery);

        if (!bySlugPathSnapshot.empty) {
          return bySlugPathSnapshot.docs[0].data() as ServiceDoc;
        }

        const docIdFallback = normalizedSlug.split("/").filter(Boolean).pop();
        if (docIdFallback && docIdFallback !== normalizedSlug) {
          const fallbackSnapshot = await getDoc(doc(db, SERVICES_COLLECTION, docIdFallback));
          if (fallbackSnapshot.exists()) {
            const fallbackData = fallbackSnapshot.data() as ServiceDoc;
            if (toServiceRoutePath(fallbackData, docIdFallback) === normalizedSlug) {
              return fallbackData;
            }
          }
        }

        return null;
      } catch (error) {
        console.error(`Failed to fetch service for slug: ${normalizedSlug}`, error);
        return null;
      }
    },
    ["services:detail:v2", normalizedSlug],
    {
      revalidate: CACHE_TTL.serviceDetail,
      tags: [getServiceDetailTag(normalizedSlug)],
    }
  )();
}

export async function getRelatedMainServices(
  excludeSlug: string,
  limit = 3
): Promise<MainService[]> {
  try {
    const services = await getAllMainServices();
    return services.filter((service) => service.slug !== excludeSlug).slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch related services", error);
    return [];
  }
}

export async function getServicesForNav(): Promise<NavServiceItem[]> {
  try {
    const docs = await getAllServiceDocs();
    const byId = new Map(docs.map(({ id, data }) => [id, data]));

    const mains = docs
      .filter(({ data }) => {
        if (data.serviceType === "main") return true;
        if (!data.serviceType && !data.parentDocId) return true;
        return false;
      })
      .sort((a, b) => (a.data.displayOrder ?? 999) - (b.data.displayOrder ?? 999));

    return mains.map(({ id, data }) => {
      const mainSlug = toServiceRoutePath(data, id);
      const childIds = Array.isArray(data.childrenDocIds) ? data.childrenDocIds : [];

      const children = childIds
        .map((childId) => {
          const child = byId.get(childId);
          if (!child) return null;
          const childSlug = toServiceRoutePath(child, childId);
          const childTitle =
            child.navTitle?.trim() ||
            child.hero?.heading?.trim() ||
            formatSlugAsTitle(childSlug);
          return {
            id: child.id || childId,
            title: childTitle,
            slug: childSlug,
            href: `/services/${childSlug}`,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

      const mainTitle =
        data.navTitle?.trim() ||
        formatSlugAsTitle(mainSlug) ||
        data.hero?.heading;

      return {
        id: data.id || id,
        title: mainTitle,
        slug: mainSlug,
        href: `/services/${mainSlug}`,
        children,
      };
    });
  } catch (error) {
    console.error("Failed to fetch nav services tree", error);
    return [];
  }
}
