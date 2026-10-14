import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase text-[#6941b0]">404</p>
      <h1 className="mt-3 text-5xl font-semibold text-slate-950">Page not found</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">
        The page may have moved or the address may be incorrect.
      </p>
      <Link className="mt-8 inline-flex rounded-md venus-button px-5 py-3 font-semibold text-white" href="/">
        Return Home
      </Link>
    </main>
  );
}
