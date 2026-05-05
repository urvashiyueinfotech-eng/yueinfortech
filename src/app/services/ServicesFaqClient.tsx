"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type PublicFaq } from "@/lib/firestoreServer";

export default function ServicesFaqClient({ faqs }: { faqs: PublicFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.id || index}
            className={`bg-white rounded-2xl border border-[rgba(91,79,233,0.06)] overflow-hidden transition-shadow duration-300 ${
              isOpen
                ? "shadow-[0_8px_40px_rgba(91,79,233,0.16)]"
                : "shadow-[0_4px_24px_rgba(91,79,233,0.08)]"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full bg-transparent border-none p-5 text-left cursor-pointer flex justify-between items-start gap-[14px] focus:outline-none"
            >
              <span className="text-[0.93rem] font-bold text-[#1E1B4B] leading-snug">
                {faq.question}
              </span>
              <span
                className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${
                  isOpen ? "bg-[#5B4FE9] rotate-45" : "bg-[#EEF0FF]"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`w-[13px] h-[13px] transition-colors duration-200 ${
                    isOpen ? "fill-white" : "fill-[#5B4FE9]"
                  }`}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-[22px] pb-[20px] text-[0.87rem] text-[#4B5563] leading-[1.7]">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
