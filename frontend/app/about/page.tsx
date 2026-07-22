import type { Metadata } from "next";
import Image from "next/image";

import { SectionIntro } from "@/components/SectionIntro";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Company Name, a UK-focused digital agency for growth, automation and security.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
          <SectionIntro
            eyebrow="About"
            summary="Company Name is being structured as a practical digital partner for UK SMEs that need dependable marketing, web, automation, CRM and security support."
            title="Digital delivery with commercial focus"
          />
          <Image
            alt="Collaborative digital roadmap workshop with business technology planning materials"
            className="h-auto rounded-md object-cover shadow-xl"
            height={700}
            priority
            src="/images/about-workshop.png"
            width={1100}
          />
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {[
            ["Practical strategy", "We start with the business problem and choose technology only when it improves the outcome."],
            ["Responsible delivery", "Security, accessibility, privacy and maintainability are treated as core requirements."],
            ["Room to grow", "The platform is planned so new service areas, locations, articles and case studies can be added cleanly."],
          ].map(([title, text]) => (
            <article className="rounded-md border border-slate-200 bg-white p-6" key={title}>
              <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-md bg-slate-950 p-8 text-white">
          <p className="text-sm text-slate-300">{company.logo}</p>
          <h2 className="mt-3 text-2xl font-semibold">Placeholder business details</h2>
          <p className="mt-3 text-slate-300">
            UK Phone Number, Business Email, UK Business Address and Company Registration Number will be replaced once verified details are provided.
          </p>
        </div>
      </section>
    </main>
  );
}
