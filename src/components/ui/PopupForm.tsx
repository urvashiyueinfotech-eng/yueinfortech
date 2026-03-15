"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AlertCircle, LoaderCircle, X } from "lucide-react";
import PhoneInput, {
  getCountryCallingCode,
  isPossiblePhoneNumber,
  type Country,
} from "react-phone-number-input";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

type PopupFormValue = string | boolean;

export type PopupFormValues = Record<string, PopupFormValue>;

type PopupFormOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type PopupFormFieldBase = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  description?: string;
  validator?: (value: PopupFormValue, values: PopupFormValues) => string | null;
};

type PopupFormInputField = PopupFormFieldBase & {
  type: "text" | "email" | "tel" | "url";
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  leadingAddon?: string;
  maxLength?: number;
};

type PopupFormPhoneField = PopupFormFieldBase & {
  type: "phone";
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  maxLength?: number;
  countryCodeName: string;
  countryCodeLabel?: string;
  countryCodeDefaultValue?: string;
  defaultCountry?: Country;
};

type PopupFormTextareaField = PopupFormFieldBase & {
  type: "textarea";
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  maxLength?: number;
};

type PopupFormSelectField = PopupFormFieldBase & {
  type: "select";
  options: PopupFormOption[];
  defaultValue?: string;
  placeholder?: string;
};

type PopupFormCheckboxField = PopupFormFieldBase & {
  type: "checkbox";
  defaultValue?: boolean;
};

type PopupFormHiddenField = {
  type: "hidden";
  name: string;
  defaultValue?: string;
};

export type PopupFormField =
  | PopupFormInputField
  | PopupFormPhoneField
  | PopupFormTextareaField
  | PopupFormSelectField
  | PopupFormCheckboxField
  | PopupFormHiddenField;

type PopupFormSubmitResult = {
  close?: boolean;
  reset?: boolean;
  successMessage?: string;
};

type PopupFormImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type PopupFormProps = {
  trigger?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  image?: PopupFormImage;
  fields: PopupFormField[];
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  resetOnSuccess?: boolean;
  closeOnSuccess?: boolean;
  footer?: ReactNode;
  onSubmit: (values: PopupFormValues) => Promise<PopupFormSubmitResult | void> | PopupFormSubmitResult | void;
  className?: string;
  panelClassName?: string;
  closeOnBackdropClick?: boolean;
};

const LABEL_STYLES =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500";
const CONTROL_STYLES =
  "w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60";

function isRenderableField(field: PopupFormField): field is Exclude<PopupFormField, PopupFormHiddenField> {
  return field.type !== "hidden";
}

function getFieldDefaultValue(field: PopupFormField): PopupFormValue {
  if (field.type === "checkbox") return field.defaultValue ?? false;
  if (field.type === "phone") return field.defaultValue ?? "";
  return field.defaultValue ?? "";
}

function buildInitialValues(fields: PopupFormField[]): PopupFormValues {
  return fields.reduce<PopupFormValues>((accumulator, field) => {
    accumulator[field.name] = getFieldDefaultValue(field);
    if (field.type === "phone") {
      accumulator[field.countryCodeName] =
        field.countryCodeDefaultValue ??
        (field.defaultCountry ? `+${getCountryCallingCode(field.defaultCountry)}` : "");
    }
    return accumulator;
  }, {});
}

function getRequiredMessage(label: string) {
  return `${label} is required.`;
}

function validateField(field: PopupFormField, values: PopupFormValues): string | null {
  if (field.type === "hidden") return null;

  const value = values[field.name];

  if (field.required) {
    if (field.type === "checkbox") {
      if (value !== true) return getRequiredMessage(field.label);
    } else if (field.type === "phone") {
      if (!String(values[field.countryCodeName] ?? "").trim()) {
        return "Please select a country code.";
      }
      if (!String(value ?? "").trim()) {
        return getRequiredMessage(field.label);
      }
    } else if (!String(value ?? "").trim()) {
      return getRequiredMessage(field.label);
    }
  }

  if (field.type === "email" && String(value ?? "").trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(String(value))) return "Please enter a valid email address.";
  }

  if (field.type === "phone" && String(value ?? "").trim()) {
    if (!isPossiblePhoneNumber(String(value))) return "Please enter a valid phone number.";
  }

  if (field.validator) {
    return field.validator(value, values);
  }

  return null;
}

function validateFields(fields: PopupFormField[], values: PopupFormValues) {
  return fields.reduce<Record<string, string>>((accumulator, field) => {
    const error = validateField(field, values);
    if (error) {
      accumulator[field.name] = error;
    }
    return accumulator;
  }, {});
}

function mergeHandlers<E>(
  ownHandler: ((event: E) => void) | undefined,
  externalHandler: ((event: E) => void) | undefined
) {
  return (event: E) => {
    externalHandler?.(event);
    ownHandler?.(event);
  };
}

function PopupFormFieldRenderer({
  field,
  value,
  values,
  error,
  inputId,
  inputRef,
  onValueChange,
}: {
  field: Exclude<PopupFormField, PopupFormHiddenField>;
  value: PopupFormValue;
  values: PopupFormValues;
  error?: string;
  inputId: string;
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onValueChange: (fieldName: string, nextValue: PopupFormValue) => void;
}) {
  const describedBy = error ? `${inputId}-error` : undefined;

  if (field.type === "checkbox") {
    return (
      <div className={cn("space-y-2", field.className)}>
        <label className="flex items-start gap-3 text-sm text-slate-600" htmlFor={inputId}>
          <input
            id={inputId}
            ref={inputRef as Ref<HTMLInputElement>}
            type="checkbox"
            checked={value === true}
            disabled={field.disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            onChange={(event) => onValueChange(field.name, event.target.checked)}
          />
          <span>{field.label}</span>
        </label>
        {error ? (
          <p id={describedBy} className="text-sm text-rose-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={cn("space-y-2", field.className)}>
        <label className={LABEL_STYLES} htmlFor={inputId}>
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <select
          id={inputId}
          ref={inputRef as Ref<HTMLSelectElement>}
          value={String(value ?? "")}
          disabled={field.disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(CONTROL_STYLES, error && "border-rose-300 focus:border-rose-400 focus:ring-rose-100")}
          onChange={(event) => onValueChange(field.name, event.target.value)}
        >
          <option value="" disabled>
            {field.placeholder ?? `Select ${field.label}`}
          </option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {field.description ? <p className="text-xs text-slate-500">{field.description}</p> : null}
        {error ? (
          <p id={describedBy} className="text-sm text-rose-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={cn("space-y-2", field.className)}>
        <label className={LABEL_STYLES} htmlFor={inputId}>
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <textarea
          id={inputId}
          ref={inputRef as Ref<HTMLTextAreaElement>}
          rows={field.rows ?? 4}
          value={String(value ?? "")}
          disabled={field.disabled}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            CONTROL_STYLES,
            "resize-none",
            error && "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
          )}
          onChange={(event) => onValueChange(field.name, event.target.value)}
        />
        {field.description ? <p className="text-xs text-slate-500">{field.description}</p> : null}
        {error ? (
          <p id={describedBy} className="text-sm text-rose-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  if (field.type === "phone") {
    return (
      <div className={cn("space-y-2", field.className)}>
        <label className={LABEL_STYLES} htmlFor={inputId}>
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <div
          className={cn(
            "popup-phone-input rounded-2xl border border-slate-300 bg-white/80 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100",
            error && "border-rose-300 focus-within:border-rose-400 focus-within:ring-rose-100",
            field.disabled && "opacity-60"
          )}
        >
          <PhoneInput
            id={inputId}
            international
            countryCallingCodeEditable={false}
            defaultCountry={field.defaultCountry}
            value={String(value ?? "") || undefined}
            disabled={field.disabled}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className="PhoneInput"
            numberInputProps={{
              ref: inputRef as Ref<HTMLInputElement>,
              maxLength: field.maxLength,
              className: "PhoneInputInput",
            }}
            countrySelectProps={{
              'aria-label': field.countryCodeLabel ?? "Country code",
              className: "PhoneInputCountrySelect",
            }}
            onCountryChange={(nextCountry) =>
              onValueChange(
                field.countryCodeName,
                nextCountry ? `+${getCountryCallingCode(nextCountry)}` : ""
              )
            }
            onChange={(nextValue) => onValueChange(field.name, nextValue ?? "")}
          />
        </div>
        {field.description ? <p className="text-xs text-slate-500">{field.description}</p> : null}
        {error ? (
          <p id={describedBy} className="text-sm text-rose-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  const addon = field.leadingAddon;

  return (
    <div className={cn("space-y-2", field.className)}>
      <label className={LABEL_STYLES} htmlFor={inputId}>
        {field.label}
        {field.required ? " *" : ""}
      </label>
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-2xl border border-slate-300 bg-white/80 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100",
          error && "border-rose-300 focus-within:border-rose-400 focus-within:ring-rose-100",
          field.disabled && "opacity-60"
        )}
      >
        {addon ? (
          <span className="border-r border-slate-200 px-4 text-sm text-slate-500">{addon}</span>
        ) : null}
        <input
          id={inputId}
          ref={inputRef as Ref<HTMLInputElement>}
          type={field.type}
          value={String(value ?? "")}
          disabled={field.disabled}
          maxLength={field.maxLength}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          onChange={(event) => onValueChange(field.name, event.target.value)}
        />
      </div>
      {field.description ? <p className="text-xs text-slate-500">{field.description}</p> : null}
      {error ? (
        <p id={describedBy} className="text-sm text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function PopupForm({
  trigger,
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  image,
  fields,
  submitLabel = "Submit",
  submittingLabel = "Submitting...",
  successMessage = "Thanks. Your form has been submitted successfully.",
  resetOnSuccess = true,
  closeOnSuccess = true,
  footer,
  onSubmit,
  className,
  panelClassName,
  closeOnBackdropClick = true,
}: PopupFormProps) {
  const [mounted, setMounted] = useState(false);
  const isControlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [values, setValues] = useState<PopupFormValues>(() => buildInitialValues(fields));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;
  const firstFocusableRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fieldDefaultsKey = useMemo(
    () =>
      fields
        .map((field) =>
          field.type === "phone"
            ? `${field.name}:${field.type}:${String(getFieldDefaultValue(field))}:${field.countryCodeName}:${field.countryCodeDefaultValue ?? ""}`
            : `${field.name}:${field.type}:${String(getFieldDefaultValue(field))}`
        )
        .join("|"),
    [fields]
  );

  const activeOpen = isControlled ? open : internalOpen;
  const visibleFields = useMemo(() => fields.filter(isRenderableField), [fields]);
  const hasRenderableFields = visibleFields.length > 0;
  const firstVisibleFieldName = visibleFields[0]?.name;

  const setOpenState = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    setValues(buildInitialValues(fields));
    setErrors({});
    setSubmitError(null);
  }, [fieldDefaultsKey]);

  useEffect(() => {
    if (!activeOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenState(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const focusFrame = window.requestAnimationFrame(() => {
      firstFocusableRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [activeOpen]);

  const handleValueChange = (fieldName: string, nextValue: PopupFormValue) => {
    setValues((currentValues) => ({ ...currentValues, [fieldName]: nextValue }));
    setErrors((currentErrors) => {
      if (!(fieldName in currentErrors)) return currentErrors;
      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasRenderableFields) {
      setSubmitError("This form is temporarily unavailable.");
      return;
    }

    const validationErrors = validateFields(fields, values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError("Please fix the highlighted fields and try again.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      const result = await onSubmit(values);
      const shouldReset = result?.reset ?? resetOnSuccess;
      const shouldClose = result?.close ?? closeOnSuccess;
      const nextSuccessMessage = result?.successMessage ?? successMessage;

      if (shouldReset) {
        setValues(buildInitialValues(fields));
        setErrors({});
      }

      toast.success(nextSuccessMessage);

      if (shouldClose) {
        setOpenState(false);
      }
    } catch (error) {
      const nextMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setSubmitError(nextMessage);
      toast.error(nextMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderedTrigger =
    trigger && isValidElement<{ onClick?: (event: ReactMouseEvent<HTMLElement>) => void }>(trigger)
      ? cloneElement(trigger, {
          onClick: mergeHandlers<ReactMouseEvent<HTMLElement>>(
            () => setOpenState(true),
            trigger.props.onClick
          ),
          "aria-haspopup": "dialog",
          "aria-expanded": activeOpen,
        } as any)
      : trigger;

  const modalContent = activeOpen && mounted ? createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-slate-950/70 px-3 py-4 backdrop-blur-sm md:items-center md:px-4 md:py-6",
        className
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && closeOnBackdropClick) {
          setOpenState(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "relative grid min-h-0 w-full max-w-5xl rounded-2xl border border-white/20 bg-[#f2efff] shadow-[0_32px_90px_rgba(15,23,42,0.28)] sm:rounded-[32px] md:max-h-[calc(100vh-3rem)] md:grid-cols-[minmax(340px,1.02fr)_minmax(360px,1fr)] md:overflow-hidden",
          panelClassName
        )}
      >
        <button
          type="button"
          aria-label="Close popup form"
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 transition hover:bg-white hover:text-slate-900 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
          onClick={() => setOpenState(false)}
        >
          <X className="h-4 w-4" />
        </button>

        {image ? (
          <div className="relative hidden h-full min-h-[560px] overflow-hidden md:block">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
            {image.caption ? (
              <p className="absolute bottom-6 left-6 right-6 text-3xl font-semibold leading-tight text-white">
                {image.caption}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="min-h-0 p-5 sm:p-8 md:max-h-[calc(100vh-3rem)] md:overflow-y-auto md:p-10">
          <div className="max-w-xl pb-2">
            <h2 id={titleId} className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            ) : null}

            {!hasRenderableFields ? (
              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                This form configuration is invalid. Add at least one visible field before using
                the popup.
              </div>
            ) : (
              <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5" onSubmit={handleSubmit} noValidate>
                {fields.map((field) => {
                  if (field.type === "hidden") {
                    return (
                      <input
                        key={field.name}
                        type="hidden"
                        name={field.name}
                        value={String(values[field.name] ?? "")}
                        readOnly
                      />
                    );
                  }

                  const inputId = `${dialogId}-${field.name}`;

                  return (
                    <div key={field.name}>
                          <PopupFormFieldRenderer
                            field={field}
                            value={values[field.name]}
                            values={values}
                            error={errors[field.name]}
                            inputId={inputId}
                            inputRef={field.name === firstVisibleFieldName ? firstFocusableRef : undefined}
                            onValueChange={handleValueChange}
                      />
                    </div>
                  );
                })}

                {submitError ? (
                  <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{submitError}</p>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting || !hasRenderableFields}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-105 sm:rounded-2xl sm:py-4"
                >
                  {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                  <span>{submitting ? submittingLabel : submitLabel}</span>
                </button>

                {footer ? <div className="pt-1 text-sm text-slate-500">{footer}</div> : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {renderedTrigger}
      {modalContent}
    </>
  );
}
