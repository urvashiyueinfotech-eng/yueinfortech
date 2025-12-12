import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

const alignmentStyles: Record<NonNullable<SectionHeaderProps["align"]>, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
};

const SectionHeader = ({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-col gap-3",
        alignmentStyles[align],
        className
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="text-slate-700">{subtitle}</p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
