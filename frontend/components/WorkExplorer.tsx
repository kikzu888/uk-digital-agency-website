"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/lib/content";

const countryName = (value: string) =>
  value === "UAE" ? "United Arab Emirates" : value;
const countries = [
  ...new Set(portfolioProjects.map((project) => project.location)),
];
const sectors = [
  ...new Set(portfolioProjects.map((project) => project.clientSector)),
];

export function WorkExplorer({ preview = false }: { preview?: boolean }) {
  const [country, setCountry] = useState("All");
  const [sector, setSector] = useState("All");
  const matches = portfolioProjects.filter(
    (project) =>
      (country === "All" || project.location === country) &&
      (sector === "All" || project.clientSector === sector),
  );
  const shown = preview ? matches.slice(0, 4) : matches;
  return (
    <div className="mt-8">
      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          1. Explore project locations
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {["All", ...countries].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={country === value}
              onClick={() => {
                setCountry(value);
                setSector("All");
              }}
              className={`rounded-xl border p-4 text-left transition ${country === value ? "border-[#9c7cc9] bg-[#e8dcfa] text-[#32214c]" : "border-slate-200 bg-white text-slate-950 hover:border-violet-400"}`}
            >
              <span className="block font-semibold">
                {value === "All" ? "All locations" : countryName(value)}
              </span>
              <span
                className={`mt-2 block text-xs ${country === value ? "text-[#59416f]" : "text-slate-500"}`}
              >
                {
                  portfolioProjects.filter(
                    (p) => value === "All" || p.location === value,
                  ).length
                }{" "}
                {portfolioProjects.filter(
                  (p) => value === "All" || p.location === value,
                ).length === 1
                  ? "project"
                  : "projects"}
              </span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-6">
        <label className="grid max-w-md gap-2 text-sm font-semibold text-slate-700">
          2. Choose a sector
          <select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-slate-950"
          >
            <option value="All">All sectors</option>
            {sectors
              .filter((value) =>
                portfolioProjects.some(
                  (p) =>
                    p.clientSector === value &&
                    (country === "All" || p.location === country),
                ),
              )
              .map((value) => (
                <option key={value}>{value}</option>
              ))}
          </select>
        </label>
      </div>
      <p
        className="mt-6 text-sm text-slate-600"
        role="status"
        aria-live="polite"
      >
        {matches.length} {matches.length === 1 ? "project" : "projects"}
        {country !== "All"
          ? ` in ${countryName(country)}`
          : " across all locations"}
        {sector !== "All" ? ` / ${sector}` : ""}. Locations describe the
        projects, not VenusCore offices.
      </p>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {shown.map((project) => (
          <article
            key={project.slug}
            className="image-hover-card overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="border-b border-slate-200 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#6941b0]">
                {countryName(project.location)}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                {project.clientSector}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{project.role}</p>
            </div>
            <div className="card-image-frame">
              <Image
                src={project.images[0]}
                alt={project.imageAlt}
                width={900}
                height={563}
                sizes="(max-width:768px) 90vw, 44vw"
                className="aspect-[16/10] h-auto w-full bg-slate-100 object-contain"
              />
            </div>
            <div className="p-5">
              <p className="font-semibold text-slate-950">{project.title}</p>
              <p className="mt-3 leading-7 text-slate-600">
                {project.shortDescription}
              </p>
              <Link
                href={`/portfolio/${project.slug}`}
                className="mt-4 inline-block font-semibold text-[#6941b0]"
              >
                Explore the project
              </Link>
            </div>
          </article>
        ))}
      </div>
      {matches.length === 0 && (
        <p className="py-8 text-slate-600">
          No projects match this selection. Choose another location or sector.
        </p>
      )}
      {preview && (
        <Link
          href="/portfolio"
          className="mt-6 inline-block font-semibold text-[#6941b0]"
        >
          Explore all locations, sectors and projects
        </Link>
      )}
    </div>
  );
}
