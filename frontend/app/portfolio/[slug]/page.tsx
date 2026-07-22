import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { portfolioProjects } from "@/lib/content";

type PortfolioProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PortfolioProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default async function PortfolioProjectPage({ params }: PortfolioProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <article className="mx-auto max-w-5xl px-6 py-20">
        <Link className="text-sm font-semibold text-emerald-900" href="/portfolio">
          Back to Portfolio
        </Link>
        {project.isPlaceholder ? (
          <p className="mt-8 text-sm font-semibold uppercase text-amber-700">Placeholder case study</p>
        ) : null}
        <h1 className="mt-3 text-5xl font-semibold text-slate-950">{project.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{project.shortDescription}</p>
        <Image
          alt={`Placeholder project image for ${project.title}`}
          className="mt-10 rounded-md object-cover"
          height={700}
          priority
          src={project.images[0]}
          width={1200}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ContentBlock title="Client sector" value={project.clientSector} />
          <ContentBlock title="Project category" value={project.category} />
          <ContentBlock title="Business problem" value={project.businessProblem} />
          <ContentBlock title="Solution" value={project.solution} />
        </div>
        <section className="mt-10 rounded-md border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        </section>
        <section className="mt-10 rounded-md border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Results</h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-700">
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </section>
        <Link className="mt-10 inline-flex rounded-md bg-emerald-900 px-5 py-3 font-semibold text-white" href="/contact">
          Request a Similar Project
        </Link>
      </article>
    </main>
  );
}

function ContentBlock({ title, value }: { title: string; value: string }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{value}</p>
    </section>
  );
}
