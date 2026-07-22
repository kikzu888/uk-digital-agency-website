import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { SectionIntro } from "@/components/SectionIntro";
import { processSteps, services } from "@/lib/content";

const technologies = ["Next.js", "FastAPI", "PostgreSQL", "AI workflow tools", "CRM platforms", "Cloud security"];

export default function HomePage() {
  return (
    <main>
      <section className="bg-white/90">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#0b4fd8]">VenusCore</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-slate-950 md:text-7xl">
              Digital operations that help UK businesses grow with confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              We combine marketing, websites, automation, CRM and security into clear systems that support growth without adding unnecessary complexity.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link className="rounded-md bg-[#0b4fd8] px-5 py-3 font-semibold text-white" href="/contact">
                Book a Consultation
              </Link>
              <Link className="rounded-md border border-slate-950 px-5 py-3 font-semibold text-slate-950" href="/services">
                View Services
              </Link>
            </div>
          </div>
          <Image
            alt="UK business team reviewing digital systems and secure automation dashboards"
            className="h-auto rounded-md object-cover shadow-2xl"
            height={900}
            priority
            src="/images/home-hero.png"
            width={1200}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionIntro
          eyebrow="Services"
          summary="Each service is designed to solve a practical business problem, then connect neatly with the wider digital stack."
          title="One partner for growth, automation and protection"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link className="overflow-hidden rounded-md border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={`/services/${service.slug}`} key={service.slug}>
              <Image
                alt={service.imageAlt}
                className="h-44 w-full object-cover"
                height={360}
                src={service.image}
                width={640}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#07112f] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">
          <SectionIntro
            eyebrow="Why choose us"
            summary="We build around commercial outcomes, technical quality and clear communication, so decisions are grounded in what helps the business."
            title="Calm delivery for serious business work"
          />
          <div className="grid gap-4">
            {["UK market focus", "Security-aware delivery", "SEO and performance foundations", "Plain-English reporting"].map((item) => (
              <div className="rounded-md border border-white/10 bg-white/5 p-5" key={item}>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionIntro
          eyebrow="Process"
          summary="The workflow keeps discovery, delivery and support visible from the start."
          title="A structured route from idea to improvement"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <div className="rounded-md border border-slate-200 bg-white/90 p-5" key={step}>
              <span className="text-sm font-semibold text-sky-600">0{index + 1}</span>
              <p className="mt-3 font-semibold text-slate-950">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionIntro
            eyebrow="Portfolio"
            summary="Demo case studies will be clearly marked as placeholders until real client-approved work is added."
            title="Project catalogue ready for real case studies"
          />
          <div className="mt-10 rounded-md border border-dashed border-slate-300 p-8">
            <p className="text-sm font-semibold uppercase text-slate-500">Placeholder content</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">Operational website and CRM workflow example</h3>
            <p className="mt-3 max-w-3xl text-slate-600">
              A clearly labelled demo entry will show sector, business problem, proposed solution, technologies and results format without claiming real clients or fake metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2">
        <div>
          <SectionIntro
            eyebrow="Trust"
            summary="Testimonials are not fabricated. This area is reserved for verified client quotes once approved."
            title="Built for credibility from day one"
          />
          <div className="mt-8 rounded-md border border-dashed border-slate-300 bg-white/90 p-6 text-slate-600">
            Verified testimonial placeholder.
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-[#0b4fd8]">Technology</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span className="rounded-md border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionIntro
            eyebrow="FAQ"
            summary="Short answers to common early questions from UK SMEs."
            title="Before we start"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["Can we start with a small project?", "Yes. We can begin with an audit, landing page, CRM cleanup or automation prototype."],
              ["Do you work across the UK?", "Yes. The site is planned for UK-wide service coverage and future city-specific SEO pages."],
              ["Will the work be production ready?", "The project is being built with testing, security, accessibility and deployment readiness in mind."],
              ["Can content be managed later?", "Yes. The admin architecture is planned for News, Portfolio, Services and SEO metadata."],
            ].map(([question, answer]) => (
              <div className="rounded-md border border-slate-200 p-6" key={question}>
                <h3 className="font-semibold text-slate-950">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-[#0b4fd8]">Consultation</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">Discuss the next practical step for your business.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Tell us what you are trying to improve and which systems are already in place.
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white/90 p-6 shadow-sm">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
