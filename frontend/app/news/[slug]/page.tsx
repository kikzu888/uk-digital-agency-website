import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { newsArticles } from "@/lib/content";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const related = newsArticles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <main>
      <article className="mx-auto max-w-4xl px-6 py-20">
        <Link className="text-sm font-semibold text-[#0b4fd8]" href="/news">
          Back to News
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase text-[#0b4fd8]">{article.category}</p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-950">{article.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{article.excerpt}</p>
        <p className="mt-6 text-sm text-slate-500">
          By {article.author} | Published {article.publishedAt} | Updated {article.updatedAt}
        </p>
        <Image
          alt={article.featuredImageAlt}
          className="mt-10 rounded-md object-cover"
          height={700}
          priority
          src={article.featuredImage}
          width={1200}
        />
        <div className="mt-10 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-slate-700">
          Placeholder article content. Replace with reviewed, original editorial copy before publication.
        </div>
        <p className="mt-8 text-lg leading-8 text-slate-700">{article.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold" href={`https://www.linkedin.com/shareArticle?mini=true&url=/news/${article.slug}`}>
            Share on LinkedIn
          </a>
          <a className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold" href={`https://twitter.com/intent/tweet?url=/news/${article.slug}&text=${encodeURIComponent(article.title)}`}>
            Share on X
          </a>
        </div>
      </article>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="text-2xl font-semibold text-slate-950">Related articles</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {related.map((item) => (
            <Link className="rounded-md border border-slate-200 bg-white/90 p-5" href={`/news/${item.slug}`} key={item.slug}>
              <p className="text-sm font-semibold text-[#0b4fd8]">{item.category}</p>
              <h3 className="mt-2 font-semibold text-slate-950">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
