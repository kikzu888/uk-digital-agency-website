import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy template for Company Name. Requires legal review.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" />;
}

function PolicyPage({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-semibold uppercase text-amber-700">Lawyer review required</p>
      <h1 className="mt-3 text-5xl font-semibold text-slate-950">{title}</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        This is a template for a UK business website and is not legal advice. It must be reviewed by a qualified legal professional before publication.
      </p>
      <section className="mt-10 grid gap-6 text-slate-700">
        <p>Company Name will collect only the information needed to respond to enquiries and provide requested services.</p>
        <p>Contact form data may include name, company, email, phone, service interest, budget range, project description and consent records.</p>
        <p>Marketing consent is optional and should be recorded separately from service enquiry consent.</p>
      </section>
    </main>
  );
}
