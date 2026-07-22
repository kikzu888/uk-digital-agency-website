import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/ContactForm";
import { SectionIntro } from "@/components/SectionIntro";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact VenusCore to discuss a UK digital marketing, website, automation, CRM or cybersecurity project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <SectionIntro
            eyebrow="Contact"
            summary="Share the business challenge, current systems and preferred service. Placeholder contact details will be replaced with verified company information."
            title="Start with a clear conversation"
          />
          <dl className="mt-10 grid gap-5 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-950">Phone</dt>
              <dd className="mt-1">{company.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Email</dt>
              <dd className="mt-1">{company.email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Address</dt>
              <dd className="mt-1">{company.address}</dd>
            </div>
          </dl>
          <Image
            alt="Consultation desk with abstract enquiry dashboard and project planning notes"
            className="mt-10 h-auto rounded-md object-cover shadow-xl"
            height={700}
            priority
            src="/images/contact-consultation.png"
            width={1100}
          />
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
