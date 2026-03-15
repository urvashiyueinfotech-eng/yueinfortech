export const CONTACT_SUBMISSIONS_COLLECTION = "contactSubmissions";

export type ContactSubmissionSource =
  | "website-form"
  | "contact-page"
  | "custom-solution-popup"
  | "hero-secondary-cta"
  | (string & {});

export type ContactSubmissionContext = Partial<
  Record<"page" | "route" | "section" | "trigger" | "campaign", string>
>;

export type ContactSubmissionRequest = {
  name: string;
  phone: string;
  countryCode?: string;
  email: string;
  subject: string;
  message: string;
  source?: ContactSubmissionSource;
  context?: ContactSubmissionContext;
};

export type ContactSubmissionDocument = ContactSubmissionRequest & {
  source: ContactSubmissionSource;
  status: "new";
  origin: "website";
  schemaVersion: 1;
  createdAt: string;
  updatedAt: string;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeContext(context: unknown): ContactSubmissionContext | undefined {
  if (!context || typeof context !== "object") return undefined;

  const candidate = context as Record<string, unknown>;
  const nextContext: ContactSubmissionContext = {};

  for (const key of ["page", "route", "section", "trigger", "campaign"] as const) {
    const value = cleanString(candidate[key]);
    if (value) {
      nextContext[key] = value;
    }
  }

  return Object.keys(nextContext).length > 0 ? nextContext : undefined;
}

export function sanitizeContactSubmission(
  payload: Partial<ContactSubmissionRequest> | null | undefined
): ContactSubmissionRequest | null {
  const submission = {
    name: cleanString(payload?.name),
    phone: cleanString(payload?.phone),
    countryCode: cleanString(payload?.countryCode),
    email: cleanString(payload?.email),
    subject: cleanString(payload?.subject),
    message: cleanString(payload?.message),
    source: cleanString(payload?.source) || "website-form",
    context: sanitizeContext(payload?.context),
  } satisfies ContactSubmissionRequest;

  if (
    !submission.name ||
    !submission.phone ||
    !submission.email ||
    !submission.subject ||
    !submission.message
  ) {
    return null;
  }

  return submission;
}

export function createContactSubmissionDocument(
  submission: ContactSubmissionRequest
): ContactSubmissionDocument {
  const timestamp = new Date().toISOString();

  return {
    ...submission,
    source: submission.source ?? "website-form",
    status: "new",
    origin: "website",
    schemaVersion: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
