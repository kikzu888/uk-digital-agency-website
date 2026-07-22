import Link from "next/link";

import { company, navItems } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link className="flex items-center gap-3 font-semibold text-slate-950" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-emerald-900 text-sm text-white">
            CN
          </span>
          <span>{company.name}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm md:flex">
          {navItems.map((item) => (
            <Link className="text-slate-700 hover:text-emerald-900" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950" href="/contact">
          Book a Consultation
        </Link>
      </div>
    </header>
  );
}
