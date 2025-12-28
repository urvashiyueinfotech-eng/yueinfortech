import { collection, getDocs } from "firebase/firestore";
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
    const snapshot = await getDocs(servicesRef);
    if (snapshot.empty) return [];

    // We map the complex Firestore data to the simple props needed by your Card
    return snapshot.docs.map((doc) => {
      const data = doc.data() as ServiceDoc;
      return {
        id: data.id,
        slug: data.slug,
        // Use the Hero Heading as the Card Title
        title: data.hero.heading, 
        // Use the Hero Description (truncated/styled by the card)
        description: data.hero.description, 
        // Use the Hero background image, or a fallback
        image: data.hero.backgroundImage || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920",
        // Fallback icon since the universal schema doesn't have a top-level icon field
        icon: "Folder", 
        // Ensure the card knows where to link
        href: `/services/${data.slug}`
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
                // @ts-ignore - Ignoring strict type checks on the 'service' prop if MainServiceCard type differs slightly
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
