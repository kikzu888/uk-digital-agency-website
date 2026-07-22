import Image from "next/image";
import Link from "next/link";

import { company, navItems, services } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            alt={`${company.name} logo`}
            className="h-12 w-auto rounded-sm bg-white"
            height={84}
            src={company.logo}
            width={300}
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            Digital marketing, web development, AI automation, CRM and cybersecurity services for UK businesses.
          </p>
          <p className="mt-6 text-sm text-slate-400">{company.registrationNumber}</p>
        </div>
        <div>
          <p className="font-semibold">Pages</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Services</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} key={service.slug}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <span>{company.phone}</span>
            <span>{company.email}</span>
            <span>{company.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-400">
        (c) 2026 {company.name}. Policy templates require legal review before publication.
      </div>
    </footer>
  );
}
