import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  bgClassName?: string;
  textClassName?: string;
};

export const CtaButton = ({
  href,
  children,
  className,
  bgClassName,
  textClassName,
}: CtaButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        bgClassName ?? "bg-primary",
        textClassName ?? "text-primary-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default CtaButton;
