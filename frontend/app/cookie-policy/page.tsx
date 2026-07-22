import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy template for Company Name. Requires legal review.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-semibold uppercase text-amber-700">Lawyer review required</p>
      <h1 className="mt-3 text-5xl font-semibold text-slate-950">Cookie Policy</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        This template should be updated once analytics, advertising or functional cookies are confirmed.
      </p>
      <div className="mt-10 grid gap-6 text-slate-700">
        <p>Essential cookies may be used for security, form protection and site operation.</p>
        <p>Analytics or session recording tools should only run where consent is required and granted.</p>
      </div>
    </main>
  );
}
