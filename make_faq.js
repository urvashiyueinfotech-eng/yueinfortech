const fs = require('fs');

const faqComponent = `"use client";

import { useState } from "react";

type Question = { question: string; answer: string };

export default function ServiceDetailFaq({ questions }: { questions: Question[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[760px] animate-fade-up">
      {questions.map((q, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className={\`bg-white rounded-[16px] mb-3 border border-[#5B4FE9]/5 overflow-hidden transition-shadow duration-200 \${isOpen ? 'shadow-[0_8px_40px_rgba(91,79,233,0.16)]' : 'shadow-[0_4px_24px_rgba(91,79,233,0.08)]'}\`}
          >
            <button
              className="w-full bg-none border-none p-[22px_24px] text-left cursor-pointer flex justify-between items-center gap-4"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              type="button"
            >
              <span className="text-[1rem] font-bold text-[#1E1B4B]">{q.question}</span>
              <span className={\`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 \${isOpen ? 'bg-[#5B4FE9] rotate-45' : 'bg-[#EEF0FF]'}\`}>
                <svg viewBox="0 0 24 24" className={\`w-3.5 h-3.5 transition-colors duration-200 \${isOpen ? 'fill-white stroke-white' : 'fill-[#5B4FE9] stroke-[#5B4FE9]'}\`}>
                  <path d="M12 5v14M5 12h14" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div 
              className="text-[0.9rem] text-[#4B5563] leading-[1.72] overflow-hidden transition-all duration-400 ease-in-out"
              style={{ maxHeight: isOpen ? '500px' : '0px' }}
            >
              <div className={\`px-[24px] \${isOpen ? 'pb-[22px]' : 'pb-0'}\`}>
                {q.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
`;

fs.writeFileSync('src/app/services/[...slug]/ServiceDetailFaq.tsx', faqComponent);
console.log("Created ServiceDetailFaq.tsx");

// Now update page.tsx to use it instead of FAQSection

let pageContent = fs.readFileSync('src/app/services/[...slug]/page.tsx', 'utf8');

if (!pageContent.includes('import ServiceDetailFaq')) {
  pageContent = pageContent.replace(
    'import { ProcessSection, FAQSection } from "@/sections/ServicesPage/ExtraSection";',
    'import { ProcessSection } from "@/sections/ServicesPage/ExtraSection";\nimport ServiceDetailFaq from "./ServiceDetailFaq";'
  );
} else {
  // If we had old imports to clean up
  pageContent = pageContent.replace('FAQSection', '');
}

const oldFaqRender = `{/* ── FAQ ── */}
      {data.faq_section?.questions?.length ? (
        <div className="bg-white">
          <FAQSection data={data.faq_section} />
        </div>
      ) : null}`;

const newFaqRender = `{/* ── FAQ ── */}
      {data.faq_section?.questions?.length ? (
        <section className="px-[5%] py-[90px] bg-white">
          <div className="text-[0.73rem] font-bold tracking-[0.1em] uppercase text-[#5B4FE9] mb-3">Common Questions</div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#1E1B4B] tracking-[-0.02em] leading-[1.15] mb-[52px] [&>span]:text-[#5B4FE9]" dangerouslySetInnerHTML={{ __html: data.faq_section.heading.replace('Questions', '<span>Questions</span>') }} />
          <ServiceDetailFaq questions={data.faq_section.questions} />
        </section>
      ) : null}`;

pageContent = pageContent.replace(oldFaqRender, newFaqRender);

fs.writeFileSync('src/app/services/[...slug]/page.tsx', pageContent);
console.log("Updated page.tsx to use new FAQ component");

