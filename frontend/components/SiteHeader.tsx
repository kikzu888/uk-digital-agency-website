import Image from "next/image";
import Link from "next/link";

import { company, navItems } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link className="flex items-center" href="/">
          <Image
            alt={`${company.name} logo`}
            className="h-10 w-auto"
            height={84}
            priority
            src={company.logo}
            width={300}
          />
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
