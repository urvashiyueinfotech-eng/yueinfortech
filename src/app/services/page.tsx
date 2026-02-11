import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ServiceDoc } from "@/types";

import PageHero from "@/components/ui/PageHero";
import MainServiceCard from "@/components/ui/MainServiceCard";

// 1. ISR Configuration: Revalidate this page every 1 hour (3600 seconds)
export const revalidate = 3600;

// 2. Fetch and Map Data
async function getAllServices() {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, orderBy("displayOrder", "asc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return [];

    // We map the complex Firestore data to a structure that matches the `MainService` type
    return snapshot.docs.map((doc) => {
      const data = doc.data() as ServiceDoc;
      return {
        id: data.id,
        slug: data.slug,
        title: data.hero.heading,
        description: data.hero.description,
        image:
          data.hero.backgroundImage ||
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920",
        eyebrow: data.hero.subheading,
        services: data.intro_section.features,
      };
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// 3. The Page Component
export default async function ServicesPage() {
  const services = await getAllServices();
  return (
    <main className="min-h-screen">
      <PageHero
        title="Our Services"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <section className="relative py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Loading / Empty State Handling */}
          {services.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Loading services...</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <MainServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
