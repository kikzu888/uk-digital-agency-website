"use client";

import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";

import { enquiryJourneys, type EnquiryIntent } from "@/lib/strategy";
import { services } from "@/lib/content";

const contactSchema = z.object({
  intent: z.enum(["consultation", "project", "audit"]),
  auditArea: z.string().optional(),
  timeline: z.string().optional(),
  preferredTime: z.string().optional(),
  firstName: z.string().min(2, "Enter your name."),
  companyName: z.string(),
  email: z.string().email("Enter a valid email address."),
  phone: z.string(),
  service: z.string().min(1, "Choose a service."),
  projectDescription: z
    .string()
    .min(20, "Add at least 20 characters about the project."),
  privacyConsent: z.literal("on", {
    errorMap: () => ({ message: "Privacy Policy consent is required." }),
  }),
  marketingConsent: z.string().optional(),
  website: z.string().max(0, "Spam protection failed.").optional(),
});

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [intent, setIntent] = useState<EnquiryIntent>("project");
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("intent");
    if (value === "consultation" || value === "audit" || value === "project")
      setIntent(value);
  }, []);
  const journey = enquiryJourneys.find((item) => item.intent === intent)!;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const unsure = "Not sure - help me choose";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    formData.set("intent", intent);
    if (intent === "project")
      formData.set(
        "service",
        (selectedServices.length ? selectedServices : [unsure]).join(", "),
      );
    if (intent !== "project")
      formData.set(
        "service",
        intent === "audit"
          ? String(formData.get("auditArea") || "General audit")
          : "Consultation",
      );
    const result = contactSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [
            String(issue.path[0]),
            issue.message,
          ]),
        ),
      );
      setState({
        status: "error",
        message: "Please check the highlighted fields.",
      });
      return;
    }

    setErrors({});
    setState({ status: "idle", message: "" });

    setPending(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/v1/contact`,
        {
          body: JSON.stringify({
            ...result.data,
            privacyConsent: result.data.privacyConsent === "on",
            marketingConsent: result.data.marketingConsent === "on",
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );

      if (!response.ok) {
        setState({
          status: "error",
          message:
            "We could not send the enquiry. Please try again or contact us by email.",
        });
        return;
      }

      const data = (await response.json()) as { reference: string };
      setState({
        status: "success",
        message: `${journey.confirmation} Reference: ${data.reference}.`,
      });
      form.reset();
      setSelectedServices([]);
    } catch {
      setState({
        status: "error",
        message:
          "We could not reach the enquiry service. Please try again shortly.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
      <fieldset className="grid gap-3">
        <legend className="mb-3 font-semibold">How can we help?</legend>
        {enquiryJourneys.map((item) => (
          <label key={item.intent} className="flex gap-3 rounded-md border p-3">
            <input
              type="radio"
              name="intent"
              value={item.intent}
              checked={intent === item.intent}
              onChange={() => {
                setIntent(item.intent);
                setErrors({});
                setState({ status: "idle", message: "" });
              }}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>
      <p className="text-sm text-slate-600">{journey.summary}</p>
      {intent === "audit" && (
        <SelectField
          label="Audit area"
          name="auditArea"
          options={[
            "Website & SEO",
            "Advertising",
            "CRM & follow-up",
            "WhatsApp & email marketing",
            "AI process automation",
          ]}
        />
      )}
      {intent === "consultation" && (
        <Field
          label="Preferred time and time zone (optional)"
          name="preferredTime"
        />
      )}
      {intent === "project" && (
        <Field label="Preferred timeline (optional)" name="timeline" />
      )}
      <div className="hidden">
        <label htmlFor="website">Website</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} />
      </div>
      <Field error={errors.firstName} label="Name" name="firstName" />
      <Field
        error={errors.companyName}
        label="Company name (optional)"
        name="companyName"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field error={errors.email} label="Email" name="email" type="email" />
        <Field
          error={errors.phone}
          label="Phone / WhatsApp (optional)"
          name="phone"
          type="tel"
        />
      </div>
      {intent === "project" && (
        <fieldset className="grid gap-3">
          <legend className="mb-2 font-medium text-slate-800">
            Services you are interested in
          </legend>
          <p className="text-sm text-slate-600">
            Choose as many as you need, or let us help you decide.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[...services.map((item) => item.title), unsure].map((value) => (
              <label
                key={value}
                className="flex items-start gap-3 rounded-md border border-slate-300 p-3"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(value)}
                  onChange={(event) =>
                    setSelectedServices((current) =>
                      event.target.checked
                        ? value === unsure
                          ? [unsure]
                          : [
                              ...current.filter((item) => item !== unsure),
                              value,
                            ]
                        : current.filter((item) => item !== value),
                    )
                  }
                  className="mt-1 h-4 w-4"
                />
                <span className="text-sm">{value}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <label className="grid gap-2 text-sm font-medium text-slate-800">
        What would you like to improve?
        <textarea
          className="min-h-36 rounded-md border border-slate-300 bg-white/90 px-4 py-3 text-base outline-none focus:border-[#6941b0]"
          name="projectDescription"
        />
        {errors.projectDescription ? (
          <span className="text-sm text-red-700">
            {errors.projectDescription}
          </span>
        ) : null}
      </label>
      <label className="flex gap-3 text-sm leading-6 text-slate-700">
        <input className="mt-1 h-4 w-4" name="privacyConsent" type="checkbox" />
        <span>
          I agree to the Privacy Policy and understand my details will be used
          to respond to this enquiry.
        </span>
      </label>
      {errors.privacyConsent ? (
        <span className="text-sm text-red-700">{errors.privacyConsent}</span>
      ) : null}
      <label className="flex gap-3 text-sm leading-6 text-slate-700">
        <input
          className="mt-1 h-4 w-4"
          name="marketingConsent"
          type="checkbox"
        />
        <span>I agree to receive occasional marketing updates.</span>
      </label>
      <button
        className="rounded-md venus-button px-5 py-3 font-semibold text-white"
        type="submit"
        disabled={pending}
      >
        {pending ? "Sending..." : journey.label}
      </button>
      {state.message ? (
        <p
          role="status"
          aria-live="polite"
          className={
            state.status === "success"
              ? "text-sm text-[#6941b0]"
              : "text-sm text-red-700"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  error,
  label,
  name,
  type = "text",
}: {
  error?: string;
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-800">
      {label}
      <input
        className="rounded-md border border-slate-300 bg-white/90 px-4 py-3 text-base outline-none focus:border-[#6941b0]"
        name={name}
        type={type}
      />
      {error ? <span className="text-sm text-red-700">{error}</span> : null}
    </label>
  );
}

function SelectField({
  error,
  label,
  name,
  options,
}: {
  error?: string;
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-800">
      {label}
      <select
        className="rounded-md border border-slate-300 bg-white/90 px-4 py-3 text-base outline-none focus:border-[#6941b0]"
        defaultValue=""
        name={name}
      >
        <option disabled value="">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="text-sm text-red-700">{error}</span> : null}
    </label>
  );
}
