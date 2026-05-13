import type { ReactNode } from "react";

import SectionHeader from "@/components/SectionHeader";
import FaqAccordion from "@/components/FaqAccordion";
import { cn } from "@/lib/utils";
import type { FaqItemType } from "@/components/faq.types";

export type FaqSectionProps = {
  faqs: FaqItemType[];
  eyebrow?: string | null;
  title?: ReactNode | null;
  subtitle?: string | null;
  align?: "left" | "center";
  layout?: "split" | "stacked";
  as?: "h1" | "h2" | "h3";
  sectionClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  headerWrapperClassName?: string;
  accordionWrapperClassName?: string;
  headerClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function FaqSection({
  faqs,
  eyebrow,
  title,
  subtitle,
  align = "left",
  layout = "split",
  as = "h2",
  sectionClassName,
  containerClassName,
  contentClassName,
  headerWrapperClassName,
  accordionWrapperClassName,
  headerClassName,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}: FaqSectionProps) {
  const isStacked = layout === "stacked";
  const resolvedEyebrow = eyebrow === undefined ? "FAQ" : eyebrow;
  const resolvedTitle =
    title === undefined ? "Answers to Common Questions" : title;
  const resolvedSubtitle =
    subtitle === undefined
      ? "Everything you need to know about our services, process, and how we help businesses grow with SEO, technology, and strategy."
      : subtitle;

  return (
    <section className={cn("relative py-24 lg:py-32", sectionClassName)}>
      <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", containerClassName)}>
        <div
          className={cn(
            isStacked
              ? "mx-auto flex max-w-4xl flex-col gap-10"
              : "flex flex-col gap-10 lg:flex-row lg:items-start",
            contentClassName
          )}
        >
          <div
            className={cn(
              isStacked ? "w-full" : "lg:w-[40%]",
              headerWrapperClassName
            )}
          >
            <SectionHeader
              eyebrow={resolvedEyebrow ?? undefined}
              title={resolvedTitle}
              subtitle={resolvedSubtitle ?? undefined}
              align={align}
              as={as}
              eyebrowClassName={eyebrowClassName}
              titleClassName={titleClassName ?? "text-slate-900 text-4xl lg:text-5xl leading-tight"}
              subtitleClassName={subtitleClassName ?? "text-slate-700"}
              className={cn(
                isStacked
                  ? align === "center"
                    ? "mx-auto max-w-3xl"
                    : "max-w-3xl"
                  : "max-w-xl",
                headerClassName
              )}
            />
          </div>

          <div
            className={cn(
              isStacked ? "w-full" : "lg:w-[60%]",
              accordionWrapperClassName
            )}
          >
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
