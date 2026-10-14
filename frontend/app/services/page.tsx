import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionIntro } from "@/components/SectionIntro";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing, web development, AI automation, CRM and WhatsApp and email marketing services for UK businesses.",
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
            alt="Pearlescent sphere connecting marketing, websites, automation, CRM, messaging and search"
            className="service-brand-image h-auto rounded-2xl object-cover"
            height={800}
            priority
            src="/images/venus-overview-v2.webp"
            width={1200}
          />
        </div>
        <div className="mt-12 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              className="service-card image-hover-card overflow-hidden rounded-2xl border border-violet-100 bg-white"
              key={service.slug}
            >
              <div className="card-image-frame">
                <Image
                  alt={service.imageAlt}
                  className="service-brand-image aspect-[3/2] h-auto w-full object-cover"
                  height={800}
                  sizes="(min-width: 1280px) 395px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                  src={service.image}
                  width={1200}
                />
              </div>
              <div className="flex flex-1 flex-col items-start p-6">
                <h2 className="text-xl font-semibold leading-7 text-slate-950 md:min-h-14">
                  {service.title}
                </h2>
                <p className="mt-3 text-slate-600">{service.summary}</p>
                <Link
                  className="mt-6 inline-flex rounded-md venus-button px-4 py-2 font-semibold text-white"
                  href={`/services/${service.slug}`}
                >
                  Explore service
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
