"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { company, navItems } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header ref={header} className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:py-4">
        <Link className="flex shrink-0 items-center" href="/" onClick={() => setOpen(false)}>
          <Image
            alt={`${company.name} logo`}
            className="h-8 w-auto lg:h-10"
            height={84}
            priority
            src={company.logo}
            width={300}
          />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm lg:flex">
          {navItems.map((item) => (
            <Link aria-current={pathname === item.href ? "page" : undefined} className="text-slate-700 hover:text-[#6941b0]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden min-h-11 items-center rounded-md venus-button px-3 text-xs font-semibold text-white min-[380px]:inline-flex lg:px-4 lg:text-sm" href="/contact?intent=consultation" onClick={() => setOpen(false)}>
            <span className="lg:hidden">Free consultation</span>
            <span className="hidden lg:inline">Let’s talk</span>
          </Link>
          <button ref={toggle} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-950 lg:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="max-h-[80dvh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
        {navItems.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)} className={`flex min-h-12 items-center rounded-md px-3 text-base font-medium ${pathname === item.href ? "bg-violet-50 text-[#6941b0]" : "text-slate-800"}`}>{item.label}</Link>)}
        <Link href="/contact?intent=consultation" onClick={() => setOpen(false)} className="mt-3 flex min-h-12 items-center justify-center rounded-md venus-button px-4 font-semibold text-white">Let’s talk</Link>
      </nav>
    </header>
  );
}
