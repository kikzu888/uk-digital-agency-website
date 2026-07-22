import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr]">
          <SectionIntro
            eyebrow="Services"
            summary="Choose one focused service or combine several into a joined-up digital roadmap."
            title="Services for UK business growth and resilience"
          />
          <Image
            alt="Integrated digital services dashboard showing marketing, website, automation, CRM and security modules"
            className="h-auto rounded-md object-cover shadow-xl"
            height={700}
            priority
            src="/images/services-overview.png"
            width={1100}
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article className="overflow-hidden rounded-md border border-slate-200 bg-white/90 shadow-sm" key={service.slug}>
              <Image
                alt={service.imageAlt}
                className="h-56 w-full object-cover"
                height={520}
                src={service.image}
                width={900}
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-slate-950">{service.title}</h2>
                <p className="mt-3 text-slate-600">{service.summary}</p>
                <Link className="mt-6 inline-flex rounded-md bg-[#0b4fd8] px-4 py-2 font-semibold text-white" href={`/services/${service.slug}`}>
                  Explore Service
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
