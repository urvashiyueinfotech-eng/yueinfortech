"use client";

import { useState } from "react";
import FaqItem from "@/components/ui/FaqItem";
import type { FaqItemType } from "./FAQHighlights";

export default function FaqAccordion({ faqs }: { faqs: FaqItemType[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <FaqItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={isOpen}
            onToggle={() => setOpenIndex(isOpen ? null : index)}
          />
        );
      })}
    </div>
  );
}
