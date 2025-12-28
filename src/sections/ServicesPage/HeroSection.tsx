import { ServiceDoc } from "@/types";
import CtaButton from "@/components/CtaButton";
import SectionHeader from "@/components/SectionHeader";

/**
 * CTA style presets
 */
const actionClassMap: Record<
  string,
  { bg: string; text: string }
> = {
  primary: {
    bg: "bg-indigo-600 hover:bg-indigo-700",
    text: "text-white",
  },

  secondary: {
    bg: `
      border border-slate-300
      bg-white
      hover:bg-slate-50
      hover:shadow-md
      transition-all
    `,
    text: "text-slate-900",
  },

  whatsapp: {
    bg: "bg-green-500 hover:bg-green-600",
    text: "text-white",
  },

  outline: {
    bg: "border border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-600",
    text: "text-indigo-600 hover:text-white",
  },
};

export default function HeroSection({
  data,
}: {
  data: ServiceDoc["hero"];
}) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Optional background image overlay */}
      {/* {data.backgroundImage && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${data.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )} */}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Header */}
        <SectionHeader
          eyebrow={data.subheading}
          title={data.heading}
          subtitle={data.description}
          align="center"
          titleClassName="text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-tight"
          subtitleClassName="text-slate-600"
          className="mx-auto max-w-4xl"
        />

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          {data.actions.map((action, idx) => {
            const styles =
              actionClassMap[action.type] ??
              actionClassMap.primary;

            return (
              <CtaButton
                key={idx}
                href={action.href}
                bgClassName={`${styles.bg} px-6 py-3 rounded-full`}
                textClassName={`${styles.text} text-sm font-semibold transition`}
                
                className="gap-2"
              >
                {action.text}
              </CtaButton>
            );
          })}
        </div>
      </div>
    </section>
  );
}
