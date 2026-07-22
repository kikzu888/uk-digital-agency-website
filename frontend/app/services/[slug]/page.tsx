import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { services } from "@/lib/content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-900">Service</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold text-slate-950">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{service.summary}</p>
          <div className="mt-10">
            <Link className="rounded-md bg-amber-400 px-5 py-3 font-semibold text-slate-950" href="/contact">
              Request a Quote
            </Link>
          </div>
        </div>
        <Image
          alt={service.imageAlt}
          className="h-auto rounded-md object-cover shadow-xl"
          height={700}
          priority
          src={service.image}
          width={1100}
        />
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-3">
          <ContentList title="Problems we solve" items={service.problems} />
          <ContentList title="Business benefits" items={service.benefits} />
          <ContentList title="Working process" items={service.process} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-semibold text-slate-950">Frequently asked questions</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {service.faqs.map((faq) => (
            <article className="rounded-md border border-slate-200 bg-white p-6" key={faq.question}>
              <h3 className="font-semibold text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ContentList({ items, title }: { items: string[]; title: string }) {
  return (
    <article className="rounded-md border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li className="border-l-2 border-amber-400 pl-3" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
