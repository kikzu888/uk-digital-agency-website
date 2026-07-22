import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionIntro } from "@/components/SectionIntro";
import { newsArticles, newsCategories } from "@/lib/content";

type NewsPageProps = {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
};

export const metadata: Metadata = {
  title: "News",
  description: "Digital marketing, web development, AI, CRM and cybersecurity articles for UK businesses.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const category = params.category ?? "";
  const page = Math.max(Number(params.page ?? "1"), 1);
  const pageSize = 6;
  const filtered = newsArticles.filter((article) => {
    const matchesCategory = category ? article.category === category : true;
    const matchesQuery = query
      ? `${article.title} ${article.excerpt}`.toLowerCase().includes(query)
      : true;
    return matchesCategory && matchesQuery;
  });
  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionIntro
          eyebrow="News"
          summary="SEO-ready editorial structure for useful UK business technology articles. Demo articles are placeholders."
          title="Insights for better digital decisions"
        />
        <form className="mt-10 grid gap-4 rounded-md border border-slate-200 bg-white p-5 md:grid-cols-[1fr_240px_auto]" role="search">
          <input
            className="rounded-md border border-slate-300 px-4 py-3"
            defaultValue={params.q}
            name="q"
            placeholder="Search articles"
            type="search"
          />
          <select className="rounded-md border border-slate-300 px-4 py-3" defaultValue={category} name="category">
            <option value="">All categories</option>
            {newsCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className="rounded-md bg-emerald-900 px-5 py-3 font-semibold text-white" type="submit">
            Search
          </button>
        </form>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((article) => (
            <article className="rounded-md border border-slate-200 bg-white shadow-sm" key={article.slug}>
              <Image
                alt={article.featuredImageAlt}
                className="h-48 w-full rounded-t-md object-cover"
                height={500}
                src={article.featuredImage}
                width={800}
              />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase text-emerald-900">{article.category}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">
                  <Link href={`/news/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                <p className="mt-5 text-xs text-slate-500">
                  By {article.author} | Published {article.publishedAt} | Updated {article.updatedAt}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-between text-sm text-slate-600">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-3">
            <Link className="rounded-md border border-slate-300 px-4 py-2" href={`/news?page=${Math.max(page - 1, 1)}`}>
              Previous
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2" href={`/news?page=${Math.min(page + 1, totalPages)}`}>
              Next
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
