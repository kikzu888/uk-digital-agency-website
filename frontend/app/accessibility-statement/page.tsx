import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility Statement template for VenusCore.",
  alternates: { canonical: "/accessibility-statement" },
};

export default function AccessibilityStatementPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-5xl font-semibold text-slate-950">Accessibility Statement</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        VenusCore aims to make this website accessible and usable for as many people as possible, following WCAG 2.2 AA principles where practical.
      </p>
      <div className="mt-10 grid gap-6 text-slate-700">
        <p>The site is being built with semantic HTML, keyboard focus states, labelled forms and sufficient colour contrast.</p>
        <p>If you find an accessibility issue, contact Business Email with the page URL and a short description of the problem.</p>
      </div>
    </main>
  );
}
