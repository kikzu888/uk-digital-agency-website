import type { Metadata } from "next";
import { WorkExplorer } from "@/components/WorkExplorer";

export const metadata:Metadata={title:"Experience by Country & Sector",description:"Explore our founder’s work by project location and industry, then discover the individual projects.",alternates:{canonical:"/portfolio"}};
export default function PortfolioPage(){return <main><section className="mx-auto max-w-7xl px-6 py-14"><p className="text-sm font-semibold uppercase tracking-wide text-[#6941b0]">Countries / Sectors / Projects</p><h1 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">International experience, relevant to your sector.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Start with a country and industry, then explore the work delivered by Valeri Gviniashvili. These projects represent our founder’s experience, rather than contracts awarded to VenusCore.</p><WorkExplorer/></section></main>}
