import FaqSection from "@/sections/HomePage/FAQHighlights";
import { CACHE_TTL } from "@/lib/cacheTags";
import {
  type PublicFaq,
  fetchFaqsForPage,
} from "@/lib/firestoreServer";

type PageFaqSectionProps = {
  pageId: "home" | "services";
  revalidate?: number;
};

function buildFaqJsonLd(faqs: PublicFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default async function PageFaqSection({
  pageId,
  revalidate = CACHE_TTL.faqs,
}: PageFaqSectionProps) {
  const faqs = await fetchFaqsForPage(pageId, {
    publishedOnly: true,
    revalidate,
  });

  if (faqs.length === 0) {
    return null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
      />
      <FaqSection faqs={faqs} />
    </>
  );
}
