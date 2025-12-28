import { ServiceDoc } from "@/types";
import SectionHeader from "@/components/SectionHeader";
import CtaButton from "@/components/CtaButton";

export default function SubServicesGrid({ data }: { data: ServiceDoc["sub_services_section"] }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="What we deliver"
          title={data.heading}
          subtitle={data.description}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {data.cards.map((card) => (
            <div
              key={card.id}
              className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                {card.subtitle && (
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-600">
                    {card.subtitle}
                  </span>
                )}
              </div>

              <p className="mb-5 text-sm leading-relaxed text-slate-600">
                {card.description}
              </p>

              {card.features && card.features.length > 0 && (
                <ul className="mb-6 space-y-2">
                  {card.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      {feat}
                    </li>
                  ))}
                </ul>
              )}

              {card.cta && (
                <div className="mt-auto pt-2">
                  <CtaButton
                    href={card.cta.href}
                    bgClassName="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5"
                    textClassName="text-white text-sm"
                    className="gap-2 shadow-md"
                  >
                    <span>{card.cta.text}</span>
                  </CtaButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}