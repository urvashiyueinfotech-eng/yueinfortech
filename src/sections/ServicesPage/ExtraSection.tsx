import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";
import { ServiceDoc } from "@/types";
import { ArrowUpRight } from "lucide-react";
import ServiceFaqList from "./ServiceFaqList";

export function ProcessSection({ data }: { data: NonNullable<ServiceDoc["process_section"]> }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Process"
          title={data.heading}
          subtitle={data.description}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {data.steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                {step.step_label}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        {data.cta && (
          <div className="mt-8 flex justify-center">
            <CtaButton
              href={data.cta.href}
              bgClassName="bg-indigo-600 hover:bg-indigo-700 px-6 py-3"
              textClassName="text-white text-sm"
              className="gap-2"
            >
              <span>{data.cta.text}</span>
              <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
          </div>
        )}
      </div>
    </section>
  );
}

export function FAQSection({ data }: { data: ServiceDoc["faq_section"] }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="FAQ"
          title={data.heading}
          align="center"
          className="mx-auto max-w-2xl"
        />
        <div className="mt-8">
          <ServiceFaqList questions={data.questions} />
        </div>
      </div>
    </section>
  );
}