import { cache } from "react";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
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

const getAllServiceDocs = cache(async (): Promise<Array<{ id: string; data: ServiceDoc }>> => {
  const servicesRef = collection(db, SERVICES_COLLECTION);
  const servicesQuery = query(servicesRef, orderBy("displayOrder", "asc"));
  const snapshot = await getDocs(servicesQuery);

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((snapshotDoc) =>
    mapServiceDocFromSnapshot(snapshotDoc.id, snapshotDoc.data() as ServiceDoc)
  );
});

export const getAllMainServices = cache(async (): Promise<MainService[]> => {
  try {
    const services = await getAllServiceDocs();
    return services.map(({ id, data }) => mapServiceDocToMainService(id, data));
  } catch (error) {
    console.error("Failed to fetch services", error);
    throw new Error("Unable to load services");
  }
});

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceDoc | null> => {
  try {
    const snapshot = await getDoc(doc(db, SERVICES_COLLECTION, slug));
    return snapshot.exists() ? (snapshot.data() as ServiceDoc) : null;
  } catch (error) {
    console.error(`Failed to fetch service for slug: ${slug}`, error);
    return null;
  }
});

export const getRelatedMainServices = cache(
  async (excludeSlug: string, limit = 3): Promise<MainService[]> => {
    try {
      const services = await getAllMainServices();
      return services.filter((service) => service.slug !== excludeSlug).slice(0, limit);
    } catch (error) {
      console.error("Failed to fetch related services", error);
      return [];
    }
  }
);
