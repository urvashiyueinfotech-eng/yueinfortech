"use client";

import { useCallback, useMemo } from "react";
import PopupForm, { type PopupFormField, type PopupFormProps, type PopupFormValues } from "@/components/ui/PopupForm";
import type { ContactSubmissionContext, ContactSubmissionSource } from "@/lib/contactSubmission";

type CustomSolutionPopupProps = Omit<
  PopupFormProps,
  "fields" | "onSubmit" | "title" | "description" | "image" | "submitLabel" | "successMessage"
> & {
  serviceOptions?: Array<{ label: string; value: string }>;
  source?: ContactSubmissionSource;
  context?: ContactSubmissionContext;
};

const DEFAULT_SERVICE_OPTIONS = [
  { label: "Web Design & Development", value: "Web Design & Development" },
  { label: "SEO & AI Search Optimization", value: "SEO & AI Search Optimization" },
  { label: "Digital Marketing & Ads", value: "Digital Marketing & Ads" },
  { label: "Content & Copywriting", value: "Content & Copywriting" },
  { label: "IT & Infrastructure Services", value: "IT & Infrastructure Services" },
];

function buildDefaultFields(serviceOptions: Array<{ label: string; value: string }>): PopupFormField[] {
  return [
    {
      type: "text",
      name: "name",
      label: "Full name",
      placeholder: "Enter your full name",
      autoComplete: "name",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter your email address",
      autoComplete: "email",
      required: true,
    },
    {
      type: "phone",
      name: "phone",
      countryCodeName: "countryCode",
      countryCodeLabel: "Country code",
      countryCodeDefaultValue: "+91",
      defaultCountry: "IN",
      label: "Phone number",
      placeholder: "Enter your phone number",
      autoComplete: "tel",
      required: true,
    },
    {
      type: "select",
      name: "subject",
      label: "Service & project details",
      placeholder: "-- Select Service --",
      options: serviceOptions,
      required: true,
    },
    {
      type: "textarea",
      name: "message",
      label: "Brief project description",
      placeholder: "Tell us about your project...",
      rows: 4,
      required: true,
    },
    {
      type: "checkbox",
      name: "agreeToTerms",
      label: "I agree to the privacy policy and terms of service.",
      required: true,
      validator: (value) => (value === true ? null : "You must agree before submitting."),
    },
  ];
}

function mapSubmissionError(payload: unknown) {
  if (payload && typeof payload === "object" && "error" in payload) {
    const message = (payload as { error?: unknown }).error;
    if (typeof message === "string" && message.trim()) return message;
  }
  return "Unable to send your request right now. Please try again.";
}

async function submitContactForm(
  values: PopupFormValues,
  source: ContactSubmissionSource,
  context?: ContactSubmissionContext
) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: values.name,
      phone: values.phone,
      countryCode: values.countryCode,
      email: values.email,
      subject: values.subject,
      message: values.message,
      source,
      context,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(mapSubmissionError(payload));
  }

  return {
    close: true,
    reset: true,
    successMessage:
      payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : "Thanks. We received your project details and will get back to you shortly.",
  };
}

export default function CustomSolutionPopup({
  serviceOptions = DEFAULT_SERVICE_OPTIONS,
  source = "custom-solution-popup",
  context,
  ...props
}: CustomSolutionPopupProps) {
  const fields = useMemo(() => buildDefaultFields(serviceOptions), [serviceOptions]);
  const handleSubmit = useCallback(
    (values: PopupFormValues) => submitContactForm(values, source, context),
    [context, source]
  );

  return (
    <PopupForm
      title="Get Your Custom Solution Today!"
      description="Share your project details, and we'll provide the right solution for your business."
      image={{
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1400&auto=format&fit=crop",
        alt: "Consultant ready to discuss your business requirements",
        caption: "Creativity persists for longer duration",
      }}
      fields={fields}
      submitLabel="Get In Touch"
      successMessage="Thanks. We received your project details and will get back to you shortly."
      onSubmit={handleSubmit}
      {...props}
    />
  );
}
