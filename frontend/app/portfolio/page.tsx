import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionIntro } from "@/components/SectionIntro";
import { portfolioProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Placeholder project catalogue and case study structure for VenusCore.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionIntro
          eyebrow="Portfolio"
          summary="Demo projects are clearly marked as placeholders. Real client work should only be added with approval."
          title="Case study structure ready for verified work"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <article className="rounded-md border border-slate-200 bg-white shadow-sm" key={project.slug}>
              <Image
                alt={project.imageAlt}
                className="h-64 w-full rounded-t-md object-cover"
                height={600}
                src={project.images[0]}
                width={900}
              />
              <div className="p-6">
                {project.isPlaceholder ? (
                  <p className="text-xs font-semibold uppercase text-amber-700">Placeholder case study</p>
                ) : null}
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{project.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
                <Link className="mt-6 inline-flex rounded-md bg-emerald-900 px-4 py-2 font-semibold text-white" href={`/portfolio/${project.slug}`}>
                  View Case Study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
