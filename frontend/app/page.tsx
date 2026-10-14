import { CosmicScene } from "@/components/CosmicScene";
import { WorkExplorer } from "@/components/WorkExplorer";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { enquiryJourneys, homepageOutline } from "@/lib/strategy";
import { services } from "@/lib/content";

function Journeys() {
  return (
    <div className="enquiry-paths">
      {enquiryJourneys.map((item, i) => (
        <article key={item.intent} className="enquiry-path">
          <span className="enquiry-path-number">
            0{i + 1} /{" "}
            {item.intent === "project"
              ? "Project delivery"
              : "Free initial session"}
          </span>
          <h2 className="enquiry-path-title">
            {item.intent === "consultation"
              ? "Consultation"
              : item.intent === "project"
                ? "Project planning"
                : "Business review"}
          </h2>
          <p className="enquiry-path-summary">{item.summary}</p>
        </article>
      ))}
    </div>
  );
}
export default function HomePage() {
  return (
    <main>
      <section className="venus-hero">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="venus-hero-layout">
            <div>
              <p className="venus-eyebrow">{homepageOutline.eyebrow}</p>
              <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
                {homepageOutline.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                {homepageOutline.summary}
              </p>
              <Link href="/portfolio" className="venus-work-link">
                Explore our founder’s work <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <CosmicScene />
          </div>
          <div className="mt-12">
            <Journeys />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-semibold text-slate-950">
          Marketing and delivery that work together
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {homepageOutline.serviceGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{group.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-[#6941b0]"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-3xl font-semibold">
            Experience across countries and sectors
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Explore the locations and industries behind our founder’s
            experience, then see the projects and work delivered.
          </p>
          <WorkExplorer preview />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-semibold">
          A clear process from the start
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {homepageOutline.process.map(([title, description], i) => (
            <article key={title}>
              <p className="text-sm text-[#6941b0]">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-3xl font-semibold">Before we start</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {homepageOutline.faqs.map(([question, answer]) => (
              <details
                key={question}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {question}
                </summary>
                <p className="mt-3 leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <h2 className="text-3xl font-semibold">Choose your next step</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Start with a free conversation, share a project brief or request a
            free initial audit. We will agree the scope before any
            implementation work.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
