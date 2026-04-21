import { ServiceDoc } from "@/types";
import HeroAction from "@/components/HeroAction";
import SectionHeader from "@/components/SectionHeader";

export default function HeroSection({
  data,
  slug,
}: {
  data: ServiceDoc["hero"];
  slug: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <SectionHeader
          eyebrow={data.subheading}
          title={data.heading}
          subtitle={data.description}
          align="center"
          titleClassName="text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-tight"
          subtitleClassName="text-slate-600"
          className="mx-auto max-w-4xl"
        />

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          {data.actions.map((action, idx) => (
            <HeroAction
              key={idx}
              action={action}
              context={{
                page: "service",
                route: `/services/${slug}`,
                section: "hero",
                trigger: action.popupId ?? action.type,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
