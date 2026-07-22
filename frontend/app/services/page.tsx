import type { Metadata } from "next";
import Link from "next/link";

import { SectionIntro } from "@/components/SectionIntro";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Digital marketing, web development, AI automation, CRM and cybersecurity services for UK businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionIntro
          eyebrow="Services"
          summary="Choose one focused service or combine several into a joined-up digital roadmap."
          title="Services for UK business growth and resilience"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article className="rounded-md border border-slate-200 bg-white p-6" key={service.slug}>
              <h2 className="text-2xl font-semibold text-slate-950">{service.title}</h2>
              <p className="mt-3 text-slate-600">{service.summary}</p>
              <Link className="mt-6 inline-flex rounded-md bg-emerald-900 px-4 py-2 font-semibold text-white" href={`/services/${service.slug}`}>
                Explore Service
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
