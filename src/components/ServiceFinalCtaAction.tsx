import CtaButton from "@/components/CtaButton";
import CustomSolutionPopup from "@/components/CustomSolutionPopup";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
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
    action.type === "whatsapp"
      ? "gap-2 px-6 py-3 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20"
      : action.type === "primary"
        ? "px-6 py-3 rounded-full bg-[#5B4FE9] text-white shadow-[0_4px_20px_rgba(91,79,233,0.4)] hover:bg-[#4A3FD4]"
        : "px-6 py-3 rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20";

  if (action.kind === "popup" && action.popupId === "custom-quote") {
    return (
      <CustomSolutionPopup
        source="service-final-cta"
        context={context}
        trigger={
          <button type="button" className={sharedClassName}>
            {action.type === "whatsapp" ? <WhatsAppIcon className="h-4 w-4" /> : null}
            {action.text}
          </button>
        }
      />
    );
  }

  return (
    <CtaButton href={action.href} className={sharedClassName}>
      {action.type === "whatsapp" ? <WhatsAppIcon className="h-4 w-4" /> : null}
      {action.text}
    </CtaButton>
  );
}
