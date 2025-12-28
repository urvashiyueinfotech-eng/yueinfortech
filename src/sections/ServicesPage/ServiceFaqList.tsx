"use client";

import { useState } from "react";
import FaqItem from "@/components/ui/FaqItem";

type Question = { question: string; answer: string };

export default function ServiceFaqList({ questions }: { questions: Question[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => (
        <FaqItem
          key={idx}
          question={q.question}
          answer={q.answer}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
