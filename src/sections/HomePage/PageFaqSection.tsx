import FaqSection, { type FaqSectionProps } from "@/components/FaqSection";
import { CACHE_TTL } from "@/lib/cacheTags";
import {
  type PublicFaq,
  fetchFaqsForPage,
} from "@/lib/firestoreServer";

type PageFaqSectionProps = {
  pageId: "home" | "services";
  revalidate?: number;
  sectionProps?: Omit<FaqSectionProps, "faqs">;
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
  sectionProps,
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
      <FaqSection 
        faqs={faqs} 
        sectionClassName="bg-slate-50 border-y border-slate-200"
        titleClassName="text-[clamp(2.2rem,4vw,3.2rem)] font-[800] leading-[1.05] tracking-[-0.03em] text-slate-900 font-['Syne',sans-serif]"
        eyebrowClassName="text-[0.7rem] font-bold tracking-[0.12em] text-[#06B6D4] uppercase px-3 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 inline-block mb-4"
        {...sectionProps} 
      />
    </>
  );
}
