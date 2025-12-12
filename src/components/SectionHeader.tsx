import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  eyebrowClassName?: string;
  eyebrowContent?: ReactNode;
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

const alignmentStyles: Record<NonNullable<SectionHeaderProps["align"]>, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
};

const SectionHeader = ({
  id,
  eyebrow,
  eyebrowClassName,
  eyebrowContent,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  align = "center",
  className,
  as = "h2",
}: SectionHeaderProps) => {
  const Heading = as;

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-col gap-3",
        alignmentStyles[align],
        className
      )}
    >
      {eyebrow || eyebrowContent ? (
        <p
          className={cn(
            "inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-primary ring-1 ring-primary/15",
            eyebrowClassName
          )}
        >
          {eyebrowContent ?? eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl",
          titleClassName ?? "text-slate-900"
        )}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p className={cn("text-base", subtitleClassName ?? "text-slate-700")}>{subtitle}</p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
