import CtaButton from "@/components/CtaButton";
import CustomSolutionPopup from "@/components/CustomSolutionPopup";
import type { ContactSubmissionContext } from "@/lib/contactSubmission";
import type { LinkAction } from "@/types";

type ServiceFinalCtaActionProps = {
  action: LinkAction;
  context?: ContactSubmissionContext;
};

export default function ServiceFinalCtaAction({
  action,
  context,
}: ServiceFinalCtaActionProps) {
  const sharedClassName =
    "px-6 py-3 bg-white text-indigo-600 rounded-full hover:bg-indigo-50";

  if (action.kind === "popup" && action.popupId === "custom-quote") {
    return (
      <CustomSolutionPopup
        source="service-final-cta"
        context={context}
        trigger={
          <button type="button" className={sharedClassName}>
            {action.text}
          </button>
        }
      />
    );
  }

  return (
    <CtaButton href={action.href} className={sharedClassName}>
      {action.text}
    </CtaButton>
  );
}
