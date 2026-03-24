import SectionHeader from "@/components/SectionHeader";
import FaqAccordion from "./FaqAccordion";

export type FaqItemType = {
  id: string;
  question: string;
  answer: string;
  order?: number;
};

export default function FaqSection({ faqs }: { faqs: FaqItemType[] }) {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="lg:w-[40%]">
            <SectionHeader
              eyebrow="FAQ"
              title="Answers to Common Questions"
              subtitle="Everything you need to know about our services, process, and how we help businesses grow with SEO, technology, and strategy."
              align="left"
              titleClassName="text-slate-900 text-4xl lg:text-5xl leading-tight"
              subtitleClassName="text-slate-700"
              className="max-w-xl"
            />
          </div>

          <div className="lg:w-[60%]">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
