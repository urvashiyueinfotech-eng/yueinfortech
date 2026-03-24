import { unstable_cache } from "next/cache";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { CACHE_TAGS, CACHE_TTL, getServiceDetailTag } from "@/lib/cacheTags";
import type { MainService } from "@/data/main-services.data";
import { db } from "@/lib/firebase";
import type { ServiceDoc } from "@/types";

const SERVICES_COLLECTION = "services";
const DEFAULT_SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920";

function mapServiceDocToMainService(docId: string, data: ServiceDoc): MainService {
  const slug = data.slug || docId;

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
    return services.map(({ id, data }) => mapServiceDocToMainService(id, data));
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
          .map(({ id, data }) => (data.slug || id || "").trim())
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

  return unstable_cache(
    async () => {
      try {
        const snapshot = await getDoc(doc(db, SERVICES_COLLECTION, slug));
        return snapshot.exists() ? (snapshot.data() as ServiceDoc) : null;
      } catch (error) {
        console.error(`Failed to fetch service for slug: ${slug}`, error);
        return null;
      }
    },
    ["services:detail", slug],
    {
      revalidate: CACHE_TTL.serviceDetail,
      tags: [getServiceDetailTag(slug)],
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
