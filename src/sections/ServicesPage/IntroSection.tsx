import { ServiceDoc } from "@/types";
import CtaButton from "@/components/CtaButton";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

export default function IntroSection({ data }: { data: ServiceDoc["intro_section"] }) {
  const introImg =
    data?.introImage ||
    "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop";

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Overview"
            title={data.heading}
            subtitle={data.description}
            align="left"
            className="max-w-3xl"
            titleClassName="text-slate-900"
            subtitleClassName="text-slate-700"
            eyebrowClassName="bg-slate-100 text-slate-800 ring-slate-200"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                <span className="text-sm font-medium text-slate-800">{feature}</span>
              </div>
            ))}
          </div>

          <CtaButton
            href={data.cta.href}
            bgClassName="bg-indigo-600 hover:bg-indigo-700 px-6 py-3"
            textClassName="text-white text-sm"
            className="inline-flex gap-2 w-fit"
          >
            <span>{data.cta.text}</span>
          </CtaButton>

          {data.additionalDescription ? (
            <div className="ml-auto max-w-3xl rounded-xl border-l-4 border-indigo-600 bg-indigo-50 px-6 py-5 text-sm font-medium leading-7 text-slate-800 [&>strong]:font-bold [&>strong]:text-indigo-600">
              <span dangerouslySetInnerHTML={{ __html: data.additionalDescription }} />
            </div>
          ) : null}
        </div>

        <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-inner ring-1 ring-slate-200">
          <Image
            src={introImg}
            alt="Why choose us"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
