import CtaButton from "@/components/CtaButton";
import CustomSolutionPopup from "@/components/CustomSolutionPopup";
import type { LinkAction } from "@/types";
import type { ContactSubmissionContext } from "@/lib/contactSubmission";

const actionClassMap: Record<
  NonNullable<LinkAction["type"]>,
  { bg: string; text: string }
> = {
  primary: {
    bg: "bg-indigo-600 hover:bg-indigo-700",
    text: "text-white",
  },
  secondary: {
    bg: "border border-slate-300 bg-white hover:bg-slate-50 hover:shadow-md transition-all",
    text: "text-slate-900",
  },
  whatsapp: {
    bg: "bg-green-500 hover:bg-green-600",
    text: "text-white",
  },
  outline: {
    bg: "border border-indigo-600 bg-transparent hover:bg-indigo-600",
    text: "text-indigo-600 hover:text-white",
  },
};

type HeroActionProps = {
  action: LinkAction;
  context?: ContactSubmissionContext;
};

export default function HeroAction({ action, context }: HeroActionProps) {
  const styles = actionClassMap[action.type] ?? actionClassMap.primary;
  const bgClassName = `${styles.bg} px-6 py-3 rounded-full`;
  const textClassName = `${styles.text} text-sm font-semibold transition`;

  if (action.kind === "popup" && action.popupId === "custom-quote") {
    return (
      <CustomSolutionPopup
        source="service-hero-cta"
        context={context}
        trigger={
          <button
            type="button"
            className={`group inline-flex items-center justify-center gap-2 rounded-full shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${bgClassName} ${textClassName}`}
          >
            {action.text}
          </button>
        }
      />
    );
  }

  return (
    <CtaButton
      href={action.href}
      bgClassName={bgClassName}
      textClassName={textClassName}
      className="gap-2"
    >
      {action.text}
    </CtaButton>
  );
}
