import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions template for VenusCore. Requires legal review.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-semibold uppercase text-amber-700">Lawyer review required</p>
      <h1 className="mt-3 text-5xl font-semibold text-slate-950">Terms and Conditions</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        This placeholder sets the structure for website terms and must be reviewed before publication.
      </p>
      <div className="mt-10 grid gap-6 text-slate-700">
        <p>Final terms should define company details, permitted website use, intellectual property, limitations, governing law and contact details.</p>
      </div>
    </main>
  );
}
