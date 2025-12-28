import { ServiceDoc } from "@/types";
import CtaButton from "@/components/CtaButton";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

export default function IntroSection({ data }: { data: ServiceDoc["intro_section"] }) {
    console.log("data>>>",data)
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
        </div>

        <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-inner ring-1 ring-slate-200">
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-500">
           <Image src={data?.introImage} layout="fill" alt="why choose us" />
          </div>
        </div>
      </div>
    </section>
  );
}