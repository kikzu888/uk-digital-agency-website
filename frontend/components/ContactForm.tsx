"use client";

import { FormEvent, useMemo, useState } from "react";
import { z } from "zod";

import { services } from "@/lib/content";

const contactSchema = z.object({
  firstName: z.string().min(2, "Enter your first name."),
  lastName: z.string().min(2, "Enter your surname."),
  companyName: z.string().min(2, "Enter your company name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  service: z.string().min(1, "Choose a service."),
  budget: z.string().min(1, "Choose a budget range."),
  projectDescription: z.string().min(20, "Add at least 20 characters about the project."),
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  const budgetOptions = useMemo(
    () => [
      "Under GBP 2,500",
      "GBP 2,500 - GBP 5,000",
      "GBP 5,000 - GBP 10,000",
      "GBP 10,000+",
    ],
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const result = contactSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
        ),
      );
      setState({ status: "error", message: "Please check the highlighted fields." });
      return;
    }

    setErrors({});
    setState({ status: "idle", message: "" });

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
          message: "We could not send the enquiry. Please try again or contact us by email.",
        });
        return;
      }

      const data = (await response.json()) as { reference: string };
      setState({
        status: "success",
        message: `Thank you. Your enquiry reference is ${data.reference}.`,
      });
      form.reset();
    } catch {
      setState({
        status: "error",
        message: "We could not reach the enquiry service. Please try again shortly.",
      });
    }
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
      <div className="hidden">
        <label htmlFor="website">Website</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field error={errors.firstName} label="First name" name="firstName" />
        <Field error={errors.lastName} label="Surname" name="lastName" />
      </div>
      <Field error={errors.companyName} label="Company name" name="companyName" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field error={errors.email} label="Email" name="email" type="email" />
        <Field error={errors.phone} label="Phone" name="phone" type="tel" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField error={errors.service} label="Preferred service" name="service" options={services.map((item) => item.title)} />
        <SelectField error={errors.budget} label="Budget range" name="budget" options={budgetOptions} />
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-800">
        Project description
        <textarea
          className="min-h-36 rounded-md border border-slate-300 bg-white/90 px-4 py-3 text-base outline-none focus:border-[#0b4fd8]"
          name="projectDescription"
        />
        {errors.projectDescription ? <span className="text-sm text-red-700">{errors.projectDescription}</span> : null}
      </label>
      <label className="flex gap-3 text-sm leading-6 text-slate-700">
        <input className="mt-1 h-4 w-4" name="privacyConsent" type="checkbox" />
        <span>I agree to the Privacy Policy template and understand my details will be used to respond to this enquiry.</span>
      </label>
      {errors.privacyConsent ? <span className="text-sm text-red-700">{errors.privacyConsent}</span> : null}
      <label className="flex gap-3 text-sm leading-6 text-slate-700">
        <input className="mt-1 h-4 w-4" name="marketingConsent" type="checkbox" />
        <span>I agree to receive occasional marketing updates.</span>
      </label>
      <button className="rounded-md bg-[#0b4fd8] px-5 py-3 font-semibold text-white" type="submit">
        Send Enquiry
      </button>
      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-[#0b4fd8]" : "text-sm text-red-700"}>
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
        className="rounded-md border border-slate-300 bg-white/90 px-4 py-3 text-base outline-none focus:border-[#0b4fd8]"
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
        className="rounded-md border border-slate-300 bg-white/90 px-4 py-3 text-base outline-none focus:border-[#0b4fd8]"
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
